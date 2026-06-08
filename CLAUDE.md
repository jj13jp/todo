# todo

汎用的なTODOアプリ。フロントエンドとバックエンドを別ディレクトリで開発するモノレポ構成。Docker と デプロイ の練習用に作成・運用している。

## 構成

```
todo/
  fe-todo/            # フロントエンド (React Router v7)
  be-todo/            # バックエンド (NestJS)
  docker-compose.yml  # frontend / backend / postgres を連携させる
```

各ディレクトリにそれぞれ `package.json` / `pnpm-workspace.yaml` を持つが、git リポジトリはルートの1つのみ（`fe-todo` / `be-todo` 配下に独立した `.git` はない）。ルートに共通のワークスペース設定はない。

## 技術スタック

### fe-todo

| 項目 | 内容 |
|------|------|
| フレームワーク | React Router v7 (旧 Remix) |
| UI ライブラリ | React 19 |
| 言語 | TypeScript (strict モード) |
| スタイリング | Tailwind CSS v4 |
| Linter / Formatter | Biome |
| パッケージマネージャ | pnpm |
| ビルドツール | Vite |

詳細は [fe-todo/CLAUDE.md](fe-todo/CLAUDE.md) を参照。

### be-todo

| 項目 | 内容 |
|------|------|
| フレームワーク | NestJS v11 |
| 言語 | TypeScript |
| ORM / DB | TypeORM + PostgreSQL (`pg`) |
| テスト | Jest (`*.spec.ts`)、e2e は `test/*.e2e-spec.ts` |
| Linter / Formatter | Biome |
| パッケージマネージャ | pnpm |

`AppController` / `AppService` に加えて `TodoModule`（コントローラー・サービス・DTO・エンティティ）が実装済みで、下記の Todo CRUD API が動作する。詳細は [be-todo/CLAUDE.md](be-todo/CLAUDE.md) を参照。

## API 連携の前提

`fe-todo/app/lib/api.ts` がフロントエンドの API クライアントで、バックエンドに以下のエンドポイントが存在する前提で書かれている（`be-todo` 側に実装済み）。

```
GET    /todo
GET    /todo/:id
POST   /todo         { title }
PATCH  /todo/:id     { title?, completed? }
DELETE /todo/:id
```

`Todo` 型は `{ id, title, completed, created_at }`。バックエンドの `Todo` エンティティと一致している。スキーマを変更する場合はエンティティ / DTO / `api.ts` を合わせて更新する。

## よく使うコマンド

各ディレクトリ内で実行する。

```bash
# fe-todo
pnpm dev          # 開発サーバー起動 (http://localhost:5173)
pnpm build        # 本番ビルド
pnpm typecheck    # 型チェック
pnpm format       # Biome でフォーマット

# be-todo
pnpm start:dev    # 開発サーバー起動 (watch モード)
pnpm build        # ビルド
pnpm lint         # Biome で lint
pnpm format       # Biome でフォーマット
pnpm test         # ユニットテスト
pnpm test:e2e     # e2e テスト
```

## コーディング規約

- Linter / Formatter は両ディレクトリとも Biome を使用
- `@/*` エイリアスでソースルートを参照（frontend: `./app/*`、backend: `./src/*`）
- Biome の設定 (`biome.json`) は原則変更しない
- `pnpm-lock.yaml` は直接編集しない

## 注意事項

- 各ディレクトリ固有の詳細・規約は、それぞれの `CLAUDE.md` / `README.md` を優先する
- `.env` ファイルは編集しない（本番値は別途管理）
