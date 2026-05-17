'use client'
import { useState, useRef } from 'react'
import { generatePost, generatePostFromFile, savePostAction } from './actions'

interface GeneratedPost {
  title: string
  content: string
  excerpt: string
  thumbnail: string
  slug: string
}

const VALID_EXTENSIONS = ['.md', '.markdown', '.txt']
const MAX_FILE_SIZE = 1024 * 1024 // 1MB

function validateFile(file: File): string | null {
  const ext = file.name.toLowerCase().slice(file.name.lastIndexOf('.'))
  const validTypes = ['text/markdown', 'text/plain', 'text/x-markdown']

  if (!validTypes.includes(file.type) && !VALID_EXTENSIONS.includes(ext)) {
    return 'Please upload a Markdown (.md) or text (.txt) file'
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be less than 1MB'
  }

  return null
}

export default function GenForm() {
  const [inputMode, setInputMode] = useState<'url' | 'file'>('url')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<GeneratedPost | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validationError = validateFile(selectedFile)
      if (validationError) {
        setError(validationError)
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      const validationError = validateFile(droppedFile)
      if (validationError) {
        setError(validationError)
        return
      }
      setFile(droppedFile)
      setError(null)
    }
  }

  function clearFile() {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (inputMode === 'url') {
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
    } else {
      if (!file) {
        setError('Please select a file to upload.')
        return
      }

      setLoading(true)
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await generatePostFromFile(formData)
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
      clearFile()
    } else {
      setError(saveResult.error || 'Failed to save post')
    }
  }

  function handleDiscard() {
    setResult(null)
    setUrl('')
    clearFile()
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
      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setInputMode('url')}
          className={`px-4 py-2 text-sm font-medium ${
            inputMode === 'url'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          From URL
        </button>
        <button
          type="button"
          onClick={() => setInputMode('file')}
          className={`px-4 py-2 text-sm font-medium ${
            inputMode === 'file'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          From File
        </button>
      </div>

      {/* URL Input */}
      {inputMode === 'url' && (
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
      )}

      {/* File Upload */}
      {inputMode === 'file' && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            file ? 'border-green-300 bg-green-50' : 'border-gray-300'
          } ${error ? 'border-red-300' : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">{file.name}</span>
              <button
                type="button"
                onClick={clearFile}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600">Drag and drop a Markdown file here, or</p>
              <label className="cursor-pointer text-blue-600 hover:text-blue-700">
                browse to upload
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".md,.markdown,.txt"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-sm text-gray-400 mt-1">.md, .markdown, or .txt (max 1MB)</p>
            </>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || (inputMode === 'file' && !file)}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {loading && <p className="text-gray-500">Generating...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}