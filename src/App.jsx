import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { accountData } from './data/accountData'
import { formatCurrency, formatSignedPercent } from './utils/formatters'
import { useDashboardData } from './hooks/useDashboardData'
import { DashboardPage } from './pages/DashboardPage'
import { InsightsPage } from './pages/InsightsPage'

function App() {
  const [role, setRole] = useState('Viewer')
  const [activeAccount, setActiveAccount] = useState('Personal INR')
  const [search, setSearch] = useState('')
  const [transactionType, setTransactionType] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const [insightRange, setInsightRange] = useState('monthly')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardPage
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onOpenInsightsRoute={() => navigate('/insights')}
            onOpenTransactionsRoute={() => navigate('/')}
            role={role}
            setRole={setRole}
            activeAccount={activeAccount}
            setActiveAccount={setActiveAccount}
            account={account}
            formatCurrency={formatCurrency}
            formatSignedPercent={formatSignedPercent}
            monthlyIncomeTotal={monthlyIncomeTotal}
            monthlyExpenseTotal={monthlyExpenseTotal}
            savingsRate={savingsRate}
            incomePoints={incomePoints}
            expensePoints={expensePoints}
            breakdownGradient={breakdownGradient}
            topCategories={topCategories}
            search={search}
            setSearch={setSearch}
            transactionType={transactionType}
            setTransactionType={setTransactionType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filteredTransactions={filteredTransactions}
            recentActivity={recentActivity}
          />
        }
      />
      <Route
        path="/insights"
        element={
          <InsightsPage
            onBackToDashboardRoute={() => navigate('/')}
            onOpenInsightsRoute={() => navigate('/insights')}
            onOpenTransactionsRoute={() => navigate('/')}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            insightRange={insightRange}
            setInsightRange={setInsightRange}
            account={account}
            formatCurrency={formatCurrency}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
