import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

export function KeyObservationsList({ observations }) {
  return (
    <article className="rounded-2xl border border-[#e6ebf7] bg-white p-4 shadow-sm">
      <SectionPanelHeader title="Useful Observations" actionLabel="Data-driven" />
      <ul className="m-0 grid gap-2 pl-4 text-[0.9rem] text-[#2b376f]">
        {observations.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </article>
  )
}
