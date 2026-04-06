import { KeyObservationsList } from './observations/KeyObservationsList'
import { RiskAndAlertsPanel } from './observations/RiskAndAlertsPanel'

export function InsightsObservations({ formatCurrency, account, insights }) {
  return (
    <section className="grid gap-3 [grid-template-columns:1.35fr_1fr] max-[1040px]:grid-cols-1">
      <KeyObservationsList observations={insights.observations} />
      <RiskAndAlertsPanel formatCurrency={formatCurrency} currency={account.currency} insights={insights} />
    </section>
  )
}
