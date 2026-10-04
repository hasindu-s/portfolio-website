import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className='mx-auto max-w-site px-6 md:px-12'>
      <div className='flex flex-col gap-4 border-t border-rule py-8 sm:flex-row sm:items-center sm:justify-between'>
        <p className='meta text-muted'>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className='flex gap-5'>
          {site.socials.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={s.label}
                className='text-lg text-muted transition-colors hover:text-accent'
              >
                <i className={s.icon} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
