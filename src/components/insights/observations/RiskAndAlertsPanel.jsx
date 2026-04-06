import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { PanelCard } from '../../shared/PanelCard'
import { MetricTile } from '../../shared/MetricTile'

export function RiskAndAlertsPanel({ formatCurrency, currency, insights }) {
  const pressureClassName = insights.expenseMomentum > 10 ? 'down' : 'up'
  const momentumLabel = insights.expenseMomentum > 10 ? 'Rising pressure' : 'Stable pressure'
  const pressureTone = pressureClassName === 'up' ? 'text-[#208b57]' : 'text-[#cd6045]'

  return (
    <PanelCard>
      <SectionPanelHeader title="Signals" actionLabel="Monitor" />

      <div className="grid gap-2.5">
        <MetricTile
          label="Expense momentum"
          value={`${insights.expenseMomentum}%`}
          valueClassName={pressureTone}
          note={`${momentumLabel} over recent months`}
        />

        <MetricTile
          label="Average monthly spend"
          value={formatCurrency(insights.averageExpense, currency)}
          note="Across selected account history"
        />

        <MetricTile
          label="Average monthly income"
          value={formatCurrency(insights.averageIncome, currency)}
          note="Baseline earning level"
        />
      </div>
    </PanelCard>
  )
}
