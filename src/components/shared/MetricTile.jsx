import { cn } from '@/lib/utils'

export function MetricTile({ label, value, note, valueClassName, className }) {
  return (
    <div
      className={cn(
        'rounded-[0.85rem] border border-[color:var(--app-border)] bg-[color:var(--app-card)] p-3 shadow-[0_6px_16px_rgba(41,62,124,0.06)] transition-shadow duration-200 hover:shadow-[0_10px_22px_rgba(41,62,124,0.1)]',
        className,
      )}
    >
      <p className="m-0 text-[0.76rem] text-[color:var(--app-muted)]">{label}</p>
      <p className={cn('mt-1 text-[1.2rem] font-extrabold tracking-tight text-[color:var(--app-text)]', valueClassName)}>{value}</p>
      {note ? <p className="mt-1 text-[0.76rem] text-[color:var(--app-muted-2)]">{note}</p> : null}
    </div>
  )
}
