import { MetricTile } from '../../shared/MetricTile'

export function TrendSummaryTiles({ netValue, savingsRate, formatCurrency, currency }) {
  return (
    <div className="mb-3 grid grid-cols-2 gap-2 max-[720px]:grid-cols-1">
      <MetricTile
        label="Net trend"
        value={formatCurrency(netValue, currency)}
      />
      <MetricTile label="Savings rate" value={`${savingsRate}%`} />
    </div>
  )
}
