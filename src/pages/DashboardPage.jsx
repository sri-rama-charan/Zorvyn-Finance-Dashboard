import { AppSidebar } from '../components/shared/AppSidebar'
import { DashboardHeaderBar } from '../components/dashboard/DashboardHeaderBar'
import { DashboardOverview } from '../components/dashboard/DashboardOverview'
import { DashboardPerformance } from '../components/dashboard/DashboardPerformance'
import { DashboardAccounts } from '../components/dashboard/DashboardAccounts'
import { DashboardTransactions } from '../components/dashboard/DashboardTransactions'

export function DashboardPage({
  sidebarOpen,
  setSidebarOpen,
  onOpenInsightsRoute,
  onOpenTransactionsRoute,
  role,
  setRole,
  activeAccount,
  setActiveAccount,
  account,
  formatCurrency,
  formatSignedPercent,
  monthlyIncomeTotal,
  monthlyExpenseTotal,
  savingsRate,
  incomePoints,
  expensePoints,
  breakdownGradient,
  topCategories,
  search,
  setSearch,
  transactionType,
  setTransactionType,
  sortBy,
  setSortBy,
  filteredTransactions,
  recentActivity,
}) {
  return (
    <div className="m-0 min-h-screen w-full p-0">
      <AppSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem="dashboard"
        onGoDashboard={() => setSidebarOpen(false)}
        onGoTransactions={onOpenTransactionsRoute}
        onGoInsights={onOpenInsightsRoute}
      />

      <main className="ml-[4.6rem] grid gap-4 rounded-[1.25rem] border border-[rgba(180,192,224,0.4)] bg-gradient-to-b from-[rgba(248,250,255,0.96)] to-[rgba(242,246,255,0.93)] p-5 shadow-[0_12px_32px_rgba(25,37,86,0.14)] max-[720px]:ml-0 max-[720px]:p-3">
        <DashboardHeaderBar role={role} setRole={setRole} onOpenSidebar={() => setSidebarOpen(true)} />

        <DashboardOverview
          account={account}
          formatCurrency={formatCurrency}
          formatSignedPercent={formatSignedPercent}
        />

        <DashboardPerformance
          onOpenInsightsRoute={onOpenInsightsRoute}
          account={account}
          formatCurrency={formatCurrency}
          monthlyIncomeTotal={monthlyIncomeTotal}
          monthlyExpenseTotal={monthlyExpenseTotal}
          savingsRate={savingsRate}
          incomePoints={incomePoints}
          expensePoints={expensePoints}
          breakdownGradient={breakdownGradient}
          topCategories={topCategories}
        />

        <DashboardAccounts
          role={role}
          activeAccount={activeAccount}
          setActiveAccount={setActiveAccount}
          account={account}
          formatCurrency={formatCurrency}
        />

        <DashboardTransactions
          search={search}
          setSearch={setSearch}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filteredTransactions={filteredTransactions}
          formatCurrency={formatCurrency}
          account={account}
          recentActivity={recentActivity}
        />
      </main>
    </div>
  )
}
