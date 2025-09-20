'use client'

import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactSection() {
  return (
    <section className="py-12 bg-[#f8f8f8]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#005bac' }}>
          CONTACT US
        </h2>
        
        {/* Traditional Contact Info Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-[#ddd] p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Contact Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#333] mb-4">연락처 정보</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#005bac] mt-0.5" />
                    <div>
                      <p className="font-bold text-[#333]">전화문의</p>
                      <p className="text-sm text-[#666]">010-3721-0204</p>
                      <p className="text-xs text-[#999]">평일 09:00 - 18:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#005bac] mt-0.5" />
                    <div>
                      <p className="font-bold text-[#333]">이메일</p>
                      <p className="text-sm text-[#666]">info@techventure.or.kr</p>
                      <p className="text-xs text-[#999]">24시간 접수 가능</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#005bac] mt-0.5" />
                    <div>
                      <p className="font-bold text-[#333]">오시는 길</p>
                      <p className="text-sm text-[#666]">서울시 중구 퇴계로 36길 2</p>
                      <p className="text-xs text-[#999]">충무로관 신관 B103호</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#005bac] mt-0.5" />
                    <div>
                      <p className="font-bold text-[#333]">운영시간</p>
                      <p className="text-sm text-[#666]">평일 09:00 - 18:00</p>
                      <p className="text-xs text-[#999]">토/일/공휴일 휴무</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Quick Contact Form */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#333] mb-4">빠른 문의</h3>
                
                <form className="space-y-3">
                  <div>
                    <label className="block text-sm font-bold text-[#333] mb-1">이름 *</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-[#ddd] text-sm"
                      placeholder="홍길동"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#333] mb-1">연락처 *</label>
                    <input 
                      type="tel" 
                      className="w-full px-3 py-2 border border-[#ddd] text-sm"
                      placeholder="010-1234-5678"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#333] mb-1">문의내용 *</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-[#ddd] text-sm"
                      rows={4}
                      placeholder="문의하실 내용을 입력해주세요."
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full py-2 bg-[#005bac] text-white font-bold text-sm hover:bg-[#004890] transition-colors"
                  >
                    문의 보내기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
