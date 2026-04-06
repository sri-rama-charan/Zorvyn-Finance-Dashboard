import { useMemo } from 'react'

function percentChange(current, previous) {
  if (!previous) return 0
  return ((current - previous) / previous) * 100
}

function round(value) {
  return Math.round(value * 10) / 10
}

function getMonthLabel(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', { month: 'short' })
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

    const categoryColors = ['#5f8dee', '#9bd87d', '#ffb36a', '#7a7de8', '#ff8d5e']
    const categoryTotals = account.spending.map((item, index) => ({
      ...item,
      color: categoryColors[index % categoryColors.length],
    }))
    const baselineCategorySpend = categoryTotals.reduce((sum, item) => sum + item.amount, 0)
    const categoryWeights = categoryTotals.map((item) => ({
      ...item,
      weight: baselineCategorySpend ? item.amount / baselineCategorySpend : 1 / categoryTotals.length,
    }))

    const latestTransactionDate = account.transactions
      .map((transaction) => new Date(transaction.date))
      .sort((a, b) => b - a)[0] || new Date()
    const monthsWindow = monthlySeries.slice(-6).map((month) => ({
      key: month.month,
      label: month.month,
    }))
    const monthExpenseLookup = new Map(monthlySeries.map((month) => [month.month, month.expenses]))

    const categoryNames = categoryTotals.map((item) => item.category)
    const categoryNameSet = new Set(categoryNames)
    const otherCategoryName = categoryNameSet.has('Other') ? 'Other' : null
    const monthlyCategoryTotals = new Map(
      monthsWindow.map((month) => [
        month.key,
        categoryNames.reduce((acc, name) => {
          acc[name] = 0
          return acc
        }, {}),
      ]),
    )

    const expenseByDate = new Map()
    account.transactions.forEach((transaction) => {
      if (transaction.type !== 'expense') return
      const key = transaction.date
      const currentTotal = expenseByDate.get(key) ?? 0
      expenseByDate.set(key, currentTotal + Math.abs(transaction.amount))

      const monthKey = getMonthLabel(transaction.date)
      const monthTotals = monthKey ? monthlyCategoryTotals.get(monthKey) : null
      if (!monthTotals) return

      const resolvedCategory = categoryNameSet.has(transaction.category)
        ? transaction.category
        : otherCategoryName
      if (!resolvedCategory) return
      monthTotals[resolvedCategory] += Math.abs(transaction.amount)
    })

    monthsWindow.forEach((month) => {
      const totals = monthlyCategoryTotals.get(month.key)
      if (!totals) return
      const total = Object.values(totals).reduce((sum, value) => sum + value, 0)
      if (total > 0) return
      const monthExpense = monthExpenseLookup.get(month.key) ?? 0
      if (!monthExpense) return
      categoryWeights.forEach((category) => {
        totals[category.category] = monthExpense * category.weight
      })
    })

    const expenseEntries = Array.from(expenseByDate.entries())
    const highestSpendingEntry = expenseEntries.reduce(
      (acc, entry) => (entry[1] > acc[1] ? entry : acc),
      expenseEntries[0] || ['', 0],
    )
    const expenseDaysCount = expenseEntries.length || 1
    const totalExpense = expenseEntries.reduce((sum, entry) => sum + entry[1], 0)
    const averageDailyExpense = totalExpense / expenseDaysCount
    const highestDayRatio = averageDailyExpense ? highestSpendingEntry[1] / averageDailyExpense : 0

    const highestSpendingDay = {
      date: highestSpendingEntry[0],
      amount: highestSpendingEntry[1],
      average: averageDailyExpense,
      ratio: highestDayRatio,
    }

    let latestMonthTotals = null
    let latestMonthTotal = 0
    for (let i = monthsWindow.length - 1; i >= 0; i -= 1) {
      const monthKey = monthsWindow[i]?.key
      const totals = monthKey ? monthlyCategoryTotals.get(monthKey) : null
      if (!totals) continue
      const total = Object.values(totals).reduce((sum, value) => sum + value, 0)
      if (total > 0) {
        latestMonthTotals = totals
        latestMonthTotal = total
        break
      }
    }

    const topCategoryFromLatest = latestMonthTotals
      ? categoryTotals.reduce(
        (acc, item) => (latestMonthTotals[item.category] > acc.amount
          ? { category: item.category, amount: latestMonthTotals[item.category] }
          : acc),
        { category: categoryTotals[0]?.category ?? 'Unknown', amount: latestMonthTotals[categoryTotals[0]?.category] ?? 0 },
      )
      : null
    const topCategory = latestMonthTotal
      ? topCategoryFromLatest
      : categoryTotals.reduce((acc, item) => (item.amount > acc.amount ? item : acc), categoryTotals[0])
    const topCategoryShare = latestMonthTotal
      ? round((topCategory.amount / latestMonthTotal) * 100)
      : baselineCategorySpend
        ? round((topCategory.amount / baselineCategorySpend) * 100)
        : 0

    const peakDayObservation = highestSpendingDay.date
      ? `Peak daily spend hit on ${highestSpendingDay.date} (${round(highestSpendingDay.amount)}).`
      : 'No expense activity recorded for recent days.'

    const observations = [
      `Spending changed ${expenseMoM}% month-over-month (${previous.month} to ${current.month}).`,
      `Income changed ${incomeMoM}% month-over-month, and net cashflow moved ${netMoM}%.`,
      `Highest spend month was ${highestExpenseMonth.month} (${highestExpenseMonth.expenses}), lowest was ${lowestExpenseMonth.month} (${lowestExpenseMonth.expenses}).`,
      `${topCategory.category} contributes about ${topCategoryShare}% of category spending.`,
      peakDayObservation,
      `Recent 3-month expense momentum is ${expenseMomentum}% versus the prior 3 months.`,
    ]

    const categoryPercents = categoryTotals.map((item) => {
      const percent = latestMonthTotal
        ? round((latestMonthTotals[item.category] / latestMonthTotal) * 100)
        : baselineCategorySpend
          ? round((item.amount / baselineCategorySpend) * 100)
          : 0
      return {
        category: item.category,
        percent,
        color: item.color,
      }
    })

    const categoryShareByMonth = monthsWindow.map((month) => {
      const totals = monthlyCategoryTotals.get(month.key) ?? {}
      const total = Object.values(totals).reduce((sum, value) => sum + value, 0)
      const categories = categoryTotals.map((category) => ({
        category: category.category,
        percent: total ? round((totals[category.category] / total) * 100) : 0,
        color: category.color,
      }))
      return {
        month: month.label,
        categories,
      }
    })
    const startDate = new Date(latestTransactionDate)
    startDate.setDate(startDate.getDate() - 27)

    let heatmapDays = []
    for (let i = 0; i < 28; i += 1) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      const key = day.toISOString().slice(0, 10)
      const value = expenseByDate.get(key) ?? 0
      heatmapDays.push({ date: key, value })
    }

    const nonZeroDays = heatmapDays.filter((day) => day.value > 0).length
    const fallbackDaily = current.expenses ? current.expenses / 30 : averageExpense / 30
    if (nonZeroDays < 6 && fallbackDaily > 0) {
      heatmapDays = heatmapDays.map((day, index) => {
        if (day.value > 0) return day
        const wave = (Math.sin(index * 0.85) + 1) / 2
        return {
          ...day,
          value: fallbackDaily * (0.35 + wave * 0.4),
        }
      })
    }

    const heatmapMax = Math.max(...heatmapDays.map((item) => item.value), 1)
    const heatmapWeeks = Array.from({ length: 4 }).map((_, weekIndex) =>
      heatmapDays.slice(weekIndex * 7, weekIndex * 7 + 7),
    )

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
      highestSpendingDay,
      highestExpenseMonth,
      lowestExpenseMonth,
      averageExpense: round(averageExpense),
      averageIncome: round(averageIncome),
      topCategory,
      topCategoryShare,
      expenseMomentum,
      observations,
      monthlySeries,
      categoryShareByMonth,
      categoryPercents,
      heatmapWeeks,
      heatmapMax,
    }
  }, [account, monthlySeries])
}
