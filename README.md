# アプリ概要

汎用的な TODO アプリ。Docker と Nest.js と デプロイ の練習用に作成・運用している。

## 構成

- fe-todo: フロントエンドを実装するディレクトリ
- be-todo: バックエンド（Nest.js）を実装するディレクトリ

## 練習の狙い

- フロントエンド（React Router v7, SPA）・バックエンド（NestJS）・PostgreSQL を Docker Compose で連携させる
- 各サービスの Dockerfile（マルチステージビルド、本番用イメージの最適化）を理解する
- ビルド時環境変数（`VITE_API_BASE_URL` など）や CORS など、コンテナ化に伴う設定の違いを学ぶ
- 最終的に何らかのホスティングサービスへのデプロイまで通す

## よく使うコマンド

```bash
docker compose up -d --build   # 全サービスをビルドして起動
docker compose down            # 停止・コンテナ削除
```
