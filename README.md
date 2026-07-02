# vivliostyle-theme-tategaki-nidan

A Vivliostyle theme for vertical A5, right-bound, two-column novels. This repository is intentionally generic and independent from any specific work.

## Features

- Vertical Japanese layout based on `writing-mode: vertical-rl` with `readingProgression: 'rtl'`
- Two-column composition (in `vertical-rl`, columns are stacked top to bottom)
- Scene breaks (`---`) rendered as centered `* * *` markers instead of a rule
- Built-in styles for ruby (`<ruby><rt>`), illustrations (`<figure>`), and forced page breaks (`.page-break`)
- No folio on cover/frontmatter/backmatter pages, isolated from columns with `column-span: all`

## Usage

Add this theme as a local dependency in the target book project's `package.json`:

```json
{
  "dependencies": {
    "vivliostyle-theme-tategaki-nidan": "file:../../vivliostyle-theme-tategaki-nidan"
  }
}
```

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: 'vivliostyle-theme-tategaki-nidan',
  // ...
};
```

After `npm install`, a symlink is created at `node_modules/vivliostyle-theme-tategaki-nidan`, and `theme.style` (`style.css`) is applied to book typesetting.

## Customization

Edit `style.css` directly as needed. Common tuning points:

- `body` `font-size` / `line-height` / `columns` / `column-gap` for text density
- `@page` `margin` for print shop trim/bleed constraints
- `.frontmatter` / `.backmatter` layout for cover and colophon pages

## Known Limitations

- `column-rule` is intentionally not used. In Chromium, rules can incorrectly pass through `column-span: all` elements (for example title pages, colophon pages, and illustrations), so column separation is represented with spacing only.
