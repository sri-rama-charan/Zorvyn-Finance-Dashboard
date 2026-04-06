import { useMemo } from 'react'

function percentChange(current, previous) {
  if (!previous) return 0
  return ((current - previous) / previous) * 100
}

function round(value) {
  return Math.round(value * 10) / 10
}

export function useInsightsData({ account }) {
  const monthlySeries = account.monthlySeries

  return useMemo(() => {
    const current = monthlySeries[monthlySeries.length - 1]
    const previous = monthlySeries[monthlySeries.length - 2] ?? current

    const currentNet = current.income - current.expenses
    const previousNet = previous.income - previous.expenses

    const currentSavingsRate = current.income ? (currentNet / current.income) * 100 : 0
    const previousSavingsRate = previous.income ? (previousNet / previous.income) * 100 : 0

    const expenseMoM = round(percentChange(current.expenses, previous.expenses))
    const incomeMoM = round(percentChange(current.income, previous.income))
    const netMoM = round(percentChange(currentNet, previousNet))
    const savingsRateMoM = round(currentSavingsRate - previousSavingsRate)

    const highestExpenseMonth = monthlySeries.reduce((acc, item) => (item.expenses > acc.expenses ? item : acc), monthlySeries[0])
    const lowestExpenseMonth = monthlySeries.reduce((acc, item) => (item.expenses < acc.expenses ? item : acc), monthlySeries[0])

    const averageExpense = monthlySeries.reduce((sum, item) => sum + item.expenses, 0) / monthlySeries.length
    const averageIncome = monthlySeries.reduce((sum, item) => sum + item.income, 0) / monthlySeries.length

    const recentWindow = monthlySeries.slice(-3)
    const earlierWindow = monthlySeries.slice(-6, -3)

    const recentAvgExpense = recentWindow.reduce((sum, item) => sum + item.expenses, 0) / Math.max(recentWindow.length, 1)
    const earlierAvgExpense = earlierWindow.reduce((sum, item) => sum + item.expenses, 0) / Math.max(earlierWindow.length, 1)
    const expenseMomentum = round(percentChange(recentAvgExpense, earlierAvgExpense))

    const totalCategorySpend = account.spending.reduce((sum, item) => sum + item.amount, 0)
    const topCategory = account.spending.reduce((acc, item) => (item.amount > acc.amount ? item : acc), account.spending[0])
    const topCategoryShare = totalCategorySpend ? round((topCategory.amount / totalCategorySpend) * 100) : 0

    const observations = [
      `Spending changed ${expenseMoM}% month-over-month (${previous.month} to ${current.month}).`,
      `Income changed ${incomeMoM}% month-over-month, and net cashflow moved ${netMoM}%.`,
      `Highest spend month was ${highestExpenseMonth.month} (${highestExpenseMonth.expenses}), lowest was ${lowestExpenseMonth.month} (${lowestExpenseMonth.expenses}).`,
      `${topCategory.category} contributes about ${topCategoryShare}% of category spending.`,
      `Recent 3-month expense momentum is ${expenseMomentum}% versus the prior 3 months.`,
    ]

    return {
      currentMonth: current.month,
      previousMonth: previous.month,
      currentExpense: current.expenses,
      previousExpense: previous.expenses,
      currentIncome: current.income,
      previousIncome: previous.income,
      currentNet,
      previousNet,
      currentSavingsRate: round(currentSavingsRate),
      previousSavingsRate: round(previousSavingsRate),
      expenseMoM,
      incomeMoM,
      netMoM,
      savingsRateMoM,
      highestExpenseMonth,
      lowestExpenseMonth,
      averageExpense: round(averageExpense),
      averageIncome: round(averageIncome),
      topCategory,
      topCategoryShare,
      expenseMomentum,
      observations,
      monthlySeries,
    }
  }, [account, monthlySeries])
}
