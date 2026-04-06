import { PanelSelect } from '../shared/PanelControls'

export function DashboardHeaderBar({ role, setRole, theme, setTheme, onOpenSidebar }) {
  return (
    <header className="grid items-center gap-4 border-b border-[color:var(--app-border)] px-1 pt-1 pb-3 md:grid-cols-[auto_minmax(0,1fr)] max-[720px]:grid-cols-1 max-[720px]:items-start max-[720px]:gap-5 max-[720px]:justify-items-start">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-card)] text-[color:var(--app-muted)] shadow-[0_4px_12px_rgba(31,43,95,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8d3ef] hover:bg-[color:var(--app-card-2)] md:h-[2.2rem] md:w-[2.2rem]"
          aria-label="Open sidebar"
          onClick={onOpenSidebar}
        >
          ☰
        </button>
        <h1 className="mt-0.5 text-2xl font-semibold tracking-tight text-[color:var(--app-text)] max-[720px]:text-xl max-[420px]:text-lg">
          Welcome back
        </h1>
      </div>

      <div className="flex w-full flex-nowrap items-center gap-4 overflow-x-auto pb-1 md:grid md:w-auto md:max-w-none md:grid-cols-[auto_auto_auto_auto] md:items-center md:justify-self-stretch lg:justify-self-end">
        <div className="inline-flex items-center gap-2 sm:justify-self-start max-[720px]:shrink-0" aria-label="Top bar actions">
          <button
            type="button"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-card)] text-[color:var(--app-muted)] shadow-[0_4px_12px_rgba(31,43,95,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8d3ef] hover:bg-[color:var(--app-card-2)]"
            aria-label="Notifications"
          >
            🔔
            <span className="absolute top-[0.45rem] right-[0.5rem] h-[0.45rem] w-[0.45rem] rounded-full bg-[#f1465c]" aria-hidden="true"></span>
          </button>
        </div>

        <label className="grid gap-1 text-[0.68rem] text-[color:var(--app-muted)] sm:justify-self-start max-[720px]:shrink-0" htmlFor="theme-switch">
          Theme
          <PanelSelect
            id="theme-switch"
            className="rounded-xl px-2 text-[color:var(--app-text)]"
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </PanelSelect>
        </label>

        <label className="grid gap-1 text-[0.68rem] text-[color:var(--app-muted)] sm:justify-self-start lg:justify-self-end max-[720px]:shrink-0" htmlFor="role-switch">
          Role
          <PanelSelect
            id="role-switch"
            className="rounded-xl px-2 text-[color:var(--app-text)]"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option>Viewer</option>
            <option>Admin</option>
          </PanelSelect>
        </label>

        <div className="inline-flex items-center gap-2 justify-self-end text-[0.86rem] font-bold text-[color:var(--app-text)] sm:justify-self-start max-[720px]:shrink-0">
          <div
            className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-b from-[#f7b792] to-[#e68d69] text-[0.72rem] text-white"
            aria-hidden="true"
          >
            AF
          </div>
        </div>
      </div>
    </header>
  )
}
