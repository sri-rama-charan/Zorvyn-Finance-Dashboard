import { BalanceCard } from './overview/BalanceCard'
import { OverviewKpis } from './overview/OverviewKpis'
import { SpendLimits } from './overview/SpendLimits'

export function DashboardOverview({ account, formatCurrency, formatSignedPercent }) {
  return (
    <section className="grid gap-3 xl:grid-cols-[minmax(0,2.3fr)_minmax(320px,1fr)] max-[1040px]:grid-cols-1" aria-label="Financial overview">
      <div className="grid items-stretch gap-3 [grid-template-columns:clamp(290px,28vw,340px)_minmax(0,1fr)] max-[1040px]:grid-cols-1" aria-label="Financial summary cards">
        <BalanceCard account={account} formatCurrency={formatCurrency} />
        <OverviewKpis
          account={account}
          formatCurrency={formatCurrency}
          formatSignedPercent={formatSignedPercent}
        />
      </div>

      <SpendLimits account={account} formatCurrency={formatCurrency} />
    </section>
  )
}
