import { useMemo, useState } from 'react'
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
  const grouped = new Map()

  account.transactions.forEach((transaction) => {
    const key = weekKey(transaction.date)
    const current = grouped.get(key) ?? 0
    grouped.set(key, current + transaction.amount)
  })

  return Array.from(grouped.entries())
    .sort((first, second) => first[0].localeCompare(second[0]))
    .slice(-8)
    .map(([label, value]) => ({ label, value }))
}

export function SavingsTrendChart({ account, formatCurrency }) {
  const [range, setRange] = useState('monthly')

  const monthlyData = useMemo(() => monthSavingsSeries(account), [account])
  const weeklyData = useMemo(() => weeklySavingsSeries(account), [account])

  const series = range === 'weekly' ? weeklyData : monthlyData
  const maxValue = Math.max(...series.map((item) => Math.abs(item.value)), 1)

  return (
    <PanelCard className="min-h-[360px]">
      <SectionPanelHeader title="Savings Trend" actionLabel={range === 'weekly' ? 'Every week' : 'Every month'} />

      <div className="mb-3 inline-flex gap-1 rounded-full border border-[#d7deef] bg-[#f8faff] p-1" role="tablist" aria-label="Savings range">
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

      <div className="grid min-h-[220px] grid-cols-[repeat(auto-fit,minmax(56px,1fr))] items-end gap-2 rounded-xl border border-[#e3e9f7] bg-gradient-to-b from-[#f8faff] to-[#eef3ff] p-3">
        {series.map((item) => (
          <div className="grid items-end justify-items-center gap-1" key={item.label}>
            <div className="flex h-[150px] w-full items-end justify-center">
              <div
                className={`w-[72%] rounded-t-md ${item.value >= 0 ? 'bg-gradient-to-b from-[#95d69f] to-[#4da86b]' : 'bg-gradient-to-b from-[#ffb190] to-[#ff8d5e]'}`}
                style={{ height: `${Math.max((Math.abs(item.value) / maxValue) * 100, 6)}%` }}
                title={`${item.label}: ${formatCurrency(item.value, account.currency)}`}
              ></div>
            </div>
            <p className="m-0 text-[0.7rem] text-[#6b7cb1]">{item.label}</p>
          </div>
        ))}
      </div>

      <p className="mt-2 mb-0 text-[0.78rem] text-[#6071a8]">
        Net savings is calculated as income minus outflows for each selected period.
      </p>
    </PanelCard>
  )
}
