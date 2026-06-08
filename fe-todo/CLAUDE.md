# todo-frontend

## プロジェクト概要

React Router v7 + React 19 + TypeScript + Tailwind CSS v4 で構築された Todo フロントエンドアプリ。

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | React Router v7 (旧 Remix) |
| UI ライブラリ | React 19 |
| 言語 | TypeScript (strict モード) |
| スタイリング | Tailwind CSS v4 |
| Linter / Formatter | Biome |
| パッケージマネージャ | pnpm |
| ビルドツール | Vite |

## ディレクトリ構成

```
app/
  routes/       # ページルート (React Router v7 FS routes)
  welcome/      # Welcome コンポーネント
  lib/          # API クライアント等 (api.ts)
  root.tsx      # ルートレイアウト
  app.css       # グローバルスタイル
```

`app/lib/api.ts` がバックエンド (`todo-backend`) の `/todo` API と通信する薄いクライアント。エンドポイント仕様は [../CLAUDE.md](../CLAUDE.md) と [../todo-backend/CLAUDE.md](../todo-backend/CLAUDE.md) を参照（バックエンド側に実装済み）。

## よく使うコマンド

```bash
pnpm dev          # 開発サーバー起動
pnpm build        # 本番ビルド
pnpm typecheck    # 型チェック
pnpm format       # Biome でフォーマット
```

## コーディング規約

- インデントはタブ
- クォートはダブルクォート
- セミコロンなし (Biome 設定に準拠)
- import は自動整理 (Biome assist)
- `@/*` エイリアスで `./app/*` を参照

## ルート作成パターン

```tsx
// app/routes/example.tsx
export default function Example() {
  return <div>...</div>
}
```

ルートを追加したら `app/routes.ts` への登録も忘れずに。

## 注意事項

- `.env` ファイルは編集しない (空ファイル、本番値は別途管理)
- `pnpm-lock.yaml` は直接編集しない
- Biome の設定 (`biome.json`) は原則変更しない
