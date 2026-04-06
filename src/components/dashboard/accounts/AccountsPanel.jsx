export function AccountsPanel({ role, activeAccount, setActiveAccount, account, formatCurrency }) {
  return (
    <article className="rounded-2xl border border-[#e6ebf7] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="m-0 text-base text-[#1f2651]">Accounts & Cards</h2>
        <button
          type="button"
          className="min-h-[2.4rem] rounded-xl border border-[#e3e8f7] bg-[#f4f6fc] px-3 text-[#4f5f97] disabled:cursor-not-allowed disabled:opacity-45"
          disabled={role === 'Viewer'}
        >
          Manage
        </button>
      </div>

      <label className="mb-3 grid gap-1" htmlFor="account-switch">
        <span className="text-[0.77rem] text-[#6b7cb1]">Active account</span>
        <select
          id="account-switch"
          className="min-h-[2.2rem] rounded-[0.68rem] border border-[#d7deef] px-2 text-[#2b3f85]"
          value={activeAccount}
          onChange={(event) => setActiveAccount(event.target.value)}
        >
          <option>Personal INR</option>
          <option>Savings EUR</option>
          <option>Travel GBP</option>
        </select>
      </label>

      <div className="grid grid-cols-3 gap-2.5 max-[1040px]:grid-cols-2 max-[720px]:grid-cols-1" aria-label="Connected cards">
        {account.cards.map((card, index) => (
          <article
            className={`rounded-xl border p-2.5 ${
              index === 0
                ? 'border-[#b7d6a5] bg-gradient-to-b from-[#f5fff2] to-[#effceb]'
                : 'border-[#e0e7f8] bg-[#fbfcff]'
            }`}
            key={card.name}
          >
            <p className="m-0 text-[0.73rem] text-[#5f72aa]">{card.name}</p>
            <p className="mt-1 text-[1.02rem] font-bold text-[#1e2d68]">{formatCurrency(card.amount, account.currency)}</p>
            <p className={`mt-1 text-[0.72rem] ${card.state === 'Inactive' ? 'text-[#be6f5c]' : 'text-[#2f925f]'}`}>{card.state}</p>
          </article>
        ))}
      </div>
    </article>
  )
}
