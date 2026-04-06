import { cn } from '@/lib/utils'

export function MetricTile({ label, value, note, valueClassName, className }) {
  return (
    <div
      className={cn(
        'rounded-[0.85rem] border border-[#e4ebfa] bg-gradient-to-b from-[#f8faff] to-[#f3f7ff] p-3 shadow-[0_6px_16px_rgba(41,62,124,0.06)] transition-shadow duration-200 hover:shadow-[0_10px_22px_rgba(41,62,124,0.1)]',
        className,
      )}
    >
      <p className="m-0 text-[0.76rem] text-[#6f7eb0]">{label}</p>
      <p className={cn('mt-1 text-[1.2rem] font-extrabold text-[#223671]', valueClassName)}>{value}</p>
      {note ? <p className="mt-1 text-[0.76rem] text-[#6071a8]">{note}</p> : null}
    </div>
  )
}
