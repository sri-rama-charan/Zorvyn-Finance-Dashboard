import { PanelCard } from '../../shared/PanelCard'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

export function CategoryShareChart({ categoryShareByMonth, categories }) {
  return (
    <PanelCard className="min-h-[320px]">
      <SectionPanelHeader title="Category Share" actionLabel="Last 6 months" actionDisabled />

      <div className="mb-3 flex flex-wrap gap-2 text-[0.75rem] text-[#5b6aa0]">
        {categories.map((item) => (
          <span
            key={item.category}
            className="inline-flex items-center gap-1 rounded-full border border-[#e4eaf8] bg-[#f6f8ff] px-2 py-1"
          >
            <i className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}></i>
            {item.category} {item.percent}%
          </span>
        ))}
      </div>

      <div className="grid gap-2">
        {categoryShareByMonth.map((month) => (
          <div key={month.month} className="grid grid-cols-[72px_1fr] items-center gap-2">
            <span className="text-[0.75rem] text-[#6b7cb1]">{month.month}</span>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#eef2ff]">
              {month.categories.map((category) => (
                <div
                  key={`${month.month}-${category.category}`}
                  className="h-full"
                  style={{ width: `${category.percent}%`, backgroundColor: category.color }}
                  aria-label={`${category.category} ${category.percent}%`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  )
}
