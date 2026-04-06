import { IncomeVsExpensesChart } from './performance/IncomeVsExpensesChart'
import { SpendingBreakdownCard } from './performance/SpendingBreakdownCard'

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
}) {
  return (
    <section className="grid gap-3 [grid-template-columns:1.35fr_1fr] max-[1040px]:grid-cols-1">
      <IncomeVsExpensesChart
        account={account}
        formatCurrency={formatCurrency}
        monthlyIncomeTotal={monthlyIncomeTotal}
        monthlyExpenseTotal={monthlyExpenseTotal}
        savingsRate={savingsRate}
        incomePoints={incomePoints}
        expensePoints={expensePoints}
      />
      <SpendingBreakdownCard
        onOpenInsightsRoute={onOpenInsightsRoute}
        account={account}
        formatCurrency={formatCurrency}
        breakdownGradient={breakdownGradient}
        topCategories={topCategories}
      />
    </section>
  )
}
