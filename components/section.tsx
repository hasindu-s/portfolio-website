import Link from 'next/link'

/** Numbered Swiss-grid row: number in the left two columns, content in the rest. */
export function Section({
  number,
  title,
  id,
  action,
  children,
}: {
  number: string
  title: string
  id?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section id={id} className='scroll-mt-14 border-t border-rule py-12 md:py-20'>
      <div className='grid gap-6 md:grid-cols-12 md:gap-8'>
        <p className='meta text-muted md:col-span-2 md:pt-3'>{number}</p>
        <div className='md:col-span-10'>
          <div className='mb-8 flex items-baseline justify-between gap-4 md:mb-12'>
            <h2 className='text-title font-semibold'>{title}</h2>
            {action}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}

export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className='group meta shrink-0 text-muted hover:text-foreground'>
      <span className='link'>{children}</span> <span className='arrow text-accent'>→</span>
    </Link>
  )
}
