'use client'

import { Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const footerLinks = {
    '협회소개': [
      { label: '협회 개요', href: '/about' },
      { label: '임원진 소개', href: '/about/executives' },
      { label: '조직도', href: '/about/organization' },
      { label: '연혁', href: '/about/history' }
    ],
    '서비스': [
      { label: '컨설팅', href: '#' },
      { label: '투자 유치', href: '/business/investment' },
      { label: '교육 프로그램', href: '/business/employment' },
      { label: '네트워킹', href: '#' }
    ],
    '자료실': [
      { label: '공지사항', href: '/news/notice' },
      { label: '보도자료', href: '/news/press' },
      { label: '연구자료', href: '#' },
      { label: '뉴스레터', href: '#' }
    ],
    '지원': [
      { label: '자주 묻는 질문', href: '#' },
      { label: '이용약관', href: '#' },
      { label: '개인정보처리방침', href: '#' },
      { label: '사이트맵', href: '#' }
    ]
  }

  return (
    <>
      {/* Traditional Footer - Simple design */}
      <footer className="bg-[#333] text-white">
        {/* Top Footer */}
        <div className="border-t-4 border-[#ff6600] pt-8 pb-6">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-5 gap-8">
              {/* Company Info with Original Logo */}
              <div className="md:col-span-1">
                <div className="mb-4">
                  <div className="relative w-32 h-10">
                    <Image 
                      src="/images/logo.png" 
                      alt="KTVSA Logo" 
                      fill 
                      className="object-contain brightness-0 invert" 
                    />
                  </div>
                </div>
                <p className="text-xs text-[#999] leading-relaxed">
                  대한민국 기술 벤처 생태계의<br/>
                  성장과 발전을 위해<br/>
                  2025년 새롭게 출범한<br/>
                  비영리 사단법인입니다.
                </p>
              </div>

              {/* Footer Links */}
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h4 className="text-sm font-bold mb-3">{title}</h4>
                  <ul className="space-y-1">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link 
                          href={link.href}
                          className="text-xs text-[#999] hover:text-[#ff6600] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-[#222] py-6">
          <div className="container mx-auto px-4">
            <div className="md:flex md:justify-between md:items-center">
              {/* Contact Info */}
              <div className="text-xs text-[#999] space-y-1 mb-4 md:mb-0">
                <p className="flex items-center gap-2">
                  <strong>기술벤처스타트업협회</strong>
                  Tech Venture Startup Association
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  서울시 중구 퇴계로 36길 2, 충무로관 신관 B103호
                </p>
                <p className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    TEL: 02-336-0250
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    tvs@techventure.co.kr
                  </span>
                </p>
              </div>

              {/* Copyright */}
              <div className="text-xs text-[#666]">
                <p>COPYRIGHT © 2025 Tech Venture Startup Association. ALL RIGHTS RESERVED.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
