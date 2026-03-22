# Random Strings

A static web app for generating cryptographically secure random strings.

暗号論的に安全なランダム文字列を生成する静的 Web アプリ。

## Features / 機能

- **Multiple strings at once** / 複数文字列の一括生成
- **Individual symbol selection (33 types)** / 記号の個別選択 (33種)
- **Symbol rate limiting** / 記号の出現割合制限
- **Click to copy** / クリックでクリップボードにコピー
- **Shareable URL** / URL で設定を共有可能
- **No build step, no backend** / ビルド不要、バックエンド不要

## Tech Stack / 技術構成

- HTML + CSS + JavaScript
- [Alpine.js](https://alpinejs.dev/) — reactive UI
- [Pico.css](https://picocss.com/) — base styles (dark theme)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) — secure randomness

## Usage / 使い方

Serve the `docs/` directory with any static file server.

`docs/` ディレクトリを任意の静的ファイルサーバーで配信するだけで動作します。

```sh
npx serve docs
```

Or deploy directly to GitHub Pages, Cloudflare Pages, etc.

GitHub Pages や Cloudflare Pages 等にそのままデプロイ可能です。

## Testing / テスト

```sh
npm install
npm test
```

E2E tests powered by [Playwright](https://playwright.dev/) (24 tests including randomness distribution validation).

[Playwright](https://playwright.dev/) による E2E テスト（乱数分布の検証を含む24テスト）。

## Spec / 仕様書

- [SPEC.ja.md](SPEC.ja.md) (日本語)
- [SPEC.en.md](SPEC.en.md) (English)

## License

MIT
