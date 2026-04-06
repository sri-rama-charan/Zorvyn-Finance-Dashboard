import { CategoryShareChart } from './smart/CategoryShareChart'
import { SpendingHighlightsPanel } from './smart/SpendingHighlightsPanel'

export function InsightsMonthlyComparison({ formatCurrency, account, insights }) {
  return (
    <section className="grid gap-3 [grid-template-columns:1.2fr_0.8fr] max-[1040px]:grid-cols-1">
      <CategoryShareChart
        categoryShareByMonth={insights.categoryShareByMonth}
        categories={insights.categoryPercents}
      />
      <SpendingHighlightsPanel formatCurrency={formatCurrency} currency={account.currency} insights={insights} />
    </section>
  )
}
