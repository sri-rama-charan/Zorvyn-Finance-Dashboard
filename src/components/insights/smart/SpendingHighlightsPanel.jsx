import { PanelCard } from '../../shared/PanelCard'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { MetricTile } from '../../shared/MetricTile'

function formatPeakDate(dateString) {
  if (!dateString) return 'No recent activity'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function SpendingHighlightsPanel({ formatCurrency, currency, insights }) {
  const highestDay = insights.highestSpendingDay
  const peakDate = formatPeakDate(highestDay?.date)
  const ratio = highestDay?.ratio ? highestDay.ratio.toFixed(1) : '0.0'
  const topCategory = insights.topCategory

  return (
    <PanelCard className="min-h-[320px]">
      <SectionPanelHeader title="Peak Spend Signals" actionLabel="Highlights" actionDisabled />

      <div className="grid gap-2.5">
        <MetricTile
          label="Highest spending day"
          value={formatCurrency(highestDay?.amount ?? 0, currency)}
          note={`${peakDate} • ${ratio}x daily avg`}
        />
        <MetricTile
          label="Top spending category"
          value={topCategory?.category ?? 'N/A'}
          note={`${formatCurrency(topCategory?.amount ?? 0, currency)} • ${insights.topCategoryShare}% share`}
        />
      </div>
    </PanelCard>
  )
}
