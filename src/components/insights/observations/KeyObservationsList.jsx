import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { PanelCard } from '../../shared/PanelCard'

export function KeyObservationsList({ observations }) {
  return (
    <PanelCard>
      <SectionPanelHeader title="Useful Observations" actionLabel="Data-driven" />
      <ul className="m-0 list-disc space-y-2 pl-5 text-[0.88rem] leading-relaxed text-[color:var(--app-text)] dark:text-white marker:text-[color:var(--app-muted-2)] dark:marker:text-white/70">
        {observations.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </PanelCard>
  )
}
