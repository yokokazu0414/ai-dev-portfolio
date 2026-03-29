---
name: review
description: ポートフォリオサイトの全観点コードレビューを実行する。HTML・CSS・JS・アクセシビリティ・パフォーマンス・デプロイ観点を網羅的にチェックし、問題点と改善案をレポートする。
allowed-tools: Read, Grep, Glob, Bash
---

# ポートフォリオサイト コードレビュー

以下のチェックリストを順番に実行し、各項目の **pass / warn / fail** を判定してレポートしてください。
問題が見つかった場合は該当ファイルの行番号と改善案を明示すること。

---

## 1. デザインシステム整合性チェック

`design-style-prompt.yaml` を読み込み、`style.css` の `:root` 変数と照合する。

| 確認項目 | 基準 |
|---------|------|
| カラー変数（--navy / --cyan / --white / --bg-soft / --text-main / --text-sub） | YAMLと一致しているか |
| border-radius | 4px〜8px の範囲内か |
| シャドウ | "Soft, natural elevation" ― navy ベースの rgba か |
| フォント | Inter + Noto Sans JP が指定されているか |
| 行間 | body: 1.6〜1.8 の範囲内か |

---

## 2. HTML 構造チェック

`index.html` を読み込んで以下を確認する。

| 確認項目 | 期待値 |
|---------|--------|
| `<main>` タグ | コンテンツ全体をラップしているか |
| OGP メタタグ | og:title / og:description / og:url / og:image が揃っているか |
| Twitter Card | twitter:card / twitter:title / twitter:description / twitter:image が揃っているか |
| favicon | `<link rel="icon">` が設定されているか |
| `loading="lazy"` | ファーストビュー以外の `<img>` に設定されているか |
| `alt` 属性 | 全 `<img>` に意味のある alt が設定されているか（装飾画像は `alt=""` + `aria-hidden` でも可） |
| セマンティクス | `<header>` / `<nav>` / `<main>` / `<section>` / `<article>` / `<footer>` が適切か |
| Contact リンク | `href="#"` のプレースホルダーが残っていないか |

---

## 3. アクセシビリティ チェック

| 確認項目 | 期待値 |
|---------|--------|
| `aria-label` | `<nav>` / `<button>` / モーダル等に設定されているか |
| `aria-expanded` | モバイルメニューボタンに動的に反映されているか（JS確認） |
| `aria-modal` | モーダルに設定されているか |
| `aria-hidden` | 装飾要素（scroll hint 等）に設定されているか |
| `focus-visible` | CSS に `:focus-visible` スタイルが定義されているか |
| コントラスト | --text-sub (#666) on --white (#fff) ≒ 5.7:1 → WCAG AA 合格か計算 |
| フォーカス管理 | モーダルオープン時に close ボタンへフォーカスが移動するか（JS確認） |

---

## 4. JavaScript インタラクション チェック

`script.js` を読み込んで以下を確認する。

| 確認項目 | 期待値 |
|---------|--------|
| Intersection Observer (reveal) | `.reveal` 要素が observe されているか |
| Intersection Observer (nav) | `section[id]` が observe されているか、rootMargin が適切か |
| フィルター | `transitionend` または適切なタイミングで `hidden` クラスを付与しているか |
| モーダル | Escape キー / オーバーレイクリック / close ボタンの3経路で閉じられるか |
| モバイルメニュー | `aria-expanded` / `aria-hidden` が JS で更新されているか |
| `'use strict'` | ファイル先頭に記述されているか |

---

## 5. パフォーマンス チェック

| 確認項目 | 確認方法 |
|---------|---------|
| 画像ファイルサイズ | `ls -lh image/` で各PNG のサイズを確認（目安: 1枚あたり 500KB 以下が望ましい） |
| 画像フォーマット | PNG のまま or WebP 変換済みか |
| Google Fonts | `display=swap` パラメータが URL に含まれているか |
| CSS / JS | minify されているか（静的サイトのため任意） |

---

## 6. レスポンシブ チェック

`style.css` のメディアクエリを確認する。

| ブレイクポイント | 確認項目 |
|---------------|---------|
| `≤ 900px` | works-grid が 1カラムになるか、about-layout が縦並びになるか |
| `≤ 640px` | ナビリンク非表示 + ハンバーガー表示、hero padding 縮小、hero-actions 縦並び |
| 全サイズ共通 | `overflow-x: hidden` が body に設定されているか |

---

## 7. デプロイ チェック

| 確認項目 | 期待値 |
|---------|--------|
| パス | CSS / JS / 画像がすべて相対パスか（絶対パス `/` 始まりだと GitHub Pages サブディレクトリで壊れる） |
| OGP URL | `og:url` / `og:image` が `https://yokokazu0414.github.io/ai-dev-portfolio/` ベースか |
| `CLAUDE.md` / `.claude/` | git 管理に含まれているか（.gitignore で除外されていないか） |
| デプロイ後確認 URL | https://yokokazu0414.github.io/ai-dev-portfolio/ |

---

## レポートフォーマット

各チェック完了後、以下の形式でまとめてください：

```
## レビュー結果サマリー

| カテゴリ | pass | warn | fail |
|---------|------|------|------|
| デザインシステム | N | N | N |
| HTML構造 | N | N | N |
| アクセシビリティ | N | N | N |
| JavaScript | N | N | N |
| パフォーマンス | N | N | N |
| レスポンシブ | N | N | N |
| デプロイ | N | N | N |

## 要対応事項（fail / warn）
1. [fail] ファイル名:行番号 — 問題の説明 → 改善案
2. ...

## 次のアクション
優先度順に改善タスクを列挙
```
