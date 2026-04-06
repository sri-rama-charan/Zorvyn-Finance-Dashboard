import { PanelCard } from '../../shared/PanelCard'
import { PanelSelect } from '../../shared/PanelControls'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

export function AccountsPanel({ role, activeAccount, setActiveAccount, account, formatCurrency }) {
  return (
    <PanelCard>
      <SectionPanelHeader title="Accounts & Cards" actionLabel="Manage" actionDisabled={role === 'Viewer'} />

      <label className="mb-3 grid gap-1" htmlFor="account-switch">
        <span className="text-[0.77rem] text-[#6b7cb1]">Active account</span>
        <PanelSelect
          id="account-switch"
          className="rounded-[0.68rem] px-2"
          value={activeAccount}
          onChange={(event) => setActiveAccount(event.target.value)}
        >
          <option>Personal INR</option>
          <option>Savings EUR</option>
          <option>Travel GBP</option>
        </PanelSelect>
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
    </PanelCard>
  )
}
