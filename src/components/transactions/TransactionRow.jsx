export function TransactionRow({
  transaction,
  formatCurrency,
  currency,
  showActions = false,
  onEdit,
  gridClassName,
}) {
  const pillTone =
    transaction.type === 'income'
      ? 'bg-[color:var(--app-card-2)] text-[#1f8b52]'
      : transaction.type === 'expense'
        ? 'bg-[color:var(--app-card-2)] text-[#d86a4a]'
        : 'bg-[color:var(--app-card-2)] text-[#4f67c8]'

  return (
    <div
      className={`w-full relative grid items-center gap-2 border-t border-[color:var(--app-border)] px-4 py-3 text-[0.84rem] text-[color:var(--app-text)] odd:bg-[color:var(--app-card)] even:bg-[color:var(--app-card-2)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[color:var(--app-card)] hover:shadow-[0_8px_16px_rgba(25,37,86,0.08)] ${gridClassName || ''}`}
      key={transaction.id}
    >
      <span className="text-[color:var(--app-muted)]">{transaction.date}</span>
      <span className="truncate">{transaction.description}</span>
      <span className="truncate">{transaction.category}</span>
      <span className={`inline-flex w-fit items-center justify-center rounded-full px-2 py-1 text-[0.72rem] font-bold capitalize ${pillTone}`}>
        {transaction.type}
      </span>
      <span className={`font-bold ${transaction.amount < 0 ? 'text-[#d86a4a]' : 'text-[#1f8b52]'}`}>
        {formatCurrency(transaction.amount, currency)}
      </span>
      {showActions ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full bg-[color:var(--app-card-2)] px-2.5 py-1 text-[0.7rem] font-bold text-[#4f67c8]"
          >
            Edit
          </button>
        </div>
      ) : null}
    </div>
  )
}
