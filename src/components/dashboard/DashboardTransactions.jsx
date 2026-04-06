import { SavingsTrendChart } from './transactions/SavingsTrendChart'
import { ActivityPanel } from './transactions/ActivityPanel'
import { TwoPanelSection } from '../shared/TwoPanelSection'

export function DashboardTransactions({
  formatCurrency,
  account,
  recentActivity,
}) {
  return (
    <TwoPanelSection>
      <SavingsTrendChart account={account} formatCurrency={formatCurrency} />
      <ActivityPanel recentActivity={recentActivity} />
    </TwoPanelSection>
  )
}
