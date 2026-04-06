export function TransactionRow({ transaction, formatCurrency, currency }) {
  const pillTone =
    transaction.type === 'income'
      ? 'bg-[#e6f8ed] text-[#1f8b52]'
      : transaction.type === 'expense'
        ? 'bg-[#fff0eb] text-[#d86a4a]'
        : 'bg-[#edf2ff] text-[#4f67c8]'

  return (
    <div className="grid grid-cols-[1.1fr_1.5fr_0.9fr_0.75fr_0.9fr] items-center gap-2 border-t border-[#edf1fb] px-4 py-3 text-[0.84rem] text-[#283a75] odd:bg-white even:bg-[#fbfcff] max-[720px]:grid-cols-[1fr_1.2fr_1fr]" key={transaction.id}>
      <span>{transaction.date}</span>
      <span>{transaction.description}</span>
      <span>{transaction.category}</span>
      <span className={`inline-flex w-fit items-center justify-center rounded-full px-2 py-1 text-[0.72rem] font-bold capitalize max-[720px]:hidden ${pillTone}`}>{transaction.type}</span>
      <span className={`font-bold max-[720px]:hidden ${transaction.amount < 0 ? 'text-[#d86a4a]' : 'text-[#1f8b52]'}`}>
        {formatCurrency(transaction.amount, currency)}
      </span>
    </div>
  )
}
