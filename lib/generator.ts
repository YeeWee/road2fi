import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
})

interface GeneratedPost {
  title: string
  content: string
  excerpt: string
}

export async function generateBlogPost(
  sourceContent: string,
  sourceTitle: string,
): Promise<GeneratedPost> {
  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are the founder of Road to Fi, a personal investment firm helping ordinary people achieve Financial Independence. Write a blog post in first-person voice ("I", "we") based on the provided source content.

The post should:
- Be structured with clear headings using ## and ###
- Use a professional, approachable tone
- Translate the source content into actionable investment insights
- Include a compelling introduction and conclusion
- Be written in the style of value investing education content
- Return your response as JSON with three fields: "title" (blog post title), "content" (the full blog post body in Markdown), and "excerpt" (a 1-2 sentence summary)`,
      },
      {
        role: 'user',
        content: `Source title: ${sourceTitle}

Source content:
${sourceContent}

Write a complete blog post based on this source material. Return as JSON with title, content, and excerpt fields.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
    response_format: { type: 'json_object' },
  })

  try {
    const parsed = JSON.parse(completion.choices[0].message.content!)
    return { title: parsed.title, content: parsed.content, excerpt: parsed.excerpt }
  } catch {
    const raw = completion.choices[0].message.content || ''
    return {
      title: sourceTitle,
      content: raw,
      excerpt: raw.slice(0, 150) + (raw.length > 150 ? '...' : ''),
    }
  }
}
