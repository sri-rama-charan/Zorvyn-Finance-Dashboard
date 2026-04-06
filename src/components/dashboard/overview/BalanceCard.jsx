export function BalanceCard({ account, formatCurrency }) {
  return (
    <article className="relative flex min-h-[188px] flex-col justify-center overflow-hidden rounded-2xl border-0 bg-[linear-gradient(142deg,#ff7e4f,#ff9f5f_57%,#ffb675_100%)] p-4 text-[#fffdf9] shadow-[0_14px_26px_rgba(255,127,79,0.28)]">
      <span className="pointer-events-none absolute -right-10 -bottom-14 h-[190px] w-[190px] rounded-full bg-[radial-gradient(circle,rgba(95,36,50,0.42),rgba(95,36,50,0))]" aria-hidden="true"></span>
      <p className="m-0 text-[0.78rem] text-[#fff1e5]">Total Balance</p>
      <p className="mt-1 mb-1 text-[1.75rem] font-bold text-white">{formatCurrency(account.balance, account.currency)}</p>
      <p className="m-0 text-[0.75rem] text-[#fff1e5]">{account.balanceDelta}</p>
      <p className="mt-3 text-[0.84rem] tracking-[0.08em] text-[#fff5ec]">{account.cardNumber}</p>
    </article>
  )
}
