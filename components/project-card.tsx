import Image from 'next/image'
import type { Project } from '@/content/projects'
import { Tag } from './tag'

export function ProjectCard({ project }: { project: Project }) {
  const href = project.live ?? project.repo
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex flex-col border-t-2 border-foreground pt-5 transition-colors hover:border-accent'
    >
      {project.image && (
        <div className='relative mb-5 aspect-[16/10] overflow-hidden border border-rule'>
          <Image
            src={project.image}
            alt=''
            fill
            sizes='(min-width: 768px) 40vw, 100vw'
            className='object-cover'
          />
        </div>
      )}
      <div className='mb-3 flex items-baseline justify-between gap-4'>
        <h3 className='text-2xl font-semibold tracking-tight'>
          <span className='link'>{project.title}</span>
        </h3>
        <span className='arrow arrow-ne text-accent'>↗</span>
      </div>
      <p className='mb-5 text-muted'>{project.summary}</p>
      <div className='mt-auto flex flex-wrap items-center gap-2'>
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
        <span className='meta ml-auto text-muted'>{project.year}</span>
      </div>
    </a>
  )
}
