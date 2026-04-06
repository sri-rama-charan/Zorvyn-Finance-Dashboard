import { useState } from 'react'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { PanelCard } from '../../shared/PanelCard'
import { TrendSummaryTiles } from './TrendSummaryTiles'
import { TrendChartCanvas } from './TrendChartCanvas'
import { SeriesEditorModal } from './SeriesEditorModal'

export function IncomeVsExpensesChart({
  account,
  formatCurrency,
  monthlyIncomeTotal,
  monthlyExpenseTotal,
  savingsRate,
  role,
  onUpdateMonthlySeries,
}) {
  const [isSeriesOpen, setIsSeriesOpen] = useState(false)
  const [seriesDraft, setSeriesDraft] = useState(account.monthlySeries)

  const openSeriesModal = () => {
    setSeriesDraft(account.monthlySeries.map((item) => ({ ...item })))
    setIsSeriesOpen(true)
  }

  const saveSeries = () => {
    if (!onUpdateMonthlySeries) return
    const nextSeries = seriesDraft.map((item) => ({
      month: item.month,
      income: Number(item.income || 0),
      expenses: Number(item.expenses || 0),
    }))
    onUpdateMonthlySeries(nextSeries)
    setIsSeriesOpen(false)
  }

  return (
    <PanelCard>
      <SectionPanelHeader
        title="Balance Trend"
        actionLabel={role === 'Admin' ? 'Edit series' : 'Animated'}
        onAction={role === 'Admin' ? openSeriesModal : undefined}
      />

      <TrendSummaryTiles
        netValue={monthlyIncomeTotal - monthlyExpenseTotal}
        savingsRate={savingsRate}
        formatCurrency={formatCurrency}
        currency={account.currency}
      />

      <TrendChartCanvas account={account} formatCurrency={formatCurrency} />

      <SeriesEditorModal
        open={isSeriesOpen}
        seriesDraft={seriesDraft}
        setSeriesDraft={setSeriesDraft}
        onClose={() => setIsSeriesOpen(false)}
        onSave={saveSeries}
      />
    </PanelCard>
  )
}
