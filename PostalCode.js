import { CSV } from "https://js.sabae.cc/CSV.js";
import { LGCode } from "https://code4fukui.github.io/LGCode/LGCode.js";

const zipcache = {};
const fromZipCode = async (code) => {
  let s = code;
  if (typeof s === "string") {
    //s = IMIMojiConverter.toHalfWidth(s).replace(/[\D]/g, "");
    s = s.replace(/[\D]/g, "");
    if (s.length < 7) {
      const n = parseInt(s);
      s = isNaN(n) ? "0000000" : n + "0000000";
    }
    s = s.substring(0, 7);
  } else if (typeof s === "number") {
    s = s.toString();
    if (s.length < 7) {
      s = "0000000" + parseInt(code);
    }
    s = s.substring(s.length - 7);
  } else {
    return [];
  }
  const zip0 = parseInt(s.charAt(0));
  let cache = zipcache[zip0];
  if (!cache) {
    const fn = `data/${zip0}.csv`;
    let data = null;
    if (
      import.meta && import.meta.url && import.meta.url.startsWith("file://") &&
      window.Deno
    ) {
      const url = import.meta.url;
      const path = url.substring("file://".length, url.lastIndexOf("/") + 1);
      data = await CSV.fetch(path + fn);
    } else {
      const path = PostalCode.url;
      data = await CSV.fetch(path + fn);
    }
    const json = {};
    const csv = data; // CSV.decode(data);
    for (const d of csv) {
      const n = parseInt(d[0]);
      if (!json[n]) {
        json[n] = [d];
      } else {
        json[n].push(d);
      }
    }
    cache = zipcache[zip0] = json;
  }
  const d = cache[parseInt(s)];
  if (!d) return [];
  return d.map((d) => {
    return {
      zipcode: s,
      lgcode: d[1],
      town: d[2],
      townyomi: d[3],
    };
  });
};

const getMatchLenStr = (s1, s2) => {
  const len = Math.min(s1.length, s2.length);
  for (let i = 0; i < len; i++) {
    if (s1[i] != s2[i]) {
      return i;
    }
  }
  return len;
};
/*
console.log(getMatchLenStr("abc", "abcd") == 3);
console.log(getMatchLenStr("abcchu", "abcd") == 3);
console.log(getMatchLenStr("acchu", "abcd") == 1);
*/

const fromZipCode1 = async (code) => {
  const res = await fromZipCode(code);
  if (!res || res.length == 0) {
    return null;
  } else if (res.length <= 1) {
    return res[0];
  }
  let max = res[0].town;
  let maxyomi = res[0].townyomi;
  for (let i = 1; i < res.length; i++) {
    const r = res[i];
    const n = getMatchLenStr(r.town, max);
    max = max.substring(0, n);
    const n2 = getMatchLenStr(r.townyomi, maxyomi);
    maxyomi = maxyomi.substring(0, n2);
    if (!n) {
      break;
    }
  }
  res[0].town = max;
  res[0].townyomi = maxyomi;
  return res[0];
};

class PostalCode {
  static url = "https://code4fukui.github.io/PostalCode/"; // default
  static setDataPath(url) {
    PostalCode.url = url;
  }

  static async decode(code) {
    //return await fromZipCode(code);
    const zip = await fromZipCode1(code);

    if (!zip || !zip.lgcode) {
      return null;
    }
    const city = LGCode.decode(LGCode.normalize(zip.lgcode));
    console.log(city)
    const res = {};
    res.lgcode = zip.lgcode;
    if (city.length == 3) {
      res.pref = city[0];
      const city1 = city[1] == "特別区部" ? "" : city[1];
      res.city = city1 + city[2];
    } else {
      res.pref = city[0];
      res.city = city[1];
    }
    res.town = zip.town;
    res.townyomi = zip.townyomi;
    return res;
  }
}

export { PostalCode };
