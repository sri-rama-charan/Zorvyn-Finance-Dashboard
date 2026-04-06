export function RecentActivityList({ recentActivity }) {
  return (
    <div className="grid gap-3">
      {recentActivity.map((activity) => (
        <div
          className="flex items-center justify-between gap-3 rounded-[0.85rem] border border-[#e6ebf7] bg-gradient-to-b from-white to-[#f9fbff] px-3 py-3 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_18px_rgba(25,37,86,0.1)]"
          key={activity.id}
        >
          <div>
            <p className="m-0 text-[0.85rem] font-bold text-[#20356b]">{activity.title}</p>
            <p className="mt-1 text-[0.75rem] text-[#6b7cb1]">{activity.meta}</p>
          </div>
          <span
            className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-[0.72rem] font-bold capitalize ${
              activity.type === 'income'
                ? 'bg-[#e6f8ed] text-[#1f8b52]'
                : activity.type === 'expense'
                  ? 'bg-[#fff0eb] text-[#d86a4a]'
                  : 'bg-[#edf2ff] text-[#4f67c8]'
            }`}
          >
            {activity.type}
          </span>
        </div>
      ))}
    </div>
  )
}
