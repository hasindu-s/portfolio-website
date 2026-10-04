'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ORDER = ['light', 'dark', 'system'] as const
const ICONS: Record<string, string> = {
  light: 'ri-sun-line',
  dark: 'ri-moon-line',
  system: 'ri-contrast-2-line',
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const current = mounted ? (theme ?? 'system') : 'system'
  const next = ORDER[(ORDER.indexOf(current as (typeof ORDER)[number]) + 1) % ORDER.length]

  return (
    <button
      type='button'
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${current}. Switch to ${next}.`}
      title={`Theme: ${current}`}
      className='-m-2 grid h-9 w-9 place-items-center text-base text-muted transition-colors hover:text-accent'
    >
      <i className={ICONS[current]} aria-hidden />
    </button>
  )
}
