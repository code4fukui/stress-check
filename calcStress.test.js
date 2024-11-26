import * as t from "https://deno.land/std/testing/asserts.ts";
import { calcStress } from "./calcStress.js";

const worst = "11111114441114144111444444444444444444444444444444444444423332";
const best = "44444441114441411444111111111111111111111111111111111111121112";

Deno.test("worst case", () => {
  const res = calcStress(worst);
  t.assertEquals(res[0].評価点, "高ストレス");
  t.assertEquals(res[1].評価点, 9); // A
  t.assertEquals(res[2].評価点, 6); // B
  t.assertEquals(res[3].評価点, 3); // C
});
Deno.test("best case", () => {
  const res = calcStress(best);
  t.assertEquals(res[0].評価点, "-");
  t.assertEquals(res[1].評価点, 42); // A
  t.assertEquals(res[2].評価点, 30); // B
  t.assertEquals(res[3].評価点, 15); // C
});
