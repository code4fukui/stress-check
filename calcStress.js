import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { calcPoint } from "./calcPoint.js";

// https://code4fukui.github.io/qr-survey/?name=stress-check#111111111111111111111111111111111111111111111111111111111

const surveyurl = "https://code4fukui.github.io/qr-survey/surveys/stress-check.csv";
const stresscheck = await CSV.fetchJSON(surveyurl);
stresscheck.forEach(i => {
  i.category = i.category1[0];
});

const calcurl = "./stresscheck-calctable.csv";
const calctable = await CSV.fetchJSON(calcurl);

export const calcStress = (stresssurvey) => { // [1-4]*57 + 性別
  if (stresssurvey.length != 57 && stresssurvey.length != 58) throw new Error("not match");
  const sex = stresssurvey.length == 57 || stresssurvey[57] == "1" ? "男" : "女";
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
    let rank = 0;
    for (let i = 1; i <= 5; i++) {
      if (point <= parseInt(calc[sex + "性" + i])) {
        rank = parseInt(calc.評価点[i - 1]);
        break;
      }
    }
    //o[c + "性（高さ/多さ）"] = rank;
    o["評価点"] = rank;
    res.push(o);
  }
  const sums = {};
  for (const cate of "CBA") {
    const o = { カテゴリ: cate, 尺度: "領域" + cate + " 合計" };
    const sum = res.filter(i => i.カテゴリ == cate).reduce((pre, cur) => pre + cur["評価点"], 0);
    o["評価点"] = sum;
    sums[cate] = sum;
    res.unshift(o);
  }
  const highstress = sums.B <= 12 || sums.A + sums.C <= 26 && sums.B <= 17;
  res.unshift({ カテゴリ: "", 尺度: "高ストレス判定", 評価点: highstress ? "高ストレス" : "-" });
  return res;
};

//const res = calcStress("111111111111111111111111111111111111111111111111111111111");
//console.log(res);

