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
        'rounded-2xl border border-[#e6ebf7] bg-white py-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(25,37,86,0.12)]',
        interactive
          ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(25,37,86,0.16)]'
          : '',
        className,
      )}
      {...props}
    >
      <CardContent className={cn('p-4 max-[720px]:p-3 max-[480px]:p-2', contentClassName)}>{children}</CardContent>
    </Card>
  )
}
