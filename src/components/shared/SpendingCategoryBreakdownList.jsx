export function SpendingCategoryBreakdownList({ topCategories, formatCurrency, currency }) {
  return (
    <div className="grid w-full gap-2.5">
      {topCategories.map((item) => (
        <div className="border-b border-[#edf1fb] pb-2 last:border-b-0 last:pb-0" key={item.category}>
          <div className="flex justify-between gap-2 text-[0.82rem] text-[#24366d]">
            <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-[#edf4ff] px-2 py-0.5 text-[0.72rem] font-extrabold text-[#5471d5]">{item.percent}%</span>
            <span>{item.category}</span>
            <strong>{formatCurrency(item.amount, currency)}</strong>
          </div>
        </div>
      ))}
    </div>
  )
}
