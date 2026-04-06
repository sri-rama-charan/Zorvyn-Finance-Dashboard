import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { InsightsPage } from './pages/InsightsPage'
import { TransactionsPage } from './pages/TransactionsPage'

function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  if (!isReady) {
    return (
      <div className="app-loader" role="status" aria-live="polite" aria-busy="true">
        <div className="app-spinner" aria-hidden="true"></div>
        <span className="app-loader-text">Loading...</span>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
