import { PanelCard } from '../../shared/PanelCard'

function changeClass(value, positiveIsGood = true) {
  if (value === 0) return 'neutral'
  if (positiveIsGood) return value > 0 ? 'up' : 'down'
  return value > 0 ? 'down' : 'up'
}

function compareTone(value, positiveIsGood = true) {
  const state = changeClass(value, positiveIsGood)
  if (state === 'up') return 'text-[#208b57]'
  if (state === 'down') return 'text-[#cd6045]'
  return 'text-[#5f6ea3]'
}

export function ComparisonCards({ formatCurrency, currency, insights }) {
  return (
    <section className="grid grid-cols-4 gap-3 max-[1040px]:grid-cols-2 max-[720px]:grid-cols-1" aria-label="Month-over-month highlights">
      <PanelCard className="min-h-[120px]" contentClassName="flex h-full flex-col justify-center">
        <p className="m-0 text-[0.78rem] text-[color:var(--app-muted)]">Spending vs last month</p>
        <p className="mt-1 mb-1 text-[1.75rem] font-bold tracking-tight text-[color:var(--app-text)]">{formatCurrency(insights.currentExpense, currency)}</p>
        <p className={`m-0 text-[0.75rem] ${compareTone(insights.expenseMoM, false)}`}>{insights.expenseMoM}%</p>
      </PanelCard>

      <PanelCard className="min-h-[120px]" contentClassName="flex h-full flex-col justify-center">
        <p className="m-0 text-[0.78rem] text-[color:var(--app-muted)]">Income vs last month</p>
        <p className="mt-1 mb-1 text-[1.75rem] font-bold tracking-tight text-[color:var(--app-text)]">{formatCurrency(insights.currentIncome, currency)}</p>
        <p className={`m-0 text-[0.75rem] ${compareTone(insights.incomeMoM)}`}>{insights.incomeMoM}%</p>
      </PanelCard>

      <PanelCard className="min-h-[120px]" contentClassName="flex h-full flex-col justify-center">
        <p className="m-0 text-[0.78rem] text-[color:var(--app-muted)]">Net cashflow</p>
        <p className="mt-1 mb-1 text-[1.75rem] font-bold tracking-tight text-[color:var(--app-text)]">{formatCurrency(insights.currentNet, currency)}</p>
        <p className={`m-0 text-[0.75rem] ${compareTone(insights.netMoM)}`}>{insights.netMoM}%</p>
      </PanelCard>

      <PanelCard className="min-h-[120px]" contentClassName="flex h-full flex-col justify-center">
        <p className="m-0 text-[0.78rem] text-[color:var(--app-muted)]">Savings rate trend</p>
        <p className="mt-1 mb-1 text-[1.75rem] font-bold tracking-tight text-[color:var(--app-text)]">{insights.currentSavingsRate}%</p>
        <p className={`m-0 text-[0.75rem] ${compareTone(insights.savingsRateMoM)}`}>{insights.savingsRateMoM}%</p>
      </PanelCard>
    </section>
  )
}
