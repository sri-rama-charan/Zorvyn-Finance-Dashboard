import { useEffect, useMemo, useState } from 'react'
import { PanelCard } from '../../shared/PanelCard'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

function monthSavingsSeries(account) {
  return account.monthlySeries.map((item) => ({
    label: item.month,
    value: item.income - item.expenses,
  }))
}

function weekKey(dateValue) {
  const date = new Date(dateValue)
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = target.getUTCDay() || 7
  target.setUTCDate(target.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((target - yearStart) / 86400000) + 1) / 7)
  return `${target.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

function weeklySavingsSeries(account) {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const totals = Object.fromEntries(weekdays.map((day) => [day, 0]))

  account.transactions.forEach((transaction) => {
    const date = new Date(transaction.date)
    const dayIndex = (date.getDay() + 6) % 7
    const day = weekdays[dayIndex]
    totals[day] += transaction.amount
  })

  return weekdays.map((day) => ({ label: day, value: totals[day] }))
}

export function SavingsTrendChart({ account, formatCurrency }) {
  const [range, setRange] = useState('monthly')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const monthlyData = useMemo(() => monthSavingsSeries(account), [account])
  const weeklyData = useMemo(() => weeklySavingsSeries(account), [account])

  const series = range === 'weekly' ? weeklyData : monthlyData
  const maxValue = Math.max(...series.map((item) => Math.abs(item.value)), 1)

  return (
    <PanelCard className="min-h-[360px]">
      <SectionPanelHeader title="Savings Trend" actionLabel={range === 'weekly' ? 'Every week' : 'Every month'} />

      <div className="mb-4 inline-flex gap-1 rounded-full border border-[#d7deef] bg-[#f8faff] p-1" role="tablist" aria-label="Savings range">
        <button
          type="button"
          className={
            range === 'monthly'
              ? 'rounded-full bg-gradient-to-b from-white to-[#eef3ff] px-3 py-2 text-[0.78rem] font-bold text-[#21408f] shadow-[0_4px_14px_rgba(51,70,157,0.08)]'
              : 'rounded-full bg-transparent px-3 py-2 text-[0.78rem] font-bold text-[#5c6fa7]'
          }
          onClick={() => setRange('monthly')}
        >
          Every month
        </button>
        <button
          type="button"
          className={
            range === 'weekly'
              ? 'rounded-full bg-gradient-to-b from-white to-[#eef3ff] px-3 py-2 text-[0.78rem] font-bold text-[#21408f] shadow-[0_4px_14px_rgba(51,70,157,0.08)]'
              : 'rounded-full bg-transparent px-3 py-2 text-[0.78rem] font-bold text-[#5c6fa7]'
          }
          onClick={() => setRange('weekly')}
        >
          Every week
        </button>
      </div>

      <div className="grid grid-cols-[35px_1fr] items-end gap-2 text-[#6b7cb1] text-[0.65rem] font-medium min-h-[220px] pb-5">
        {/* Y Axis */}
        <div className="flex h-[150px] flex-col justify-between text-right border-r border-[#e3e9f7] pr-2 mr-1">
          <span>{formatCurrency(maxValue, account.currency).split('.')[0]}</span>
          <span>{formatCurrency(maxValue / 2, account.currency).split('.')[0]}</span>
          <span>0</span>
        </div>

        {/* Chart Area */}
        <div className="grid h-[150px] grid-cols-[repeat(auto-fit,minmax(24px,1fr))] items-end gap-2 pr-2">
           {series.map((item, index) => {
            const pct = Math.max((Math.abs(item.value) / maxValue) * 100, 6)
            const intensity = Math.min(1, Math.max(0.25, pct / 100))
            const isPositive = item.value >= 0

            const topLight = isPositive ? 74 - intensity * 26 : 78 - intensity * 30
            const bottomLight = isPositive ? 50 - intensity * 18 : 52 - intensity * 22
            const topColor = isPositive ? `hsl(140, 58%, ${topLight}%)` : `hsl(18, 85%, ${topLight}%)`
            const bottomColor = isPositive ? `hsl(152, 52%, ${bottomLight}%)` : `hsl(6, 80%, ${bottomLight}%)`
            const barShadow = isPositive
              ? `0 6px 16px rgba(37,133,67,${0.1 + intensity * 0.25})`
              : `0 6px 16px rgba(210,76,31,${0.1 + intensity * 0.25})`

            return (
              <div
                className={`group relative flex h-full flex-col justify-end transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                style={{ transitionDelay: `${index * 45}ms` }}
                key={item.label}
                title={`${item.label}: ${formatCurrency(item.value, account.currency)}`}
              >
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded bg-[#1b2247] px-2 py-1 text-[0.62rem] text-white group-hover:block z-10 whitespace-nowrap shadow-lg">
                  {formatCurrency(item.value, account.currency)}
                </div>

                <div
                  className="w-full rounded-t-[4px] transition-[height] duration-500"
                  style={{ height: `${pct}%`, background: `linear-gradient(180deg, ${topColor}, ${bottomColor})`, boxShadow: barShadow }}
                ></div>
                
                {/* X Axis Label */}
                 <span className="absolute top-full mt-2 w-full text-center text-[#8e9cce] truncate">
                   {range === 'weekly' ? item.label : item.label.substring(0, 3)}
                 </span>
              </div>
            )
          })}
        </div>
      </div>
    </PanelCard>
  )
}
