#!/bin/bash
# Stop フック: セッション終了時に frontend/backend の型チェックをまとめて実行する
cd "$(dirname "$0")/../.." || exit 0

fe_out=$(cd todo-frontend && pnpm typecheck 2>&1)
fe_status=$?
be_out=$(cd todo-backend && npx tsc --noEmit -p tsconfig.json 2>&1)
be_status=$?

msg=""
if [ $fe_status -ne 0 ]; then msg="${msg}[todo-frontend] 型エラーあり\n"; fi
if [ $be_status -ne 0 ]; then msg="${msg}[todo-backend] 型エラーあり\n"; fi

if [ -z "$msg" ]; then
  echo '{"systemMessage": "型チェックOK（todo-frontend / todo-backend）"}'
else
  printf '{"systemMessage": "型チェックで問題が見つかりました:\\n%s詳細は pnpm typecheck / npx tsc --noEmit で確認してください"}' "$msg"
fi
