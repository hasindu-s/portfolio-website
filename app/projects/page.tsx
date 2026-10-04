import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ProjectRow } from '@/components/project-row'
import { projects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects by Hasindu Rathnayake.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title='Work' meta={`${String(projects.length).padStart(2, '0')} projects`}>
        Things I&apos;ve built — products, experiments and research.
      </PageHeader>
      <ol className='border-b border-rule'>
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </ol>
      <div className='h-16 md:h-24' />
    </>
  )
}
