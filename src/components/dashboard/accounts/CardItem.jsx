export function CardItem({ card, theme, number, currency, formatCurrency, role, onEdit }) {
  return (
    <article
      className={`relative min-w-[220px] max-w-[240px] flex-1 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${theme.gradient} p-3 text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(15,23,42,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60`}
      key={card.name}
      role="button"
      tabIndex={0}
    >
      <span className="pointer-events-none absolute -right-8 -bottom-10 h-[120px] w-[120px] rounded-full bg-white/10"></span>
      <div className="relative flex items-start justify-between">
        <p className="m-0 text-[0.72rem] text-white/80">{card.name}</p>
        <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${card.state === 'Inactive' ? 'bg-white/15 text-white/70' : 'bg-white/25 text-white'}`}>
          {card.state}
        </span>
      </div>

      <div className="relative mt-3 flex items-center justify-between">
        <div className="h-7 w-10 rounded-md border border-white/40 bg-white/15"></div>
        {theme.label === 'MASTERCARD' ? (
          <div className="flex items-center">
            <span className="h-4 w-4 rounded-full bg-[#ff5f5f]"></span>
            <span className="-ml-2 h-4 w-4 rounded-full bg-[#ffb36a]"></span>
          </div>
        ) : (
          <span className="text-[0.72rem] font-bold tracking-[0.14em] text-white">{theme.label}</span>
        )}
      </div>

      <div className="relative mt-3 grid gap-1">
        <p className="m-0 text-[0.8rem] tracking-[0.16em] text-white/90">{number}</p>
        <p className="m-0 text-[0.7rem] text-white/70">EXP 09/29 / CVV 611</p>
      </div>

      <div className="relative mt-2 text-[0.78rem] font-semibold" style={{ color: theme.accent }}>
        {formatCurrency(card.amount, currency)}
      </div>

      {role === 'Admin' ? (
        <div className="relative mt-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full bg-white/20 px-2 py-1 text-[0.65rem] font-semibold text-white"
          >
            Edit
          </button>
        </div>
      ) : null}
    </article>
  )
}
