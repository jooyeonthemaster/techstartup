'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Send, User, Building2, Mail, Phone, Briefcase } from 'lucide-react'

export default function MembershipApplySection() {
  const [formData, setFormData] = useState({
    name: '',
    affiliation: '',
    position: '',
    email: '',
    phone: '',
    tier: '정회원',
    applicantType: '',
    source: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">MEMBERSHIP APPLY</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
            협회 가입 신청
          </h1>
          <p className="text-gray-600 dark:text-gray-400">아래 양식을 작성해 신청해 주세요. 담당 매니저가 안내드립니다.</p>
        </div>

        <Card className="p-8 shadow-md">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">이름 *</label>
                <div className="relative">
                  <input name="name" value={formData.name} onChange={onChange} required className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" placeholder="홍길동" />
                  <User className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">소속</label>
                <div className="relative">
                  <input name="affiliation" value={formData.affiliation} onChange={onChange} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" placeholder="예: ○○대학교 / ○○기업 / 프리랜서" />
                  <Building2 className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">직위</label>
                <div className="relative">
                  <input name="position" value={formData.position} onChange={onChange} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" placeholder="예: 대표 / 교수 / 매니저" />
                  <Briefcase className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">이메일 *</label>
                <div className="relative">
                  <input type="email" name="email" value={formData.email} onChange={onChange} required className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" placeholder="email@example.com" />
                  <Mail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">연락처</label>
                <div className="relative">
                  <input name="phone" value={formData.phone} onChange={onChange} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" placeholder="010-1234-5678" />
                  <Phone className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">신청자 유형 *</label>
                <select name="applicantType" value={formData.applicantType} onChange={onChange} required className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                  <option value="">선택해주세요</option>
                  <option value="예비창업자">예비창업자</option>
                  <option value="초기창업자">초기창업자</option>
                  <option value="취업준비생">취업준비생</option>
                  <option value="AC, VC 등 투자자">AC, VC 등 투자자</option>
                  <option value="교육자(대학교수, 강사 등)">교육자(대학교수, 강사 등)</option>
                  <option value="벤처기업 대표 및 임직원">벤처기업 대표 및 임직원</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">회원 등급 선택 *</label>
              <select name="tier" value={formData.tier} onChange={onChange} required className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                <option value="협회장">협회장</option>
                <option value="이사">이사</option>
                <option value="정회원">정회원</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">신청 경로</label>
              <select name="source" value={formData.source} onChange={onChange} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                <option value="">선택해주세요</option>
                <option value="홈페이지">홈페이지</option>
                <option value="지인 추천">지인 추천</option>
                <option value="검색(SNS/포털)">검색(SNS/포털)</option>
                <option value="행사/세미나">행사/세미나</option>
                <option value="언론/기사">언론/기사</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">요청 사항</label>
              <textarea name="message" value={formData.message} onChange={onChange} rows={6} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" placeholder="특이사항이나 요청을 작성해 주세요" />
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" required className="mt-1" />
              <label className="text-sm text-gray-600 dark:text-gray-400">개인정보 수집 및 이용에 동의합니다.</label>
            </div>

            <Button type="submit" disabled={submitting} className="w-full h-12 rounded-lg text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-700 hover:via-cyan-600 hover:to-purple-700 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)]">
              {submitting ? '제출 중...' : <><Send className="w-5 h-5 mr-2" /> 신청 제출</>}
            </Button>

            {submitted && (
              <p className="text-center text-green-600 mt-2">신청이 접수되었습니다. 담당자가 곧 연락드립니다.</p>
            )}
          </form>
        </Card>
      </div>
    </section>
  )
}


