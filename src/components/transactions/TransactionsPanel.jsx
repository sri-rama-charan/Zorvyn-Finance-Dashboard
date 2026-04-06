import { SectionPanelHeader } from '../shared/SectionPanelHeader'
import { TransactionRow } from './TransactionRow'
import { PanelCard } from '../shared/PanelCard'
import { PanelInput, PanelSelect } from '../shared/PanelControls'

export function TransactionsPanel({
  search,
  setSearch,
  transactionType,
  setTransactionType,
  sortBy,
  setSortBy,
  filteredTransactions,
  formatCurrency,
  currency,
}) {
  return (
    <PanelCard>
      <SectionPanelHeader title="Recent Transactions" actionLabel="View all" />
      <div className="mb-3 flex gap-2">
        <PanelInput
          type="search"
          placeholder="Search transactions"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <PanelSelect value={transactionType} onChange={(event) => setTransactionType(event.target.value)}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="transfer">Transfer</option>
        </PanelSelect>

        <PanelSelect value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Largest amount</option>
          <option value="amount-asc">Smallest amount</option>
        </PanelSelect>
      </div>

      <div className="overflow-visible rounded-[0.95rem] border border-[#e3e9f7]">
        <div className="grid grid-cols-[1.1fr_1.5fr_0.9fr_0.75fr_0.9fr] items-center gap-2 bg-[#f5f8ff] px-4 py-3 text-[0.75rem] font-bold tracking-[0.04em] text-[#6a7caf] uppercase max-[720px]:grid-cols-[1fr_1.2fr_1fr]">
          <span>Date</span><span>Description</span><span>Category</span><span className="max-[720px]:hidden">Type</span><span className="max-[720px]:hidden">Amount</span>
        </div>

        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              formatCurrency={formatCurrency}
              currency={currency}
            />
          ))
        ) : (
          <div className="p-4 text-center text-[0.88rem] text-[#678]">No transactions match the current filters.</div>
        )}
      </div>
    </PanelCard>
  )
}
