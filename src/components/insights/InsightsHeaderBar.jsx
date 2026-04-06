import { PanelSelect } from '../shared/PanelControls'

export function InsightsHeaderBar({ theme, setTheme, onBackToDashboardRoute }) {
  return (
    <header className="grid items-center gap-4 border-b border-[color:var(--app-border)] px-1 pt-1 pb-3 md:grid-cols-[auto_minmax(0,1fr)]">
      <div>
        <p className="m-0 text-[0.72rem] uppercase tracking-[0.08em] text-[color:var(--app-muted)]">Detailed Insights</p>
        <h1 className="mt-0.5 text-2xl font-semibold tracking-tight text-[color:var(--app-text)] max-[720px]:text-xl">Spending Breakdown</h1>
      </div>

      <div className="grid w-auto max-w-none items-center gap-2 justify-self-end sm:grid-cols-[auto_auto]">
        <label className="grid gap-1 text-[0.68rem] text-[color:var(--app-muted)]" htmlFor="insights-theme-switch">
          Theme
          <PanelSelect
            id="insights-theme-switch"
            className="rounded-xl px-2 text-[color:var(--app-text)]"
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </PanelSelect>
        </label>
        <button
          type="button"
          className="w-auto rounded-xl border border-[color:var(--app-border)] bg-[color:var(--app-card-2)] px-3 py-2 text-[0.82rem] font-semibold text-[color:var(--app-muted)] shadow-[0_6px_14px_rgba(31,43,95,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--app-card)]"
          onClick={onBackToDashboardRoute}
        >
          Back to dashboard
        </button>
      </div>
    </header>
  )
}
