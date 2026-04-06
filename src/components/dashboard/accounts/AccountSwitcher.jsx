import { PanelSelect } from '../../shared/PanelControls'

export function AccountSwitcher({ activeAccount, onChange, disabled }) {
  return (
    <label className="mb-3 grid gap-1" htmlFor="account-switch">
      <span className="text-[0.77rem] text-[#6b7cb1]">Active account</span>
      <PanelSelect
        id="account-switch"
        className="rounded-[0.68rem] px-2"
        value={activeAccount}
        onChange={onChange}
        disabled={disabled}
      >
        <option>Personal INR</option>
        <option>Savings EUR</option>
        <option>Travel GBP</option>
      </PanelSelect>
    </label>
  )
}
