'use client'

import { useState, useEffect, useCallback } from 'react'
import { onSnapshot, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { allPopupsQuery, popupDoc } from '@/lib/firebase/collections'
import { deleteImage } from '@/lib/firebase/storage'
import type { Popup, PopupInput } from '@/types/admin'
import { ASPECT_RATIO_OPTIONS } from '@/types/admin'
import AdminHeader from '../components/AdminHeader'
import ImageUploader from '../components/ImageUploader'
import { cn } from '@/lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  X,
  Loader2,
  Megaphone,
  ExternalLink,
  Calendar,
  Eye,
  EyeOff,
} from 'lucide-react'

// ============================================================
// Types
// ============================================================

type PopupStatus = 'active' | 'inactive' | 'scheduled' | 'expired'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

// ============================================================
// Helpers
// ============================================================

function getPopupStatus(popup: Popup): PopupStatus {
  if (!popup.is_active) return 'inactive'

  const now = new Date()
  const start = new Date(popup.start_date)
  const end = popup.end_date ? new Date(popup.end_date) : null

  if (start > now) return 'scheduled'
  if (end && end < now) return 'expired'
  return 'active'
}

const STATUS_CONFIG: Record<PopupStatus, { label: string; className: string }> = {
  active: { label: '활성', className: 'bg-emerald-100 text-emerald-700' },
  inactive: { label: '비활성', className: 'bg-gray-100 text-gray-600' },
  scheduled: { label: '예약됨', className: 'bg-blue-100 text-blue-700' },
  expired: { label: '만료됨', className: 'bg-red-100 text-red-700' },
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

function formatDateForInput(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  // Return YYYY-MM-DDTHH:mm format for datetime-local input
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function getDefaultFormState(): PopupInput {
  return {
    title: '',
    description: null,
    image_url: null,
    link_url: null,
    link_text: null,
    is_active: true,
    start_date: new Date().toISOString(),
    end_date: null,
    display_order: 0,
    image_aspect_ratio: '3/4',
  }
}

// ============================================================
// Toast Component
// ============================================================

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[10003] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-bottom-4 fade-in duration-300',
            toast.type === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          )}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// Confirmation Dialog
// ============================================================

function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  loading,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel: string
  loading: boolean
  onConfirm: () => void
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[10001] bg-black/40 animate-in fade-in duration-200" />
        <Dialog.Content className="fixed z-[10002] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <Dialog.Title className="text-lg font-bold text-gray-900">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mt-2">
            {description}
          </Dialog.Description>
          <div className="flex justify-end gap-3 mt-6">
            <Dialog.Close asChild>
              <button
                type="button"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                취소
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {confirmLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// ============================================================
// Empty State
// ============================================================

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
        <Megaphone className="w-12 h-12 text-gray-300" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        등록된 팝업이 없습니다
      </h3>
      <p className="text-sm text-gray-500 mb-8 text-center max-w-sm">
        방문자에게 중요한 공지사항이나 이벤트를 팝업으로 안내하세요.
        <br />
        첫 번째 팝업을 만들어보세요.
      </p>
      <button
        onClick={onCreateClick}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#004094] hover:bg-[#003070] text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-[#004094]/20"
      >
        <Plus className="w-5 h-5" />
        새 팝업 만들기
      </button>
    </div>
  )
}

// ============================================================
// Popup Card
// ============================================================

function PopupCard({
  popup,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onToggleActive,
  onReorder,
}: {
  popup: Popup
  isFirst: boolean
  isLast: boolean
  onEdit: (popup: Popup) => void
  onDelete: (popup: Popup) => void
  onToggleActive: (popup: Popup) => void
  onReorder: (popup: Popup, direction: 'up' | 'down') => void
}) {
  const status = getPopupStatus(popup)
  const config = STATUS_CONFIG[status]

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-200 group flex flex-row">
      {/* Image Preview - 고정 너비 */}
      <div className="relative w-48 shrink-0 bg-gray-100">
        {popup.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={popup.image_url}
            alt={popup.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full min-h-[160px] flex items-center justify-center">
            <Megaphone className="w-10 h-10 text-gray-300" />
          </div>
        )}

        {/* Order Badge */}
        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold w-7 h-7 rounded-full flex items-center justify-center">
          {popup.display_order}
        </div>
      </div>

      {/* Content - 유연 영역 */}
      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
        <div>
          {/* Status + Title Row */}
          <div className="flex items-center gap-2 mb-2">
            <span className={cn('px-2 py-0.5 text-[11px] font-semibold rounded-md shrink-0', config.className)}>
              {config.label}
            </span>
            <h3 className="text-base font-bold text-gray-900 truncate">
              {popup.title}
            </h3>
          </div>

          {popup.description && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
              {popup.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {formatDate(popup.start_date)}
                {popup.end_date ? ` ~ ${formatDate(popup.end_date)}` : ' ~ 종료일 없음'}
              </span>
            </div>
            {popup.link_url && (
              <a
                href={popup.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#004094] hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                {popup.link_text || '링크'}
              </a>
            )}
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          {/* Reorder */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => onReorder(popup, 'up')}
              disabled={isFirst}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              title="위로 이동"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onReorder(popup, 'down')}
              disabled={isLast}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              title="아래로 이동"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onToggleActive(popup)}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors',
                popup.is_active
                  ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                  : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
              )}
            >
              {popup.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {popup.is_active ? '활성' : '비활성'}
            </button>
            <button
              type="button"
              onClick={() => onEdit(popup)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#004094] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              title="수정"
            >
              <Pencil className="w-3.5 h-3.5" />
              수정
            </button>
            <button
              type="button"
              onClick={() => onDelete(popup)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              title="삭제"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Popup Form Modal
// ============================================================

function PopupFormModal({
  open,
  onOpenChange,
  editingPopup,
  onSave,
  saving,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingPopup: Popup | null
  onSave: (data: PopupInput) => Promise<void>
  saving: boolean
}) {
  const [form, setForm] = useState<PopupInput>(getDefaultFormState)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when modal opens/closes or editingPopup changes
  useEffect(() => {
    if (open) {
      if (editingPopup) {
        setForm({
          title: editingPopup.title,
          description: editingPopup.description,
          image_url: editingPopup.image_url,
          link_url: editingPopup.link_url,
          link_text: editingPopup.link_text,
          is_active: editingPopup.is_active,
          start_date: editingPopup.start_date,
          end_date: editingPopup.end_date,
          display_order: editingPopup.display_order,
          image_aspect_ratio: editingPopup.image_aspect_ratio,
        })
      } else {
        setForm(getDefaultFormState())
      }
      setErrors({})
    }
  }, [open, editingPopup])

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!form.title.trim()) {
      newErrors.title = '제목을 입력해주세요.'
    }
    if (!form.start_date) {
      newErrors.start_date = '시작일을 설정해주세요.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    await onSave(form)
  }

  function updateField<K extends keyof PopupInput>(key: K, value: PopupInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    // Clear error on change
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const isEditing = editingPopup !== null
  const modalTitle = isEditing ? '팝업 수정' : '새 팝업 만들기'

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[10001] bg-black/40 animate-in fade-in duration-200" />
        <Dialog.Content
          className="fixed z-[10002] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          onPointerDownOutside={(e) => {
            if (saving) e.preventDefault()
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <Dialog.Title className="text-lg font-bold text-gray-900">
                {modalTitle}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  disabled={saving}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="팝업 제목을 입력하세요"
                  className={cn(
                    'w-full px-4 py-2.5 text-sm border rounded-xl bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094]',
                    errors.title ? 'border-red-400' : 'border-gray-200'
                  )}
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  설명
                </label>
                <textarea
                  value={form.description || ''}
                  onChange={(e) => updateField('description', e.target.value || null)}
                  placeholder="팝업에 대한 간단한 설명 (선택사항)"
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094] resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  이미지
                </label>
                <ImageUploader
                  value={form.image_url}
                  onChange={(url) => updateField('image_url', url)}
                  folder="popups"
                  aspectRatio={form.image_aspect_ratio}
                />
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  이미지 비율
                </label>
                <select
                  value={form.image_aspect_ratio}
                  onChange={(e) =>
                    updateField(
                      'image_aspect_ratio',
                      e.target.value as PopupInput['image_aspect_ratio']
                    )
                  }
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094]"
                >
                  {ASPECT_RATIO_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Link URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  링크 URL
                </label>
                <input
                  type="url"
                  value={form.link_url || ''}
                  onChange={(e) => updateField('link_url', e.target.value || null)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094]"
                />
              </div>

              {/* Link Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  링크 텍스트
                </label>
                <input
                  type="text"
                  value={form.link_text || ''}
                  onChange={(e) => updateField('link_text', e.target.value || null)}
                  placeholder="자세히 보기"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094]"
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    시작일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={formatDateForInput(form.start_date)}
                    onChange={(e) => {
                      const val = e.target.value
                      updateField('start_date', val ? new Date(val).toISOString() : '')
                    }}
                    className={cn(
                      'w-full px-4 py-2.5 text-sm border rounded-xl bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094]',
                      errors.start_date ? 'border-red-400' : 'border-gray-200'
                    )}
                  />
                  {errors.start_date && (
                    <p className="mt-1 text-xs text-red-500">{errors.start_date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    종료일
                  </label>
                  <input
                    type="datetime-local"
                    value={formatDateForInput(form.end_date)}
                    onChange={(e) => {
                      const val = e.target.value
                      updateField('end_date', val ? new Date(val).toISOString() : null)
                    }}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094]"
                  />
                </div>
              </div>

              {/* Display Order & Active Toggle */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    표시 순서
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.display_order}
                    onChange={(e) =>
                      updateField('display_order', parseInt(e.target.value, 10) || 0)
                    }
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    활성 상태
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField('is_active', !form.is_active)}
                    className={cn(
                      'relative w-14 h-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004094]/30',
                      form.is_active ? 'bg-[#004094]' : 'bg-gray-300'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200',
                        form.is_active && 'translate-x-6'
                      )}
                    />
                  </button>
                  <p className="text-xs text-gray-400 mt-1">
                    {form.is_active ? '팝업이 표시됩니다' : '팝업이 숨겨집니다'}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
              <Dialog.Close asChild>
                <button
                  type="button"
                  disabled={saving}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
                >
                  취소
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#004094] hover:bg-[#003070] rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 shadow-md shadow-[#004094]/20"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isEditing ? '수정하기' : '등록하기'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// ============================================================
// Main Page Component
// ============================================================

export default function AdminPopupsPage() {
  // ---- State ----
  const [popups, setPopups] = useState<Popup[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  // Modal state
  const [formOpen, setFormOpen] = useState(false)
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null)

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Popup | null>(null)
  const [deleting, setDeleting] = useState(false)

  // ---- Toast helpers ----
  const showToast = useCallback((message: string, type: Toast['type']) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // ---- Real-time subscription ----
  useEffect(() => {
    const unsubscribe = onSnapshot(
      allPopupsQuery(),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data())
        setPopups(data)
        setLoading(false)
      },
      (error) => {
        console.error('팝업 목록 로드 실패:', error)
        showToast('팝업 목록을 불러오는데 실패했습니다.', 'error')
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [showToast])

  // ---- Handlers ----

  const handleOpenCreate = useCallback(() => {
    setEditingPopup(null)
    setFormOpen(true)
  }, [])

  const handleOpenEdit = useCallback((popup: Popup) => {
    setEditingPopup(popup)
    setFormOpen(true)
  }, [])

  const handleSave = useCallback(
    async (data: PopupInput) => {
      setSaving(true)
      try {
        const now = new Date().toISOString()

        if (editingPopup) {
          // Update
          const docRef = popupDoc(editingPopup.id)
          await updateDoc(docRef, {
            ...data,
            updated_at: now,
          })
          showToast('팝업이 수정되었습니다.', 'success')
        } else {
          // Create
          await addDoc(collection(db, 'popups'), {
            ...data,
            created_at: now,
            updated_at: now,
          })
          showToast('팝업이 등록되었습니다.', 'success')
        }
        setFormOpen(false)
      } catch (error) {
        console.error('팝업 저장 실패:', error)
        showToast('팝업 저장에 실패했습니다. 다시 시도해주세요.', 'error')
      } finally {
        setSaving(false)
      }
    },
    [editingPopup, showToast]
  )

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      // Delete image from storage if exists
      if (deleteTarget.image_url) {
        await deleteImage(deleteTarget.image_url)
      }
      // Delete document
      const docRef = popupDoc(deleteTarget.id)
      await deleteDoc(docRef)
      showToast('팝업이 삭제되었습니다.', 'success')
      setDeleteTarget(null)
    } catch (error) {
      console.error('팝업 삭제 실패:', error)
      showToast('팝업 삭제에 실패했습니다. 다시 시도해주세요.', 'error')
    } finally {
      setDeleting(false)
    }
  }, [deleteTarget, showToast])

  const handleToggleActive = useCallback(
    async (popup: Popup) => {
      try {
        const docRef = popupDoc(popup.id)
        await updateDoc(docRef, {
          is_active: !popup.is_active,
          updated_at: new Date().toISOString(),
        })
        showToast(
          popup.is_active ? '팝업이 비활성화되었습니다.' : '팝업이 활성화되었습니다.',
          'success'
        )
      } catch (error) {
        console.error('팝업 상태 변경 실패:', error)
        showToast('상태 변경에 실패했습니다.', 'error')
      }
    },
    [showToast]
  )

  const handleReorder = useCallback(
    async (popup: Popup, direction: 'up' | 'down') => {
      const currentIndex = popups.findIndex((p) => p.id === popup.id)
      const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

      if (swapIndex < 0 || swapIndex >= popups.length) return

      const targetPopup = popups[swapIndex]
      const now = new Date().toISOString()

      try {
        // Swap display_order values
        const currentOrder = popup.display_order
        const targetOrder = targetPopup.display_order

        // If orders are the same, offset one by 1
        const newCurrentOrder = targetOrder
        const newTargetOrder = currentOrder === targetOrder
          ? direction === 'up' ? targetOrder + 1 : targetOrder - 1
          : currentOrder

        await Promise.all([
          updateDoc(popupDoc(popup.id), {
            display_order: newCurrentOrder,
            updated_at: now,
          }),
          updateDoc(popupDoc(targetPopup.id), {
            display_order: newTargetOrder,
            updated_at: now,
          }),
        ])
        showToast('순서가 변경되었습니다.', 'success')
      } catch (error) {
        console.error('순서 변경 실패:', error)
        showToast('순서 변경에 실패했습니다.', 'error')
      }
    },
    [popups, showToast]
  )

  // ---- Render ----

  return (
    <div>
      <AdminHeader
        title="팝업 관리"
        description="메인 페이지에 표시되는 팝업을 등록하고 관리합니다."
        actions={
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#004094] hover:bg-[#003070] text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-[#004094]/20"
          >
            <Plus className="w-4 h-4" />
            새 팝업
          </button>
        }
      />

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#004094]" />
        </div>
      )}

      {/* Empty State */}
      {!loading && popups.length === 0 && (
        <EmptyState onCreateClick={handleOpenCreate} />
      )}

      {/* Popup Grid */}
      {!loading && popups.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {popups.map((popup, index) => (
            <PopupCard
              key={popup.id}
              popup={popup}
              isFirst={index === 0}
              isLast={index === popups.length - 1}
              onEdit={handleOpenEdit}
              onDelete={setDeleteTarget}
              onToggleActive={handleToggleActive}
              onReorder={handleReorder}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <PopupFormModal
        open={formOpen}
        onOpenChange={(open) => {
          if (!saving) setFormOpen(open)
        }}
        editingPopup={editingPopup}
        onSave={handleSave}
        saving={saving}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) setDeleteTarget(null)
        }}
        title="팝업 삭제"
        description={`"${deleteTarget?.title}" 팝업을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmLabel="삭제"
        loading={deleting}
        onConfirm={handleDelete}
      />

      {/* Toast Messages */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
