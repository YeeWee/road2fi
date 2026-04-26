import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface PostMeta {
  title: string
  date: string
  excerpt: string
  thumbnail: string
  slug: string
}

export interface Post extends PostMeta {
  content: string
}

export async function getAllPosts(): Promise<Post[]> {
  const filenames = fs.readdirSync(postsDirectory)
  const posts = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)
      return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        thumbnail: data.thumbnail ?? "",
        content,
      }
    })
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      thumbnail: data.thumbnail ?? "",
      content,
    }
  } catch {
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const filenames = fs.readdirSync(postsDirectory)
  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => filename.replace(/\.md$/, ""))
}

export async function savePost(params: {
  slug: string
  title: string
  date: string
  excerpt: string
  thumbnail: string
  content: string
}) {
  fs.mkdirSync(postsDirectory, { recursive: true })

  const filePath = path.join(postsDirectory, `${params.slug}.md`)
  const frontmatter = {
    title: params.title,
    date: params.date,
    excerpt: params.excerpt,
    thumbnail: params.thumbnail,
  }
  const fileContent = matter.stringify(params.content, frontmatter)
  fs.writeFileSync(filePath, fileContent, 'utf8')
  return { slug: params.slug, path: filePath }
}
