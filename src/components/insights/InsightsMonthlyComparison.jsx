import { ExpenseIncomeTrendChart } from './monthlyComparison/ExpenseIncomeTrendChart'
import { MonthOverMonthSummary } from './monthlyComparison/MonthOverMonthSummary'

export function InsightsMonthlyComparison({ formatCurrency, account, insights }) {
  return (
    <section className="grid gap-3 [grid-template-columns:1.15fr_0.85fr] max-[1040px]:grid-cols-2 max-[720px]:grid-cols-1">
      <ExpenseIncomeTrendChart
        formatCurrency={formatCurrency}
        currency={account.currency}
        monthlySeries={insights.monthlySeries}
      />
      <MonthOverMonthSummary formatCurrency={formatCurrency} currency={account.currency} insights={insights} />
    </section>
  )
}
