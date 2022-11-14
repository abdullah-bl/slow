import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'

type Post = {
	id: number
	title: string
	body: string
	userId: number
}

export const handler: Handlers<Post | null> = {
	async GET(_, ctx) {
		const { id } = ctx.params
		const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
		if (resp.status === 404) {
			return ctx.render(null)
		}
		const post: Post = await resp.json()
		return ctx.render(post)
	},
}

export default function Page({ data }: PageProps<Post | null>) {
	if (!data) {
		return <h1>Post not found</h1>
	}

	return (
		<>
			<Head>
				<title>{data.title}</title>
			</Head>
			<div class='p-4 mx-auto max-w-screen-md'>
				<img
					src='/logo.svg'
					class='w-32 h-32'
					alt='the fresh logo: a sliced lemon dripping with juice'
				/>
				<p class='my-6'>
					Welcome to `fresh`. Try updating this message in the
					./routes/index.tsx file, and refresh.
				</p>
				<a href='/'>Back to posts</a>
				<h2 class='mt-6 text-xl font-bold'>{data.title}</h2>
				<pre className='mt-2 '>{data.body}</pre>
			</div>
		</>
	)
}
