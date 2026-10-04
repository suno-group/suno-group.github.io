/* =====================================================================
   お知らせデータ（News）
   ---------------------------------------------------------------------
   このファイルに項目を追加するだけで、Home の「お知らせ」欄（最新4件）と
   News ページ（全件・年別）の両方に、日本語版・英語版ともに反映されます。
   新しい項目は配列の先頭に追加してください（順番は日付で自動的に並び替えます）。

   1項目の書き方:
   {
     date: "2026-09-29",        // "YYYY-MM-DD"。月日が未定なら "2026-09" や "2026" でも可
     category: "publication",   // publication | award | grant | talk | member | event | media | news
     ja: { title: "日本語の見出し", body: "補足（任意）" },
     en: { title: "English title", body: "Optional note" },
     link: { url: "https://doi.org/...", label: "Nature Communications" }   // 任意
   },

   注意: 文字列の中で " を使う場合は \" と書いてください。各項目の末尾のカンマを忘れずに。
   ===================================================================== */

/* サイトの最終更新日（フッターに表示されます）。お知らせなどを更新したら、この日付も書き換えてください。 */
window.SITE_UPDATED = "2026-10-03";

window.SITE_NEWS = [
  {
    date: "2026-06",
    category: "talk",
    ja: { title: "第20回GPCR研究会（つくば国際会議場、6月26–27日）で寿野良二がポスター発表を行いました。" },
    en: { title: "Ryoji Suno presented a poster at the 20th GPCR Meeting (Tsukuba International Congress Center, June 26–27)." },
    link: { url: "https://www.gpcr.info/events/dai20kaigpcrkenkyukai-the-20th-gpcr-meeting", label: "第20回GPCR研究会" }
  },
  {
    date: "2026-06",
    category: "talk",
    ja: { title: "第26回日本蛋白質科学会年会（鳥取・とりぎん文化会館、6月17–19日）で井上明俊・高井朋代・寿野良二がポスター発表を行いました。" },
    en: { title: "Akitoshi Inoue, Tomoyo Takai and Ryoji Suno presented posters at the 26th Annual Meeting of the Protein Science Society of Japan (Tottori, June 17–19)." },
    link: { url: "https://aeplan.jp/pssj2026/", label: "第26回日本蛋白質科学会年会" }
  },
  {
    date: "2026-03",
    category: "talk",
    ja: { title: "日本薬学会第146年会（大阪・関西大学千里山キャンパス、3月26–29日）で寿野良二が座長を務め、口頭発表を行いました。" },
    en: { title: "Ryoji Suno served as a session chair and gave an oral presentation at the 146th Annual Meeting of the Pharmaceutical Society of Japan (Osaka, March 26–29)." },
    link: { url: "https://pub.confit.atlas.jp/ja/event/pharm146", label: "日本薬学会第146年会" }
  },
  {
    date: "2026",
    category: "publication",
    ja: { title: "錐体視物質の分光チューニングとレチナール交換に関する共同研究論文が Science に掲載されました。" },
    en: { title: "A collaborative study on spectral tuning and retinal exchange in cone visual pigments was published in Science." },
    link: { url: "https://doi.org/10.1126/science.adz3996", label: "Science (2026)" }
  },
  {
    date: "2026",
    category: "talk",
    ja: { title: "Gordon Research Conference「Ligand Binding and Molecular Gating」で Selected Short Talk に選出されました。" },
    en: { title: "Selected for a short talk at the Gordon Research Conference on Ligand Binding and Molecular Gating." }
  },
  {
    date: "2025",
    category: "publication",
    ja: { title: "ヒトκオピオイド受容体のバイアスドシグナリング機構に関する論文が Nature Communications に掲載されました。" },
    en: { title: "Our paper on the biased signaling mechanism of the human κ-opioid receptor was published in Nature Communications." },
    link: { url: "https://doi.org/10.1038/s41467-025-64882-1", label: "Nature Communications (2025)" }
  },
  {
    date: "2025",
    category: "publication",
    ja: { title: "M2ムスカリン受容体の活性化ホットスポットに関する共同研究論文が Journal of the American Chemical Society に掲載されました。" },
    en: { title: "A collaborative study on key activation hotspots in the M2 muscarinic receptor was published in the Journal of the American Chemical Society." },
    link: { url: "https://doi.org/10.1021/jacs.4c14385", label: "JACS (2025)" }
  },
  {
    date: "2025",
    category: "talk",
    ja: { title: "Gordon Research Conference「Molecular Pharmacology」で Selected Short Talk に選出されました。" },
    en: { title: "Selected for a short talk at the Gordon Research Conference on Molecular Pharmacology." }
  },
  {
    date: "2024",
    category: "grant",
    ja: { title: "科研費 基盤研究(B)「睡眠覚醒を制御するオレキシン受容体シグナル伝達機構の全貌解明と選択的薬剤開発」が採択されました（2024–2026年度）。" },
    en: { title: "JSPS KAKENHI Grant-in-Aid for Scientific Research (B) on orexin receptor signaling and selective therapeutics was awarded (FY2024–2026)." }
  },
  {
    date: "2024",
    category: "publication",
    ja: { title: "オレキシン2受容体と選択的・非選択的アンタゴニストの相互作用様式をNMRで解析した論文が Structure に掲載されました。" },
    en: { title: "An NMR study of how the human orexin 2 receptor interacts with selective and nonselective antagonists was published in Structure." },
    link: { url: "https://doi.org/10.1016/j.str.2023.12.008", label: "Structure (2024)" }
  }
];
