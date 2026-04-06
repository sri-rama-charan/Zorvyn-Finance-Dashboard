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
      ? 'bg-[#e6f8ed] text-[#1f8b52]'
      : transaction.type === 'expense'
        ? 'bg-[#fff0eb] text-[#d86a4a]'
        : 'bg-[#edf2ff] text-[#4f67c8]'

  return (
    <div
      className={`relative grid items-center gap-2 border-t border-[#edf1fb] px-4 py-3 text-[0.84rem] text-[#283a75] odd:bg-white even:bg-[#fbfcff] transition-all duration-200 hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_8px_16px_rgba(25,37,86,0.08)] max-[720px]:grid-cols-[1fr_1.2fr_1fr] ${gridClassName || ''}`}
      key={transaction.id}
    >
      <span className="text-[#5f6ea3]">{transaction.date}</span>
      <span className="flex min-w-0 items-center justify-between gap-2">
        <span className="truncate">{transaction.description}</span>
        {showActions ? (
          <button
            type="button"
            onClick={onEdit}
            className="hidden rounded-full bg-[#eef2ff] px-2 py-1 text-[0.7rem] font-bold text-[#4f67c8] max-[720px]:inline-flex"
          >
            Edit
          </button>
        ) : null}
      </span>
      <span className="truncate">{transaction.category}</span>
      <span className={`inline-flex w-fit items-center justify-center rounded-full px-2 py-1 text-[0.72rem] font-bold capitalize max-[720px]:hidden ${pillTone}`}>
        {transaction.type}
      </span>
      <span className={`font-bold max-[720px]:hidden ${transaction.amount < 0 ? 'text-[#d86a4a]' : 'text-[#1f8b52]'}`}>
        {formatCurrency(transaction.amount, currency)}
      </span>
      {showActions ? (
        <div className="flex justify-end max-[720px]:hidden">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-[0.7rem] font-bold text-[#4f67c8]"
          >
            Edit
          </button>
        </div>
      ) : null}
    </div>
  )
}
