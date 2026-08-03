# 森 幸夫 — Portfolio

Full-Stack / AI Engineer & Technical Lead のポートフォリオサイト。
Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + Three.js (React Three Fiber) + Framer Motion。

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。

## ビルド

```bash
npm run build
npm start
```

## Vercelへのデプロイ

1. このリポジトリをGitHub等にpush
2. [vercel.com](https://vercel.com) で "New Project" → リポジトリを選択
3. Framework Presetは自動的に **Next.js** が検出されます（設定変更不要）
4. Deploy をクリック

もしくはCLIから直接デプロイ:

```bash
npx vercel
```

## 構成

- `src/app` — ページ / レイアウト / グローバルスタイル
- `src/components` — セクションごとのUIコンポーネント（Hero, Skills, Timelineなど）と3Dシーン
- `src/lib/data.ts` — 職務経歴書・履歴書から整理したプロフィール／経歴／実績データ（内容を更新する場合はここを編集）

## 内容の更新

プロフィール文、スキル、経歴、実績、Web制作実績のリンクは全て `src/lib/data.ts` に集約されています。テキストや実績を追加・修正したい場合はこのファイルのみ編集すれば反映されます。
# YukioMori-portfoilio
