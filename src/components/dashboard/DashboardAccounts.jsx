import { AccountsPanel } from './accounts/AccountsPanel'
import { SavingPlansPanel } from './accounts/SavingPlansPanel'
import { CreditScorePanel } from './accounts/CreditScorePanel'

export function DashboardAccounts({ role, activeAccount, setActiveAccount, account, formatCurrency }) {
  return (
    <section className="grid gap-3 [grid-template-columns:1.1fr_1.1fr_0.9fr] max-[1040px]:grid-cols-1" aria-label="Account and goals overview">
      <AccountsPanel
        role={role}
        activeAccount={activeAccount}
        setActiveAccount={setActiveAccount}
        account={account}
        formatCurrency={formatCurrency}
      />
      <SavingPlansPanel role={role} account={account} formatCurrency={formatCurrency} />
      <CreditScorePanel account={account} />
    </section>
  )
}
