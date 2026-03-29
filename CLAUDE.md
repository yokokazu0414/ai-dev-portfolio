# AI Dev Portfolio — Project Context

## Overview
AI開発者向けポートフォリオサイト。Vibe Coding × AI 開発の実績（スクリーンショット画像）を掲載する静的サイト。

- **公開URL**: https://yokokazu0414.github.io/ai-dev-portfolio/
- **リポジトリ**: https://github.com/yokokazu0414/ai-dev-portfolio
- **デプロイ方法**: `git push origin main` → GitHub Pages が自動公開（ブランチ: main, ルート: /）

## ファイル構成

```
04_portfolio-site/
├── index.html              # メインHTML（Single Page）
├── style.css               # 全スタイル（CSS変数 + レスポンシブ）
├── script.js               # インタラクション（フィルター・モーダル・Intersection Observer）
├── design-style-prompt.yaml  # デザインシステム定義（変更時は必ず参照）
├── image/
│   ├── ESG-Analyzer.png
│   ├── Excel-Matcher-Pro.png
│   ├── Puyopuyo-neon.png
│   └── SNS-Photo-Generator.png
└── .claude/
    └── commands/
        └── review.md       # /review コマンド
```

## デザインシステム（design-style-prompt.yaml 準拠）

| トークン | 値 | 用途 |
|---------|-----|------|
| `--navy` | `#002B5B` | メインカラー・見出し・ボタン |
| `--cyan` | `#00A8E8` | アクセント・ラベル・CTA |
| `--white` | `#FFFFFF` | ベース背景 |
| `--bg-soft` | `#F4F7FA` | セクション背景・タグ背景 |
| `--text-main` | `#1A1A1A` | 本文 |
| `--text-sub` | `#666666` | サブテキスト |
| `--border` | `#DDE3EA` | 罫線 |
| `--radius` | `8px` | カード・ボタン角丸 |
| `--radius-sm` | `6px` | タグ・小要素角丸 |

### フォント
- **英語**: Inter（400 / 500 / 600 / 700 / 800）
- **日本語**: Noto Sans JP（400 / 500 / 700 / 800）
- **行間**: 1.7（body）/ 1.85（about テキスト）/ 1.18（h1）

### シャドウ
```css
--shadow-sm: 0 1px 4px rgba(0,43,91,.06), 0 2px 8px rgba(0,43,91,.04);
--shadow:    0 4px 24px rgba(0,43,91,.12), 0 1px 4px rgba(0,43,91,.06);
--shadow-lg: 0 16px 48px rgba(0,43,91,.18);
```

## ページ構造（セクション順）

1. **NAV** — 固定ヘッダー。スクロールで shadow 追加。ナビリンクはスクロール連動でアクティブ表示。
2. **HERO** — フルビューポート。ラベル・H1・サブコピー・CTAボタン・tech タグ。
3. **WORKS** — カテゴリーフィルター（All / Business / Game / Creative）+ 2カラムグリッド。画像クリックでモーダル拡大。
4. **ABOUT** — テキストブロック + Tech Stack グリッド（2カラム）。
5. **CONTACT** — Navy背景。X / GitHub リンクボタン。
6. **FOOTER** — ロゴ + コピーライト。

## インタラクション設計

| 機能 | 実装方法 |
|------|---------|
| スクロールアニメーション | `IntersectionObserver` + `.reveal` / `.visible` クラス |
| ナビアクティブ | `IntersectionObserver` で section 監視 → `.nav-anchor.active` |
| ナビ shadow | `scroll` イベント → `.nav.scrolled` |
| フィルター | `data-category` 属性 + `transitionend` 待ちの fade-out |
| モーダル | `data-modal` キー → `imgMap` ルックアップ |
| モバイルメニュー | `.open` クラストグル + `aria-expanded` 更新 |

## コンタクト情報
- **GitHub**: https://github.com/yokokazu0414
- **X (Twitter)**: https://x.com/yokokazu0414

## 変更時の注意点
- デザイントークン変更 → `design-style-prompt.yaml` と `style.css` の `:root` を同期すること
- 実績追加 → `index.html` の `#worksGrid`・`script.js` の `imgMap`・`image/` フォルダの3点セットで追加
- デプロイ → パスはすべて相対パス（`image/`, `style.css`, `script.js`）で維持すること
