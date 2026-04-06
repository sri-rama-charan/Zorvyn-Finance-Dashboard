import { useState } from 'react'
import { PanelCard } from '../../shared/PanelCard'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { AccountSwitcher } from './AccountSwitcher'
import { CardCarousel } from './CardCarousel'
import { CardEditorModal } from './CardEditorModal'

export function AccountsPanel({
  role,
  activeAccount,
  setActiveAccount,
  account,
  formatCurrency,
  onUpdateCard,
  onAddCard,
  onRemoveCard,
}) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [cardDraft, setCardDraft] = useState({ name: '', amount: 0, state: 'Active' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('edit')
  const cardThemes = [
    {
      nameMatch: 'Visa',
      label: 'VISA',
      gradient: 'from-[#1f2937] to-[#0f172a]',
      accent: '#7dd3fc',
    },
    {
      nameMatch: 'Mastercard',
      label: 'MASTERCARD',
      gradient: 'from-[#f97316] to-[#ef4444]',
      accent: '#ffd166',
    },
    {
      nameMatch: 'Virtual',
      label: 'AMEX',
      gradient: 'from-[#0ea5e9] to-[#22c55e]',
      accent: '#86efac',
    },
  ]

  const fallbackThemes = [
    {
      label: 'VISA',
      gradient: 'from-[#0f172a] to-[#1f2937]',
      accent: '#93c5fd',
    },
    {
      label: 'MASTERCARD',
      gradient: 'from-[#f97316] to-[#f43f5e]',
      accent: '#fed7aa',
    },
    {
      label: 'AMEX',
      gradient: 'from-[#06b6d4] to-[#22c55e]',
      accent: '#a7f3d0',
    },
  ]

  const openEditModal = (index, card) => {
    setEditingIndex(index)
    setCardDraft({ name: card.name, amount: card.amount, state: card.state })
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const openAddModal = () => {
    setEditingIndex(null)
    setCardDraft({ name: '', amount: 0, state: 'Active' })
    setModalMode('add')
    setIsModalOpen(true)
  }

  const saveModal = () => {
    const payload = {
      name: cardDraft.name.trim() || 'Card',
      amount: Number(cardDraft.amount || 0),
      state: cardDraft.state,
    }

    if (modalMode === 'add' && onAddCard) {
      onAddCard(payload)
    }

    if (modalMode === 'edit' && editingIndex !== null) {
      onUpdateCard(editingIndex, payload)
    }

    setEditingIndex(null)
    setIsModalOpen(false)
  }

  const deleteCard = () => {
    if (editingIndex === null) return
    if (onRemoveCard) {
      onRemoveCard(editingIndex)
    }
    setEditingIndex(null)
    setIsModalOpen(false)
  }

  return (
    <PanelCard>
      <SectionPanelHeader title="Accounts & Cards" actionLabel="Manage" actionDisabled={role === 'Viewer'} />

      <AccountSwitcher
        activeAccount={activeAccount}
        onChange={(event) => setActiveAccount(event.target.value)}
        disabled={role === 'Viewer'}
      />

      <CardCarousel
        role={role}
        account={account}
        formatCurrency={formatCurrency}
        cardThemes={cardThemes}
        fallbackThemes={fallbackThemes}
        onAddCard={openAddModal}
        onEditCard={openEditModal}
      />

      <CardEditorModal
        open={isModalOpen}
        modalMode={modalMode}
        cardDraft={cardDraft}
        setCardDraft={setCardDraft}
        onClose={() => {
          setEditingIndex(null)
          setIsModalOpen(false)
        }}
        onSave={saveModal}
        onDelete={deleteCard}
      />
    </PanelCard>
  )
}
