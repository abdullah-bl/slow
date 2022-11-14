export default function Search({ q }: { q?: string }) {
	return (
		<form method='get'>
			<input
				type='search'
				title='search'
				name='q'
				defaultValue={q}
				className='mt-4 p-2 border focus:border-blue-700 rounded w-full'
				placeholder='Search for post, title, body...'
			/>
		</form>
	)
}
