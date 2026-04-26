'use client'
import { useState } from 'react'
import { generatePost, savePostAction } from './actions'

interface GeneratedPost {
  title: string
  content: string
  excerpt: string
  thumbnail: string
  slug: string
}

export default function GenForm() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<GeneratedPost | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    try {
      new URL(url)
    } catch {
      setError('Please enter a valid URL.')
      return
    }

    setLoading(true)
    try {
      const res = await generatePost(url)
      if (res.success && res.post) {
        setResult(res.post)
      } else {
        setError(res.error ?? 'Generation failed')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!result) return
    setLoading(true)
    setError(null)
    const saveResult = await savePostAction({
      slug: result.slug,
      title: result.title,
      content: result.content,
      excerpt: result.excerpt,
      thumbnail: result.thumbnail,
    })
    setLoading(false)
    if (saveResult.success) {
      setResult(null)
      setUrl('')
    } else {
      setError(saveResult.error || 'Failed to save post')
    }
  }

  function handleDiscard() {
    setResult(null)
    setUrl('')
    setError(null)
  }

  if (result) {
    return (
      <div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">{result.title}</h2>
          <p className="mt-2 text-gray-600">{result.excerpt}</p>
          <div className="mt-4 prose prose-sm max-w-none text-gray-700">
            {result.content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Post'}
            </button>
            <button
              type="button"
              onClick={handleDiscard}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="url"
          placeholder="https://www.youtube.com/watch?v=... or https://example.com/article"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {loading && <p className="text-gray-500">Generating...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}
