'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Handshake, Building2, GraduationCap, Target, FileText, Users, CheckCircle } from 'lucide-react';

export default function CooperationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Program Overview with Glassmorphism Cards */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 2025 Program Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-md bg-white/70 p-10 rounded-2xl border border-white/50 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-black mb-6">2025년 산학연 협력 R&D 사업</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  중소기업과 대학·연구기관 간의 공동 기술개발 및 사업화를 지원하는
                  정부 지원 R&D 프로그램입니다. 혁신적 성장과 일자리 창출을 도모합니다.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-sky-50/50 rounded-lg border border-sky-100">
                    <div className="text-2xl font-bold text-sky-600">450억</div>
                    <div className="text-sm text-gray-600">총 예산</div>
                  </div>
                  <div className="p-4 bg-sky-50/50 rounded-lg border border-sky-100">
                    <div className="text-2xl font-bold text-sky-600">562개</div>
                    <div className="text-sm text-gray-600">지원 과제</div>
                  </div>
                  <div className="p-4 bg-sky-50/50 rounded-lg border border-sky-100">
                    <div className="text-2xl font-bold text-sky-600">100%</div>
                    <div className="text-sm text-gray-600">정부 지원</div>
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
              className="backdrop-blur-md bg-white/70 p-10 rounded-2xl border border-white/50 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-black mb-6">과제 유형</h2>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-sky-50 to-white rounded-lg border border-sky-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-black">일반형</p>
                      <p className="text-sm text-gray-600 mt-1">1:1 협력 구조, 예비 414개 + 사업화 148개</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-sky-600">351억원</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-black">컨소시엄형</p>
                      <p className="text-sm text-gray-600 mt-1">국가 전략기술, 레전드 50+ 과제</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">100억원</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-black mb-4">협회 지원 서비스</h2>
            <p className="text-xl text-gray-600">성공적인 R&D 수행을 위한 전문 지원</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                step: '01',
                icon: FileText,
                title: '정부 R&D 일정 공유',
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
                className="backdrop-blur-md bg-white/80 p-8 rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="w-6 h-6 text-sky-600" />
                      <h3 className="text-2xl font-bold text-black">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-white/70 p-12 rounded-2xl border border-white/50 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-black mb-8 text-center">지원 대상</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-sky-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">중소기업</h3>
                <p className="text-gray-600">기업부설연구소 보유 중소기업</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">대학</h3>
                <p className="text-gray-600">산학협력단 등록 대학</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Handshake className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">연구기관</h3>
                <p className="text-gray-600">정부출연 연구기관 및 전문연구소</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-white/70 p-12 rounded-2xl border border-white/50 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-black mb-8 text-center">지원 프로세스</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-sky-200"></div>
              {[
                { step: '01', title: '초기 상담', desc: '프로젝트 기획 상담', time: '1주' },
                { step: '02', title: '매칭 지원', desc: '컨소시엄 구성 지원', time: '2주' },
                { step: '03', title: '서류 준비', desc: '제안서 작성 지원', time: '3주' },
                { step: '04', title: '선정 지원', desc: '발표 코칭 및 심사 대응', time: '1주' }
              ].map((item, i) => (
                <div key={i} className={`relative flex items-center mb-8 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'justify-end' : ''}">
                        <span className="text-sm text-sky-600 font-semibold">Step {item.step}</span>
                        <span className="text-xs text-gray-500">({item.time})</span>
                      </div>
                      <h3 className="text-lg font-bold text-black mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-white/70 p-12 rounded-2xl border border-white/50 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-black mb-8 text-center">기대 효과</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-gradient-to-br from-white to-sky-50/30 rounded-xl border border-sky-100">
                <h3 className="text-xl font-bold text-black mb-4">기업 혜택</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 mt-1">•</span>
                    <span className="text-gray-700">R&D 자금 확보 (최대 75% 정부 지원)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 mt-1">•</span>
                    <span className="text-gray-700">우수 연구인력 활용 기회</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 mt-1">•</span>
                    <span className="text-gray-700">핵심 기술 개발 및 사업화</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 mt-1">•</span>
                    <span className="text-gray-700">지식재산권 확보</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-gradient-to-br from-white to-blue-50/30 rounded-xl border border-blue-100">
                <h3 className="text-xl font-bold text-black mb-4">대학/연구기관 혜택</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">연구 성과 실용화 기회</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">산업 현장 수요 파악</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">연구비 확보 및 인력 양성</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">기업과의 네트워크 구축</span>
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