import { TransactionRow } from './TransactionRow'

export function TransactionsTable({
  filteredTransactions,
  formatCurrency,
  currency,
  showActions,
  onEdit,
  gridClassName,
}) {
  return (
    <div className="mt-2 overflow-x-auto rounded-[0.95rem] border border-[color:var(--app-border)]">
      <div className="min-w-[760px]">
        <div className={`w-full grid items-center gap-2 rounded-t-[0.9rem] border-b border-[color:var(--app-border)] bg-[color:var(--app-card-2)] px-4 py-3 text-[0.74rem] font-bold tracking-[0.06em] text-[color:var(--app-muted)] uppercase ${gridClassName}`}>
          <span>Date</span><span>Description</span><span>Category</span><span>Type</span><span>Amount</span>{showActions ? <span className="text-right">Actions</span> : null}
        </div>

        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              formatCurrency={formatCurrency}
              currency={currency}
              showActions={showActions}
              onEdit={() => onEdit(transaction)}
              gridClassName={gridClassName}
            />
          ))
        ) : (
          <div className="p-4 text-center text-[0.88rem] text-[color:var(--app-muted)]">No transactions match the current filters.</div>
        )}
      </div>
    </div>
  )
}
