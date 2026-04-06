import { useEffect, useMemo, useState } from 'react'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { PanelCard } from '../../shared/PanelCard'
import { SpendingDonut } from './SpendingDonut'
import { CategoryLegend } from './CategoryLegend'

export function SpendingBreakdownCard({
  onOpenInsightsRoute,
  account,
  formatCurrency,
  breakdownGradient,
  topCategories,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  // Basic conic gradient generation with hover states
  const { conicGradient, categoriesList } = useMemo(() => {
    let currentPercent = 0
    const list = []
    
    const gradientStops = topCategories.map((cat, i) => {
      const colors = ['#8d5afa', '#ff6f8a', '#2ce1b5', '#ffd166', '#a2b3d1']
      const color = colors[i % colors.length]
      
      const start = currentPercent
      const end = currentPercent + cat.percent
      currentPercent = end
      
      list.push({ ...cat, color, start, end })
      
      return `${color} ${start}%, ${color} ${end}%`
    })

    return {
      conicGradient: `conic-gradient(${gradientStops.join(', ')})`,
      categoriesList: list
    }
  }, [topCategories])

  return (
    <PanelCard
      interactive
      role="button"
      tabIndex={0}
      className="focus-visible:ring-2 focus-visible:ring-[#9fb1e6] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      onClick={onOpenInsightsRoute}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpenInsightsRoute()
        }
      }}
    >
      <SectionPanelHeader title="Spending Breakdown" actionLabel="Open insights" />

      <SpendingDonut
        account={account}
        formatCurrency={formatCurrency}
        conicGradient={conicGradient}
        isVisible={isVisible}
        categoriesList={categoriesList}
        hoveredCategory={hoveredCategory}
        mousePos={mousePos}
        onMouseMove={handleMouseMove}
        onHoverCategory={setHoveredCategory}
        onClearHover={() => setHoveredCategory(null)}
      />

      <CategoryLegend
        categoriesList={categoriesList}
        isVisible={isVisible}
        formatCurrency={formatCurrency}
        account={account}
        onHoverCategory={setHoveredCategory}
        onClearHover={() => setHoveredCategory(null)}
      />
    </PanelCard>
  )
}
