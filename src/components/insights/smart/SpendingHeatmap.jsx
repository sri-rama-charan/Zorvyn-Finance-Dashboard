import { PanelCard } from '../../shared/PanelCard'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

function getDayLabel(dateString) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export function SpendingHeatmap({ formatCurrency, currency, heatmapWeeks, heatmapMax }) {
  const dayLabels = heatmapWeeks[0]?.map((day) => getDayLabel(day.date)) ?? []

  return (
    <PanelCard>
      <SectionPanelHeader title="Spending Heatmap" actionLabel="Last 4 weeks" actionDisabled />

      <div className="grid gap-2">
        <div className="grid grid-cols-7 gap-1 text-[0.7rem] uppercase tracking-[0.08em] text-[#7a88b8]">
          {dayLabels.map((label, index) => (
            <span key={`label-${index}`} className="text-center">
              {label || '-'}
            </span>
          ))}
        </div>

        {heatmapWeeks.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-1">
            {week.map((day) => {
              const intensity = heatmapMax ? day.value / heatmapMax : 0
              const alpha = 0.08 + intensity * 0.6
              return (
                <div
                  key={day.date}
                  className="h-8 rounded-lg border border-[#e4e9f7] shadow-[0_3px_8px_rgba(31,43,95,0.06)]"
                  style={{ backgroundColor: `rgba(86, 115, 255, ${alpha})` }}
                  title={`${day.date} • ${formatCurrency(day.value, currency)}`}
                ></div>
              )
            })}
          </div>
        ))}

        <div className="flex items-center justify-between text-[0.72rem] text-[#6c7bb0]">
          <span>Lower spend</span>
          <span>Higher spend</span>
        </div>
      </div>
    </PanelCard>
  )
}
