# PostalCode

日本の郵便番号を、全国地方公共団体コードや町名を含む住所に変換するESモジュールです。

## デモ
[郵便番号を住所に変換](https://code4fukui.github.io/PostalCode/)

## 特徴
- 日本の郵便番号を全国地方公共団体コードと町名に変換
- GitHub Actionsを使用して毎日自動更新
- WebおよびDenoで利用可能なAPIを提供

## 使い方
ローカルへのインストール:

```
$ github clone https://github.com/code4fukui/PostalCode.git
```

使用例:

```js
import { PostalCode } from "https://code4fukui.github.io/PostalCode/PostalCode.js";

console.log(await PostalCode.decode(9160042));
```

出力:
```
[{ zipcode: "9160042", lgcode: "18207", town: "新横江", townyomi: "シンヨコエ" }]
```

## データ
日本郵便の[KEN_ALL.ZIP](https://www.post.japanpost.jp/zipcode/download.html)データを使用しています。

## ライセンス
MIT License — 詳細は[LICENSE](LICENSE)を参照してください。
