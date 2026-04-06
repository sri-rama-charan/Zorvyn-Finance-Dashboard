export function TransactionsAdvancedFilters({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  amountMin,
  setAmountMin,
  amountMax,
  setAmountMax,
  setTransactionPage,
  className,
}) {
  return (
    <div className={`mb-3 grid grid-cols-[1fr_1fr_1fr_1fr] gap-2 max-[1040px]:grid-cols-2 max-[720px]:grid-cols-1 ${className || ''}`}>
      <input
        type="date"
        value={dateFrom}
        onChange={(event) => {
          setDateFrom(event.target.value)
          setTransactionPage(1)
        }}
        className="rounded-xl border border-[#e1e7f6] bg-white px-3 py-2 text-[0.78rem] text-[#2b3f85] placeholder:text-[#8a97c6] shadow-[0_2px_6px_rgba(34,55,111,0.05)] transition-colors duration-200 hover:border-[#c8d3ef] focus:border-[#9fb1e6] focus:outline-none"
        placeholder="From"
      />
      <input
        type="date"
        value={dateTo}
        onChange={(event) => {
          setDateTo(event.target.value)
          setTransactionPage(1)
        }}
        className="rounded-xl border border-[#e1e7f6] bg-white px-3 py-2 text-[0.78rem] text-[#2b3f85] placeholder:text-[#8a97c6] shadow-[0_2px_6px_rgba(34,55,111,0.05)] transition-colors duration-200 hover:border-[#c8d3ef] focus:border-[#9fb1e6] focus:outline-none"
        placeholder="To"
      />
      <input
        type="number"
        min="0"
        value={amountMin}
        onChange={(event) => {
          setAmountMin(event.target.value)
          setTransactionPage(1)
        }}
        className="rounded-xl border border-[#e1e7f6] bg-white px-3 py-2 text-[0.78rem] text-[#2b3f85] placeholder:text-[#8a97c6] shadow-[0_2px_6px_rgba(34,55,111,0.05)] transition-colors duration-200 hover:border-[#c8d3ef] focus:border-[#9fb1e6] focus:outline-none"
        placeholder="Min amount"
      />
      <input
        type="number"
        min="0"
        value={amountMax}
        onChange={(event) => {
          setAmountMax(event.target.value)
          setTransactionPage(1)
        }}
        className="rounded-xl border border-[#e1e7f6] bg-white px-3 py-2 text-[0.78rem] text-[#2b3f85] placeholder:text-[#8a97c6] shadow-[0_2px_6px_rgba(34,55,111,0.05)] transition-colors duration-200 hover:border-[#c8d3ef] focus:border-[#9fb1e6] focus:outline-none"
        placeholder="Max amount"
      />
    </div>
  )
}
