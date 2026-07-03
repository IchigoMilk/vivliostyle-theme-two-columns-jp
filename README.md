# vivliostyle-theme-two-columns-jp

縦書き A5・右綴じ・二段組（上段/下段）向けの Vivliostyle テーマです。
このリポジトリには、テーマ本体だけでなく「すぐ本文を書き始めるための執筆インストラクション」と「設定/扉/奥付のテンプレート」も同梱しています。

## まず何をすればいいか

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

詳しい書き方は `docs/WRITING_INSTRUCTIONS.md` を読むだけで始められます。

## 同梱ドキュメント

- `docs/WRITING_INSTRUCTIONS.md`
  - 執筆開始までの手順
  - VFM での本文記法（章、場面転換、ルビ、挿絵、改ページ、縦中横）
  - 不足フォントの導入（Shippori Mincho を Google Fonts などから取得）
  - ビルド/プレビュー運用
  - よくある詰まりどころ（Chromium 指定）

## 同梱テンプレート

- `templates/package.json`（Vivliostyle CLI スクリプト付き）
- `templates/vivliostyle.config.js`（`entry` / `output` / `theme` の雛形）
- `templates/manuscripts/title.html`（扉ページ例）
- `templates/manuscripts/colophon.html`（奥付例）
- `templates/manuscripts/manuscript.md`（本文の最小サンプル）

## Theme Features

- `writing-mode: vertical-rl` + `readingProgression: 'rtl'` を前提にした縦書き日本語組版
- 二段組（`vertical-rl` では上段/下段方向に段が積まれる）
- 場面転換（`---`）は罫線ではなく中央寄せの `＊　＊　＊` で表示
- ルビ（`<ruby><rt>`）、挿絵（`<figure>`）、強制改ページ（`.page-break`）を標準でサポート
- 扉・奥付などの前後付は `column-span: all` で本文段組から分離し、ノンブルを非表示化

## Theme Usage (Existing Project)

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

## Customization

調整ポイントは主に `style.css` です。

- `body` の `font-size` / `line-height` / `columns` / `column-gap`（文字密度）
- `@page` の `margin`（印刷所仕様への追従）
- `.frontmatter` / `.backmatter`（扉・奥付ページ体裁）

フォントは環境依存で欠けやすいため、`docs/WRITING_INSTRUCTIONS.md` の
「フォントを用意する (Shippori Mincho など)」に従って、
本プロジェクト側にフォントを同梱する運用を推奨します。

## Known Limitations

- `column-rule` は intentionally 不使用です。
  Chromium で `column-span: all` 要素（扉・奥付・挿絵）を罫線が貫通する描画不具合があるため、段間は余白のみで表現しています。
