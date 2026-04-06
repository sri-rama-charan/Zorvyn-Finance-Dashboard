import { cn } from '@/lib/utils'

export function PanelInput({ className, ...props }) {
  return (
    <input
      className={cn(
        'min-h-[2.2rem] rounded-[0.7rem] border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-2.5 text-[color:var(--app-text)] placeholder:text-[color:var(--app-muted-2)] shadow-[0_2px_6px_rgba(34,55,111,0.05)] transition-colors duration-200 hover:border-[#c8d3ef] focus:border-[#9fb1e6] focus:outline-none',
        className,
      )}
      {...props}
    />
  )
}

export function PanelSelect({ className, children, ...props }) {
  return (
    <select
      className={cn(
        'min-h-[2.2rem] rounded-[0.7rem] border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-2.5 text-[color:var(--app-text)] shadow-[0_2px_6px_rgba(34,55,111,0.05)] transition-colors duration-200 hover:border-[#c8d3ef] focus:border-[#9fb1e6] focus:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}
