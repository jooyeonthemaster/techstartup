'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Quote, Calendar, Building, Target, Heart, Handshake } from 'lucide-react'

export default function GreetingSection() {
  return (
    <div className="relative pt-32 pb-20">
      {/* Background - 파란색 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#005bac] mb-4">
            협회장 인사말
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#005bac] to-transparent mx-auto mb-8" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            기술벤처스타트업협회와 함께하는 혁신의 여정에 오신 것을 환영합니다
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 왼쪽: 협회장 프로필 */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl border-2 border-blue-200 hover:border-[#005bac]/50 shadow-sm hover:shadow-lg transition-all duration-300 p-8 sticky top-24">
              {/* 협회장 이미지 */}
              <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden border border-gray-100">
                <Image 
                  src="/images/president.png" 
                  alt="김기홍 협회장" 
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* 협회장 정보 */}
              <div className="text-center">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#005bac] text-white text-xs font-semibold tracking-wide mb-4">
                  협회장
                </span>
                <h3 className="text-2xl font-bold text-[#005bac] mb-2">
                  김기홍
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  (주)링크드코리아 대표이사
                </p>
                
                {/* 구분선 */}
                <div className="w-full h-[1px] bg-gray-200 my-4" />
                
                {/* 간단한 프로필 */}
                <div className="space-y-2 text-left">
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">현) (사)기술벤처스타트업협회 회장</p>
                      <p className="text-xs text-gray-500">2025년 ~ 현재</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Handshake className="w-4 h-4 text-orange-400 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">현) (주)링크드코리아 대표이사</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 오른쪽: 인사말 내용 */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 p-10">
              {/* 인용 아이콘 */}
              <Quote className="w-12 h-12 text-[#005bac]/20 mb-6" />
              
              {/* 인사말 본문 */}
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg font-medium text-[#005bac]">
                  안녕하십니까, <br />
                  기술벤처스타트업협회 회장 김기홍입니다.
                </p>
                
                <p>
                  급변하는 4차 산업혁명 시대, 기술 혁신이 국가 경쟁력의 핵심이 되고 있는 지금, 
                  우리 협회는 대한민국 기술벤처 생태계의 중심에서 혁신을 이끌어가겠습니다.
                </p>
                
                <p>
                  기술벤처스타트업협회는 2025년 설립된 신설 협회로서, 기술 기반 스타트업의 
                  성장을 위한 든든한 동반자가 되고자 합니다. 우리는 단순히 기업들의 모임이 아닌, 
                  대한민국 기술 혁신의 미래를 함께 만들어가는 공동체를 지향합니다.
                </p>

                <div className="bg-blue-50 rounded-xl p-6 my-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-[#005bac] mb-3">우리가 추구하는 가치</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <Target className="w-8 h-8 text-[#005bac] mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700">혁신</p>
                      <p className="text-xs text-gray-600">기술 혁신으로 미래를 선도</p>
                    </div>
                    <div className="text-center">
                      <Heart className="w-8 h-8 text-[#ff6600] mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700">성장</p>
                      <p className="text-xs text-gray-600">함께 성장하는 생태계 구축</p>
                    </div>
                    <div className="text-center">
                      <Handshake className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700">협력</p>
                      <p className="text-xs text-gray-600">산학연 협력 네트워크 강화</p>
                    </div>
                  </div>
                </div>
                
                <p>
                  우리 협회는 회원사들에게 실질적인 도움을 제공하기 위해 다양한 프로그램을 
                  준비하고 있습니다. 투자 유치 지원, 채용 매칭, 산학 협력 프로그램, 그리고 
                  글로벌 진출 지원까지, 스타트업의 전 생애 주기에 걸친 맞춤형 서비스를 
                  제공할 예정입니다.
                </p>
                
                <p>
                  특히, 동국대학교 캠퍼스타운과의 협력을 통해 구축할 창업 공간은 
                  초기 스타트업들에게 안정적인 성장 기반을 제공할 예정이며, 대학과 기업 간의 
                  시너지를 창출하는 혁신의 요람이 될 것입니다.
                </p>

                <div className="bg-orange-50 rounded-xl p-6 my-6 border border-orange-200">
                  <p className="text-sm text-gray-700 italic">
                    "우리는 기술로 세상을 바꾸는 혁신가들과 함께합니다. <br />
                    여러분의 도전이 대한민국의 미래가 되도록, <br />
                    기술벤처스타트업협회가 든든한 동반자가 되겠습니다."
                  </p>
                </div>
                
                <p>
                  앞으로도 기술벤처스타트업협회는 회원사 여러분과 함께 더 큰 꿈을 향해 
                  나아가겠습니다. 기술 혁신의 최전선에서 여러분과 함께 성장하며, 
                  대한민국이 글로벌 기술 강국으로 도약하는 데 기여하겠습니다.
                </p>
                
                <p>
                  협회의 문은 항상 열려 있습니다. 기술 혁신을 꿈꾸는 모든 스타트업과 
                  벤처기업, 그리고 이들을 응원하는 모든 분들을 환영합니다.
                </p>
                
                <p className="text-lg font-medium text-[#005bac] mt-8">
                  감사합니다.
                </p>
                
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        사단법인 기술벤처스타트업협회
                      </p>
                      <p className="text-xl font-bold text-[#005bac] mt-1">
                        회장 김기홍
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>2025년 9월</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 하단 추가 정보 */}
        <motion.div 
          className="mt-12 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 p-6 hover:shadow-md transition-all duration-300">
            <h4 className="text-lg font-bold text-[#005bac] mb-3">협회 비전</h4>
            <p className="text-sm text-gray-600">
              기술 혁신으로 더 나은 미래를 만드는 글로벌 기술벤처 생태계의 중심
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl border-2 border-orange-200 p-6 hover:shadow-md transition-all duration-300">
            <h4 className="text-lg font-bold text-[#ff6600] mb-3">핵심 가치</h4>
            <p className="text-sm text-gray-600">
              혁신, 협력, 성장을 통한 지속 가능한 기술 생태계 구축
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-white rounded-xl border-2 border-green-200 p-6 hover:shadow-md transition-all duration-300">
            <h4 className="text-lg font-bold text-green-700 mb-3">약속</h4>
            <p className="text-sm text-gray-600">
              회원사의 성장과 성공이 곧 우리의 성공이라는 믿음으로 함께합니다
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}