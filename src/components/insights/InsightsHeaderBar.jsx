export function InsightsHeaderBar({ onBackToDashboardRoute }) {
  return (
    <header className="grid items-center gap-4 border-b border-slate-200/70 px-1 pt-1 pb-3 md:grid-cols-[auto_minmax(0,1fr)]">
      <div>
        <p className="m-0 text-[0.72rem] uppercase tracking-[0.08em] text-[#5f6ea3]">Detailed Insights</p>
        <h1 className="mt-0.5 text-2xl font-semibold tracking-tight text-slate-900 max-[720px]:text-xl">Spending Breakdown</h1>
      </div>

      <div className="grid w-auto max-w-none items-center gap-2 justify-self-end">
        <button
          type="button"
          className="w-auto rounded-xl border border-[#d7deef] bg-[#f4f6fc] px-3 py-2 text-[0.82rem] font-semibold text-[#4f5f97] shadow-[0_6px_14px_rgba(31,43,95,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#eef2fb]"
          onClick={onBackToDashboardRoute}
        >
          Back to dashboard
        </button>
      </div>
    </header>
  )
}
