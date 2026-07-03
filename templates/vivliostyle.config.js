// @ts-check
/** @type {import('@vivliostyle/cli').VivliostyleConfigSchema} */
const vivliostyleConfig = {
  title: 'TODO: 本のタイトル',
  author: 'TODO: 著者名',
  language: 'ja',
  readingProgression: 'rtl',
  size: 'A5',

  // npm 依存として導入した場合はパッケージ名を指定
  // ローカル未公開テーマを直接参照したい場合は相対パスに変更してもよい
  theme: 'vivliostyle-theme-two-columns-jp',

  entryContext: './manuscripts',
  entry: [
    { path: 'title.html', title: '扉' },
    { path: 'manuscript.md', title: '本文' },
    { path: 'colophon.html', title: '奥付' },
  ],

  output: [
    './output/book.pdf',
  ],

  workspaceDir: '.vivliostyle',
  toc: false,
  vfm: {
    hardLineBreaks: false,
  },
};

module.exports = vivliostyleConfig;
