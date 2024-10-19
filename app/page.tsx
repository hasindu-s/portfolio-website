import Image from 'next/image'

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-4 row-start-2 items-center sm:items-start'>
        <h1 className='text-center text-3xl font-extrabold'>
          Site is still under construction
        </h1>
        <span className='text-center w-full text-xl'>තවම site එක හදන ගමන්</span>
        <div className='flex justify-center items-center w-full pt-4'>
          <Image
            src='https://i.pinimg.com/originals/e5/3b/88/e53b882be5e7565ecf61d9b12910bede.gif'
            alt='Site under construction'
            width={400}
            height={250}
            priority
          />
        </div>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://www.linkedin.com/in/hasindu-s-rathnayake/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='ri-linkedin-box-fill' />
          LinkedIn
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://github.com/hasindu-s'
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='ri-github-fill' />
          GitHub
        </a>
      </footer>
    </div>
  )
}
