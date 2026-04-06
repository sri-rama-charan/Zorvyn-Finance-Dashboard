import { KeyObservationsList } from './observations/KeyObservationsList'
import { RiskAndAlertsPanel } from './observations/RiskAndAlertsPanel'
import { TwoPanelSection } from '../shared/TwoPanelSection'

export function InsightsObservations({ formatCurrency, account, insights }) {
  return (
    <TwoPanelSection>
      <KeyObservationsList observations={insights.observations} />
      <RiskAndAlertsPanel formatCurrency={formatCurrency} currency={account.currency} insights={insights} />
    </TwoPanelSection>
  )
}
