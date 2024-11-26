import { calcStress } from "./calcStress.js";

const data = Deno.args[0];
const res = calcStress(data);
console.log(res);
