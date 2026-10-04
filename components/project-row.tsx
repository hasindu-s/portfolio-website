import type { Project } from '@/content/projects'
import { Tag } from './tag'

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li className='grid gap-4 border-t border-rule py-8 md:grid-cols-12 md:gap-8 md:py-10'>
      <p className='meta text-muted md:col-span-1 md:pt-2'>
        {String(index + 1).padStart(2, '0')}
      </p>
      <div className='md:col-span-7'>
        <h2 className='mb-3 text-2xl font-semibold tracking-tight md:text-3xl'>
          {project.title}
        </h2>
        <p className='mb-5 max-w-prose text-muted'>{project.summary}</p>
        <div className='flex flex-wrap gap-2'>
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
      <p className='meta text-muted md:col-span-2 md:pt-2'>{project.year}</p>
      <div className='flex gap-5 md:col-span-2 md:flex-col md:items-end md:gap-2 md:pt-2'>
        {project.repo && <ExternalLink href={project.repo}>Code</ExternalLink>}
        {project.live && <ExternalLink href={project.live}>Live</ExternalLink>}
      </div>
    </li>
  )
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='group meta text-foreground hover:text-accent'
    >
      <span className='link'>{children}</span>{' '}
      <span className='arrow arrow-ne text-accent'>↗</span>
    </a>
  )
}
