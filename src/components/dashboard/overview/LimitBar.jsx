import { useEffect, useState } from 'react'

function limitPercent(limit) {
  if (!limit.total) return 0
  return Math.round((limit.used / limit.total) * 100)
}

export function LimitBar({ label, limit, currency, formatCurrency }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const percent = limitPercent(limit)
  const tone = 'from-[#224f8f] to-[#97e97a]'

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <p className="m-0 text-[0.86rem] font-semibold text-[#27357a]">{label}</p>
        <p className="m-0 text-[0.84rem] font-bold text-[#4f5f97]">{percent}%</p>
      </div>
      <div className="h-2 rounded-full bg-[#ebeffa]" role="presentation">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tone} transition-[width] duration-1000 ease-out`}
          style={{ width: isVisible ? `${percent}%` : '0%' }}
        ></div>
      </div>
      <p className="m-0 text-[0.78rem] text-[#6676ad]">
        {formatCurrency(limit.used, currency)} of {formatCurrency(limit.total, currency)} spent
      </p>
    </div>
  )
}
