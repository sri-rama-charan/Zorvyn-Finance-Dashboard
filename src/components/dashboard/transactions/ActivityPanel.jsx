import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { RecentActivityList } from '../../shared/RecentActivityList'
import { PanelCard } from '../../shared/PanelCard'

export function ActivityPanel({ recentActivity }) {
  return (
    <PanelCard>
      <SectionPanelHeader title="Recent Activity" actionLabel="Live feed" />
      <RecentActivityList recentActivity={recentActivity} />
    </PanelCard>
  )
}
