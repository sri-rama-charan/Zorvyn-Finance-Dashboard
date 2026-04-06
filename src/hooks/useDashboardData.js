import { useMemo } from 'react'

export function useDashboardData({
  account,
  search,
  transactionType,
  transactionStatus,
  sortBy,
  amountMin,
  amountMax,
  dateFrom,
  dateTo,
  transactionPage,
  pageSize = 10,
  insightRange,
}) {
  const filteredTransactions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const minAmount = amountMin === '' ? null : Number(amountMin)
    const maxAmount = amountMax === '' ? null : Number(amountMax)
    const fromDate = dateFrom ? new Date(dateFrom).getTime() : null
    const toDate = dateTo ? new Date(dateTo).getTime() : null

    const rows = account.transactions.filter((transaction) => {
      const matchesSearch =
        !normalizedSearch ||
        [transaction.description, transaction.category, transaction.type, transaction.status]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesType = transactionType === 'all' || transaction.type === transactionType
      const matchesStatus = transactionStatus === 'all' || transaction.status === transactionStatus
      const absAmount = Math.abs(transaction.amount)
      const matchesMin = minAmount === null || absAmount >= minAmount
      const matchesMax = maxAmount === null || absAmount <= maxAmount
      const transactionTime = new Date(transaction.date).getTime()
      const matchesFrom = fromDate === null || transactionTime >= fromDate
      const matchesTo = toDate === null || transactionTime <= toDate

      return matchesSearch && matchesType && matchesStatus && matchesMin && matchesMax && matchesFrom && matchesTo
    })

    rows.sort((first, second) => {
      if (sortBy === 'amount-desc') return Math.abs(second.amount) - Math.abs(first.amount)
      if (sortBy === 'amount-asc') return Math.abs(first.amount) - Math.abs(second.amount)

      const firstDate = new Date(first.date).getTime()
      const secondDate = new Date(second.date).getTime()
      return sortBy === 'date-asc' ? firstDate - secondDate : secondDate - firstDate
    })

    return rows
  }, [
    account.transactions,
    search,
    transactionType,
    transactionStatus,
    sortBy,
    amountMin,
    amountMax,
    dateFrom,
    dateTo,
  ])

  const { pagedTransactions, transactionPageCount, transactionTotalCount, currentPage } = useMemo(() => {
    const totalCount = filteredTransactions.length
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
    const page = Math.min(Math.max(transactionPage, 1), totalPages)
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return {
      pagedTransactions: filteredTransactions.slice(start, end),
      transactionPageCount: totalPages,
      transactionTotalCount: totalCount,
      currentPage: page,
    }
  }, [filteredTransactions, transactionPage, pageSize])

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
    filteredTransactions: pagedTransactions,
    transactionPageCount,
    transactionTotalCount,
    transactionPage: currentPage,
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
