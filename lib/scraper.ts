import * as cheerio from 'cheerio'
import { YouTubeTranscript } from 'youtube-transcript'
import { detectUrlType } from './url-utils'

interface ScrapedContent {
  title: string
  content: string
  thumbnail: string
}

async function scrapeYouTube(url: string): Promise<ScrapedContent> {
  const match = url.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (!match) {
    throw new Error('Invalid YouTube URL')
  }
  const videoId = match[1]

  let transcript = ''
  try {
    const entries = await YouTubeTranscript.fetchTranscript(videoId)
    transcript = entries.map(e => e.text).join(' ')
  } catch {
    // Transcript unavailable — fall back to oEmbed metadata only
  }

  const oembed = await fetch(
    `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
  ).then(r => r.json())

  return {
    title: oembed.title || '',
    content: transcript.slice(0, 8000),
    thumbnail: oembed.thumbnail_url || '',
  }
}

async function scrapeArticle(url: string): Promise<ScrapedContent> {
  const response = await fetch(url)
  const html = await response.text()
  const $ = cheerio.load(html)

  $('script, style, nav, header, footer, aside, iframe, noscript').remove()

  const title = $('title').text() || $('h1').first().text() || 'Untitled'

  let content = $('article, main, .content, .post, #content').text()
  if (!content) {
    content = $('body').text()
  }

  const thumbnail =
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    $('img').first().attr('src') ||
    ''

  return {
    title,
    content: content.trim().slice(0, 8000),
    thumbnail,
  }
}

export async function scrapeContent(url: string): Promise<ScrapedContent> {
  const type = detectUrlType(url)
  if (type === 'invalid') {
    throw new Error('Invalid URL')
  }
  if (type === 'youtube') {
    return scrapeYouTube(url)
  }
  return scrapeArticle(url)
}
