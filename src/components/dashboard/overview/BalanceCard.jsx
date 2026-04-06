export function BalanceCard({ account, formatCurrency, role, onEditSummary }) {
  if (role === 'Viewer') {
    return (
      <article className="flex min-h-[188px] flex-col justify-center gap-2 rounded-2xl border border-[#dfe6fb] bg-gradient-to-b from-white to-[#f9fbff] p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(25,37,86,0.12)]">
        <p className="m-0 text-[0.78rem] text-[#6b7cb1]">Total Balance</p>
        <p className="m-0 text-[1.75rem] font-bold tracking-tight text-[#1d2758]">
          {formatCurrency(account.balance, account.currency)}
        </p>
        <p className="m-0 text-[0.75rem] text-[#7080b5]">{account.balanceDelta}</p>
      </article>
    )
  }

  const brandLabel = account.currency === 'INR' ? 'VISA' : account.currency === 'EUR' ? 'MASTERCARD' : 'AMEX'

  return (
    <article className="relative flex min-h-[188px] flex-col justify-between overflow-hidden rounded-2xl border-0 bg-[linear-gradient(142deg,#ff7e4f,#ff9f5f_57%,#ffb675_100%)] p-4 text-[#fffdf9] shadow-[0_14px_26px_rgba(255,127,79,0.28)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,127,79,0.32)]">
      <span className="pointer-events-none absolute -right-10 -bottom-14 h-[190px] w-[190px] rounded-full bg-[radial-gradient(circle,rgba(95,36,50,0.42),rgba(95,36,50,0))]" aria-hidden="true"></span>

      <div className="flex items-start justify-between">
        <div>
          <p className="m-0 text-[0.78rem] text-[#fff1e5]">Total Balance</p>
          <p className="mt-1 mb-1 text-[1.75rem] font-bold tracking-tight text-white">{formatCurrency(account.balance, account.currency)}</p>
          <p className="m-0 text-[0.75rem] text-[#fff1e5]">{account.balanceDelta}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-white/20 px-2 py-1 text-[0.7rem] font-semibold text-white">Active</span>
          {onEditSummary ? (
            <button
              type="button"
              onClick={onEditSummary}
              className="rounded-full bg-white/20 px-2 py-1 text-[0.68rem] font-semibold text-white transition-all duration-200 hover:bg-white/30"
            >
              Edit
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-12 rounded-md border border-white/40 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"></div>
          <div className="flex items-center gap-1.5">
            <span className="h-4 w-[2px] rounded-full bg-white/70"></span>
            <span className="h-5 w-[2px] rounded-full bg-white/60"></span>
            <span className="h-6 w-[2px] rounded-full bg-white/50"></span>
          </div>
        </div>
        <div className="text-right">
          {brandLabel === 'MASTERCARD' ? (
            <div className="flex items-center justify-end">
              <span className="h-5 w-5 rounded-full bg-[#ff5f5f]"></span>
              <span className="-ml-2 h-5 w-5 rounded-full bg-[#ffb36a]"></span>
            </div>
          ) : (
            <span className="text-[0.78rem] font-bold tracking-[0.16em] text-white">{brandLabel}</span>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <p className="m-0 text-[0.84rem] tracking-[0.16em] text-[#fff5ec]">{account.cardNumber}</p>
        <div className="flex items-center gap-6 text-[0.72rem] text-[#fff1e5]">
          <span>EXP 09/29</span>
          <span>CVV 611</span>
        </div>
      </div>
    </article>
  )
}
