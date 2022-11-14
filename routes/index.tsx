import { Head } from '$fresh/runtime.ts'
import Counter from '../islands/Counter.tsx'
import { Handlers, PageProps } from '$fresh/server.ts'
import Post from '../components/Post.tsx'
import type { IPost } from '../components/Post.tsx'
import Search from '../components/Search.tsx'

type Data = {
	posts: IPost[] | null
	q?: string
}

export const handler: Handlers<Data> = {
	async GET(req, ctx) {
		// const { username } = ctx.params
		const url = new URL(req.url)
		const q = url.searchParams.get('q') || ''
		const resp = await fetch(
			`https://jsonplaceholder.typicode.com/posts${q ? `?q=${q}` : ''}`
		)
		if (resp.status === 404) {
			return ctx.render({ posts: null, q })
		}
		const posts: IPost[] = await resp.json()
		return ctx.render({ posts: posts, q })
	},
}

export default function Page({ data }: PageProps<Data>) {
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
				<Search q={data.q} />
				<h2 class='mt-6 text-2xl font-bold'>Posts</h2>
				<ul class='mt-4'>
					{data?.posts?.map((post) => (
						<Post key={post.id} {...post} />
					))}
				</ul>
				<span>
					{data?.posts?.length === 0 ? 'No posts found' : data.posts?.length}
				</span>
			</div>
		</>
	)
}
