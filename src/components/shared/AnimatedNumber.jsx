import { useCountUp } from '../../hooks/useCountUp'

export function AnimatedNumber({ value, formatValue, duration = 1500, className }) {
  const count = useCountUp(value, duration)
  const isDecimal = count % 1 !== 0 // Add logic to show some decimals during animation mostly
  const displayedCount = Math.round(count)
    
  return (
    <span className={className}>
      {typeof formatValue === 'function' ? formatValue(count) : count}
    </span>
  )
}