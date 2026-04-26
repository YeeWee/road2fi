import GenForm from './GenForm'

export default function GenPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Blog Generator</h1>
      <p className="mb-8 text-gray-600">
        Enter a YouTube video URL or article link to generate a blog post.
      </p>
      <GenForm />
    </div>
  )
}
