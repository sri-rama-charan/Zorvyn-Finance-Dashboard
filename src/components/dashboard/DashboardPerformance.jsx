import { IncomeVsExpensesChart } from './performance/IncomeVsExpensesChart'
import { SpendingBreakdownCard } from './performance/SpendingBreakdownCard'
import { TwoPanelSection } from '../shared/TwoPanelSection'

export function DashboardPerformance({
  onOpenInsightsRoute,
  account,
  formatCurrency,
  monthlyIncomeTotal,
  monthlyExpenseTotal,
  savingsRate,
  incomePoints,
  expensePoints,
  breakdownGradient,
  topCategories,
  role,
  onUpdateMonthlySeries,
}) {
  return (
    <TwoPanelSection>
      <IncomeVsExpensesChart
        account={account}
        formatCurrency={formatCurrency}
        monthlyIncomeTotal={monthlyIncomeTotal}
        monthlyExpenseTotal={monthlyExpenseTotal}
        savingsRate={savingsRate}
        incomePoints={incomePoints}
        expensePoints={expensePoints}
        role={role}
        onUpdateMonthlySeries={onUpdateMonthlySeries}
      />
      <SpendingBreakdownCard
        onOpenInsightsRoute={onOpenInsightsRoute}
        account={account}
        formatCurrency={formatCurrency}
        breakdownGradient={breakdownGradient}
        topCategories={topCategories}
      />
    </TwoPanelSection>
  )
}
