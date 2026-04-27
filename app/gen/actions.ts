'use server'
import { isValidUrl, detectUrlType } from '../../lib/url-utils'
import { scrapeContent } from '../../lib/scraper'
import { generateBlogPost } from '../../lib/generator'
import { savePost } from '../../lib/posts'
import { downloadImage } from '../../lib/image-utils'
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
