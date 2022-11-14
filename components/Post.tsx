export interface IPost {
	id: number
	title: string
	body: string
	userId: number
}

export default function Post({ id, title, body }: IPost) {
	return (
		<li class='mt-2' key={id}>
			<h3 class='text-lg font-medium'>{title}</h3>
			<pre className='mt-2 '>
				{body.slice(0, 120)}
				{body.length > 120 ? '...' : ''}
			</pre>
			<span class='font-bold text-blue-700'>
				{body.length > 120 ? <a href={`/posts/${id}`}>Read more</a> : ''}
			</span>
		</li>
	)
}
