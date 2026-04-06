import { useRef } from 'react'
import { CardItem } from './CardItem'

export function CardCarousel({
  role,
  account,
  formatCurrency,
  cardThemes,
  fallbackThemes,
  onAddCard,
  onEditCard,
}) {
  const cardScrollRef = useRef(null)
  const cardNumbers = [account.cardNumber, '**** 4356', '**** 8012']

  const scrollCards = (direction) => {
    const el = cardScrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  const getCardNumber = (index) => {
    if (cardNumbers[index]) return cardNumbers[index]
    const lastFour = String(3728 + index * 418).slice(-4)
    return `**** ${lastFour}`
  }

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <p className="m-0 text-[0.78rem] font-semibold text-[#50639b]">My cards</p>
        <div className="flex items-center gap-2">
          {role === 'Admin' ? (
            <button
              type="button"
              onClick={onAddCard}
              className="rounded-full border border-[#dfe6fb] bg-white px-2.5 py-1 text-[0.7rem] font-bold text-[#4f67c8] shadow-sm"
            >
              Add card
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => scrollCards(-1)}
            className="grid h-7 w-7 place-items-center rounded-full border border-[#dfe6fb] bg-white text-[#5b6fa7] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(25,37,86,0.12)]"
            aria-label="Scroll cards left"
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={() => scrollCards(1)}
            className="grid h-7 w-7 place-items-center rounded-full border border-[#dfe6fb] bg-white text-[#5b6fa7] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(25,37,86,0.12)]"
            aria-label="Scroll cards right"
          >
            {'>'}
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
          const number = getCardNumber(index)

          return (
            <CardItem
              key={`${card.name}-${index}`}
              card={card}
              theme={theme}
              number={number}
              currency={account.currency}
              formatCurrency={formatCurrency}
              role={role}
              onEdit={() => onEditCard(index, card)}
            />
          )
        })}
      </div>
    </>
  )
}
