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
  } = useAppState()

  return (
    <div className="m-0 min-h-screen w-full p-0">
      <AppSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem="transactions"
        onGoDashboard={() => navigate('/')}
        onGoTransactions={() => setSidebarOpen(false)}
        onGoInsights={() => navigate('/insights')}
      />

      <main className="ml-[4.6rem] grid gap-4 rounded-[1.25rem] border border-[rgba(180,192,224,0.4)] bg-gradient-to-b from-[rgba(248,250,255,0.96)] to-[rgba(242,246,255,0.93)] p-5 shadow-[0_12px_32px_rgba(25,37,86,0.14)] max-[720px]:ml-0 max-[720px]:p-3">
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
          />
        </section>
      </main>
    </div>
  )
}
