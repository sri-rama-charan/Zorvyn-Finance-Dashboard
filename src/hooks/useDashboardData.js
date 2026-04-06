import { useMemo } from 'react'

export function useDashboardData({ account, search, transactionType, sortBy, insightRange }) {
  const filteredTransactions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    const rows = account.transactions.filter((transaction) => {
      const matchesSearch =
        !normalizedSearch ||
        [transaction.description, transaction.category, transaction.type, transaction.status]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesType = transactionType === 'all' || transaction.type === transactionType

      return matchesSearch && matchesType
    })

    rows.sort((first, second) => {
      if (sortBy === 'amount-desc') return Math.abs(second.amount) - Math.abs(first.amount)
      if (sortBy === 'amount-asc') return Math.abs(first.amount) - Math.abs(second.amount)

      const firstDate = new Date(first.date).getTime()
      const secondDate = new Date(second.date).getTime()
      return sortBy === 'date-asc' ? firstDate - secondDate : secondDate - firstDate
    })

    return rows
  }, [account.transactions, search, transactionType, sortBy])

  const topCategories = useMemo(() => {
    const total = account.spending.reduce((sum, item) => sum + item.amount, 0)
    return account.spending.map((item) => ({
      ...item,
      percent: total ? Math.round((item.amount / total) * 100) : 0,
    }))
  }, [account.spending])

  const breakdownGradient = useMemo(() => {
    const colors = ['#274c77', '#5f8dee', '#9bd87d', '#ffb36a', '#7a7de8']
    let start = 0

    return topCategories
      .map((item, index) => {
        const end = start + item.percent
        const segment = `${colors[index % colors.length]} ${start}% ${end}%`
        start = end
        return segment
      })
      .join(', ')
  }, [topCategories])

  const incomePoints = useMemo(
    () =>
      account.monthlySeries
        .map((point, index) => `${20 + index * 70},${185 - (point.income / 5000) * 120}`)
        .join(' '),
    [account.monthlySeries],
  )

  const expensePoints = useMemo(
    () =>
      account.monthlySeries
        .map((point, index) => `${20 + index * 70},${195 - (point.expenses / 3000) * 110}`)
        .join(' '),
    [account.monthlySeries],
  )

  const highestCategory = topCategories.reduce(
    (current, item) => (item.amount > current.amount ? item : current),
    topCategories[0],
  )

  const monthlyExpenseTotal = account.monthlySeries.reduce((sum, point) => sum + point.expenses, 0)
  const monthlyIncomeTotal = account.monthlySeries.reduce((sum, point) => sum + point.income, 0)
  const savingsRate = Math.round((account.savings / account.income) * 100)

  const recentActivity = useMemo(
    () =>
      account.transactions.slice(0, 5).map((transaction) => ({
        id: transaction.id,
        title: transaction.description,
        meta: `${transaction.date} · ${transaction.category}`,
        type: transaction.type,
        amount: transaction.amount,
      })),
    [account.transactions],
  )

  const weeklySeries = useMemo(() => {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const totals = Object.fromEntries(weekdays.map((day) => [day, 0]))

    account.transactions.forEach((transaction, index) => {
      const day = weekdays[index % weekdays.length]
      totals[day] += Math.abs(transaction.amount)
    })

    return weekdays.map((day) => ({ label: day, value: totals[day] }))
  }, [account.transactions])

  const monthlyExpenseBars = account.monthlySeries.map((item) => ({
    label: item.month,
    value: item.expenses,
  }))

  const activeRangeSeries = insightRange === 'weekly' ? weeklySeries : monthlyExpenseBars
  const activeRangeMax = Math.max(...activeRangeSeries.map((item) => item.value), 1)

  return {
    filteredTransactions,
    topCategories,
    breakdownGradient,
    incomePoints,
    expensePoints,
    highestCategory,
    monthlyExpenseTotal,
    monthlyIncomeTotal,
    savingsRate,
    recentActivity,
    activeRangeSeries,
    activeRangeMax,
  }
}
