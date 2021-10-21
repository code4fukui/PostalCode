import { CSV } from "https://js.sabae.cc/CSV.js";

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
      data = await Deno.readTextFile(path + fn);
    } else {
      const path = "https://code4fukui.github.io/PostalCode/";
      data = await (await fetch(path + fn)).text();
    }
    const json = {};
    const csv = CSV.decode(data);
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

class PostalCode {
  static async decode(code) {
    return fromZipCode(code);
  }
}

export { PostalCode };
