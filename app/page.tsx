import { MoreLink, Section } from '@/components/section'
import { ProjectCard } from '@/components/project-card'
import { PostRow } from '@/components/post-row'
import { Tag } from '@/components/tag'
import { featuredProjects } from '@/content/projects'
import { site } from '@/content/site'
import { getAllPosts, REVALIDATE_SECONDS } from '@/lib/til'

export const revalidate = REVALIDATE_SECONDS

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 5)

  return (
    <>
      {/* Hero */}
      <section className='pb-16 pt-16 md:pb-28 md:pt-28'>
        <h1 className='text-display font-bold'>
          {site.heroLines.map((line, i) => (
            <span key={line} className='block'>
              {line}
              {i === site.heroLines.length - 1 && <span className='text-accent'>■</span>}
            </span>
          ))}
        </h1>
        <p className='meta mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted'>
          <span>{site.name}</span>
          <span aria-hidden>/</span>
          <span>{site.role}</span>
          <span aria-hidden>/</span>
          <span>{site.location}</span>
          {site.openToWork && (
            <>
              <span aria-hidden>/</span>
              <span className='inline-flex items-center gap-2 text-foreground'>
                <span className='h-2 w-2 bg-accent' aria-hidden />
                Open to work
              </span>
            </>
          )}
        </p>
      </section>

      <Section number='01' title='About' id='about'>
        <div className='max-w-2xl space-y-5 text-lg leading-relaxed md:text-xl'>
          {site.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className='mt-8 text-muted'>
          <span className='meta mr-3 text-foreground'>Currently</span>
          {site.currently}
        </p>
        <div className='mt-8 flex flex-wrap gap-2'>
          {site.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Section>

      <Section
        number='02'
        title='Selected work'
        id='work'
        action={<MoreLink href='/projects'>All projects</MoreLink>}
      >
        <div className='grid gap-12 md:grid-cols-2 md:gap-8'>
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section
        number='03'
        title='Writing'
        id='writing'
        action={<MoreLink href='/blog'>All posts</MoreLink>}
      >
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <PostRow key={`${post.category}/${post.slug}`} post={post} />
            ))}
          </ul>
        ) : (
          <p className='text-muted'>Posts are on their way.</p>
        )}
      </Section>

      <Section number='04' title='Contact' id='contact'>
        <a href={`mailto:${site.email}`} className='group block'>
          <span className='block text-title font-semibold'>
            <span className='link'>Let&apos;s talk</span>{' '}
            <span className='arrow text-accent'>→</span>
          </span>
          <span className='mt-3 block text-lg text-muted'>{site.email}</span>
        </a>
        <ul className='mt-10 flex flex-wrap gap-x-8 gap-y-3'>
          {site.socials.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target='_blank'
                rel='noopener noreferrer'
                className='group meta inline-flex items-center gap-2 hover:text-accent'
              >
                <i className={`${s.icon} text-base`} aria-hidden />
                <span className='link'>{s.label}</span>
                <span className='arrow arrow-ne text-accent'>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
