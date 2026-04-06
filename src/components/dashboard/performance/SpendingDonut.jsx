export function SpendingDonut({
  account,
  formatCurrency,
  conicGradient,
  isVisible,
  categoriesList,
  hoveredCategory,
  mousePos,
  onMouseMove,
  onHoverCategory,
  onClearHover,
}) {
  return (
    <div className="relative flex flex-col items-center gap-6 py-2" onMouseMove={onMouseMove}>
      <div
        className="relative flex h-[190px] w-[190px] items-center justify-center rounded-full transition-all duration-700"
        style={{
          background: conicGradient,
          transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.96) rotate(-6deg)',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="absolute inset-0 rounded-full shadow-[inset_0_4px_12px_rgba(0,0,0,0.1)] pointer-events-none"></div>

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
                onMouseEnter={() => onHoverCategory(cat)}
                onMouseLeave={onClearHover}
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
    </div>
  )
}
