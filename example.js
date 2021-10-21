//import { PostalCode } from "https://code4fukui.github.io/PostalCode/PostalCode.js";
import { PostalCode } from "./PostalCode.js";

console.log(await PostalCode.decode(9160042));
console.log(await PostalCode.decode(9160000));
console.log(await PostalCode.decode(1020094));
console.log(await PostalCode.decode(5308201)); //?
console.log(await PostalCode.decode(5300000));
