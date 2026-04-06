import { AppSidebar } from '../components/shared/AppSidebar'
import { InsightsHeaderBar } from '../components/insights/InsightsHeaderBar'
import { InsightsOverview } from '../components/insights/InsightsOverview'
import { InsightsMonthlyComparison } from '../components/insights/InsightsMonthlyComparison'
import { InsightsObservations } from '../components/insights/InsightsObservations'
import { useInsightsData } from '../hooks/useInsightsData'

export function InsightsPage({
  onBackToDashboardRoute,
  onOpenInsightsRoute,
  onOpenTransactionsRoute,
  sidebarOpen,
  setSidebarOpen,
  insightRange,
  setInsightRange,
  account,
  formatCurrency,
}) {
  const insights = useInsightsData({ account })

  return (
    <div className="m-0 min-h-screen w-full p-0">
      <AppSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem="insights"
        onGoDashboard={onBackToDashboardRoute}
        onGoTransactions={onOpenTransactionsRoute}
        onGoInsights={onOpenInsightsRoute}
      />

      <main className="ml-[4.6rem] grid gap-4 rounded-[1.25rem] border border-[rgba(180,192,224,0.4)] bg-gradient-to-b from-[rgba(248,250,255,0.96)] to-[rgba(242,246,255,0.93)] p-5 shadow-[0_12px_32px_rgba(25,37,86,0.14)] max-[720px]:ml-0 max-[720px]:p-3">
        <InsightsHeaderBar
          onBackToDashboardRoute={onBackToDashboardRoute}
          insightRange={insightRange}
          setInsightRange={setInsightRange}
        />

        <InsightsOverview formatCurrency={formatCurrency} account={account} insights={insights} />

        <InsightsMonthlyComparison formatCurrency={formatCurrency} account={account} insights={insights} />

        <InsightsObservations formatCurrency={formatCurrency} account={account} insights={insights} />
      </main>
    </div>
  )
}
