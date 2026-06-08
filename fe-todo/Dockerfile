#ベース
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

#依存関係
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

#ビルド
FROM base AS build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build

#最終実行（静的ファイルを nginx で配信）
FROM nginx:alpine3.23 AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build/client /usr/share/nginx/html