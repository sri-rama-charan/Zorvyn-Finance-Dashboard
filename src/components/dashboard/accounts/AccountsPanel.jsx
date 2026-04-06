import { useRef } from 'react'
import { PanelCard } from '../../shared/PanelCard'
import { PanelSelect } from '../../shared/PanelControls'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

export function AccountsPanel({ role, activeAccount, setActiveAccount, account, formatCurrency }) {
  const cardScrollRef = useRef(null)
  const cardThemes = [
    {
      nameMatch: 'Visa',
      label: 'VISA',
      gradient: 'from-[#1f2937] to-[#0f172a]',
      accent: '#7dd3fc',
    },
    {
      nameMatch: 'Mastercard',
      label: 'MASTERCARD',
      gradient: 'from-[#f97316] to-[#ef4444]',
      accent: '#ffd166',
    },
    {
      nameMatch: 'Virtual',
      label: 'AMEX',
      gradient: 'from-[#0ea5e9] to-[#22c55e]',
      accent: '#86efac',
    },
  ]

  const fallbackThemes = [
    {
      label: 'VISA',
      gradient: 'from-[#0f172a] to-[#1f2937]',
      accent: '#93c5fd',
    },
    {
      label: 'MASTERCARD',
      gradient: 'from-[#f97316] to-[#f43f5e]',
      accent: '#fed7aa',
    },
    {
      label: 'AMEX',
      gradient: 'from-[#06b6d4] to-[#22c55e]',
      accent: '#a7f3d0',
    },
  ]

  const cardNumbers = [account.cardNumber, '**** 4356', '**** 8012']

  const scrollCards = (direction) => {
    const el = cardScrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

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

      <div className="mb-2 flex items-center justify-between">
        <p className="m-0 text-[0.78rem] font-semibold text-[#50639b]">My cards</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollCards(-1)}
            className="grid h-7 w-7 place-items-center rounded-full border border-[#dfe6fb] bg-white text-[#5b6fa7] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(25,37,86,0.12)]"
            aria-label="Scroll cards left"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollCards(1)}
            className="grid h-7 w-7 place-items-center rounded-full border border-[#dfe6fb] bg-white text-[#5b6fa7] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(25,37,86,0.12)]"
            aria-label="Scroll cards right"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={cardScrollRef}
        className="flex gap-3 overflow-x-auto pb-2 pr-1"
        aria-label="Connected cards"
      >
        {account.cards.map((card, index) => {
          const theme =
            cardThemes.find((item) => card.name.includes(item.nameMatch)) ||
            fallbackThemes[index % fallbackThemes.length]
          const number = cardNumbers[index] || account.cardNumber

          return (
            <article
              className={`relative min-w-[220px] max-w-[240px] flex-1 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${theme.gradient} p-3 text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(15,23,42,0.22)]`}
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
                <p className="m-0 text-[0.7rem] text-white/70">EXP 09/29 · CVV 611</p>
              </div>

              <div className="relative mt-2 text-[0.78rem] font-semibold" style={{ color: theme.accent }}>
                {formatCurrency(card.amount, account.currency)}
              </div>
            </article>
          )
        })}
      </div>
    </PanelCard>
  )
}
