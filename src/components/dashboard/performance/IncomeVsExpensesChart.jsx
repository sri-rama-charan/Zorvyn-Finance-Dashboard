import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

export function IncomeVsExpensesChart({
  account,
  formatCurrency,
  monthlyIncomeTotal,
  monthlyExpenseTotal,
  savingsRate,
  incomePoints,
  expensePoints,
}) {
  return (
    <article className="rounded-2xl border border-[#e6ebf7] bg-white p-4 shadow-sm">
      <SectionPanelHeader title="Income vs Expenses" actionLabel="Monthly" />

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-[0.85rem] border border-[#e4ebfa] bg-gradient-to-b from-[#f8faff] to-[#f3f7ff] p-3">
          <p className="m-0 text-[0.76rem] text-[#6f7eb0]">Net trend</p>
          <p className="mt-1 text-[1.2rem] font-extrabold text-[#223671]">
            {formatCurrency(monthlyIncomeTotal - monthlyExpenseTotal, account.currency)}
          </p>
        </div>
        <div className="rounded-[0.85rem] border border-[#e4ebfa] bg-gradient-to-b from-[#f8faff] to-[#f3f7ff] p-3">
          <p className="m-0 text-[0.76rem] text-[#6f7eb0]">Savings rate</p>
          <p className="mt-1 text-[1.2rem] font-extrabold text-[#223671]">{savingsRate}%</p>
        </div>
      </div>

      <div className="mb-2 flex gap-4 text-[0.82rem] text-[#4f5f97]" aria-hidden="true">
        <span className="inline-flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-full bg-[#5673ff]"></i>Income</span>
        <span className="inline-flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff8d5e]"></i>Expenses</span>
      </div>

      <svg className="min-h-[170px] w-full rounded-xl border border-[#e2e8f8] bg-gradient-to-b from-[#f8faff] to-[#f3f7ff]" viewBox="0 0 640 220" role="img" aria-label="Income and expenses trend over months">
        <line x1="20" y1="60" x2="620" y2="60" stroke="#e7ecf8" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="110" x2="620" y2="110" stroke="#e7ecf8" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="160" x2="620" y2="160" stroke="#e7ecf8" strokeWidth="1" strokeDasharray="4 4" />
        <polyline points={incomePoints} fill="none" stroke="#5673ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={expensePoints} fill="none" stroke="#ff8d5e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="mt-2 grid grid-cols-9 text-[0.72rem] text-[#7181b6] max-[720px]:grid-cols-5 max-[720px]:gap-y-1" aria-hidden="true">
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
      </div>
    </article>
  )
}
