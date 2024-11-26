import * as t from "https://deno.land/std/testing/asserts.ts";
import { calcStress, getCalcTable } from "./calcStress.js";

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
Deno.test("calctable", () => {
  const showcols = getCalcTable().map(i => i.尺度);
  const items = [
    "心理的な仕事の負担（量）",
    "心理的な仕事の負担（質）",
    "自覚的な身体的負担度",
    "職場の対人間関係のストレス",
    "職場環境によるストレス",
    "仕事のコントロール度",
    "技能の活用度",
    "仕事の適正度",
    "働きがい",
    "活気",
    "イライラ感",
    "疲労感",
    "不安感",
    "抗うつ感",
    "身体愁訴",
    "上司からのサポート",
    "同僚からのサポート",
    "家族・友人からのサポート",
    "仕事や生活の満足度"
  ];
  //console.log(showcols);
  t.assertEquals(items, showcols);
});