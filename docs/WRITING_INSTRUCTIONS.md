# 執筆インストラクション (このテーマ向け)

このドキュメントを上から読めば、本文を書き始められます。

## 1. 最小セットを配置する

新しい本のディレクトリに、次のファイルを配置します。

- `package.json`
- `vivliostyle.config.js`
- `manuscripts/manuscript.md`
- `manuscripts/title.html`
- `manuscripts/colophon.html`

雛形はこのリポジトリの `templates/` をそのまま使えます。

## 2. 依存関係を入れる

```sh
npm install
```

## 3. まずプレビューを開く

```sh
npm run preview
```

PDF を直接生成したいときは次:

```sh
npm run build
```

## 4. 本文を書く場所

本文は `manuscripts/manuscript.md` に書きます。

- 先頭の `# 見出し` は章タイトルとして扱われます。
- 段落先頭の字下げは、原稿中に全角スペース (`　`) を直接入れる運用です。

## 5. 使える記法 (このテーマでよく使うもの)

### 章タイトル

```md
# 第一章
```

### 場面転換

```md
---
```

`---` は罫線ではなく `＊　＊　＊` として表示されます。

### ルビ

```md
{漢字|かんじ}
```

### 挿絵 (キャプションあり)

```md
![挿絵の説明](../illustrations/001.png "キャプション文")
```

alt テキスト付き画像は `<figure>` として扱われ、段をまたいで表示されます。

### 挿絵 (キャプションなし)

```md
![](../illustrations/002.png)
```

alt なしは本文段内に収まる画像として表示されます。

### 強制改ページ

```html
<div class="page-break"></div>
```

### 縦中横

```html
<span class="tcy">19</span>時
```

## 6. 扉と奥付を編集する

- `manuscripts/title.html`: タイトル、サブタイトル、サークル名
- `manuscripts/colophon.html`: 発行日、著者、連絡先、印刷所など

## 7. 設定ファイルで最低限触る場所

`vivliostyle.config.js` の次を自分の本に合わせて変更します。

- `title`
- `author`
- `theme`
- `output`

## 8. フォントを用意する (Shippori Mincho など)

このテーマはフォントファミリーに Shippori Mincho を含めていますが、
環境によっては未インストールです。意図した見た目で組むには、
次のどちらかでフォントを明示的に用意してください。

### 方法 A: ローカルに同梱する (推奨)

1. 本プロジェクト側にフォント格納ディレクトリを作る。

```sh
mkdir -p manuscripts/fonts
```

2. Google Fonts などから `Shippori Mincho` の woff2 を取得し、
	 `manuscripts/fonts` に配置する。

例:

- `manuscripts/fonts/ShipporiMincho-Regular.woff2`
- `manuscripts/fonts/ShipporiMincho-Medium.woff2`

3. 本文側 CSS (例: `manuscripts/book.css`) に `@font-face` を定義する。

```css
@font-face {
	font-family: "Shippori Mincho";
	src: url("./fonts/ShipporiMincho-Regular.woff2") format("woff2");
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: "Shippori Mincho";
	src: url("./fonts/ShipporiMincho-Medium.woff2") format("woff2");
	font-weight: 500;
	font-style: normal;
	font-display: swap;
}
```

4. `vivliostyle.config.js` の `entry` に CSS を追加する。

```js
entry: [
	'book.css',
	{ path: 'title.html', title: '扉' },
	{ path: 'manuscript.md', title: '本文' },
	{ path: 'colophon.html', title: '奥付' },
],
```

この方法なら、別環境や CI でも同じフォントで再現できます。

### 方法 B: Google Fonts を直接読み込む

ネット接続が常に使える環境では、CSS 冒頭に次のような import を置く方法もあります。

```css
@import url("https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;700&display=swap");
```

ただし、ビルド時の通信状況に依存するため、入稿用 PDF では方法 A を推奨します。

## 9. Chromium の指定について

ネットワーク環境によっては Playwright のブラウザ自動ダウンロードが不安定になるため、
テンプレートは `--executable-browser` でシステムの Chromium を指定する形にしています。

例:

```sh
npm run build -- --executable-browser /path/to/chrome
```

環境側で自動ダウンロードが安定しているなら、`--executable-browser` を外しても構いません。

## 10. 執筆開始チェックリスト

- `npm run preview` が起動する
- 意図した本文フォントで表示される
- 扉/本文/奥付の順で表示される
- 章タイトルが想定どおり見える
- `---` が `＊　＊　＊` で表示される
- 必要なら PDF を `npm run build` で出力できる
