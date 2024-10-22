import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { calcPoint } from "./calcPoint.js";

// https://code4fukui.github.io/qr-survey/?name=stress-check#111111111111111111111111111111111111111111111111111111111

const surveyurl = "https://code4fukui.github.io/qr-survey/surveys/stress-check.csv";
const stresscheck = await CSV.fetchJSON(surveyurl);
stresscheck.forEach(i => {
  i.category = i.category1[0];
});

const calcurl = "./stresscheck-calctable.csv?";
const calctable = await CSV.fetchJSON(calcurl);

export const calcStress = (stresssurvey) => { // [1-4]*57
  const res = [];
  for (const calc of calctable) {
    const n = [];
    for (let i = 0; i < stresscheck.length; i++) {
      const item = stresscheck[i];
      if (item.category == calc.カテゴリ) {
        n.push(parseInt(stresssurvey[i]));
      }
    }
    const point = calcPoint(calc.計算式, n);
    const o = { カテゴリ: calc.カテゴリ, 尺度: calc.尺度 }; //, ポイント: point };
    for (const c of "男女") {
      let rank = 0;
      for (let i = 1; i <= 5; i++) {
        if (point <= parseInt(calc[c + "性" + i])) {
          rank = parseInt(calc.評価点[i - 1]);
          break;
        }
      }
      //o[c + "性（高さ/多さ）"] = rank;
      o[c + "性 評価点"] = rank;
    }
    res.push(o);
  }
  for (const cate of "CBA") {
    const o = { カテゴリ: cate, 尺度: "領域" + cate + " 合計" };
    for (const c of "男女") {
      const sum = res.filter(i => i.カテゴリ == cate).reduce((pre, cur) => pre + cur[c + "性 評価点"], 0);
      o[c + "性 評価点"] = sum;
    }
    res.unshift(o);
  }
  return res;
};

//const res = calcStress("111111111111111111111111111111111111111111111111111111111");
//console.log(res);

