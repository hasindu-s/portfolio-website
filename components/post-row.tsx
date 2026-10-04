import Link from 'next/link'
import { type Post, formatDate, postHref } from '@/lib/til'

export function PostRow({ post, showExcerpt = false }: { post: Post; showExcerpt?: boolean }) {
  return (
    <li className='border-t border-rule first:border-t-0'>
      <Link href={postHref(post)} className='group block py-5'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4'>
          <h3 className='text-lg font-medium tracking-tight md:text-xl'>
            <span className='link'>{post.title}</span>
          </h3>
          <span
            aria-hidden
            className='hidden flex-1 translate-y-[-0.3em] border-b border-dotted border-rule sm:block'
          />
          <p className='meta shrink-0 text-muted'>
            {post.categoryLabel} · {formatDate(post.date)}
          </p>
        </div>
        {showExcerpt && post.excerpt && (
          <p className='mt-2 max-w-2xl text-muted'>{post.excerpt}</p>
        )}
      </Link>
    </li>
  )
}
