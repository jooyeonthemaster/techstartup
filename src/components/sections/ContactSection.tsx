'use client'

import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section className="py-32 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left: Info - Typography driven, no boxes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              Contact Us
            </h2>
            <p className="text-xl text-gray-500 mb-16 font-light leading-relaxed">
              기술벤처스타트업협회는 언제나 열려있습니다.<br />
              여러분의 소중한 의견을 기다립니다.
            </p>

            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Phone</h3>
                  <p className="text-xl text-gray-900 font-medium">02-336-0250</p>
                  <p className="text-sm text-gray-500 mt-2">평일 09:00 - 18:00</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Email</h3>
                  <p className="text-xl text-gray-900 font-medium">tvs@techventure.co.kr</p>
                  <p className="text-sm text-gray-500 mt-2">24시간 접수 가능</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Office</h3>
                  <p className="text-lg text-gray-900 font-medium leading-relaxed">
                    서울시 중구 퇴계로 36길 2<br />
                    충무로관 신관 B103호
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Hours</h3>
                  <p className="text-lg text-gray-900 font-medium">평일 09:00 - 18:00</p>
                  <p className="text-sm text-gray-500 mt-2">토/일/공휴일 휴무</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form - Minimal line style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-500 mb-2 group-focus-within:text-[#004094] transition-colors">이름</label>
                  <input 
                    type="text" 
                    className="w-full py-3 border-b border-gray-200 focus:border-[#004094] outline-none transition-colors bg-transparent text-lg text-gray-900 placeholder-gray-300"
                    placeholder="홍길동"
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-500 mb-2 group-focus-within:text-[#004094] transition-colors">연락처</label>
                  <input 
                    type="tel" 
                    className="w-full py-3 border-b border-gray-200 focus:border-[#004094] outline-none transition-colors bg-transparent text-lg text-gray-900 placeholder-010-1234-5678"
                    placeholder="010-1234-5678"
                    required
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium text-gray-500 mb-2 group-focus-within:text-[#004094] transition-colors">문의내용</label>
                <textarea 
                  className="w-full py-3 border-b border-gray-200 focus:border-[#004094] outline-none transition-colors bg-transparent text-lg text-gray-900 placeholder-gray-300 resize-none min-h-[100px]"
                  placeholder="문의하실 내용을 입력해주세요."
                  required
                />
              </div>
              
              <div className="pt-6">
                <button 
                  type="submit"
                  className="group inline-flex items-center text-lg font-bold text-gray-900 hover:text-[#004094] transition-colors"
                >
                  문의 보내기
                  <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
