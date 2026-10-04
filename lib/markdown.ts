import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypePrettyCode, {
    theme: { light: 'github-light', dark: 'github-dark' },
    keepBackground: false,
    defaultLang: 'plaintext',
  })
  .use(rehypeStringify)

/**
 * Markdown -> HTML. Raw HTML in the source is dropped (remark-rehype default),
 * so the output is safe to inject.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await processor.process(markdown)
  return String(file)
}
