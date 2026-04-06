import { useEffect, useMemo, useState } from 'react'
import { line, area, curveNatural } from 'd3-shape'

export function TrendChartCanvas({ account, formatCurrency }) {
  const [isAnimated, setIsAnimated] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsAnimated(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const { incomePath, expensePath, incomeAreaPath, expenseAreaPath, points, yValues, yAxisLabels } = useMemo(() => {
    const width = 640
    const height = 240
    const paddingX = 50
    const paddingRight = 20
    const paddingTop = 22
    const paddingBottom = 24
    const chartWidth = width - paddingX - paddingRight
    const chartHeight = height - paddingTop - paddingBottom

    const series = account.monthlySeries || []
    const maxValue = Math.max(...series.map((item) => Math.max(item.income, item.expenses)), 1)
    const len = Math.max(series.length - 1, 1)

    const tickCount = 4
    const axisLabels = Array.from({ length: tickCount }).map((_, i) => {
      const val = (maxValue / (tickCount - 1)) * i
      const y = paddingTop + chartHeight - (val / maxValue) * chartHeight
      return { val, y }
    })

    const getX = (_, i) => paddingX + (chartWidth * i) / len
    const getY = (val) => paddingTop + chartHeight - (val / maxValue) * chartHeight

    const lineGenerator = line().x(getX).y(getY).curve(curveNatural)
    const areaGenerator = area().x(getX).y0(paddingTop + chartHeight).y1(getY).curve(curveNatural)

    const incomes = series.map((item) => item.income)
    const expenses = series.map((item) => item.expenses)

    return {
      incomePath: lineGenerator(incomes),
      expensePath: lineGenerator(expenses),
      incomeAreaPath: areaGenerator(incomes),
      expenseAreaPath: areaGenerator(expenses),
      points: series.map((_, i) => getX(null, i)),
      yValues: series.map((item) => ({
        month: item.month,
        income: item.income,
        expenses: item.expenses,
        incomeY: getY(item.income),
        expenseY: getY(item.expenses),
      })),
      yAxisLabels: axisLabels,
    }
  }, [account.monthlySeries])

  return (
    <section className="rounded-[1.1rem] border border-[color:var(--app-border)] bg-[color:var(--app-card-2)] p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="m-0 text-[0.94rem] font-bold text-[color:var(--app-text)]">Income vs expenses over time</p>
          <p className="mt-0.5 text-[0.74rem] text-[color:var(--app-muted)]">Smooth trend with animated reveal</p>
        </div>
        <div className="flex gap-3 text-[0.78rem] text-[color:var(--app-muted)]" aria-hidden="true">
          <span className="inline-flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-full bg-[#5fd59a]"></i>Income</span>
          <span className="inline-flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff7d8a]"></i>Expense</span>
        </div>
      </div>

      <div className="relative">
        <svg
          className="w-full overflow-visible rounded-lg pointer-events-none"
          viewBox="0 0 640 240"
          role="img"
          aria-label="Income and expenses trend over months"
        >
          <defs>
            <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5fd59a" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#5fd59a" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff7d8a" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ff7d8a" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {yAxisLabels.map((label, idx) => (
            <g key={idx} className={isAnimated ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}>
              <text x="35" y={label.y + 4} fill="var(--app-muted-2)" fontSize="10" textAnchor="end" fontWeight="500">
                {label.val >= 1000 ? `${(label.val / 1000).toFixed(0)}k` : label.val.toFixed(0)}
              </text>
              <line x1="45" y1={label.y} x2="620" y2={label.y} stroke="var(--app-border)" strokeWidth="1" strokeDasharray={idx === 0 ? '' : '4 5'} />
            </g>
          ))}

          <path d={incomeAreaPath} fill="url(#incomeFill)" className={isAnimated ? 'opacity-100 transition-opacity duration-700' : 'opacity-0'} />
          <path d={expenseAreaPath} fill="url(#expenseFill)" className={isAnimated ? 'opacity-100 transition-opacity duration-700 delay-100' : 'opacity-0'} />

          <path
            d={incomePath}
            fill="none"
            stroke="#5fd59a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isAnimated ? 'opacity-100 transition-all duration-700' : 'translate-y-2 opacity-0'}
          />
          <path
            d={expensePath}
            fill="none"
            stroke="#ff7d8a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isAnimated ? 'opacity-100 transition-all duration-700 delay-100' : 'translate-y-2 opacity-0'}
          />

          {hoveredIndex !== null && (
            <>
              <line
                x1={points[hoveredIndex]}
                y1={22}
                x2={points[hoveredIndex]}
                y2={216}
                stroke="var(--app-border)"
                strokeWidth="1.5"
                strokeDasharray="3 4"
              />
              <circle cx={points[hoveredIndex]} cy={yValues[hoveredIndex].incomeY} r="4" fill="#5fd59a" />
              <circle cx={points[hoveredIndex]} cy={yValues[hoveredIndex].expenseY} r="4" fill="#ff7d8a" />
            </>
          )}
        </svg>

        <div
          className="absolute z-10 flex"
          style={{ left: 50, right: 20, top: 22, bottom: 24 }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {points.map((_, i) => (
            <div
              key={i}
              className="h-full flex-1 cursor-crosshair"
              onMouseEnter={() => setHoveredIndex(i)}
            />
          ))}
        </div>

        {hoveredIndex !== null && (
          <div
            className="pointer-events-none absolute z-20 flex flex-col gap-1.5 rounded-xl border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3 py-2.5 shadow-[0_8px_24px_rgba(24,49,95,0.12)] transition-all"
            style={{
              left: `calc(${(points[hoveredIndex] / 640) * 100}% + 12px)`,
              top: '40%',
              transform: points[hoveredIndex] > 480 ? 'translateX(-100%) translateX(-24px)' : 'none',
            }}
          >
            <p className="m-0 text-[0.7rem] font-bold uppercase tracking-wider text-[color:var(--app-muted)]">
              {yValues[hoveredIndex].month} 26
            </p>
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 text-[0.8rem]">
              <span className="font-medium text-[#5fd59a]">Income</span>
              <span className="text-right font-semibold text-[color:var(--app-text)]">
                {formatCurrency(yValues[hoveredIndex].income, account.currency)}
              </span>
              <span className="font-medium text-[#ff7d8a]">Expense</span>
              <span className="text-right font-semibold text-[color:var(--app-text)]">
                {formatCurrency(yValues[hoveredIndex].expenses, account.currency)}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="ml-[45px] mt-2 flex justify-between text-center text-[0.7rem] text-[color:var(--app-muted)]" aria-hidden="true">
        {account.monthlySeries.map((item, i) => (
          <span key={item.month} className={`flex-1 ${hoveredIndex === i ? 'font-bold text-[color:var(--app-text)]' : ''}`}>
            {item.month}
          </span>
        ))}
      </div>
    </section>
  )
}
