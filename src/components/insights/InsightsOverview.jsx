import { ComparisonCards } from './overview/ComparisonCards'

export function InsightsOverview({ formatCurrency, account, insights }) {
  return <ComparisonCards formatCurrency={formatCurrency} currency={account.currency} insights={insights} />
}
