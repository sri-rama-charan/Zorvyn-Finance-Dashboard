import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { PanelCard } from '../../shared/PanelCard'

export function KeyObservationsList({ observations }) {
  return (
    <PanelCard>
      <SectionPanelHeader title="Useful Observations" actionLabel="Data-driven" />
      <ul className="m-0 grid gap-2 pl-4 text-[0.88rem] leading-relaxed text-[#2b376f]">
        {observations.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </PanelCard>
  )
}
