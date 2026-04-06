import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { PanelCard } from '../../shared/PanelCard'

export function MonthOverMonthSummary({ formatCurrency, currency, insights }) {
  return (
    <PanelCard className="min-h-[330px]">
      <SectionPanelHeader title="Month Snapshot" actionLabel={`${insights.previousMonth} to ${insights.currentMonth}`} />

      <ul className="m-0 grid gap-2 pl-4 text-[0.86rem] text-[#2b376f]">
        <li>
          Expense changed from {formatCurrency(insights.previousExpense, currency)} to {formatCurrency(insights.currentExpense, currency)}.
        </li>
        <li>
          Income changed from {formatCurrency(insights.previousIncome, currency)} to {formatCurrency(insights.currentIncome, currency)}.
        </li>
        <li>
          Net changed from {formatCurrency(insights.previousNet, currency)} to {formatCurrency(insights.currentNet, currency)}.
        </li>
        <li>
          Savings rate moved from {insights.previousSavingsRate}% to {insights.currentSavingsRate}%.
        </li>
      </ul>
    </PanelCard>
  )
}
