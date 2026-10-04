const OWNER = 'hasindu-s'
const REPO = 'til'
const BRANCH = 'main'
export const REVALIDATE_SECONDS = 3600

const CATEGORY_LABELS: Record<string, string> = {
  azure: 'Azure',
  gcp: 'Google Cloud',
  aws: 'AWS',
  se: 'Software Engineering',
  python: 'Python',
  javascript: 'JavaScript',
  devops: 'Tools & DevOps',
  frameworks: 'Frameworks',
}

export type Post = {
  category: string
  categoryLabel: string
  slug: string
  title: string
  /** ISO date (YYYY-MM-DD) or null when the entry has no Date line */
  date: string | null
  excerpt: string
  readingMinutes: number
  /** Markdown body with the title, date line and first rule removed */
  body: string
  sourceUrl: string
}

export function categoryLabel(category: string): string {
  return (
    CATEGORY_LABELS[category] ??
    category.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  )
}

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

async function listEntryPaths(): Promise<string[]> {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`,
    { headers: githubHeaders(), next: { revalidate: REVALIDATE_SECONDS } },
  )
  if (!res.ok) throw new Error(`GitHub tree request failed: ${res.status}`)
  const data = (await res.json()) as { tree: { path: string; type: string }[] }
  // Only <topic>/<slug>.md — skips README.md / CLAUDE.md at the root
  return data.tree
    .filter((n) => n.type === 'blob' && /^[a-z0-9-]+\/[a-z0-9-]+\.md$/i.test(n.path))
    .map((n) => n.path)
}

async function fetchEntry(path: string): Promise<string> {
  const res = await fetch(
    `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  )
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`)
  return res.text()
}

function toPlainText(markdown: string): string {
  return markdown
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function parseEntry(path: string, raw: string): Post {
  const [category, file] = path.split('/')
  const slug = file.replace(/\.md$/, '')
  const text = raw.replace(/\r\n/g, '\n')

  const title = text.match(/^#\s+(.+)$/m)?.[1].trim() ?? slug.replace(/-/g, ' ')
  const date = text.match(/\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})/)?.[1] ?? null

  // Strip the header block: H1, Date line, and the first horizontal rule.
  let body = text.replace(/^#\s+.+\n?/m, '')
  body = body.replace(/^\*\*Date:\*\*.*\n?/m, '')
  body = body.replace(/^\s*-{3,}\s*\n/, '').trim()

  // Excerpt: first plain paragraph (not a heading, list, quote, table or code)
  const paragraphs = body.split(/\n{2,}/)
  const firstParagraph =
    paragraphs.find((p) => !/^\s*(#|-|\*|\d+\.|>|\||```|---)/.test(p)) ?? ''
  let excerpt = toPlainText(firstParagraph)
  if (excerpt.length > 180) excerpt = excerpt.slice(0, 177).trimEnd() + '…'

  const words = toPlainText(body.replace(/```[\s\S]*?```/g, '')).split(' ').length

  return {
    category,
    categoryLabel: categoryLabel(category),
    slug,
    title,
    date,
    excerpt,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    body,
    sourceUrl: `https://github.com/${OWNER}/${REPO}/blob/${BRANCH}/${path}`,
  }
}

/** All TIL entries, newest first. Returns [] if GitHub is unreachable. */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const paths = await listEntryPaths()
    const posts = await Promise.all(
      paths.map(async (p) => parseEntry(p, await fetchEntry(p))),
    )
    return posts.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  } catch (error) {
    console.error('[til] Could not load posts:', error)
    return []
  }
}

export async function getPost(category: string, slug: string) {
  const posts = await getAllPosts()
  const index = posts.findIndex((p) => p.category === category && p.slug === slug)
  if (index === -1) return null
  return {
    post: posts[index],
    // posts are newest first, so "newer" is the previous index
    newer: posts[index - 1] ?? null,
    older: posts[index + 1] ?? null,
  }
}

export function postHref(post: Pick<Post, 'category' | 'slug'>) {
  return `/blog/${post.category}/${post.slug}`
}

export function formatDate(date: string | null, style: 'short' | 'long' = 'short') {
  if (!date) return '—'
  const [y, m, d] = date.split('-')
  if (style === 'short') return `${d}.${m}.${y.slice(2)}`
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
