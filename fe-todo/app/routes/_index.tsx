import type { MetaFunction } from "react-router"
import { useFetcher, useLoaderData } from "react-router"
import { api, type Todo } from "@/lib/api"

export const meta: MetaFunction = () => [
	{ title: "Tasks" },
	{ name: "description", content: "Todo アプリ" },
]

export async function clientLoader() {
	try {
		const todos = await api.todos.list()
		return { todos, error: null }
	} catch {
		return { todos: [] as Todo[], error: "APIに接続できませんでした" }
	}
}

clientLoader.hydrate = true as const

export async function clientAction({ request }: { request: Request }) {
	const form = await request.formData()
	const intent = form.get("intent") as string

	try {
		switch (intent) {
			case "create": {
				const title = (form.get("title") as string).trim()
				if (!title) return { error: "タイトルを入力してください" }
				await api.todos.create(title)
				break
			}
			case "toggle": {
				const id = form.get("id") as string
				const completed = form.get("completed") === "true"
				await api.todos.update(id, { completed: !completed })
				break
			}
			case "delete": {
				await api.todos.delete(form.get("id") as string)
				break
			}
		}
	} catch {
		return { error: "操作に失敗しました" }
	}

	return null
}

export default function Index() {
	const { todos, error } = useLoaderData<typeof clientLoader>()
	const createFetcher = useFetcher()

	const pendingTitle =
		createFetcher.formData?.get("intent") === "create"
			? (createFetcher.formData.get("title") as string)
			: null

	const active = todos.filter((t) => !t.completed)
	const done = todos.filter((t) => t.completed)

	return (
		<main className="todo-root">
			<header className="todo-header">
				<div className="todo-header-top">
					<h1 className="todo-title">Tasks</h1>
					{active.length > 0 && (
						<span className="todo-badge">{active.length}</span>
					)}
				</div>
				<div className="todo-rule" />
			</header>

			{error && <p className="todo-error">{error}</p>}

			<createFetcher.Form
				method="post"
				className="todo-create"
				onSubmit={(e) => {
					const input = e.currentTarget.elements.namedItem(
						"title",
					) as HTMLInputElement
					setTimeout(() => {
						input.value = ""
					}, 0)
				}}
			>
				<input type="hidden" name="intent" value="create" />
				<input
					name="title"
					className="todo-input"
					placeholder="新しいタスクを追加..."
					autoComplete="off"
					required
				/>
				<button
					type="submit"
					className="todo-submit"
					disabled={createFetcher.state !== "idle"}
					aria-label="追加"
				>
					+
				</button>
			</createFetcher.Form>

			<section className="todo-section">
				<ul className="todo-list">
					{pendingTitle && (
						<li className="todo-item todo-item--pending">
							<span className="todo-num">--</span>
							<span className="todo-check" />
							<span className="todo-text">{pendingTitle}</span>
						</li>
					)}
					{active.map((todo, i) => (
						<TodoItem key={todo.id} todo={todo} index={i + 1} />
					))}
					{active.length === 0 && !pendingTitle && (
						<li className="todo-empty">タスクはありません</li>
					)}
				</ul>
			</section>

			{done.length > 0 && (
				<section className="todo-section todo-section--done">
					<p className="todo-section-label">完了済み — {done.length}</p>
					<ul className="todo-list">
						{done.map((todo, i) => (
							<TodoItem key={todo.id} todo={todo} index={i + 1} />
						))}
					</ul>
				</section>
			)}
		</main>
	)
}

function TodoItem({ todo, index }: { todo: Todo; index: number }) {
	const toggleFetcher = useFetcher()
	const deleteFetcher = useFetcher()

	const isDeleting = deleteFetcher.state !== "idle"
	const isToggling = toggleFetcher.state !== "idle"
	const optimisticDone = isToggling ? !todo.completed : todo.completed

	if (isDeleting) return null

	return (
		<li className={`todo-item${optimisticDone ? " todo-item--done" : ""}`}>
			<span className="todo-num">{String(index).padStart(2, "0")}</span>

			<toggleFetcher.Form method="post">
				<input type="hidden" name="intent" value="toggle" />
				<input type="hidden" name="id" value={todo.id} />
				<input type="hidden" name="completed" value={String(todo.completed)} />
				<button
					type="submit"
					className={`todo-check${optimisticDone ? " todo-check--on" : ""}`}
					aria-label={optimisticDone ? "未完了に戻す" : "完了にする"}
				/>
			</toggleFetcher.Form>

			<span className="todo-text">{todo.title}</span>

			<deleteFetcher.Form method="post">
				<input type="hidden" name="intent" value="delete" />
				<input type="hidden" name="id" value={todo.id} />
				<button type="submit" className="todo-del" aria-label="削除">
					×
				</button>
			</deleteFetcher.Form>
		</li>
	)
}
