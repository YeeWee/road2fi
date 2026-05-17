'use server'
import { isValidUrl, detectUrlType } from '../../lib/url-utils'
import { scrapeContent } from '../../lib/scraper'
import { generateBlogPost } from '../../lib/generator'
import { savePost } from '../../lib/posts'
import { downloadImage } from '../../lib/image-utils'
import { parseMarkdownFile } from '../../lib/markdown-parser'
import { revalidatePath } from 'next/cache'

interface GenerateResult {
  success: boolean
  post?: {
    title: string
    content: string
    excerpt: string
    thumbnail: string
    slug: string
  }
  error?: string
}

export async function generatePost(url: string): Promise<GenerateResult> {
  try {
    if (!url || typeof url !== 'string') {
      return { success: false, error: 'URL is required' }
    }
    if (!isValidUrl(url)) {
      return { success: false, error: 'Invalid or blocked URL. Use HTTPS URLs only. Localhost and private IPs are not allowed.' }
    }

    const urlType = detectUrlType(url)
    if (urlType === 'invalid') {
      return { success: false, error: 'Unsupported URL format. Use YouTube or article URLs.' }
    }

    const scraped = await scrapeContent(url)

    const generated = await generateBlogPost(scraped.content, scraped.title)

    const slug = generated.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-')
      .slice(0, 80)

    const localThumbnail = await downloadImage(scraped.thumbnail, slug)

    return {
      success: true,
      post: {
        title: generated.title,
        content: generated.content,
        excerpt: generated.excerpt,
        thumbnail: localThumbnail || scraped.thumbnail,
        slug,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

export async function savePostAction(post: {
  slug: string
  title: string
  content: string
  excerpt: string
  thumbnail: string
}): Promise<{ success: boolean; path?: string; error?: string }> {
  try {
    const date = new Date().toISOString().split('T')[0]
    const result = await savePost({
      slug: post.slug,
      title: post.title,
      date,
      excerpt: post.excerpt,
      thumbnail: post.thumbnail,
      content: post.content,
    })
    revalidatePath('/blog')
    return { success: true, path: result.path }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save post',
    }
  }
}

const VALID_FILE_TYPES = ['text/markdown', 'text/plain', 'text/x-markdown']
const VALID_EXTENSIONS = ['.md', '.markdown', '.txt']
const MAX_FILE_SIZE = 1024 * 1024 // 1MB

export async function generatePostFromFile(
  formData: FormData,
): Promise<GenerateResult> {
  try {
    const file = formData.get('file') as File | null
    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf('.'))
    if (!VALID_FILE_TYPES.includes(file.type) && !VALID_EXTENSIONS.includes(ext)) {
      return { success: false, error: 'Invalid file type. Use .md, .markdown, or .txt files.' }
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: 'File size must be less than 1MB' }
    }

    const rawContent = await file.text()
    if (!rawContent.trim()) {
      return { success: false, error: 'File appears to be empty' }
    }

    const { title, content: sourceContent } = parseMarkdownFile(rawContent, file.name)

    // Truncate content to ~8000 chars like URL scraper
    const truncatedContent = sourceContent.slice(0, 8000)

    const generated = await generateBlogPost(truncatedContent, title)

    const slug = generated.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-')
      .slice(0, 80)

    return {
      success: true,
      post: {
        title: generated.title,
        content: generated.content,
        excerpt: generated.excerpt,
        thumbnail: '',
        slug,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}
