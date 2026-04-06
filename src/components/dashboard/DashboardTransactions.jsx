import { TransactionsPanel } from './transactions/TransactionsPanel'
import { ActivityPanel } from './transactions/ActivityPanel'

export function DashboardTransactions({
  search,
  setSearch,
  transactionType,
  setTransactionType,
  sortBy,
  setSortBy,
  filteredTransactions,
  formatCurrency,
  account,
  recentActivity,
}) {
  return (
    <section className="grid gap-3 [grid-template-columns:1.35fr_1fr] max-[1040px]:grid-cols-1">
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
      <ActivityPanel recentActivity={recentActivity} />
    </section>
  )
}
