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
      <article className="shadow-sm flex min-h-[120px] flex-col justify-center rounded-2xl border border-[#e6ebf7] bg-white p-4">
        <p className="m-0 text-[0.78rem] text-[#6d7aab]">Spending vs last month</p>
        <p className="mt-1 mb-1 text-[1.75rem] font-bold text-[#1d2758]">{formatCurrency(insights.currentExpense, currency)}</p>
        <p className={`m-0 text-[0.75rem] ${compareTone(insights.expenseMoM, false)}`}>{insights.expenseMoM}% vs {insights.previousMonth}</p>
      </article>

      <article className="shadow-sm flex min-h-[120px] flex-col justify-center rounded-2xl border border-[#e6ebf7] bg-white p-4">
        <p className="m-0 text-[0.78rem] text-[#6d7aab]">Income vs last month</p>
        <p className="mt-1 mb-1 text-[1.75rem] font-bold text-[#1d2758]">{formatCurrency(insights.currentIncome, currency)}</p>
        <p className={`m-0 text-[0.75rem] ${compareTone(insights.incomeMoM)}`}>{insights.incomeMoM}% vs {insights.previousMonth}</p>
      </article>

      <article className="shadow-sm flex min-h-[120px] flex-col justify-center rounded-2xl border border-[#e6ebf7] bg-white p-4">
        <p className="m-0 text-[0.78rem] text-[#6d7aab]">Net cashflow</p>
        <p className="mt-1 mb-1 text-[1.75rem] font-bold text-[#1d2758]">{formatCurrency(insights.currentNet, currency)}</p>
        <p className={`m-0 text-[0.75rem] ${compareTone(insights.netMoM)}`}>{insights.netMoM}% vs {insights.previousMonth}</p>
      </article>

      <article className="shadow-sm flex min-h-[120px] flex-col justify-center rounded-2xl border border-[#e6ebf7] bg-white p-4">
        <p className="m-0 text-[0.78rem] text-[#6d7aab]">Savings rate trend</p>
        <p className="mt-1 mb-1 text-[1.75rem] font-bold text-[#1d2758]">{insights.currentSavingsRate}%</p>
        <p className={`m-0 text-[0.75rem] ${compareTone(insights.savingsRateMoM)}`}>{insights.savingsRateMoM}% vs {insights.previousMonth}</p>
      </article>
    </section>
  )
}
