'use client'

import { Search, Grid3x3, List, X } from 'lucide-react'

export type StatusFilter = 'all' | 'ready' | 'progress' | 'error'
export type SortMode = 'recent' | 'score'
export type ViewMode = 'grid' | 'table'

interface Props {
  searchQuery: string
  onSearchChange: (v: string) => void
  statusFilter: StatusFilter
  onStatusChange: (v: StatusFilter) => void
  sortMode: SortMode
  onSortChange: (v: SortMode) => void
  viewMode: ViewMode
  onViewChange: (v: ViewMode) => void
  visibleCount: number
  totalCount: number
}

export default function HistoryFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortMode,
  onSortChange,
  viewMode,
  onViewChange,
  visibleCount,
  totalCount,
}: Props) {
  return (
    <div className="sticky top-[72px] z-20 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-[#E5E5E5]">
      <div className="max-w-[1280px] mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-0 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A3A3A3] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="파일명 검색..."
              className="w-full h-10 pl-9 pr-9 bg-white border border-[#E5E5E5] text-[12px] font-medium text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#0A0A0A] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors"
                aria-label="검색어 지우기"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Filters + view toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status filter */}
            <Select
              label="상태"
              value={statusFilter}
              onChange={(v) => onStatusChange(v as StatusFilter)}
              options={[
                { value: 'all', label: '전체' },
                { value: 'ready', label: '완료' },
                { value: 'progress', label: '진행중' },
                { value: 'error', label: '실패' },
              ]}
            />

            {/* Sort */}
            <Select
              label="정렬"
              value={sortMode}
              onChange={(v) => onSortChange(v as SortMode)}
              options={[
                { value: 'recent', label: '최신순' },
                { value: 'score', label: '점수순' },
              ]}
            />

            {/* View toggle */}
            <div className="flex border border-[#E5E5E5] bg-white h-10">
              <ViewToggleButton
                active={viewMode === 'grid'}
                onClick={() => onViewChange('grid')}
                label="카드 뷰"
              >
                <Grid3x3 className="w-3.5 h-3.5" />
              </ViewToggleButton>
              <ViewToggleButton
                active={viewMode === 'table'}
                onClick={() => onViewChange('table')}
                label="테이블 뷰"
              >
                <List className="w-3.5 h-3.5" />
              </ViewToggleButton>
            </div>
          </div>
        </div>

        {/* Result count */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A3A3A3]">
            {searchQuery || statusFilter !== 'all'
              ? `${visibleCount}건 표시 (총 ${totalCount}건 중)`
              : `${totalCount}건`}
          </span>
        </div>
      </div>
    </div>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="relative">
      <label className="sr-only">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 pl-3 pr-8 bg-white border border-[#E5E5E5] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] appearance-none cursor-pointer hover:border-[#737373] transition-colors"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {label}: {o.label}
          </option>
        ))}
      </select>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A3A3A3] text-[10px] pointer-events-none">
        ▾
      </span>
    </div>
  )
}

function ViewToggleButton({
  active,
  onClick,
  children,
  label,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`w-10 h-full flex items-center justify-center transition-colors ${
        active
          ? 'bg-[#0A0A0A] text-white'
          : 'bg-white text-[#737373] hover:text-[#0A0A0A]'
      }`}
    >
      {children}
    </button>
  )
}
