import { AnimatedNumber } from '../../shared/AnimatedNumber'

function KpiCard({ icon, label, trendClassName, trendText, value, formatValue, meta, cardClassName }) {
  const iconTone =
    cardClassName === 'income-card'
      ? 'bg-[#e8f9ee] text-[#2f9462]'
      : cardClassName === 'expense-card'
        ? 'bg-[#fff1ec] text-[#db6d4e]'
        : 'bg-[#edf2ff] text-[#4964cf]'

  const trendTone = trendClassName === 'up' ? 'bg-[#e8f9ee] text-[#208b57]' : 'bg-[#fff1ec] text-[#cd6045]'

  return (
    <article className="shadow-sm flex min-h-[150px] flex-col justify-center gap-2 rounded-2xl border border-[#dfe6fb] bg-gradient-to-b from-white to-[#f9fbff] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(25,37,86,0.12)] max-[1040px]:min-h-[160px]">
      <div className="mb-1.5 grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <span className={`grid h-6 w-6 place-items-center rounded-lg text-[0.78rem] font-bold ${iconTone}`} aria-hidden="true">{icon}</span>
        <p className="m-0 text-[0.93rem] font-semibold text-[#2b3f85]">{label}</p>
        <span className={`rounded-full px-2 py-1 text-[0.71rem] font-bold ${trendTone}`}>{trendText}</span>
      </div>
      <p className="m-0 text-[1.95rem] leading-[1.05] font-bold tracking-tight text-[#1d2758] max-[1040px]:text-[1.55rem]">
         <AnimatedNumber value={value} formatValue={formatValue} />
      </p>
      <p className="m-0 text-[0.79rem] text-[#6c7ab0]">{meta}</p>
    </article>
  )
}

export function OverviewKpis({ account, formatCurrency, formatSignedPercent }) {
  return (
    <div className="grid grid-cols-3 gap-3 max-[1040px]:grid-cols-2 max-[720px]:grid-cols-1" aria-label="Income expenses and savings">
      <KpiCard
        icon="↗"
        label="Income"
        trendClassName="up"
        trendText={formatSignedPercent(account.incomeDelta)}
        value={account.income}
        formatValue={(val) => formatCurrency(val, account.currency)}
        meta={account.incomeMeta}
        cardClassName="income-card"
      />
      <KpiCard
        icon="↘"
        label="Expenses"
        trendClassName="down"
        trendText={formatSignedPercent(account.expensesDelta)}
        value={account.expenses}
        formatValue={(val) => formatCurrency(val, account.currency)}
        meta={account.expensesMeta}
        cardClassName="expense-card"
      />
      <KpiCard
        icon="◌"
        label="Savings"
        trendClassName="up"
        trendText={formatSignedPercent(account.savingsDelta)}
        value={account.savings}
        formatValue={(val) => formatCurrency(val, account.currency)}
        meta={account.savingsMeta}
        cardClassName="savings-card"
      />
    </div>
  )
}
