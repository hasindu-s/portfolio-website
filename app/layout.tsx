import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { site } from '@/content/site'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.domain}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.domain,
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: { card: 'summary' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link
          href='https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css'
          rel='stylesheet'
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <div className='flex min-h-screen flex-col'>
            <SiteHeader />
            <main className='mx-auto w-full max-w-site flex-1 px-6 md:px-12'>
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
