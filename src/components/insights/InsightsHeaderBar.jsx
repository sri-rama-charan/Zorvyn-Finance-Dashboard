function InsightRangeButton({ selected, label, onClick }) {
  return (
    <button
      type="button"
      className={
        selected
          ? 'rounded-full bg-gradient-to-b from-white to-[#eef3ff] px-3 py-2 font-bold text-[#21408f] shadow-[0_4px_14px_rgba(51,70,157,0.08)]'
          : 'rounded-full bg-transparent px-3 py-2 font-bold text-[#5c6fa7]'
      }
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export function InsightsHeaderBar({ onBackToDashboardRoute, insightRange, setInsightRange }) {
  return (
    <header className="grid items-center gap-4 border-b border-slate-200/70 px-1 pt-1 pb-3 md:grid-cols-[auto_minmax(0,1fr)]">
      <div>
        <p className="m-0 text-[0.72rem] uppercase tracking-[0.08em] text-[#5f6ea3]">Detailed Insights</p>
        <h1 className="mt-0.5 text-2xl leading-tight text-slate-900">Spending Breakdown</h1>
      </div>

      <div className="grid w-auto max-w-none items-center gap-2 justify-self-end sm:grid-cols-[auto_auto] sm:justify-self-stretch lg:justify-self-end">
        <button
          type="button"
          className="w-auto rounded-xl border border-[#d7deef] bg-[#f4f6fc] px-3 py-2 text-[0.82rem] text-[#4f5f97]"
          onClick={onBackToDashboardRoute}
        >
          Back to dashboard
        </button>
        <div
          className="inline-flex gap-1 rounded-full border border-[#d7deef] bg-[#f8faff] p-1 max-[720px]:w-full max-[720px]:justify-center"
          role="tablist"
          aria-label="Insight range"
        >
          <InsightRangeButton selected={insightRange === 'weekly'} label="Weekly" onClick={() => setInsightRange('weekly')} />
          <InsightRangeButton selected={insightRange === 'monthly'} label="Monthly" onClick={() => setInsightRange('monthly')} />
        </div>
      </div>
    </header>
  )
}
