function limitPercent(limit) {
  return Math.round((limit.used / limit.total) * 100)
}

function LimitBar({ label, colorClassName, limit, currency, formatCurrency }) {
  const percent = limitPercent(limit)
  const tone = colorClassName === 'daily' ? 'from-[#ffb36a] to-[#ff864f]' : 'from-[#7ea8ff] to-[#4d6fff]'

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <p className="m-0 text-[0.86rem] font-semibold text-[#27357a]">{label}</p>
        <p className="m-0 text-[0.84rem] font-bold text-[#4f5f97]">{percent}%</p>
      </div>
      <div className="h-2 rounded-full bg-[#ebeffa]" role="presentation">
        <div className={`h-full rounded-full bg-gradient-to-r ${tone}`} style={{ width: `${percent}%` }}></div>
      </div>
      <p className="m-0 text-[0.78rem] text-[#6676ad]">
        {formatCurrency(limit.used, currency)} of {formatCurrency(limit.total, currency)} spent
      </p>
    </div>
  )
}

export function SpendLimits({ account, formatCurrency }) {
  return (
    <article className="grid h-full content-start gap-4 rounded-2xl border border-[#e6ebf7] bg-white p-4 shadow-sm" aria-label="Spending limits">
      <div className="mb-1 flex items-center justify-between gap-2">
        <h2 className="m-0 text-base text-[#1f2651]">Spend Limits</h2>
        <button type="button" className="min-h-[2.4rem] rounded-xl border border-[#e3e8f7] bg-[#f4f6fc] px-3 text-[#4f5f97]">This month</button>
      </div>

      <div className="grid grid-cols-1 gap-3 max-[720px]:grid-cols-1">
        <LimitBar
          label="Daily limit"
          colorClassName="daily"
          limit={account.dailyLimit}
          currency={account.currency}
          formatCurrency={formatCurrency}
        />
        <LimitBar
          label="Monthly limit"
          colorClassName="monthly"
          limit={account.monthlyLimit}
          currency={account.currency}
          formatCurrency={formatCurrency}
        />
      </div>
    </article>
  )
}
