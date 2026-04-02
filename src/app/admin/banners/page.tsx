'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { onSnapshot, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import {
  allBannersQuery,
  bannerDoc,
} from '@/lib/firebase/collections'
import { deleteImage } from '@/lib/firebase/storage'
import type { Banner, BannerInput } from '@/types/admin'
import AdminHeader from '../components/AdminHeader'
import ImageUploader from '../components/ImageUploader'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Plus,
  ChevronUp,
  ChevronDown,
  Pencil,
  Trash2,
  X,
  Loader2,
  ImageIcon,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Link as LinkIcon,
  Monitor,
  Smartphone,
} from 'lucide-react'

// ============================================================
// Toast Notification System
// ============================================================

interface Toast {
  id: string
  message: string
  type: 'success' | 'error'
}

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timerRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    setToasts((prev) => [...prev, { id, message, type }])
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
      timerRef.current.delete(id)
    }, 4000)
    timerRef.current.set(id, timer)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timerRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timerRef.current.delete(id)
    }
  }, [])

  return { toasts, addToast, removeToast }
}

function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: Toast[]
  onRemove: (id: string) => void
}) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[10003] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border text-sm font-medium min-w-[320px] animate-in slide-in-from-right-5 fade-in duration-300',
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          )}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
          )}
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => onRemove(toast.id)}
            className="shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// Delete Confirmation Dialog
// ============================================================

function DeleteConfirmDialog({
  open,
  onOpenChange,
  bannerTitle,
  onConfirm,
  loading,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  bannerTitle: string
  onConfirm: () => void
  loading: boolean
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[10001] bg-black/50 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out duration-200" />
        <Dialog.Content className="fixed z-[10002] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <Dialog.Title className="text-lg font-bold text-gray-900">
                배너 삭제
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500 mt-1.5">
                <strong className="text-gray-700">&quot;{bannerTitle}&quot;</strong> 배너를
                삭제하시겠습니까? 업로드된 이미지도 함께 삭제되며 이 작업은 되돌릴 수
                없습니다.
              </Dialog.Description>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Dialog.Close asChild>
              <button
                type="button"
                disabled={loading}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
              >
                취소
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              삭제하기
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// ============================================================
// Hero Preview Section
// ============================================================

function HeroPreview({ banners }: { banners: Banner[] }) {
  const activeBanner = banners.find((b) => b.is_active)

  return (
    <div className="mb-8 rounded-2xl overflow-hidden border border-gray-200 bg-gray-900">
      <div className="px-4 py-2.5 bg-gray-800 flex items-center gap-2 border-b border-gray-700">
        <Eye className="w-4 h-4 text-gray-400" />
        <span className="text-xs font-medium text-gray-300">
          히어로 섹션 미리보기
        </span>
        {activeBanner && (
          <span className="text-xs text-gray-500 ml-auto">
            활성 배너: {banners.filter((b) => b.is_active).length}개
          </span>
        )}
      </div>
      <div className="relative" style={{ aspectRatio: '16/5' }}>
        {activeBanner ? (
          <>
            <Image
              src={activeBanner.image_url}
              alt={activeBanner.title}
              fill
              className="object-cover"
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-12">
              <div className="text-white max-w-lg">
                {activeBanner.subtitle && (
                  <p className="text-xs md:text-sm font-medium text-gray-300 mb-1.5">
                    {activeBanner.subtitle}
                  </p>
                )}
                <h2 className="text-lg md:text-2xl font-bold leading-tight">
                  {activeBanner.title}
                </h2>
                {activeBanner.link_url && (
                  <span className="inline-flex items-center gap-1 mt-3 text-xs text-[#ff6b00] font-medium">
                    <LinkIcon className="w-3 h-3" />
                    {activeBanner.link_url}
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <ImageIcon className="w-10 h-10 text-gray-600 mb-2" />
            <p className="text-sm text-gray-400">
              활성화된 배너가 없습니다
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================
// Empty State
// ============================================================

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <ImageIcon className="w-10 h-10 text-[#004094]" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        등록된 배너가 없습니다
      </h3>
      <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
        히어로 섹션에 표시할 배너를 추가하세요. 여러 개의 배너를 등록하면 슬라이드로
        표시됩니다.
      </p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#004094] hover:bg-[#003070] text-white font-medium text-sm rounded-xl transition-colors"
      >
        <Plus className="w-5 h-5" />
        첫 번째 배너 추가하기
      </button>
    </div>
  )
}

// ============================================================
// Banner Card Component
// ============================================================

function BannerCard({
  banner,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onToggleActive,
  onEdit,
  onDelete,
  togglingId,
}: {
  banner: Banner
  isFirst: boolean
  isLast: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  onToggleActive: () => void
  onEdit: () => void
  onDelete: () => void
  togglingId: string | null
}) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md',
        banner.is_active ? 'border-gray-200' : 'border-gray-200 opacity-75'
      )}
    >
      {/* Image Preview */}
      <div className="relative" style={{ aspectRatio: '16/9' }}>
        <Image
          src={banner.image_url}
          alt={banner.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 bg-black/60 text-white text-xs font-bold rounded-lg backdrop-blur-sm">
            #{banner.display_order}
          </span>
          <span
            className={cn(
              'px-3 py-1 text-xs font-bold rounded-lg backdrop-blur-sm',
              banner.is_active
                ? 'bg-emerald-500/90 text-white'
                : 'bg-gray-500/80 text-white'
            )}
          >
            {banner.is_active ? '활성' : '비활성'}
          </span>
        </div>
        {/* Mobile image indicator */}
        {banner.mobile_image_url && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded-lg backdrop-blur-sm flex items-center gap-1">
            <Smartphone className="w-3 h-3" />
            모바일
          </span>
        )}
        {/* Gradient at bottom for info */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-base truncate">
            {banner.title}
          </h3>
          {banner.subtitle && (
            <p className="text-white/80 text-sm truncate mt-0.5">
              {banner.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer / Actions */}
      <div className="px-4 py-3 flex items-center gap-3 border-t border-gray-100">
        {/* Reorder buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            title="위로 이동"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            title="아래로 이동"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Link URL (truncated) */}
        {banner.link_url && (
          <span className="text-xs text-gray-400 truncate max-w-[200px] flex items-center gap-1" title={banner.link_url}>
            <LinkIcon className="w-3 h-3 shrink-0" />
            {banner.link_url}
          </span>
        )}

        <div className="flex-1" />

        {/* Active toggle (switch style) */}
        <button
          type="button"
          onClick={onToggleActive}
          disabled={togglingId === banner.id}
          title={banner.is_active ? '비활성화' : '활성화'}
          className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004094] focus-visible:ring-offset-2 disabled:opacity-50"
          style={{
            backgroundColor: banner.is_active ? '#004094' : '#d1d5db',
          }}
        >
          <span
            className={cn(
              'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out',
              banner.is_active ? 'translate-x-5' : 'translate-x-0.5'
            )}
          />
        </button>

        {/* Edit */}
        <button
          type="button"
          onClick={onEdit}
          title="수정"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-[#004094]/10 hover:text-[#004094] transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={onDelete}
          title="삭제"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ============================================================
// Create/Edit Banner Modal
// ============================================================

interface BannerFormData {
  title: string
  subtitle: string
  image_url: string | null
  mobile_image_url: string | null
  link_url: string
  is_active: boolean
}

const INITIAL_FORM: BannerFormData = {
  title: '',
  subtitle: '',
  image_url: null,
  mobile_image_url: null,
  link_url: '',
  is_active: true,
}

function BannerFormModal({
  open,
  onOpenChange,
  editingBanner,
  maxOrder,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingBanner: Banner | null
  maxOrder: number
  onSave: (data: BannerInput, editId?: string) => Promise<void>
}) {
  const [form, setForm] = useState<BannerFormData>(INITIAL_FORM)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when modal opens/closes or editingBanner changes
  useEffect(() => {
    if (open) {
      if (editingBanner) {
        setForm({
          title: editingBanner.title,
          subtitle: editingBanner.subtitle ?? '',
          image_url: editingBanner.image_url,
          mobile_image_url: editingBanner.mobile_image_url,
          link_url: editingBanner.link_url ?? '',
          is_active: editingBanner.is_active,
        })
      } else {
        setForm(INITIAL_FORM)
      }
      setErrors({})
    }
  }, [open, editingBanner])

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}
    if (!form.title.trim()) {
      newErrors.title = '제목을 입력해주세요.'
    }
    if (!form.image_url) {
      newErrors.image_url = '데스크톱 이미지를 업로드해주세요.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [form.title, form.image_url])

  const handleSave = useCallback(async () => {
    if (!validate()) return

    setSaving(true)
    try {
      const input: BannerInput = {
        title: form.title.trim(),
        subtitle: form.subtitle.trim() || null,
        image_url: form.image_url!,
        mobile_image_url: form.mobile_image_url || null,
        link_url: form.link_url.trim() || null,
        is_active: form.is_active,
        display_order: editingBanner
          ? editingBanner.display_order
          : maxOrder + 1,
      }

      await onSave(input, editingBanner?.id)
      onOpenChange(false)
    } catch {
      // Error handled by parent
    } finally {
      setSaving(false)
    }
  }, [form, editingBanner, maxOrder, onSave, onOpenChange, validate])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[10001] bg-black/50 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out duration-200" />
        <Dialog.Content className="fixed z-[10002] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <Dialog.Title className="text-lg font-bold text-gray-900">
              {editingBanner ? '배너 수정' : '새 배너 추가'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Body (scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="배너 제목을 입력하세요"
                className={cn(
                  'w-full px-4 py-2.5 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094]',
                  errors.title
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 bg-white'
                )}
              />
              {errors.title && (
                <p className="mt-1.5 text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                부제목
              </label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subtitle: e.target.value }))
                }
                placeholder="부제목을 입력하세요 (선택사항)"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094] bg-white"
              />
            </div>

            {/* Desktop Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <Monitor className="w-4 h-4" />
                  데스크톱 이미지 <span className="text-red-500">*</span>
                </span>
              </label>
              <p className="text-xs text-gray-400 mb-2">
                권장 비율 16:9 / 최소 1920x1080px
              </p>
              <ImageUploader
                value={form.image_url}
                onChange={(url) =>
                  setForm((p) => ({ ...p, image_url: url }))
                }
                folder="banners"
                aspectRatio="16/9"
                placeholder="데스크톱 배너 이미지 업로드"
              />
              {errors.image_url && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.image_url}
                </p>
              )}
            </div>

            {/* Mobile Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  모바일 이미지
                </span>
              </label>
              <p className="text-xs text-gray-400 mb-2">
                권장 비율 9:16 / 선택사항 (미등록 시 데스크톱 이미지 사용)
              </p>
              <ImageUploader
                value={form.mobile_image_url}
                onChange={(url) =>
                  setForm((p) => ({ ...p, mobile_image_url: url }))
                }
                folder="banners"
                aspectRatio="9/16"
                placeholder="모바일 배너 이미지 업로드 (선택)"
                className="max-w-[280px]"
              />
            </div>

            {/* Link URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                링크 URL
              </label>
              <input
                type="url"
                value={form.link_url}
                onChange={(e) =>
                  setForm((p) => ({ ...p, link_url: e.target.value }))
                }
                placeholder="https://example.com (선택사항)"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094] bg-white"
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  활성 상태
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  비활성 배너는 사이트에 표시되지 않습니다
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setForm((p) => ({ ...p, is_active: !p.is_active }))
                }
                className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004094] focus-visible:ring-offset-2"
                style={{
                  backgroundColor: form.is_active ? '#004094' : '#d1d5db',
                }}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out',
                    form.is_active ? 'translate-x-5' : 'translate-x-0.5'
                  )}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
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
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#004094] hover:bg-[#003070] rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingBanner ? '저장하기' : '추가하기'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// ============================================================
// Main Admin Banners Page
// ============================================================

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const { toasts, addToast, removeToast } = useToast()

  // ---- Real-time listener ----
  useEffect(() => {
    const unsubscribe = onSnapshot(
      allBannersQuery(),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => doc.data())
        setBanners(items)
        setLoading(false)
      },
      (error) => {
        console.error('배너 목록 로드 실패:', error)
        addToast('배너 목록을 불러오는 데 실패했습니다.', 'error')
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [addToast])

  // ---- Compute max display_order ----
  const maxOrder =
    banners.length > 0
      ? Math.max(...banners.map((b) => b.display_order))
      : 0

  // ---- Create / Update ----
  const handleSave = useCallback(
    async (input: BannerInput, editId?: string) => {
      const now = new Date().toISOString()

      if (editId) {
        await updateDoc(bannerDoc(editId), {
          ...input,
          updated_at: now,
        })
        addToast('배너가 수정되었습니다.', 'success')
      } else {
        await addDoc(collection(db, 'banners'), {
          ...input,
          created_at: now,
          updated_at: now,
        })
        addToast('새 배너가 추가되었습니다.', 'success')
      }
    },
    [addToast]
  )

  const handleSaveWithError = useCallback(
    async (input: BannerInput, editId?: string) => {
      try {
        await handleSave(input, editId)
      } catch (error) {
        console.error('배너 저장 실패:', error)
        addToast('배너 저장에 실패했습니다.', 'error')
        throw error
      }
    },
    [handleSave, addToast]
  )

  // ---- Delete ----
  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      // Delete images from Storage
      if (deleteTarget.image_url) {
        await deleteImage(deleteTarget.image_url)
      }
      if (deleteTarget.mobile_image_url) {
        await deleteImage(deleteTarget.mobile_image_url)
      }
      // Delete Firestore document
      await deleteDoc(bannerDoc(deleteTarget.id))
      addToast('배너가 삭제되었습니다.', 'success')
      setDeleteTarget(null)
    } catch (error) {
      console.error('배너 삭제 실패:', error)
      addToast('배너 삭제에 실패했습니다.', 'error')
    } finally {
      setDeleting(false)
    }
  }, [deleteTarget, addToast])

  // ---- Toggle Active ----
  const handleToggleActive = useCallback(
    async (banner: Banner) => {
      setTogglingId(banner.id)
      try {
        await updateDoc(bannerDoc(banner.id), {
          is_active: !banner.is_active,
          updated_at: new Date().toISOString(),
        })
        addToast(
          banner.is_active
            ? '배너가 비활성화되었습니다.'
            : '배너가 활성화되었습니다.',
          'success'
        )
      } catch (error) {
        console.error('상태 변경 실패:', error)
        addToast('상태 변경에 실패했습니다.', 'error')
      } finally {
        setTogglingId(null)
      }
    },
    [addToast]
  )

  // ---- Reorder ----
  const handleReorder = useCallback(
    async (bannerId: string, direction: 'up' | 'down') => {
      const idx = banners.findIndex((b) => b.id === bannerId)
      if (idx === -1) return
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1
      if (swapIdx < 0 || swapIdx >= banners.length) return

      const current = banners[idx]
      const swap = banners[swapIdx]
      const now = new Date().toISOString()

      try {
        await Promise.all([
          updateDoc(bannerDoc(current.id), {
            display_order: swap.display_order,
            updated_at: now,
          }),
          updateDoc(bannerDoc(swap.id), {
            display_order: current.display_order,
            updated_at: now,
          }),
        ])
        addToast('순서가 변경되었습니다.', 'success')
      } catch (error) {
        console.error('순서 변경 실패:', error)
        addToast('순서 변경에 실패했습니다.', 'error')
      }
    },
    [banners, addToast]
  )

  // ---- Open edit modal ----
  const openEdit = useCallback((banner: Banner) => {
    setEditingBanner(banner)
    setFormOpen(true)
  }, [])

  // ---- Open create modal ----
  const openCreate = useCallback(() => {
    setEditingBanner(null)
    setFormOpen(true)
  }, [])

  // ---- Loading state ----
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#004094] mx-auto mb-3" />
          <p className="text-sm text-gray-500">배너 목록을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AdminHeader
        title="배너 관리"
        description="메인 페이지 히어로 섹션에 표시되는 배너를 관리합니다."
        actions={
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#004094] hover:bg-[#003070] text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            배너 추가
          </button>
        }
      />

      {/* Hero Preview */}
      <HeroPreview banners={banners} />

      {/* Banner List */}
      {banners.length === 0 ? (
        <EmptyState onAdd={openCreate} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {banners.map((banner, idx) => (
            <BannerCard
              key={banner.id}
              banner={banner}
              isFirst={idx === 0}
              isLast={idx === banners.length - 1}
              onMoveUp={() => handleReorder(banner.id, 'up')}
              onMoveDown={() => handleReorder(banner.id, 'down')}
              onToggleActive={() => handleToggleActive(banner)}
              onEdit={() => openEdit(banner)}
              onDelete={() => setDeleteTarget(banner)}
              togglingId={togglingId}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <BannerFormModal
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingBanner(null)
        }}
        editingBanner={editingBanner}
        maxOrder={maxOrder}
        onSave={handleSaveWithError}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        bannerTitle={deleteTarget?.title ?? ''}
        onConfirm={handleDelete}
        loading={deleting}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
