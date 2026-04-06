import { useNavigate } from 'react-router-dom'
import { AppSidebar } from '../components/shared/AppSidebar'
import { InsightsHeaderBar } from '../components/insights/InsightsHeaderBar'
import { InsightsOverview } from '../components/insights/InsightsOverview'
import { InsightsMonthlyComparison } from '../components/insights/InsightsMonthlyComparison'
import { InsightsObservations } from '../components/insights/InsightsObservations'
import { useInsightsData } from '../hooks/useInsightsData'
import { useAppState } from '@/context/AppStateContext'

export function InsightsPage() {
  const navigate = useNavigate()
  const {
    sidebarOpen,
    setSidebarOpen,
    theme,
    setTheme,
    account,
    formatCurrency,
  } = useAppState()

  const insights = useInsightsData({ account })

  const handleGoDashboard = () => {
    setSidebarOpen(false)
    navigate('/')
  }
  const handleGoTransactions = () => {
    setSidebarOpen(false)
    navigate('/transactions')
  }
  const handleGoInsights = () => setSidebarOpen(false)

  return (
    <div className="m-0 min-h-screen w-full p-0">
      <AppSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem="insights"
        onGoDashboard={handleGoDashboard}
        onGoTransactions={handleGoTransactions}
        onGoInsights={handleGoInsights}
      />

      <main className="app-shell ml-[4.6rem] grid gap-4 rounded-[1.25rem] border p-5 max-[1024px]:gap-3 max-[720px]:ml-0 max-[720px]:gap-3 max-[720px]:p-3 max-[480px]:gap-2 max-[480px]:p-2">
        <InsightsHeaderBar
          theme={theme}
          setTheme={setTheme}
          onBackToDashboardRoute={() => navigate('/')}
        />

        <InsightsOverview formatCurrency={formatCurrency} account={account} insights={insights} />

        <InsightsMonthlyComparison formatCurrency={formatCurrency} account={account} insights={insights} />

        <InsightsObservations formatCurrency={formatCurrency} account={account} insights={insights} />
      </main>
    </div>
  )
}
