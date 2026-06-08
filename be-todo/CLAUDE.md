# be-todo

## プロジェクト概要

NestJS v11 + TypeScript + TypeORM + PostgreSQL で構築された Todo バックエンド API。

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | NestJS v11 |
| 言語 | TypeScript |
| ORM | TypeORM |
| データベース | PostgreSQL (`pg` ドライバ) |
| バリデーション | class-validator / class-transformer |
| テスト | Jest (`*.spec.ts`)、e2e は `test/*.e2e-spec.ts` (Supertest) |
| Linter / Formatter | Biome |
| パッケージマネージャ | pnpm |

## ディレクトリ構成

```
src/
  todo/             # Todo 機能モジュール
    todo.module.ts
    todo.controller.ts
    todo.service.ts
    dto/            # CreateTodoDto / UpdateTodoDto
    entities/       # Todo エンティティ (TypeORM)
  app.module.ts     # ルートモジュール (TypeORM 接続設定)
  app.controller.ts
  app.service.ts
  main.ts           # エントリーポイント
test/               # e2e テスト (*.e2e-spec.ts)
```

## 実装済み API

`TodoModule` に Todo CRUD API が実装済み。フロントエンドの `fe-todo/app/lib/api.ts` が前提とするエンドポイントと一致している。

```
GET    /todo
GET    /todo/:id
POST   /todo        { title }
PATCH  /todo/:id    { title?, completed? }
DELETE /todo/:id
```

`Todo` エンティティ: `{ id, title, completed, created_at }`

## よく使うコマンド

```bash
pnpm start:dev    # 開発サーバー起動 (watch モード)
pnpm build        # ビルド
pnpm lint         # Biome lint (自動修正あり)
pnpm format       # Biome でフォーマット
pnpm test         # ユニットテスト
pnpm test:e2e     # e2e テスト
```

`typecheck` スクリプトは存在しない（`pnpm build` や `npx tsc --noEmit` で型チェック可能）。

## コーディング規約

- インデントはスペース2つ（frontend はタブなので注意）
- クォートはダブルクォート、セミコロンは `asNeeded`
- `@/*` エイリアスで `./src/*` を参照
- decorator ベースの DI パターン (`@Controller`, `@Injectable`, `@InjectRepository` など) に従う
- DTO は `class-validator` / `class-transformer` を利用する想定（クラス名は `XxxDto`）

## データベース

- TypeORM 経由で PostgreSQL に接続（ルートの `docker-compose.yml` の Postgres サービスを利用）
- `app.module.ts` の接続設定は `process.env.DB_HOST` などの環境変数を読み、未設定時はローカル開発用の値（`localhost` / `root` / `password` / `todo`）にフォールバックする。`.env` ファイルや `ConfigModule`（`@nestjs/config`）は使わず、`docker-compose.yml` の `environment:` などで直接環境変数を渡す前提
- `synchronize: true` でエンティティからスキーマを自動同期している（本番運用時は要見直し）

## 注意事項

- `.env` ファイルは編集しない（本番値は別途管理）
- `pnpm-lock.yaml` は直接編集しない
- Biome の設定 (`biome.json`) は原則変更しない
  - 既知の制約: `unsafeParameterDecoratorsEnabled` が未設定のため、`@Body()` / `@Param()` などのパラメータデコレータを含むファイルは `biome format` / `biome lint` がパースエラーになる（プロジェクト自身の `pnpm format` でも同様に発生する、Biome 設定起因の既存の問題）
