import { PanelInput, PanelSelect } from '../shared/PanelControls'

export function TransactionsFilters({
  id,
  search,
  setSearch,
  transactionType,
  setTransactionType,
  transactionStatus,
  setTransactionStatus,
  sortBy,
  setSortBy,
  setTransactionPage,
  className,
}) {
  return (
    <div id={id} className={`mb-2 flex flex-wrap gap-2 ${className || ''}`}>
      <PanelInput
        type="search"
        placeholder="Search transactions"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value)
          setTransactionPage(1)
        }}
      />
      <PanelSelect
        value={transactionType}
        onChange={(event) => {
          setTransactionType(event.target.value)
          setTransactionPage(1)
        }}
      >
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
        <option value="transfer">Transfer</option>
      </PanelSelect>

      <PanelSelect
        value={transactionStatus}
        onChange={(event) => {
          setTransactionStatus(event.target.value)
          setTransactionPage(1)
        }}
      >
        <option value="all">All status</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </PanelSelect>

      <PanelSelect
        value={sortBy}
        onChange={(event) => {
          setSortBy(event.target.value)
          setTransactionPage(1)
        }}
      >
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="amount-desc">Largest amount</option>
        <option value="amount-asc">Smallest amount</option>
      </PanelSelect>
    </div>
  )
}
