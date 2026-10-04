import Link from 'next/link'

export default function NotFound() {
  return (
    <section className='py-24 md:py-40'>
      <p className='meta mb-6 text-muted'>Error 404</p>
      <h1 className='text-display font-bold'>
        Not found<span className='text-accent'>■</span>
      </h1>
      <Link href='/' className='group meta mt-10 inline-block hover:text-accent'>
        <span className='arrow'>←</span> <span className='link'>Back home</span>
      </Link>
    </section>
  )
}
