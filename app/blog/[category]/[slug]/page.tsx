import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { renderMarkdown } from '@/lib/markdown'
import {
  formatDate,
  getAllPosts,
  getPost,
  postHref,
  REVALIDATE_SECONDS,
  type Post,
} from '@/lib/til'

export const revalidate = REVALIDATE_SECONDS

type Params = { params: { category: string; slug: string } }

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ category: p.category, slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const result = await getPost(params.category, params.slug)
  if (!result) return {}
  const { post } = result
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date ?? undefined,
      url: postHref(post),
    },
  }
}

export default async function PostPage({ params }: Params) {
  const result = await getPost(params.category, params.slug)
  if (!result) notFound()
  const { post, newer, older } = result
  const html = await renderMarkdown(post.body)

  return (
    <article className='pb-16 md:pb-24'>
      <header className='grid gap-6 pb-12 pt-16 md:grid-cols-12 md:gap-8 md:pb-16 md:pt-24'>
        <nav className='meta text-muted md:col-span-2 md:pt-3' aria-label='Breadcrumb'>
          <Link href='/blog' className='hover:text-accent'>
            Blog
          </Link>{' '}
          /{' '}
          <Link href={`/blog?c=${post.category}`} className='hover:text-accent'>
            {post.categoryLabel}
          </Link>
        </nav>
        <div className='md:col-span-10'>
          <h1 className='text-title font-bold md:text-[clamp(2.5rem,5vw,4rem)]'>
            {post.title}
          </h1>
          <p className='meta mt-6 text-muted'>
            {post.date && <time dateTime={post.date}>{formatDate(post.date, 'long')}</time>}
            {post.date && ' · '}
            {post.readingMinutes} min read
          </p>
        </div>
      </header>

      <div className='grid border-t border-rule pt-10 md:grid-cols-12 md:gap-8 md:pt-14'>
        <div
          className='prose prose-neutral max-w-none dark:prose-invert md:col-span-8 md:col-start-3 md:prose-lg
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-a:text-accent prose-a:underline-offset-4
            prose-code:font-mono prose-pre:font-mono prose-hr:border-rule'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <footer className='mt-16 grid gap-8 border-t border-rule pt-8 md:grid-cols-12'>
        <a
          href={post.sourceUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='group meta text-muted hover:text-foreground md:col-span-10 md:col-start-3'
        >
          <span className='link'>View source on GitHub</span>{' '}
          <span className='arrow arrow-ne text-accent'>↗</span>
        </a>
        <div className='grid gap-4 sm:grid-cols-2 md:col-span-10 md:col-start-3'>
          <AdjacentLink post={older} label='← Older' />
          <AdjacentLink post={newer} label='Newer →' alignRight />
        </div>
      </footer>
    </article>
  )
}

function AdjacentLink({
  post,
  label,
  alignRight = false,
}: {
  post: Post | null
  label: string
  alignRight?: boolean
}) {
  if (!post) return <span />
  return (
    <Link
      href={postHref(post)}
      className={`group block border border-rule p-5 transition-colors hover:border-accent ${
        alignRight ? 'sm:text-right' : ''
      }`}
    >
      <span className='meta mb-2 block text-muted'>{label}</span>
      <span className='font-medium'>{post.title}</span>
    </Link>
  )
}
