import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: [
          'clamp(3rem, 9vw, 8rem)',
          { lineHeight: '0.95', letterSpacing: '-0.045em' },
        ],
        title: [
          'clamp(1.75rem, 4vw, 3rem)',
          { lineHeight: '1.05', letterSpacing: '-0.03em' },
        ],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [typography],
}
export default config
