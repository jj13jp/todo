import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router"

import type { Route } from "./+types/root"
import "@/app.css"

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=JetBrains+Mono:wght@300;400;500&display=swap",
	},
]

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}

export function HydrateFallback() {
	return (
		<main className="todo-root">
			<header className="todo-header">
				<div className="todo-header-top">
					<h1 className="todo-title">Tasks</h1>
				</div>
				<div className="todo-rule" />
			</header>
			<p className="todo-loading">読み込み中...</p>
		</main>
	)
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!"
	let details = "An unexpected error occurred."
	let stack: string | undefined

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error"
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message
		stack = error.stack
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	)
}
