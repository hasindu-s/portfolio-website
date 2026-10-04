import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { getAllPosts, postHref } from '@/lib/til'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  return [
    { url: site.url },
    { url: `${site.url}/projects` },
    { url: `${site.url}/blog` },
    ...posts.map((p) => ({
      url: `${site.url}${postHref(p)}`,
      lastModified: p.date ?? undefined,
    })),
  ]
}
