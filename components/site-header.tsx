'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { site } from '@/content/site'

const NAV = [
  { href: '/projects', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className='sticky top-0 z-20 border-b border-rule bg-background/85 backdrop-blur'>
      <div className='mx-auto flex h-14 max-w-site items-center justify-between px-6 md:px-12'>
        <Link href='/' className='meta font-semibold text-foreground hover:text-accent'>
          {site.domain}
        </Link>
        <nav className='flex items-center gap-5 md:gap-8'>
          {NAV.map((item) => {
            const active = !item.href.includes('#') && pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`meta transition-colors hover:text-accent ${
                  active ? 'text-accent' : 'text-foreground'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
