import { createContext, useContext, useEffect, useState } from 'react'
import { accountData } from '@/data/accountData'
import { useDashboardData } from '@/hooks/useDashboardData'
import { formatCurrency, formatSignedPercent } from '@/utils/formatters'

const AppStateContext = createContext(null)

export function AppStateProvider({ children }) {
  const [accounts, setAccounts] = useState(() => {
    if (typeof window === 'undefined') {
      return JSON.parse(JSON.stringify(accountData))
    }

    try {
      const stored = window.localStorage.getItem('zorvyn-accounts')
      if (stored) return JSON.parse(stored)
    } catch {
      // Ignore storage errors and fall back to defaults.
    }

    return JSON.parse(JSON.stringify(accountData))
  })
  const [role, setRole] = useState(() => {
    if (typeof window === 'undefined') return 'Admin'
    try {
      const stored = window.localStorage.getItem('zorvyn-role')
      return stored || 'Admin'
    } catch {
      return 'Admin'
    }
  })
  const [activeAccount, setActiveAccount] = useState('Personal INR')
  const [search, setSearch] = useState('')
  const [transactionType, setTransactionType] = useState('all')
  const [transactionStatus, setTransactionStatus] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const [amountMin, setAmountMin] = useState('')
  const [amountMax, setAmountMax] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [transactionPage, setTransactionPage] = useState(1)
  const [insightRange, setInsightRange] = useState('monthly')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const account = accounts[activeAccount] || Object.values(accounts)[0]

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem('zorvyn-accounts', JSON.stringify(accounts))
    } catch {
      // Ignore storage errors.
    }
  }, [accounts])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem('zorvyn-role', role)
    } catch {
      // Ignore storage errors.
    }
  }, [role])

  const {
    filteredTransactions,
    transactionPageCount,
    transactionTotalCount,
    topCategories,
    breakdownGradient,
    incomePoints,
    expensePoints,
    monthlyExpenseTotal,
    monthlyIncomeTotal,
    savingsRate,
    recentActivity,
  } = useDashboardData({
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
    pageSize: 10,
    insightRange,
  })

  const recalcAccountTotals = (current) => {
    const incomeTotal = current.transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)
    const expenseTotal = current.transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)
    const savingsTotal = incomeTotal - expenseTotal
    const savingsRate = incomeTotal ? Math.round((savingsTotal / incomeTotal) * 100) : 0

    return {
      ...current,
      income: incomeTotal,
      expenses: expenseTotal,
      savings: savingsTotal,
      savingsMeta: `${savingsRate}% savings rate`,
    }
  }

  const updateLimit = (limitKey, updates, accountName = activeAccount) => {
    setAccounts((prev) => {
      const current = prev[accountName]
      if (!current) return prev
      return {
        ...prev,
        [accountName]: {
          ...current,
          [limitKey]: {
            ...current[limitKey],
            ...updates,
          },
        },
      }
    })
  }

  const updateCard = (cardIndex, updates, accountName = activeAccount) => {
    setAccounts((prev) => {
      const current = prev[accountName]
      if (!current) return prev
      const nextCards = current.cards.map((card, index) =>
        index === cardIndex ? { ...card, ...updates } : card,
      )
      return {
        ...prev,
        [accountName]: {
          ...current,
          cards: nextCards,
        },
      }
    })
  }

  const addTransaction = (transaction, accountName = activeAccount) => {
    setAccounts((prev) => {
      const current = prev[accountName]
      if (!current) return prev
      const nextAccount = recalcAccountTotals({
        ...current,
        transactions: [transaction, ...current.transactions],
      })
      return {
        ...prev,
        [accountName]: nextAccount,
      }
    })
  }

  const updateTransaction = (transactionId, updates, accountName = activeAccount) => {
    setAccounts((prev) => {
      const current = prev[accountName]
      if (!current) return prev
      const nextTransactions = current.transactions.map((transaction) =>
        transaction.id === transactionId ? { ...transaction, ...updates } : transaction,
      )
      const nextAccount = recalcAccountTotals({
        ...current,
        transactions: nextTransactions,
      })
      return {
        ...prev,
        [accountName]: nextAccount,
      }
    })
  }

  const removeTransaction = (transactionId, accountName = activeAccount) => {
    setAccounts((prev) => {
      const current = prev[accountName]
      if (!current) return prev
      const nextAccount = recalcAccountTotals({
        ...current,
        transactions: current.transactions.filter((transaction) => transaction.id !== transactionId),
      })
      return {
        ...prev,
        [accountName]: nextAccount,
      }
    })
  }

  const addCard = (card, accountName = activeAccount) => {
    setAccounts((prev) => {
      const current = prev[accountName]
      if (!current) return prev
      return {
        ...prev,
        [accountName]: {
          ...current,
          cards: [...current.cards, card],
        },
      }
    })
  }

  const removeCard = (cardIndex, accountName = activeAccount) => {
    setAccounts((prev) => {
      const current = prev[accountName]
      if (!current) return prev
      return {
        ...prev,
        [accountName]: {
          ...current,
          cards: current.cards.filter((_, index) => index !== cardIndex),
        },
      }
    })
  }

  const updateAccountFields = (updates, accountName = activeAccount) => {
    setAccounts((prev) => {
      const current = prev[accountName]
      if (!current) return prev
      return {
        ...prev,
        [accountName]: {
          ...current,
          ...updates,
        },
      }
    })
  }

  const updateMonthlySeries = (series, accountName = activeAccount) => {
    setAccounts((prev) => {
      const current = prev[accountName]
      if (!current) return prev
      return {
        ...prev,
        [accountName]: {
          ...current,
          monthlySeries: series,
        },
      }
    })
  }

  const value = {
    role,
    setRole,
    activeAccount,
    setActiveAccount,
    search,
    setSearch,
    transactionType,
    setTransactionType,
    transactionStatus,
    setTransactionStatus,
    sortBy,
    setSortBy,
    amountMin,
    setAmountMin,
    amountMax,
    setAmountMax,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    transactionPage,
    setTransactionPage,
    insightRange,
    setInsightRange,
    sidebarOpen,
    setSidebarOpen,
    account,
    accounts,
    filteredTransactions,
    transactionPageCount,
    transactionTotalCount,
    topCategories,
    breakdownGradient,
    incomePoints,
    expensePoints,
    monthlyExpenseTotal,
    monthlyIncomeTotal,
    savingsRate,
    recentActivity,
    updateLimit,
    updateCard,
    addCard,
    removeCard,
    addTransaction,
    updateTransaction,
    removeTransaction,
    updateAccountFields,
    updateMonthlySeries,
    formatCurrency,
    formatSignedPercent,
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider')
  }

  return context
}
