import { useNavigate } from 'react-router-dom'
import { AppSidebar } from '../components/shared/AppSidebar'
import { DashboardHeaderBar } from '../components/dashboard/DashboardHeaderBar'
import { TransactionsPanel } from '../components/transactions/TransactionsPanel'
import { useAppState } from '@/context/AppStateContext'

export function TransactionsPage() {
  const navigate = useNavigate()
  const {
    sidebarOpen,
    setSidebarOpen,
    role,
    setRole,
    search,
    setSearch,
    transactionType,
    setTransactionType,
    sortBy,
    setSortBy,
    filteredTransactions,
    formatCurrency,
    account,
    addTransaction,
    updateTransaction,
    removeTransaction,
    transactionStatus,
    setTransactionStatus,
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
    transactionPageCount,
    transactionTotalCount,
  } = useAppState()

  const handleGoDashboard = () => {
    setSidebarOpen(false)
    navigate('/')
  }
  const handleGoTransactions = () => setSidebarOpen(false)
  const handleGoInsights = () => {
    setSidebarOpen(false)
    navigate('/insights')
  }

  return (
    <div className="m-0 min-h-screen w-full p-0">
      <AppSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem="transactions"
        onGoDashboard={handleGoDashboard}
        onGoTransactions={handleGoTransactions}
        onGoInsights={handleGoInsights}
      />

      <main className="ml-[4.6rem] grid gap-4 rounded-[1.25rem] border border-[rgba(180,192,224,0.4)] bg-gradient-to-b from-[rgba(248,250,255,0.96)] to-[rgba(242,246,255,0.93)] p-5 shadow-[0_12px_32px_rgba(25,37,86,0.14)] max-[1024px]:gap-3 max-[720px]:ml-0 max-[720px]:gap-3 max-[720px]:p-3 max-[480px]:gap-2 max-[480px]:p-2">
        <DashboardHeaderBar role={role} setRole={setRole} onOpenSidebar={() => setSidebarOpen(true)} />

        <section>
          <TransactionsPanel
            search={search}
            setSearch={setSearch}
            transactionType={transactionType}
            setTransactionType={setTransactionType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filteredTransactions={filteredTransactions}
            formatCurrency={formatCurrency}
            currency={account.currency}
            role={role}
            onAddTransaction={addTransaction}
            onUpdateTransaction={updateTransaction}
            onRemoveTransaction={removeTransaction}
            transactionStatus={transactionStatus}
            setTransactionStatus={setTransactionStatus}
            amountMin={amountMin}
            setAmountMin={setAmountMin}
            amountMax={amountMax}
            setAmountMax={setAmountMax}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
            transactionPage={transactionPage}
            setTransactionPage={setTransactionPage}
            transactionPageCount={transactionPageCount}
            transactionTotalCount={transactionTotalCount}
          />
        </section>
      </main>
    </div>
  )
}
