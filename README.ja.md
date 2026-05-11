# stress-check

職業性ストレス簡易調査票（57項目）の自動計算ツール。Webアプリ、CLI、JavaScriptライブラリとして利用できます。

## デモ

- **[ストレスチェックアプリ](https://code4fukui.github.io/stress-check/)**  
  Webフォームで57項目に回答するアプリ。
- **[計算アプリ (QRコード読取)](https://code4fukui.github.io/stress-check/checker.html)**  
  上記アプリで生成されたQRコードを読み取り、即座にストレスチェック結果を表示します。
- **[はたらく主観的価値についての調査 (3項目)](https://code4fukui.github.io/stress-check/?name=workwellb-check)**  
  関連する簡易調査アプリ。

## 特徴

- **ストレスレベル判定**: 57項目の回答文字列から、厚生労働省のマニュアルに基づきストレスレベルを自動計算します。
- **高ストレス者判定**: 「仕事のストレス要因」「心身のストレス反応」「周囲のサポート」の3領域の評価点合計から高ストレス者を判定します。
- **多様な利用形態**:
    - **Webアプリ**: QRコードリーダーで簡単に結果を計算できます。
    - **Deno CLI**: コマンドラインから直接計算を実行できます。
    - **ES Module**: JavaScriptモジュールとしてWebアプリケーションに組み込めます。

## 使い方

### JavaScript/ES Module

```js
import { calcStress } from "https://code4fukui.github.io/stress-check/calcStress.js";

// 57項目の回答を1-4の数字を並べた文字列として渡す
const data = "44444441114441411444111111111111111111111111111111111111121112";
const result = calcStress(data);

console.log(result);
/*
[
  { "カテゴリ": "", "尺度": "高ストレス判定", "評価点": "-" },
  { "カテゴリ": "A", "尺度": "領域A 合計", "評価点": 42 },
  { "カテゴリ": "B", "尺度": "領域B 合計", "評価点": 30 },
  { "カテゴリ": "C", "尺度": "領域C 合計", "評価点": 15 },
  ...
]
*/
```

### コマンドライン (Deno)

Denoがインストールされていれば、リモートスクリプトを直接実行できます。

```sh
deno run -A https://code4fukui.github.io/stress-check/cli.js 44444441114441411444111111111111111111111111111111111111121112
```

## API

### `calcStress(data)`

ストレスチェックの計算を実行します。

-   `data` (String): 57項目の回答（各項目1〜4）を連結した文字列。
-   **戻り値** (Array): 各尺度の評価点と、総合的な高ストレス判定を含むオブジェクトの配列。

### `getCalcTable()`

計算に使用する評価基準テーブルを取得します。

-   **戻り値** (Array): `stresscheck-calctable.csv` から読み込まれた評価基準データの配列。

## 参考資料

本ツールは、厚生労働省が提供する以下の資料に基づいて作成されています。

-   [ストレスチェック等の職場におけるメンタルヘルス対策・過重労働対策等｜厚生労働省](https://www.mhlw.go.jp/bunya/roudoukijun/anzeneisei12/index.html)
-   [職業性ストレス簡易調査票（57 項目） - 厚生労働省 PDF](https://www.mhlw.go.jp/bunya/roudoukijun/anzeneisei12/dl/stress-check_j.pdf)

## ライセンス

[MIT](https://github.com/code4fukui/stress-check/blob/main/LICENSE)
