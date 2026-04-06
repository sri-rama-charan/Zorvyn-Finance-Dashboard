import { useEffect, useMemo, useState } from 'react'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { PanelCard } from '../../shared/PanelCard'

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
      onClick={onOpenInsightsRoute}
      onKeyDown={(event) => event.key === 'Enter' && onOpenInsightsRoute()}
    >
      <SectionPanelHeader title="Spending Breakdown" actionLabel="Open insights" />

      <div className="relative flex flex-col items-center gap-6 py-2" onMouseMove={handleMouseMove}>
        <div
          className="relative flex h-[190px] w-[190px] items-center justify-center rounded-full transition-all duration-700"
          style={{
            background: conicGradient,
            transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.96) rotate(-6deg)',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <div className="absolute inset-0 rounded-full shadow-[inset_0_4px_12px_rgba(0,0,0,0.1)] pointer-events-none"></div>
          
          {/* Interaction SVG for capturing hover on specific slices */}
          <svg className="absolute inset-0 h-full w-full -rotate-90 rounded-full" viewBox="0 0 31.831 31.831" style={{ zIndex: 1 }}>
            {categoriesList.map((cat) => {
              const dashArray = `${cat.percent} 100`
              const dashOffset = -cat.start
              return (
                <circle
                  key={cat.category}
                  cx="15.9155"
                  cy="15.9155"
                  r="15.9155"
                  fill="none"
                  stroke="transparent"
                  strokeWidth="31.831"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  className="cursor-pointer transition-all duration-300 pointer-events-stroke"
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onMouseLeave={() => setHoveredCategory(null)}
                />
              )
            })}
          </svg>

          <div
            className="z-10 flex h-[110px] w-[110px] flex-col items-center justify-center rounded-full border-[6px] border-white bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] pointer-events-none transition-transform duration-700"
            style={{ transform: isVisible ? 'scale(1)' : 'scale(0.94)' }}
          >
            <span className="mb-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-[#646f96]">
              Total
            </span>
            <span className="text-[1.15rem] font-bold text-[#1b2247]">
              {formatCurrency(account.expenses, account.currency)}
            </span>
          </div>
        </div>

        {/* Hover Tooltip Overlay (Similar to Income Vs Expenses) */}
        {hoveredCategory && (
          <div
            className="pointer-events-none absolute z-20 flex flex-col gap-1.5 rounded-xl border border-[#e1e8f7] bg-white px-3 py-2.5 shadow-[0_8px_24px_rgba(24,49,95,0.12)] transition-opacity"
            style={{
              left: mousePos.x + 15,
              top: mousePos.y + 15,
            }}
          >
            <p className="m-0 flex items-center gap-1.5 text-[0.75rem] font-bold uppercase tracking-wider text-[#646f96]">
              <i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: hoveredCategory.color }}></i>
              {hoveredCategory.category}
            </p>
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 text-[0.85rem]">
              <span className="font-medium text-[#1b2247]">Amount</span>
              <span className="text-right font-bold text-[#1b2247]">
                {formatCurrency((hoveredCategory.percent / 100) * account.expenses, account.currency)}
              </span>
              <span className="font-medium text-[#1b2247]">Share</span>
              <span className="text-right font-bold" style={{ color: hoveredCategory.color }}>
                {hoveredCategory.percent}%
              </span>
            </div>
          </div>
        )}

        <div className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2">
          {categoriesList.map((cat, index) => (
            <div 
              key={cat.category} 
              className={`flex items-center gap-1.5 transition-all duration-500 hover:opacity-80 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredCategory(cat)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <i 
                className="h-3 w-3 rounded-full shadow-sm" 
                style={{ backgroundColor: cat.color }}
              ></i>
              <span className="text-[0.8rem] font-medium text-[#1b2247]">{cat.category}</span>
              <span className="text-[0.75rem] text-[#646f96]">
                {formatCurrency((cat.percent / 100) * account.expenses, account.currency)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PanelCard>
  )
}
