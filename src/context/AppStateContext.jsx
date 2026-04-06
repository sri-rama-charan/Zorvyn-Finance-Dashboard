import { createContext, useContext, useState } from 'react'
import { accountData } from '@/data/accountData'
import { useDashboardData } from '@/hooks/useDashboardData'
import { formatCurrency, formatSignedPercent } from '@/utils/formatters'

const AppStateContext = createContext(null)

export function AppStateProvider({ children }) {
  const [role, setRole] = useState('Viewer')
  const [activeAccount, setActiveAccount] = useState('Personal INR')
  const [search, setSearch] = useState('')
  const [transactionType, setTransactionType] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const [insightRange, setInsightRange] = useState('monthly')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const account = accountData[activeAccount]

  const {
    filteredTransactions,
    topCategories,
    breakdownGradient,
    incomePoints,
    expensePoints,
    monthlyExpenseTotal,
    monthlyIncomeTotal,
    savingsRate,
    recentActivity,
  } = useDashboardData({ account, search, transactionType, sortBy, insightRange })

  const value = {
    role,
    setRole,
    activeAccount,
    setActiveAccount,
    search,
    setSearch,
    transactionType,
    setTransactionType,
    sortBy,
    setSortBy,
    insightRange,
    setInsightRange,
    sidebarOpen,
    setSidebarOpen,
    account,
    filteredTransactions,
    topCategories,
    breakdownGradient,
    incomePoints,
    expensePoints,
    monthlyExpenseTotal,
    monthlyIncomeTotal,
    savingsRate,
    recentActivity,
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
