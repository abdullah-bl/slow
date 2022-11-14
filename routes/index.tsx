import { Head } from '$fresh/runtime.ts'
import Counter from '../islands/Counter.tsx'
import { Handlers, PageProps } from '$fresh/server.ts'

type Post = {
	id: number
	title: string
	body: string
	userId: number
}

export const handler: Handlers<Post[] | null> = {
	async GET(_, ctx) {
		// const { username } = ctx.params
		const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
		if (resp.status === 404) {
			return ctx.render(null)
		}
		const posts: Post[] = await resp.json()
		return ctx.render(posts)
	},
}

export default function Page({ data }: PageProps<Post[] | null>) {
	if (!data) {
		return <h1>User not found</h1>
	}

	return (
		<>
			<Head>
				<title>Fresh App</title>
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
				<Counter start={3} />

				<h2 class='mt-6 text-2xl font-bold'>Posts</h2>
				<ul class='mt-4'>
					{data.map((post) => (
						<li class='mt-2' key={post.id}>
							<h3 class='text-lg font-medium'>{post.title}</h3>
							<pre className='mt-2 '>
								{post.body.slice(0, 120)}
								{post.body.length > 120 ? '...' : ''}
							</pre>
							<span class='font-bold text-blue-700'>
								{post.body.length > 120 ? (
									<a href={`/posts/${post.id}`}>Read more</a>
								) : (
									''
								)}
							</span>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
