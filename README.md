# vivliostyle-theme-two-columns-jp

縦書き A5・右綴じ・二段組 (上段/下段) 向けの Vivliostyle テーマです。

## Getting Started

1. 新しい本の作業ディレクトリを作る。
2. このリポジトリの `templates/` から、最低限以下をコピーする。
   - `templates/package.json`
   - `templates/vivliostyle.config.js`
   - `templates/manuscripts/manuscript.md`
   - `templates/manuscripts/title.html`
   - `templates/manuscripts/colophon.html`
3. `package.json` の `dependencies.vivliostyle-theme-two-columns-jp` のパスを、自分の環境に合わせる。
4. `npm install` を実行する。
5. `npm run preview` か `npm run build` を実行し、`manuscripts/manuscript.md` を書き進める。

詳細は `docs/WRITING_INSTRUCTIONS.md` 参照。

## 同梱ドキュメント

- `docs/WRITING_INSTRUCTIONS.md`
  - 執筆の手順
  - VFM での本文記法 (章、場面転換、ルビ、挿絵、改ページ、縦中横)
  - 不足フォントの導入 (Shippori Mincho を Google Fonts などから取得)
  - ビルド/プレビュー運用
  - よくある詰まりどころ (Chromium 指定)

## 同梱テンプレート

- `templates/package.json` (Vivliostyle CLI スクリプト付き)
- `templates/vivliostyle.config.js` (`entry` / `output` / `theme` の雛形)
- `templates/manuscripts/title.html` (扉ページ例)
- `templates/manuscripts/colophon.html` (奥付例)
- `templates/manuscripts/manuscript.md` (本文の最小サンプル)

## 特徴

- `writing-mode: vertical-rl` + `readingProgression: 'rtl'` を前提にした縦書き日本語組版
- 二段組 (`vertical-rl`)
- 場面転換 (`---`) を中央寄せの `＊　＊　＊` で表示
- ルビ (`<ruby><rt>`) 、挿絵 (`<figure>`) 、強制改ページ (`.page-break`)
- 扉・奥付などの前後付は `column-span: all` で本文段組から分離し、ノンブルを非表示化

## 既存プロジェクトへの追加方法

既存の本プロジェクトにテーマだけ導入する場合は、`package.json` にローカル依存を追加します。

```json
{
  "dependencies": {
    "vivliostyle-theme-two-columns-jp": "file:../../vivliostyle-theme-two-columns-jp"
  }
}
```

`vivliostyle.config.js`:

```js
module.exports = {
  theme: 'vivliostyle-theme-two-columns-jp',
};
```

`npm install` 後は `node_modules/vivliostyle-theme-two-columns-jp/style.css` が適用されます。

## 段組を切り替える (一段組 / 二段組)

段組数はテーマを使う側で選択できます。既定は二段組です。

### 本全体を切り替える

本文 (`manuscript.md`) を含めて本全体を一段組にしたい場合は、利用側で CSS 変数 `--body-columns` を上書きします。プロジェクトにオーバーライド用の CSS を用意し、

```css
/* custom.css */
:root {
  --body-columns: 1; /* 1 = 一段組, 2 = 二段組 (既定) */
}
```

のようにします。  
`vivliostyle.config.js` の `theme` を配列にして、テーマの後ろに読み込みます (後に指定した方が優先されます)。

```js
module.exports = {
  theme: ['vivliostyle-theme-two-columns-jp', './custom.css'],
};
```

### ページ単位で切り替える

扉・奥付のように本文とは別文書のページは、`<body>` にクラスを付けるだけで
そのページの段組を上書きできます (テンプレートの扉・奥付は既定で `single-column` にしてあります)。

```html
<body class="single-column"> <!-- 一段組 -->
<body class="two-column">    <!-- 二段組 -->
```

## カスタマイズ

`style.css` を編集してください。

- `body` の `font-size` / `line-height` / `column-gap` (文字密度)
- 段組数は `:root` の `--body-columns` (上記「段組を切り替える」を参照)
- `@page` の `margin` (上下左右余白)
- `.frontmatter` / `.backmatter` (扉・奥付ページ体裁)

フォントはレンダリング環境に依存するため、`docs/WRITING_INSTRUCTIONS.md` の「フォントを用意する (Shippori Mincho など)」に従って、本プロジェクト側にフォントを同梱する運用を推奨します。

## 制約

- `column-rule` は意図的に使用していません。
  Chromium で `column-span: all` 要素 (扉・奥付・挿絵) を罫線が貫通する描画不具合があるため、段間は余白のみで表現しています。
