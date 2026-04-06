import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { RecentActivityList } from '../../shared/RecentActivityList'

export function ActivityPanel({ recentActivity }) {
  return (
    <article className="rounded-2xl border border-[#e6ebf7] bg-white p-4 shadow-sm">
      <SectionPanelHeader title="Recent Activity" actionLabel="Live feed" />
      <RecentActivityList recentActivity={recentActivity} />
    </article>
  )
}
