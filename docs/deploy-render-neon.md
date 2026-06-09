# Render + Neon デプロイ手順書

構成: Neon (PostgreSQL) + Render Web Service (バックエンド) + Render Static Site (フロントエンド)

前提: CORS 環境変数対応のコード変更済み & GitHub (Joex13/todo) に push 済み

---

## ステップ 2: Neon でデータベースを作成する

### 2-1. Neon アカウント作成

1. https://neon.tech にアクセス
2. 「Sign Up」→ GitHub アカウントでサインイン

### 2-2. プロジェクト作成

1. ダッシュボードで「Create a project」をクリック
2. 設定:
   - Project name: `todo`（任意）
   - Postgres version: 最新（デフォルトのまま）
   - Region: `AWS / Asia Pacific (Singapore)` または近い地域
3. 「Create project」をクリック

### 2-3. 接続情報をメモする

プロジェクト作成直後に接続情報が表示される。
「Connection string」タブで以下の形式の文字列が確認できる。

  postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require

この画面から以下の値をコピーしておく（後で Render に設定する）。

  DB_HOST     = xxxxxx.us-east-2.aws.neon.tech  （@より後、/より前）
  DB_PORT     = 5432
  DB_USERNAME = USER部分
  DB_PASSWORD = PASSWORD部分
  DB_NAME     = DBNAME部分（多くの場合 "neondb"）

※ 後でも「Dashboard > プロジェクト > Connection Details」から確認できる。

### 2-4. テーブルを作成する

1. 左メニューの「SQL Editor」をクリック
2. 以下の SQL を貼り付けて「Run」（または Ctrl+Enter）

```sql
CREATE TABLE IF NOT EXISTS todo (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR NOT NULL,
  completed  BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

3. 「Success」と表示されれば完了

---

## ステップ 3: Render でバックエンドをデプロイする

### 3-1. Render アカウント作成

1. https://render.com にアクセス
2. 「Get Started for Free」→ GitHub でサインイン
3. 「Authorize Render」をクリック

### 3-2. Web Service を作成する

1. ダッシュボード右上の「+ New」→「Web Service」
2. 「Build and deploy from a Git repository」を選択
3. GitHub リポジトリ一覧から `Joex13/todo` を選択
   - 表示されない場合は「Configure account」でリポジトリへのアクセス権を付与する

### 3-3. Web Service の設定

| 項目 | 値 |
|------|-----|
| Name | `todo-backend`（任意） |
| Region | `Oregon (US West)` または好みの地域 |
| Branch | `master` |
| Root Directory | `be-todo` |
| Runtime | `Docker` |
| Instance Type | `Free` |

Dockerfile は `be-todo/Dockerfile` が自動検出される。

### 3-4. 環境変数を設定する

「Environment Variables」セクションで以下を追加する。

| Key | Value |
|-----|-------|
| DB_HOST | ステップ 2-3 でメモした値 |
| DB_PORT | `5432` |
| DB_USERNAME | ステップ 2-3 でメモした値 |
| DB_PASSWORD | ステップ 2-3 でメモした値 |
| DB_NAME | ステップ 2-3 でメモした値 |
| DB_SSL | `true` |
| PORT | `3000` |
| CORS_ORIGIN | ひとまず空欄のまま（ステップ 5 で追加） |

### 3-5. デプロイを開始する

「Create Web Service」をクリック。

ログ画面に切り替わり、Docker ビルド → コンテナ起動の様子がリアルタイムで流れる。
最終的に「Your service is live 🎉」と表示されれば成功。

デプロイ完了後、サービス名の下に URL が表示される（例）。
  https://todo-backend-xxxx.onrender.com

この URL をメモする。

### 3-6. 動作確認（バックエンド単体）

ブラウザまたは curl で以下にアクセスし、空配列 `[]` が返ればOK。

  https://todo-backend-xxxx.onrender.com/todo

※ 初回アクセスはコールドスタートのため 30 秒〜1 分かかることがある。

---

## ステップ 4: Render でフロントエンドをデプロイする

### 4-1. Static Site を作成する

1. ダッシュボード右上の「+ New」→「Static Site」
2. 同じリポジトリ `Joex13/todo` を選択

### 4-2. Static Site の設定

| 項目 | 値 |
|------|-----|
| Name | `todo-frontend`（任意） |
| Branch | `master` |
| Root Directory | `fe-todo` |
| Build Command | `pnpm install --frozen-lockfile && pnpm build` |
| Publish Directory | `build/client` |

### 4-3. 環境変数を設定する

「Environment Variables」セクションで追加する。

| Key | Value |
|-----|-------|
| VITE_API_BASE_URL | ステップ 3-5 でメモしたバックエンドの URL（末尾スラッシュなし） |

例: `https://todo-backend-xxxx.onrender.com`

### 4-4. デプロイを開始する

「Create Static Site」をクリック。

ビルドログが流れ、「Your site is live 🎉」と表示されれば成功。

フロントエンドの URL が表示される（例）。
  https://todo-frontend-xxxx.onrender.com

---

## ステップ 5: バックエンドの CORS を更新する

フロントエンドの URL が確定したので、バックエンドに設定を追加する。

1. Render ダッシュボードで `todo-backend` のサービスページを開く
2. 左メニュー「Environment」をクリック
3. `CORS_ORIGIN` の値を入力する

   例: `https://todo-frontend-xxxx.onrender.com`

4. 「Save Changes」をクリック → 自動的に再デプロイが始まる
5. 再デプロイ完了まで待つ（1〜2 分）

---

## ステップ 6: 動作確認

1. ブラウザで `https://todo-frontend-xxxx.onrender.com` を開く
2. Todo を追加・完了・削除して動作を確認する
3. ブラウザの開発者ツール → Network タブでバックエンドへのリクエストが成功（200 番台）していることを確認する

---

## トラブルシューティング

### バックエンドがスリープから復帰しない

Render の無料プランは 15 分間リクエストがないとスリープする。
最初のリクエストは 30 秒〜1 分かかることがある。待てば復帰する。

### CORS エラーが出る

ブラウザの開発者ツールで "CORS" エラーが出た場合:
- ステップ 5 の `CORS_ORIGIN` の値がフロントエンドの URL と完全一致しているか確認する
- 末尾のスラッシュが不要なので `https://xxx.onrender.com/` ではなく `https://xxx.onrender.com` にする

### DB 接続エラーが出る

Render のバックエンドログ（サービスページ → Logs）で確認する。
- `SSL` 系のエラー: `DB_SSL=true` が設定されているか確認する
- `password authentication failed`: Neon の DB_PASSWORD を再確認する
- テーブルが存在しない: ステップ 2-4 の SQL を再実行する

### フロントエンドのビルドが失敗する

Render の Static Site ログで確認する。
- `VITE_API_BASE_URL` が設定されているか確認する
- `pnpm install` が失敗している場合は Build Command を確認する
