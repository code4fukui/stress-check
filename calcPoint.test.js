import * as t from "https://deno.land/std/testing/asserts.ts";
import { calcPoint } from "./calcPoint.js";

const n = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

Deno.test("simple", () => {
  t.assertEquals(calcPoint("N1", n), 1);
});
Deno.test("calc", () => {
  t.assertEquals(calcPoint("1+2", n), 3);
  t.assertEquals(calcPoint("10+20", n), 30);
  t.assertEquals(calcPoint("100+20+3", n), 123);
});
Deno.test("calc var", () => {
  t.assertEquals(calcPoint("N1+N2", n), 3);
  t.assertEquals(calcPoint("N1-N2", n), -1);
  t.assertEquals(calcPoint("N10-1", n), 9);
});
Deno.test("calc blacket", () => {
  t.assertEquals(calcPoint("10-(3+3)", n), 4);
  t.assertEquals(calcPoint("15-(N1+N2+N3)", n), 9);
});
