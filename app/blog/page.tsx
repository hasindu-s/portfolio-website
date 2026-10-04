import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { PostRow } from '@/components/post-row'
import { categoryLabel, getAllPosts, type Post } from '@/lib/til'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Short notes from my Today-I-Learned log.',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { c?: string }
}) {
  const posts = await getAllPosts()
  const categories = Array.from(new Set(posts.map((p) => p.category))).sort()
  const active = searchParams.c && categories.includes(searchParams.c) ? searchParams.c : null
  const visible = active ? posts.filter((p) => p.category === active) : posts

  const byYear = new Map<string, Post[]>()
  for (const post of visible) {
    const year = post.date?.slice(0, 4) ?? 'Undated'
    byYear.set(year, [...(byYear.get(year) ?? []), post])
  }

  return (
    <>
      <PageHeader title='Writing' meta={`${String(visible.length).padStart(2, '0')} entries`}>
        Short notes from my{' '}
        <a
          href='https://github.com/hasindu-s/til'
          target='_blank'
          rel='noopener noreferrer'
          className='text-foreground underline decoration-rule underline-offset-4 hover:decoration-accent'
        >
          Today I Learned
        </a>{' '}
        log.
      </PageHeader>

      {categories.length > 1 && (
        <nav aria-label='Filter by category' className='mb-12 flex flex-wrap gap-2'>
          <FilterChip href='/blog' active={!active}>
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c} href={`/blog?c=${c}`} active={active === c}>
              {categoryLabel(c)}
            </FilterChip>
          ))}
        </nav>
      )}

      {visible.length === 0 ? (
        <p className='border-t border-rule py-12 text-muted'>No posts yet — check back soon.</p>
      ) : (
        Array.from(byYear.entries()).map(([year, yearPosts]) => (
          <section
            key={year}
            className='grid gap-4 border-t border-rule py-8 md:grid-cols-12 md:gap-8'
          >
            <h2 className='meta pt-5 text-muted md:col-span-2'>{year}</h2>
            <ul className='md:col-span-10'>
              {yearPosts.map((post) => (
                <PostRow key={`${post.category}/${post.slug}`} post={post} showExcerpt />
              ))}
            </ul>
          </section>
        ))
      )}
      <div className='h-16 md:h-24' />
    </>
  )
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? 'page' : undefined}
      className={`meta border px-3 py-1.5 text-[0.7rem] transition-colors ${
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-rule text-muted hover:border-accent hover:text-accent'
      }`}
    >
      {children}
    </Link>
  )
}
