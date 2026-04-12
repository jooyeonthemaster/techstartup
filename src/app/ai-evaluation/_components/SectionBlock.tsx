'use client'

import type { ReactNode } from 'react'

export default function SectionBlock({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: string
  title: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="scroll-mt-[128px] py-16 border-t border-[#E5E5E5] first:border-t-0 first:pt-8"
    >
      <div className="relative mb-10">
        <span className="absolute -top-4 left-0 text-[72px] font-extralight leading-none text-[#E5E5E5] select-none pointer-events-none">
          {number}
        </span>
        <div className="relative pt-8 pl-1">
          <h2 className="text-[20px] font-bold uppercase tracking-[0.15em] text-[#0A0A0A]">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  )
}
