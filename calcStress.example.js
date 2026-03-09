import { calcStress, getCalcTable } from "./calcStress.js";

const ans = "4444444111444141144411111111111111111111111111111111111442";

const res = calcStress(ans);
console.log(res);
/*
t.assertEquals(res[0].評価点, "高ストレス");
t.assertEquals(res[1].評価点, 9); // A
t.assertEquals(res[2].評価点, 6); // B
t.assertEquals(res[3].評価点, 3); // C
t.assertEquals(res.find(i => i.尺度 == "仕事や生活の満足度").評価点, 1);
*/
