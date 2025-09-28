'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Handshake, Building2, GraduationCap, Target, FileText, Users, CheckCircle } from 'lucide-react';

export default function CooperationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Program Overview with Enhanced Cards */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 -mx-6 md:mx-0">
            {/* 2025 Program Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 md:p-10 rounded-xl border-2 border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-[#005bac] mb-6">2025년 산학연 협력 R&D 사업</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  중소기업과 대학·연구기관 간의 공동 기술개발 및 사업화를 지원하는
                  정부 지원 R&D 프로그램입니다. 혁신적 성장과 일자리 창출을 도모합니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                    <div className="text-xl md:text-2xl font-bold text-[#005bac]">450억</div>
                    <div className="text-xs md:text-sm text-gray-600">총 예산</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
                    <div className="text-xl md:text-2xl font-bold text-[#ff6600]">562개</div>
                    <div className="text-xs md:text-sm text-gray-600">지원 과제</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                    <div className="text-xl md:text-2xl font-bold text-green-600">100%</div>
                    <div className="text-xs md:text-sm text-gray-600">정부 지원</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Program Types Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-[#005bac]/5 to-white p-8 md:p-10 rounded-xl border-2 border-[#005bac]/20 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-[#005bac] mb-6">과제 유형</h2>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border-2 border-blue-200 hover:border-[#005bac]/50 transition-all">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div>
                      <p className="text-base md:text-lg font-semibold text-[#005bac]">일반형</p>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">1:1 협력 구조, 예비 414개 + 사업화 148개</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xl md:text-2xl font-bold text-[#005bac]">351억원</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border-2 border-orange-200 hover:border-[#ff6600]/50 transition-all">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div>
                      <p className="text-base md:text-lg font-semibold text-[#ff6600]">컨소시엄형</p>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">국가 전략기술, 레전드 50+ 과제</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xl md:text-2xl font-bold text-[#ff6600]">100억원</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Services Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#005bac] mb-4">협회 지원 서비스</h2>
            <p className="text-lg text-gray-500">성공적인 R&D 수행을 위한 전문 지원</p>
          </motion.div>

          <div className="space-y-6 -mx-6 md:mx-0">
            {[
              {
                step: '01',
                icon: FileText,
                title: '정부 R&D 일정 공유',
                color: 'blue',
                description: '최신 공고 및 준비사항을 실시간으로 업데이트하여 제공',
                features: [
                  '실시간 공고 모니터링',
                  '맞춤형 알림 서비스',
                  '준비 체크리스트 제공',
                  '신청 일정 관리'
                ]
              },
              {
                step: '02',
                icon: Users,
                title: '맞춤형 프로젝트 컨설팅',
                color: 'orange',
                description: '산업별 맞춤 컨설팅 및 컨소시엄 매칭 서비스',
                features: [
                  '기술 전문가 매칭',
                  '컨소시엄 구성 지원',
                  '프로젝트 기획 워크샵',
                  '성공사례 벤치마킹'
                ]
              },
              {
                step: '03',
                icon: Target,
                title: '제안서 및 예산 설계 지원',
                color: 'green',
                description: '사업계획서 작성 및 발표 코칭으로 선정 확률 극대화',
                features: [
                  '제안서 템플릿 제공',
                  '예산 설계 가이드라인',
                  '전문가 리뷰 서비스',
                  '발표 시뮬레이션'
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white p-8 rounded-lg border-2 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  item.color === 'blue' ? 'border-blue-200 hover:border-[#005bac]/50' :
                  item.color === 'orange' ? 'border-orange-200 hover:border-[#ff6600]/50' :
                  'border-green-200 hover:border-green-500/50'
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold flex-shrink-0 text-white ${
                    item.color === 'blue' ? 'bg-[#005bac]' :
                    item.color === 'orange' ? 'bg-[#ff6600]' :
                    'bg-green-600'
                  }`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                      <item.icon className={`w-6 h-6 ${
                        item.color === 'blue' ? 'text-[#005bac]' :
                        item.color === 'orange' ? 'text-[#ff6600]' :
                        'text-green-600'
                      }`} />
                    <h3 className={`text-lg md:text-xl font-semibold ${
                        item.color === 'blue' ? 'text-[#005bac]' :
                        item.color === 'orange' ? 'text-[#ff6600]' :
                        'text-green-600'
                      }`}>{item.title}</h3>
                    </div>
                  <p className="text-sm md:text-base text-gray-600 mb-4">{item.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                            item.color === 'blue' ? 'text-blue-400' :
                            item.color === 'orange' ? 'text-orange-400' :
                            'text-green-400'
                          }`} />
                        <span className="text-sm md:text-base text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Target Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-xl border-2 border-blue-100 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-[#005bac] mb-8 text-center">지원 대상</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-[#005bac]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-[#005bac] mb-2">중소기업</h3>
                <p className="text-sm md:text-base text-gray-600">기업부설연구소 보유 중소기업</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-10 h-10 text-[#ff6600]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-[#ff6600] mb-2">대학</h3>
                <p className="text-sm md:text-base text-gray-600">산학협력단 등록 대학</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Handshake className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-green-600 mb-2">연구기관</h3>
                <p className="text-sm md:text-base text-gray-600">정부출연 연구기관 및 전문연구소</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-xl border-2 border-[#005bac]/20 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-[#005bac] mb-8 text-center">지원 프로세스</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="md:hidden absolute left-6 top-0 w-px h-full bg-gradient-to-b from-[#005bac] to-[#ff6600]"></div>
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#005bac] to-[#ff6600]"></div>
              {[
                { step: '01', title: '초기 상담', desc: '프로젝트 기획 상담', time: '1주', color: 'blue' },
                { step: '02', title: '매칭 지원', desc: '컨소시엄 구성 지원', time: '2주', color: 'orange' },
                { step: '03', title: '서류 준비', desc: '제안서 작성 지원', time: '3주', color: 'green' },
                { step: '04', title: '선정 지원', desc: '발표 코칭 및 심사 대응', time: '1주', color: 'purple' }
              ].map((item, i) => (
                <div key={i} className={`relative mb-8 md:flex md:items-center ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`w-full md:w-5/12 pl-16 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className={`p-6 bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all ${
                      item.color === 'blue' ? 'border-blue-200 hover:border-[#005bac]/50' :
                      item.color === 'orange' ? 'border-orange-200 hover:border-[#ff6600]/50' :
                      item.color === 'green' ? 'border-green-200 hover:border-green-500/50' :
                      'border-purple-200 hover:border-purple-500/50'
                    }`}>
                      <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <span className={`text-sm font-semibold ${
                          item.color === 'blue' ? 'text-[#005bac]' :
                          item.color === 'orange' ? 'text-[#ff6600]' :
                          item.color === 'green' ? 'text-green-600' :
                          'text-purple-600'
                        }`}>Step {item.step}</span>
                        <span className="text-xs text-gray-500">({item.time})</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  <div className={`absolute top-1/2 left-6 md:left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white ${
                    item.color === 'blue' ? 'bg-[#005bac]' :
                    item.color === 'orange' ? 'bg-[#ff6600]' :
                    item.color === 'green' ? 'bg-green-600' :
                    'bg-purple-600'
                  }`}></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-xl border-2 border-blue-100 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-[#005bac] mb-8 text-center">기대 효과</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 -mx-6 md:mx-0">
              <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 hover:border-[#005bac]/50 transition-all">
                <h3 className="text-lg md:text-xl font-semibold text-[#005bac] mb-3 md:mb-4">기업 혜택</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#005bac] mt-1">•</span>
                    <span className="text-sm md:text-base text-gray-700">R&D 자금 확보 (최대 75% 정부 지원)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#005bac] mt-1">•</span>
                    <span className="text-sm md:text-base text-gray-700">우수 연구인력 활용 기회</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#005bac] mt-1">•</span>
                    <span className="text-sm md:text-base text-gray-700">핵심 기술 개발 및 사업화</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#005bac] mt-1">•</span>
                    <span className="text-sm md:text-base text-gray-700">지식재산권 확보</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 md:p-8 bg-gradient-to-br from-orange-50 to-white rounded-xl border-2 border-orange-200 hover:border-[#ff6600]/50 transition-all">
                <h3 className="text-lg md:text-xl font-semibold text-[#ff6600] mb-3 md:mb-4">대학/연구기관 혜택</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6600] mt-1">•</span>
                    <span className="text-sm md:text-base text-gray-700">연구 성과 실용화 기회</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6600] mt-1">•</span>
                    <span className="text-sm md:text-base text-gray-700">산업 현장 수요 파악</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6600] mt-1">•</span>
                    <span className="text-sm md:text-base text-gray-700">연구비 확보 및 인력 양성</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6600] mt-1">•</span>
                    <span className="text-sm md:text-base text-gray-700">기업과의 네트워크 구축</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}