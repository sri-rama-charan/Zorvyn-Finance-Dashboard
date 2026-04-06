import { KeyObservationsList } from './observations/KeyObservationsList'
import { SpendingHeatmap } from './smart/SpendingHeatmap'
import { TwoPanelSection } from '../shared/TwoPanelSection'

export function InsightsObservations({ formatCurrency, account, insights }) {
  return (
    <TwoPanelSection>
      <SpendingHeatmap
        formatCurrency={formatCurrency}
        currency={account.currency}
        heatmapWeeks={insights.heatmapWeeks}
        heatmapMax={insights.heatmapMax}
      />
      <KeyObservationsList observations={insights.observations} />
    </TwoPanelSection>
  )
}
