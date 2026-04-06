import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function PanelCard({
  children,
  className,
  contentClassName,
  interactive = false,
  ...props
}) {
  return (
    <Card
      className={cn(
        'rounded-2xl border border-[#e6ebf7] bg-white py-0 shadow-sm transition-all duration-200',
        interactive
          ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(25,37,86,0.12)]'
          : 'hover:shadow-[0_10px_22px_rgba(25,37,86,0.08)]',
        className,
      )}
      {...props}
    >
      <CardContent className={cn('p-4', contentClassName)}>{children}</CardContent>
    </Card>
  )
}
