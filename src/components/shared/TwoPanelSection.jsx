import { cn } from '@/lib/utils'

export function TwoPanelSection({ children, className, ...props }) {
  return (
    <section className={cn('grid gap-3 [grid-template-columns:1.35fr_1fr] max-[1040px]:grid-cols-1', className)} {...props}>
      {children}
    </section>
  )
}
