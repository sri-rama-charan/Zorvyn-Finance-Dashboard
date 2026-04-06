import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

export function ExpenseIncomeTrendChart({ formatCurrency, currency, monthlySeries }) {
  const maxValue = Math.max(...monthlySeries.map((item) => Math.max(item.income, item.expenses)), 1)

  return (
    <article className="min-h-[330px] rounded-2xl border border-[#e6ebf7] bg-white p-4 shadow-sm">
      <SectionPanelHeader title="Monthly Comparison" actionLabel="Income vs Expenses" />

      <div className="mb-2 inline-flex gap-3 text-[0.8rem] text-[#4f5f97]" aria-hidden="true">
        <span className="inline-flex items-center gap-1"><i className="inline-block h-2.5 w-2.5 rounded-full bg-[#5673ff]"></i>Income</span>
        <span className="inline-flex items-center gap-1"><i className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff8d5e]"></i>Expenses</span>
      </div>

      <div className="grid min-h-[250px] grid-cols-[repeat(auto-fit,minmax(72px,1fr))] items-end gap-2">
        {monthlySeries.map((item) => (
          <div className="grid items-end justify-items-center gap-1" key={item.month}>
            <div className="flex h-[190px] w-full items-end justify-center gap-1 rounded-xl border border-[#e3e9f7] bg-gradient-to-b from-[#f8faff] to-[#eef3ff] px-1">
              <div className="w-[42%] rounded-t-md bg-gradient-to-b from-[#8ab7ff] to-[#5673ff]" style={{ height: `${(item.income / maxValue) * 100}%` }}></div>
              <div className="w-[42%] rounded-t-md bg-gradient-to-b from-[#ffb190] to-[#ff8d5e]" style={{ height: `${(item.expenses / maxValue) * 100}%` }}></div>
            </div>
            <p className="m-0 text-[0.74rem] text-[#6b7cb1]">{item.month}</p>
            <p className="m-0 text-center text-[0.68rem] text-[#4b5f95] max-[1040px]:hidden">
              {formatCurrency(item.income, currency)} / {formatCurrency(item.expenses, currency)}
            </p>
          </div>
        ))}
      </div>
    </article>
  )
}
