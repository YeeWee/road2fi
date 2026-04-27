import fs from 'fs'
import path from 'path'

const publicImages = path.join(process.cwd(), 'public/images/posts')

export async function downloadImage(imageUrl: string, slug: string): Promise<string> {
  if (!imageUrl) return ''

  try {
    const imageDir = path.join(publicImages, slug)
    fs.mkdirSync(imageDir, { recursive: true })

    const fileName = imageUrl.split('/').pop()?.split('?')[0] || 'thumbnail.jpg'
    const ext = path.extname(fileName).toLowerCase()
    const safeName = ext.match(/\.(jpg|jpeg|png|gif|webp|svg|webm)/) ? fileName : 'thumbnail.jpg'
    const filePath = path.join(imageDir, safeName)

    const response = await fetch(imageUrl)
    if (!response.ok) return ''

    const buffer = Buffer.from(await response.arrayBuffer())
    fs.writeFileSync(filePath, buffer)

    return `/images/posts/${slug}/${safeName}`
  } catch {
    return ''
  }
}
