import { PanelCard } from '../../shared/PanelCard'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

export function CreditScorePanel({ account }) {
  return (
    <PanelCard>
      <SectionPanelHeader title="Card Credit Score" actionLabel="Current card" />

      <div
        className="mx-auto mt-1 mb-3 grid h-[146px] w-[146px] place-items-center rounded-full bg-[conic-gradient(#44b06e_0deg_260deg,#ecf1fb_260deg_360deg)]"
        role="img"
        aria-label={`Credit score ${account.creditScore} out of 850`}
      >
        <div className="grid h-28 w-28 place-items-center rounded-full border border-[#e2e9fa] bg-white text-center">
          <p className="m-0 text-[1.7rem] leading-none font-extrabold text-[#1f356f]">{account.creditScore}</p>
          <p className="mt-1 text-[0.76rem] text-[#4e925e]">{account.creditLabel}</p>
        </div>
      </div>

      <ul className="m-0 grid gap-1.5 pl-4 text-[0.81rem] text-[#42568f]">
        <li>Payment history: strong</li>
        <li>Utilization ratio: 31%</li>
        <li>Recommendation: keep below 30%</li>
      </ul>
    </PanelCard>
  )
}
