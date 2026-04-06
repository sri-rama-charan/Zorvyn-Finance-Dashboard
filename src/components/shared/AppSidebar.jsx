export function AppSidebar({
  sidebarOpen,
  setSidebarOpen,
  activeItem,
  onGoDashboard,
  onGoTransactions,
  onGoInsights,
}) {
  const isCollapsed = !sidebarOpen

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: '⌂', onClick: onGoDashboard },
    { key: 'transactions', label: 'Transactions', icon: '↔', onClick: onGoTransactions },
    { key: 'insights', label: 'Insights', icon: '✦', onClick: onGoInsights },
  ]

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[rgba(22,30,56,0.18)] backdrop-blur-[2px] transition-opacity duration-200 ${
          sidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      ></div>

      <aside
        className={`group fixed inset-y-0 left-0 z-50 flex flex-col items-stretch gap-4 border-r border-[#dbe5c9] bg-gradient-to-b from-[#eaf2d9] to-[#eff8e7] text-[#23473f] shadow-[inset_-1px_0_0_rgba(255,255,255,0.8)] transition-all duration-200 max-[720px]:w-[min(86vw,16rem)] ${
          isCollapsed
            ? 'w-[4.6rem] px-2 py-3 hover:w-[14.5rem] hover:px-4 hover:py-4'
            : 'w-[14.5rem] px-4 py-4'
        }`}
      >
        <button
          type="button"
          className={`absolute top-[0.65rem] right-[0.65rem] grid h-[1.9rem] w-[1.9rem] place-items-center rounded-full border-0 bg-[rgba(24,56,47,0.08)] text-[#18382f] ${
            isCollapsed ? 'hidden group-hover:grid' : 'grid'
          }`}
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          ✕
        </button>

        <div className={`flex items-center gap-2 px-1 pt-1 pb-1.5 font-extrabold text-[#18382f] ${isCollapsed ? 'justify-center group-hover:justify-start' : ''}`}>
          <span
            className="grid h-[1.7rem] w-[1.7rem] place-items-center rounded-[0.55rem] bg-[#173e36] text-[0.65rem] text-[#eaf7e1]"
            aria-hidden="true"
          >
            ●●
          </span>
          <span className={`text-[0.98rem] tracking-[-0.02em] ${isCollapsed ? 'hidden group-hover:inline' : 'inline'}`}>Zorvyn</span>
        </div>

        <nav className={`flex w-full flex-col gap-1 ${isCollapsed ? 'items-center group-hover:items-stretch' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`relative flex items-center gap-3 border-0 text-left transition-colors ${
                activeItem === item.key
                  ? 'bg-[#baf091] text-[#18382f] font-bold'
                  : 'bg-transparent text-[#4d5f55] hover:bg-[#baf091] hover:text-[#18382f] hover:font-bold'
              } ${
                isCollapsed
                  ? 'h-[2.8rem] w-[2.8rem] justify-center rounded-[0.9rem] p-0 group-hover:h-auto group-hover:w-auto group-hover:justify-start group-hover:rounded-full group-hover:px-3 group-hover:py-2.5'
                  : 'rounded-full px-3 py-2.5'
              }`}
              type="button"
              onClick={item.onClick}
            >
              <span className={`text-center opacity-85 ${isCollapsed ? 'w-auto text-[0.92rem] group-hover:w-[1.05rem] group-hover:text-base' : 'w-[1.05rem]'}`}>{item.icon}</span>
              <span className={`flex-1 ${isCollapsed ? 'hidden group-hover:inline' : 'inline'} max-[720px]:inline`}>{item.label}</span>
            </button>
          ))}
        </nav>

        <article
          className={`mt-auto rounded-2xl bg-[#204e45] p-4 text-[#eaf7e1] shadow-[0_14px_24px_rgba(24,56,47,0.18)] ${
            isCollapsed ? 'hidden group-hover:grid group-hover:gap-4 max-[720px]:grid max-[720px]:gap-4' : 'grid gap-4'
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="grid h-[1.8rem] w-[1.8rem] place-items-center rounded-lg bg-[rgba(255,255,255,0.1)]">🔒</span>
            <div>
              <p className="m-0 text-[0.82rem] font-bold">Gain full access</p>
              <p className="mt-1 text-[0.74rem] leading-[1.45] text-[rgba(234,247,225,0.78)]">Unlock advanced analytics and graphs</p>
            </div>
          </div>
          <button
            type="button"
            className="min-h-[2.6rem] rounded-[0.8rem] border-0 bg-[#baf091] font-extrabold text-[#18382f]"
          >
            Get Pro
          </button>
        </article>
      </aside>
    </>
  )
}
