export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className='meta inline-block border border-rule px-2 py-1 text-[0.68rem] text-muted'>
      {children}
    </span>
  )
}
