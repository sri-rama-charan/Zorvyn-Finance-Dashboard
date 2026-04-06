import { useState } from 'react'
import { SectionPanelHeader } from '../shared/SectionPanelHeader'
import { TransactionRow } from './TransactionRow'
import { PanelCard } from '../shared/PanelCard'
import { PanelInput, PanelSelect } from '../shared/PanelControls'
import { Modal } from '../shared/Modal'

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
      <div className="flex items-center justify-between">
        <SectionPanelHeader title="Recent Transactions" actionLabel="View all" />
        {showActions ? (
          <button
            type="button"
            onClick={openAddModal}
            className="rounded-full border border-[#dfe6fb] bg-white px-3 py-1 text-[0.74rem] font-bold text-[#4f67c8] shadow-sm"
          >
            Add
          </button>
        ) : null}
      </div>
      <div className="mb-2 flex flex-wrap gap-2">
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

      <div className="mb-3 grid grid-cols-[1fr_1fr_1fr_1fr] gap-2 max-[1040px]:grid-cols-2 max-[720px]:grid-cols-1">
        <input
          type="date"
          value={dateFrom}
          onChange={(event) => {
            setDateFrom(event.target.value)
            setTransactionPage(1)
          }}
          className="rounded-xl border border-[#e1e7f6] bg-white px-3 py-2 text-[0.78rem]"
          placeholder="From"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(event) => {
            setDateTo(event.target.value)
            setTransactionPage(1)
          }}
          className="rounded-xl border border-[#e1e7f6] bg-white px-3 py-2 text-[0.78rem]"
          placeholder="To"
        />
        <input
          type="number"
          min="0"
          value={amountMin}
          onChange={(event) => {
            setAmountMin(event.target.value)
            setTransactionPage(1)
          }}
          className="rounded-xl border border-[#e1e7f6] bg-white px-3 py-2 text-[0.78rem]"
          placeholder="Min amount"
        />
        <input
          type="number"
          min="0"
          value={amountMax}
          onChange={(event) => {
            setAmountMax(event.target.value)
            setTransactionPage(1)
          }}
          className="rounded-xl border border-[#e1e7f6] bg-white px-3 py-2 text-[0.78rem]"
          placeholder="Max amount"
        />
      </div>

      <div className="overflow-visible rounded-[0.95rem] border border-[#e3e9f7]">
        <div className={`grid items-center gap-2 bg-[#f5f8ff] px-4 py-3 text-[0.75rem] font-bold tracking-[0.04em] text-[#6a7caf] uppercase max-[720px]:grid-cols-[1fr_1.2fr_1fr] ${gridClassName}`}>
          <span>Date</span><span>Description</span><span>Category</span><span className="max-[720px]:hidden">Type</span><span className="max-[720px]:hidden">Amount</span>{showActions ? <span className="text-right max-[720px]:hidden">Actions</span> : null}
        </div>

        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              formatCurrency={formatCurrency}
              currency={currency}
              showActions={showActions}
              onEdit={() => openEditModal(transaction)}
              gridClassName={gridClassName}
            />
          ))
        ) : (
          <div className="p-4 text-center text-[0.88rem] text-[#678]">No transactions match the current filters.</div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[0.78rem] text-[#6b7cb1]">
        <span>
          {totalCount ? `Showing ${startIndex}-${endIndex} of ${totalCount}` : 'No results'}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setTransactionPage(Math.max(currentPage - 1, 1))}
            className="rounded-full border border-[#dfe6fb] bg-white px-2 py-1 text-[0.72rem] font-bold text-[#4f67c8]"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {pageItems.map((item, index) => (
            <button
              key={`${item}-${index}`}
              type="button"
              onClick={() => typeof item === 'number' && setTransactionPage(item)}
              className={`min-w-[2rem] rounded-full px-2 py-1 text-[0.72rem] font-bold ${
                item === currentPage
                  ? 'bg-[#4f67c8] text-white'
                  : 'border border-[#dfe6fb] bg-white text-[#4f67c8]'
              }`}
              disabled={item === '...'}
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setTransactionPage(Math.min(currentPage + 1, totalPages))}
            className="rounded-full border border-[#dfe6fb] bg-white px-2 py-1 text-[0.72rem] font-bold text-[#4f67c8]"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <Modal
        open={modalMode !== null}
        title={modalMode === 'edit' ? 'Edit transaction' : 'Add transaction'}
        onClose={closeModal}
        actions={
          <>
            {modalMode === 'edit' ? (
              <button
                type="button"
                onClick={deleteTransaction}
                className="rounded-full border border-[#f3d1d6] bg-[#fff1f3] px-3 py-1 text-[0.75rem] font-bold text-[#c03950]"
              >
                Delete
              </button>
            ) : null}
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full border border-[#dfe6fb] bg-white px-3 py-1 text-[0.75rem] font-bold text-[#4f67c8]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveModal}
              className="rounded-full bg-[#4f67c8] px-3 py-1 text-[0.75rem] font-bold text-white"
            >
              Save
            </button>
          </>
        }
      >
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-2 max-[720px]:grid-cols-1">
            <input
              type="date"
              value={draft.date}
              onChange={(event) => setDraft((prev) => ({ ...prev, date: event.target.value }))}
              className="rounded-lg border border-[#e1e7f6] px-2 py-1 text-[0.78rem]"
            />
            <input
              placeholder="Description"
              value={draft.description}
              onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
              className="rounded-lg border border-[#e1e7f6] px-2 py-1 text-[0.78rem]"
            />
            <input
              placeholder="Category"
              value={draft.category}
              onChange={(event) => setDraft((prev) => ({ ...prev, category: event.target.value }))}
              className="rounded-lg border border-[#e1e7f6] px-2 py-1 text-[0.78rem]"
            />
            <input
              type="number"
              placeholder="Amount"
              value={draft.amount}
              onChange={(event) => setDraft((prev) => ({ ...prev, amount: event.target.value }))}
              className="rounded-lg border border-[#e1e7f6] px-2 py-1 text-[0.78rem]"
            />
            <select
              value={draft.type}
              onChange={(event) => setDraft((prev) => ({ ...prev, type: event.target.value }))}
              className="rounded-lg border border-[#e1e7f6] px-2 py-1 text-[0.78rem]"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="transfer">Transfer</option>
            </select>
            <select
              value={draft.status}
              onChange={(event) => setDraft((prev) => ({ ...prev, status: event.target.value }))}
              className="rounded-lg border border-[#e1e7f6] px-2 py-1 text-[0.78rem]"
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </Modal>
    </PanelCard>
  )
}
