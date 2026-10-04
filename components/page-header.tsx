export function PageHeader({
  title,
  meta,
  children,
}: {
  title: string
  meta?: string
  children?: React.ReactNode
}) {
  return (
    <header className='pb-12 pt-16 md:pb-20 md:pt-28'>
      {meta && <p className='meta mb-6 text-muted'>{meta}</p>}
      <h1 className='text-display font-bold'>
        {title}
        <span className='text-accent'>■</span>
      </h1>
      {children && <div className='mt-8 max-w-2xl text-lg text-muted'>{children}</div>}
    </header>
  )
}
