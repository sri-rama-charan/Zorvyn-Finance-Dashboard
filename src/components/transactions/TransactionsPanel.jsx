import { useState } from 'react'
import { SectionPanelHeader } from '../shared/SectionPanelHeader'
import { PanelCard } from '../shared/PanelCard'
import { TransactionsFilters } from './TransactionsFilters'
import { TransactionsAdvancedFilters } from './TransactionsAdvancedFilters'
import { TransactionsTable } from './TransactionsTable'
import { TransactionsPagination } from './TransactionsPagination'
import { TransactionEditorModal } from './TransactionEditorModal'

export function TransactionsPanel({
  search,
  setSearch,
  transactionType,
  setTransactionType,
  transactionStatus,
  setTransactionStatus,
  sortBy,
  setSortBy,
  amountMin,
  setAmountMin,
  amountMax,
  setAmountMax,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  transactionPage,
  setTransactionPage,
  transactionPageCount,
  transactionTotalCount,
  filteredTransactions,
  formatCurrency,
  currency,
  role,
  onAddTransaction,
  onUpdateTransaction,
  onRemoveTransaction,
}) {
  const pageSize = 10
  const [modalMode, setModalMode] = useState(null)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const filtersId = 'transaction-filters'
  const [draft, setDraft] = useState({
    date: new Date().toISOString().slice(0, 10),
    description: '',
    category: '',
    type: 'expense',
    amount: '',
    status: 'Completed',
  })

  const showActions = role === 'Admin'
  const gridClassName = showActions
    ? 'grid-cols-[1.1fr_1.5fr_0.9fr_0.75fr_0.9fr_0.6fr]'
    : 'grid-cols-[1.1fr_1.5fr_0.9fr_0.75fr_0.9fr]'

  const totalCount = typeof transactionTotalCount === 'number'
    ? transactionTotalCount
    : filteredTransactions.length
  const totalPages = Math.max(Math.ceil((totalCount || 0) / pageSize), 1)
  const currentPage = Math.min(Math.max(transactionPage || 1, 1), totalPages)
  const startIndex = totalCount ? (currentPage - 1) * pageSize + 1 : 0
  const endIndex = totalCount
    ? Math.min(startIndex + filteredTransactions.length - 1, totalCount)
    : 0

  const pageItems = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const items = [1]
    if (currentPage > 3) items.push('...')
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let i = start; i <= end; i += 1) items.push(i)
    if (currentPage < totalPages - 2) items.push('...')
    items.push(totalPages)
    return items
  })()

  const openAddModal = () => {
    setModalMode('add')
    setEditingTransaction(null)
    setDraft({
      date: new Date().toISOString().slice(0, 10),
      description: '',
      category: '',
      type: 'expense',
      amount: '',
      status: 'Completed',
    })
  }

  const openEditModal = (transaction) => {
    setModalMode('edit')
    setEditingTransaction(transaction)
    setDraft({
      date: transaction.date,
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
      amount: Math.abs(transaction.amount),
      status: transaction.status,
    })
  }

  const closeModal = () => {
    setModalMode(null)
    setEditingTransaction(null)
  }

  const saveModal = () => {
    if (!draft.description.trim()) return
    const rawAmount = Number(draft.amount || 0)
    const signedAmount = draft.type === 'income' ? Math.abs(rawAmount) : -Math.abs(rawAmount)

    if (modalMode === 'add') {
      onAddTransaction({
        id: Date.now(),
        date: draft.date,
        description: draft.description.trim(),
        category: draft.category.trim() || 'General',
        amount: signedAmount,
        type: draft.type,
        status: draft.status,
      })
    }

    if (modalMode === 'edit' && editingTransaction) {
      onUpdateTransaction(editingTransaction.id, {
        date: draft.date,
        description: draft.description.trim(),
        category: draft.category.trim() || 'General',
        type: draft.type,
        status: draft.status,
        amount: signedAmount,
      })
    }

    closeModal()
  }

  const deleteTransaction = () => {
    if (!editingTransaction || !onRemoveTransaction) return
    onRemoveTransaction(editingTransaction.id)
    closeModal()
  }
  return (
    <PanelCard>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <SectionPanelHeader title="Recent Transactions" actionLabel="View all" />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="hidden rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3 py-1 text-[0.74rem] font-bold text-[#4f67c8] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8d3ef] hover:bg-[color:var(--app-card-2)] max-[720px]:inline-flex"
            aria-expanded={filtersOpen}
            aria-controls={filtersId}
          >
            Filters
          </button>
          {showActions ? (
            <button
              type="button"
              onClick={openAddModal}
              className="rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3 py-1 text-[0.74rem] font-bold text-[#4f67c8] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8d3ef] hover:bg-[color:var(--app-card-2)]"
            >
              Add
            </button>
          ) : null}
        </div>
      </div>
      <TransactionsFilters
        id={filtersId}
        search={search}
        setSearch={setSearch}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        transactionStatus={transactionStatus}
        setTransactionStatus={setTransactionStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setTransactionPage={setTransactionPage}
        className={filtersOpen ? 'max-[720px]:flex' : 'max-[720px]:hidden'}
      />

      <TransactionsAdvancedFilters
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        amountMin={amountMin}
        setAmountMin={setAmountMin}
        amountMax={amountMax}
        setAmountMax={setAmountMax}
        setTransactionPage={setTransactionPage}
        className={filtersOpen ? 'max-[720px]:grid' : 'max-[720px]:hidden'}
      />

      <TransactionsTable
        filteredTransactions={filteredTransactions}
        formatCurrency={formatCurrency}
        currency={currency}
        showActions={showActions}
        onEdit={openEditModal}
        gridClassName={gridClassName}
      />

      <TransactionsPagination
        totalCount={totalCount}
        startIndex={startIndex}
        endIndex={endIndex}
        pageItems={pageItems}
        currentPage={currentPage}
        totalPages={totalPages}
        setTransactionPage={setTransactionPage}
      />

      <TransactionEditorModal
        open={modalMode !== null}
        modalMode={modalMode}
        draft={draft}
        setDraft={setDraft}
        onClose={closeModal}
        onSave={saveModal}
        onDelete={deleteTransaction}
      />
    </PanelCard>
  )
}
