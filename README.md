# Ryoji Suno — Protein Science Group website (v32, redesign)

Static website for GitHub Pages. Japanese pages are in the root, English pages in `en/`.

## Pages
- `index.html` — Home (with the latest four news items)
- `news.html` — News / お知らせ (all items by year, with category filter)
- `research.html` — Research (Vision / Structure & Mechanism / Representative Studies / Current Directions / Targets & Platform / Collaboration)
- `team.html` — Protein Science Group members
- `publications.html` — Selected publications with DOI links and profile links
- `profile.html` — Profile, education, appointments, funding, short talks, awards, industry collaboration
- `contact.html` — Contact and external profiles
- `404.html` — "Page not found" page served automatically by GitHub Pages (Japanese + English)
- `sitemap.xml`, `robots.txt` — for search engines (see "公開 URL" below)

## 公開 URL
OGP（SNS でのプレビュー）、canonical / hreflang、`sitemap.xml`、`robots.txt`、`404.html` のリンクは、サイトの絶対 URL **`https://suno-group.github.io/`** で作られています。
GitHub の Organization `suno-group` に、`suno-group.github.io` という名前の公開リポジトリを作り、このフォルダの中身をそのルートに置くと、この URL で公開されます。

将来 URL を変える場合（独自ドメインに移すときなど）は、全ファイル内の `https://suno-group.github.io/` を新しい URL（末尾の `/` まで）に置き換えてください。対象は、すべての HTML（日本語・英語）、`404.html`、`sitemap.xml`、`robots.txt` です。テキストエディタの「フォルダ内を一括置換」で一度に置き換えられます。

## OGP・検索エンジン向けの設定
- 各ページの `<head>` に Open Graph / Twitter Card タグ（`og:title`, `og:description`, `og:image` など）、`canonical`、日英の `hreflang` が入っています。X・Slack・LINE・Facebook などに URL を貼ると、`assets/img/og-image.png`（1200×630）がプレビューに表示されます。
- Home と Profile には schema.org の構造化データ（`Person` / `WebSite`、JSON-LD）が入っています。
- `sitemap.xml` は全 14 ページ（日英）を列挙しています。Google Search Console にサイトを登録したら、「サイトマップ」から `sitemap.xml` を送信してください。
- `404.html` は GitHub Pages が存在しないページへのアクセス時に自動で表示します（設定不要）。

## 最終更新日
フッターの「最終更新」は `assets/data/news.js` 冒頭の `window.SITE_UPDATED = "YYYY-MM-DD";` から表示されます。お知らせなどを更新したら、この日付も書き換えてください（HTML の編集は不要です）。

## アクセス解析（Cloudflare Web Analytics など）
解析サービスから発行される `<script ...></script>` タグを、各 HTML ファイルの `</body>` の直前に貼り付けてください（日本語 7 ページ・英語 7 ページ・`404.html` の計 15 ファイル）。
サイトを再生成できる場合は、`build.py` の `ANALYTICS_SNIPPET` にタグを入れると全ページに自動で入ります。

## v32 redesign
- New visual identity: serif display type (Newsreader / Shippori Mincho) over IBM Plex Sans JP, Plex Mono for specimen labels (Å, positions, years), a cool-grey ground with a single coral accent.
- Home page: the EP3–Gi cryo-EM render as a hero plate, the lab workflow (Structure → Function → Molecular Discovery → Drug Development) as a three-step strip, a hairline expertise grid and a facts list.
- Research page: sticky table of contents (desktop) / chip row (mobile); representative studies presented as numbered figures (Fig. 1–4) on white mats with journal-style legends.
- Team, Publications, Profile and Contact rebuilt in the same system. All text, DOI links, member data and contact details were carried over from v31 unchanged.
- Contact page: the e-mail address is written with `[at]` instead of `@` (no `mailto:` link) to keep it away from address harvesters; a note asks visitors to replace `[at]` with `@`.
- Fonts load from Google Fonts. Without a network connection the site falls back to system fonts.
- Removed unused/duplicate files from v31: `assets/img/research/ep3-gi-static.png` (a duplicate of the KOR figure), `assets/video/ox2r-empa.mp4` and its poster (unused, watermarked).

## お知らせ（News）の追加方法
お知らせは `assets/data/news.js` の1ファイルで管理します。ここに項目を追加するだけで、Home の「お知らせ」欄（最新4件）と News ページ（全件・年別）に、日本語版・英語版ともに自動で反映されます。HTML を編集する必要はありません。

1. `assets/data/news.js` をテキストエディタで開く
2. `window.SITE_NEWS = [` の直後に、次の形式で項目を追加する（末尾のカンマを忘れずに）

```js
  {
    date: "2026-10-01",            // "YYYY-MM-DD"。月日が未定なら "2026-10" や "2026" でも可
    category: "publication",       // publication | award | grant | talk | member | event | media | news
    ja: { title: "日本語の見出し", body: "補足説明（任意）" },
    en: { title: "English title", body: "Optional note" },
    link: { url: "https://doi.org/...", label: "Journal name" }   // 任意
  },
```

3. 保存してアップロードする

- 項目は日付の新しい順に自動で並びます。並び順を手で管理する必要はありません。
- `en` を省略すると英語ページには日本語の見出しが表示されます（逆も同様）。
- カテゴリ名は Home / News ページで「論文」「受賞」「研究費」「学会発表」「メンバー」「イベント」「メディア」「お知らせ」（英語版は Publication / Award / ...）として表示されます。
- 文中に `"` を使う場合は `\"` と書いてください。JavaScript の文法エラーがあるとお知らせ欄が空になります（その場合は直前の編集を見直してください）。
- 初期状態では、サイト内の既存情報（論文・学会発表・研究費）から作成した項目が入っています。自由に編集・削除してください。

## Dark mode (optional)
`assets/css/dark.css` contains a dark colour scheme that follows the visitor's OS setting.
It is not loaded by default. To enable it, add this line after the main stylesheet in every page:

```html
<link rel="stylesheet" href="assets/css/dark.css">   <!-- use ../assets/css/dark.css in en/ -->
```

## Team photos
Place team photos in `assets/img/team/` using the filenames referenced in `team.html` (see `assets/img/team/README.txt`). If a photo is absent, the initials placeholder is shown automatically by `assets/js/main.js`.

## Local preview
Serve the folder with any simple local web server, e.g. `python3 -m http.server` and open http://localhost:8000/ .
(Opening `index.html` directly also works, but the video needs a web server in some browsers.)

## GitHub Pages
Upload the contents of this folder to the root of a GitHub repository and enable Pages from the repository settings. The `.nojekyll` file tells GitHub to serve the files as-is.
