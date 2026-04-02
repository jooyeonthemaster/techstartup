'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import TiptapLink from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import { useCallback, useRef, useState } from 'react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  ImageIcon,
  Palette,
  Highlighter,
  Undo2,
  Redo2,
  Loader2,
  Unlink,
} from 'lucide-react'
import { uploadImage } from '@/lib/firebase/storage'
import { cn } from '@/lib/utils'

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

function ToolbarDivider() {
  return <div className="w-px h-6 bg-gray-200 mx-1" />
}

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}

function ToolbarButton({ onClick, isActive, disabled, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'p-1.5 rounded-md transition-colors duration-150',
        'hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed',
        isActive && 'bg-[#004094]/10 text-[#004094]',
        !isActive && 'text-gray-600'
      )}
    >
      {children}
    </button>
  )
}

export default function TiptapEditor({
  content,
  onChange,
  placeholder = '내용을 입력하세요...',
}: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const colorPickerRef = useRef<HTMLDivElement>(null)
  const linkInputRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      TiptapImage.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#004094] underline hover:text-[#004094]/80 cursor-pointer',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-400 before:float-left before:h-0 before:pointer-events-none',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose max-w-none min-h-[300px] px-4 py-3 focus:outline-none ' +
          '[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 ' +
          '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 ' +
          '[&_p]:my-2 [&_p]:leading-7 ' +
          '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 ' +
          '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 ' +
          '[&_li]:my-0.5 ' +
          '[&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full ' +
          '[&_a]:text-[#004094] [&_a]:underline',
      },
    },
    immediatelyRender: false,
  })

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file || !editor) return

      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.')
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('파일 크기는 10MB를 초과할 수 없습니다.')
        return
      }

      setImageUploading(true)
      try {
        const url = await uploadImage(file, 'news')
        editor.chain().focus().setImage({ src: url }).run()
      } catch (err) {
        console.error('이미지 업로드 실패:', err)
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.')
      } finally {
        setImageUploading(false)
        e.target.value = ''
      }
    },
    [editor]
  )

  const handleSetLink = useCallback(() => {
    if (!editor) return

    if (linkUrl.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      setShowLinkInput(false)
      setLinkUrl('')
      return
    }

    let url = linkUrl.trim()
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    setShowLinkInput(false)
    setLinkUrl('')
  }, [editor, linkUrl])

  const openLinkInput = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href || ''
    setLinkUrl(previousUrl)
    setShowLinkInput(true)
  }, [editor])

  const PRESET_COLORS = [
    '#000000', '#374151', '#6b7280', '#9ca3af',
    '#004094', '#2563eb', '#3b82f6', '#60a5fa',
    '#dc2626', '#ef4444', '#f87171', '#fca5a5',
    '#ea580c', '#f97316', '#fb923c', '#fdba74',
    '#16a34a', '#22c55e', '#4ade80', '#86efac',
    '#9333ea', '#a855f7', '#c084fc', '#d8b4fe',
  ]

  const HIGHLIGHT_COLORS = [
    { label: '노랑', value: '#fef08a' },
    { label: '초록', value: '#bbf7d0' },
    { label: '파랑', value: '#bfdbfe' },
    { label: '빨강', value: '#fecaca' },
    { label: '보라', value: '#e9d5ff' },
    { label: '주황', value: '#fed7aa' },
  ]

  if (!editor) {
    return (
      <div className="border border-gray-200 rounded-xl bg-white min-h-[380px] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden focus-within:border-[#004094]/50 focus-within:ring-1 focus-within:ring-[#004094]/20 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-200 bg-gray-50/80">
        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="굵게 (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="기울임 (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="밑줄 (Ctrl+U)"
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="취소선"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="제목 2"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="제목 3"
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="글머리 기호 목록"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="번호 매기기 목록"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Text alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="왼쪽 정렬"
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="가운데 정렬"
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="오른쪽 정렬"
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Link */}
        <div className="relative" ref={linkInputRef}>
          <ToolbarButton
            onClick={openLinkInput}
            isActive={editor.isActive('link')}
            title="링크 삽입"
          >
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
          {editor.isActive('link') && (
            <ToolbarButton
              onClick={() => editor.chain().focus().unsetLink().run()}
              title="링크 제거"
            >
              <Unlink className="w-4 h-4" />
            </ToolbarButton>
          )}
          {showLinkInput && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex items-center gap-2 min-w-[320px]">
              <input
                type="url"
                placeholder="URL을 입력하세요"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSetLink()
                  }
                  if (e.key === 'Escape') {
                    setShowLinkInput(false)
                    setLinkUrl('')
                  }
                }}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#004094] focus:ring-1 focus:ring-[#004094]/20"
                autoFocus
              />
              <button
                type="button"
                onClick={handleSetLink}
                className="px-3 py-1.5 text-sm bg-[#004094] text-white rounded-md hover:bg-[#004094]/90 transition-colors"
              >
                확인
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLinkInput(false)
                  setLinkUrl('')
                }}
                className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                취소
              </button>
            </div>
          )}
        </div>

        {/* Image upload */}
        <ToolbarButton
          onClick={() => fileInputRef.current?.click()}
          disabled={imageUploading}
          title="이미지 삽입"
        >
          {imageUploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ImageIcon className="w-4 h-4" />
          )}
        </ToolbarButton>

        <ToolbarDivider />

        {/* Color picker */}
        <div className="relative" ref={colorPickerRef}>
          <ToolbarButton
            onClick={() => {
              setShowColorPicker(!showColorPicker)
              setShowLinkInput(false)
            }}
            title="글자 색상"
          >
            <Palette className="w-4 h-4" />
          </ToolbarButton>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px]">
              <p className="text-xs font-medium text-gray-500 mb-2">글자 색상</p>
              <div className="grid grid-cols-8 gap-1 mb-3">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      editor.chain().focus().setColor(color).run()
                      setShowColorPicker(false)
                    }}
                    className="w-5 h-5 rounded-sm border border-gray-200 hover:scale-125 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetColor().run()
                  setShowColorPicker(false)
                }}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                색상 초기화
              </button>
            </div>
          )}
        </div>

        {/* Highlight */}
        <div className="relative group">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
            isActive={editor.isActive('highlight')}
            title="형광펜"
          >
            <Highlighter className="w-4 h-4" />
          </ToolbarButton>
          <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2 hidden group-hover:flex gap-1">
            {HIGHLIGHT_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight({ color: c.value }).run()}
                className="w-5 h-5 rounded-sm border border-gray-200 hover:scale-125 transition-transform"
                style={{ backgroundColor: c.value }}
                title={c.label}
              />
            ))}
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetHighlight().run()}
              className="w-5 h-5 rounded-sm border border-gray-200 bg-white hover:scale-125 transition-transform flex items-center justify-center text-[10px] text-gray-400"
              title="형광펜 제거"
            >
              &times;
            </button>
          </div>
        </div>

        <ToolbarDivider />

        {/* Undo / Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="실행 취소 (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="다시 실행 (Ctrl+Shift+Z)"
        >
          <Redo2 className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Editor content */}
      <div
        onClick={() => editor.chain().focus().run()}
        className="cursor-text"
      >
        <EditorContent editor={editor} />
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  )
}
