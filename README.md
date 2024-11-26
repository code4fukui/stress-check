# stress-check

- [アプリで職業性ストレス簡易調査票 57項目](https://code4fukui.github.io/stress-check/)
- [アプリで職業性ストレス簡易調査票 57項目 計算アプリ](https://code4fukui.github.io/stress-check/checker.html)

- [はたらく主観的価値についての調査 3項目](https://code4fukui.github.io/stress-check/?name=workwellb-check)

## usage

```js
import { calcStress } from "https://code4fukui.github.io/stress-check/calcStress.js";

const data = "44444441114441411444111111111111111111111111111111111111121112";
const res = calcStress(data);
console.log(res);
```

## cli

```sh
deno run -A https://code4fukui.github.io/stress-check/cli.js 44444441114441411444111111111111111111111111111111111111121112
```

## reference

- [ストレスチェック等の職場におけるメンタルヘルス対策・過重労働対策等｜厚生労働省](https://www.mhlw.go.jp/bunya/roudoukijun/anzeneisei12/index.html)
- [職業性ストレス簡易調査票（57 項目） - 厚生労働省](https://www.mhlw.go.jp/bunya/roudoukijun/anzeneisei12/dl/stress-check_j.pdf)
