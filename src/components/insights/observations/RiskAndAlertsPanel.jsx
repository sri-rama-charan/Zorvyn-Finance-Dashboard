import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

export function RiskAndAlertsPanel({ formatCurrency, currency, insights }) {
  const pressureClassName = insights.expenseMomentum > 10 ? 'down' : 'up'
  const momentumLabel = insights.expenseMomentum > 10 ? 'Rising pressure' : 'Stable pressure'
  const pressureTone = pressureClassName === 'up' ? 'text-[#208b57]' : 'text-[#cd6045]'

  return (
    <article className="rounded-2xl border border-[#e6ebf7] bg-white p-4 shadow-sm">
      <SectionPanelHeader title="Signals" actionLabel="Monitor" />

      <div className="grid gap-2.5">
        <div className="rounded-xl border border-[#e2e8f8] bg-gradient-to-b from-white to-[#f8fbff] p-3">
          <p className="m-0 text-[0.76rem] text-[#6677ac]">Expense momentum</p>
          <p className={`mt-1 text-[1.15rem] font-extrabold ${pressureTone}`}>{insights.expenseMomentum}%</p>
          <p className="mt-1 text-[0.76rem] text-[#6071a8]">{momentumLabel} over recent months</p>
        </div>

        <div className="rounded-xl border border-[#e2e8f8] bg-gradient-to-b from-white to-[#f8fbff] p-3">
          <p className="m-0 text-[0.76rem] text-[#6677ac]">Average monthly spend</p>
          <p className="mt-1 text-[1.15rem] font-extrabold text-[#233a76]">{formatCurrency(insights.averageExpense, currency)}</p>
          <p className="mt-1 text-[0.76rem] text-[#6071a8]">Across selected account history</p>
        </div>

        <div className="rounded-xl border border-[#e2e8f8] bg-gradient-to-b from-white to-[#f8fbff] p-3">
          <p className="m-0 text-[0.76rem] text-[#6677ac]">Average monthly income</p>
          <p className="mt-1 text-[1.15rem] font-extrabold text-[#233a76]">{formatCurrency(insights.averageIncome, currency)}</p>
          <p className="mt-1 text-[0.76rem] text-[#6071a8]">Baseline earning level</p>
        </div>
      </div>
    </article>
  )
}
