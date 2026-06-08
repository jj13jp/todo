const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

export interface Todo {
	id: string
	title: string
	completed: boolean
	created_at: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${BASE_URL}${path}`, {
		headers: { "Content-Type": "application/json", ...init?.headers },
		...init,
	})
	if (!res.ok) throw new Error(`API error: ${res.status}`)
	if (res.status === 204) return undefined as T
	return res.json() as Promise<T>
}

export const api = {
	todos: {
		list: () => request<Todo[]>("/todo"),
		create: (title: string) =>
			request<Todo>("/todo", {
				method: "POST",
				body: JSON.stringify({ title }),
			}),
		update: (id: string, patch: Partial<Pick<Todo, "title" | "completed">>) =>
			request<Todo>(`/todo/${id}`, {
				method: "PATCH",
				body: JSON.stringify(patch),
			}),
		delete: (id: string) => request<void>(`/todo/${id}`, { method: "DELETE" }),
	},
}
