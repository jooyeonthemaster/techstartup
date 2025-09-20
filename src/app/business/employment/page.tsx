'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Users, Briefcase, TrendingUp, Target, Lightbulb, Rocket, CheckCircle } from 'lucide-react';

export default function EmploymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Main Content with Enhanced Cards */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* AI Marketing Program Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 rounded-xl border-2 border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-[#005bac] mb-6">AI 마케팅 역량 강화 프로그램</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  외국인 유학생을 대상으로 한 AI 마케팅 실무 프로젝트 기반 채용연계 프로그램입니다.
                  생성형 AI를 활용한 해외시장 진출 시장조사 설계 및 리포트 작성 교육을 제공합니다.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                    <div className="text-2xl font-bold text-[#005bac]">10주</div>
                    <div className="text-sm text-gray-600">교육 기간</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
                    <div className="text-2xl font-bold text-[#ff6600]">110시간</div>
                    <div className="text-sm text-gray-600">총 교육 시간</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-gray-600">지원금</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-[#005bac]/5 to-white p-10 rounded-xl border-2 border-[#005bac]/20 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-[#005bac] mb-6">프로그램 성과</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-white rounded-lg border-2 border-blue-100 hover:border-[#005bac]/50 hover:bg-blue-50/50 transition-all duration-200">
                  <div className="text-3xl font-bold text-[#005bac] mb-1">420명</div>
                  <div className="text-gray-600">지원자</div>
                </div>
                <div className="p-4 bg-white rounded-lg border-2 border-orange-100 hover:border-[#ff6600]/50 hover:bg-orange-50/50 transition-all duration-200">
                  <div className="text-3xl font-bold text-[#ff6600] mb-1">26명</div>
                  <div className="text-gray-600">최종 선발</div>
                </div>
                <div className="p-4 bg-white rounded-lg border-2 border-green-100 hover:border-green-400 hover:bg-green-50/50 transition-all duration-200">
                  <div className="text-3xl font-bold text-green-600 mb-1">44개</div>
                  <div className="text-gray-600">인턴십 포지션</div>
                </div>
                <div className="p-4 bg-white rounded-lg border-2 border-purple-100 hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-200">
                  <div className="text-3xl font-bold text-purple-600 mb-1">3개</div>
                  <div className="text-gray-600">협력 대학</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Structure Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#005bac] mb-4">프로그램 구조</h2>
            <p className="text-lg text-gray-500">체계적인 3단계 프로세스</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                phase: '01',
                title: '학생 모집',
                color: 'blue',
                description: '동국대, 중앙대, 건국대 국제처와의 협력을 통한 우수 인재 선발',
                details: [
                  '26명 사전 선발 완료',
                  'TOPIK 4급 이상, 비자 및 전공 확인',
                  '인성 및 역량 평가 실시'
                ]
              },
              {
                phase: '02',
                title: '역량 강화 교육',
                color: 'orange',
                description: '생성형 AI를 활용한 해외시장 진출 시장조사 설계 역량 강화',
                details: [
                  '생성형 AI 활용 시장조사 방법론',
                  '리포트 작성 실무 교육',
                  '한국 기업문화 이해 프로그램'
                ]
              },
              {
                phase: '03',
                title: '인턴십 매칭',
                color: 'green',
                description: '회원사와의 전략적 매칭 및 채용 연계',
                details: [
                  '44개 인턴십 포지션 확보',
                  '포트폴리오 플랫폼 공유',
                  '시간제 취업 허가 지원'
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
                    {item.phase}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 ${
                      item.color === 'blue' ? 'text-[#005bac]' :
                      item.color === 'orange' ? 'text-[#ff6600]' :
                      'text-green-600'
                    }`}>{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className={`w-5 h-5 ${
                            item.color === 'blue' ? 'text-blue-400' :
                            item.color === 'orange' ? 'text-orange-400' :
                            'text-green-400'
                          }`} />
                          <span className="text-gray-700">{detail}</span>
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

      {/* Curriculum Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-xl border-2 border-blue-100 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-[#005bac] mb-8 text-center">교육 커리큘럼</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-lg border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#005bac] rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#005bac]">토요일 프로그램</h3>
                    <p className="text-sm text-gray-600">80시간</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#005bac] mt-1">•</span>
                    <span className="text-gray-700">디지털 마케팅 기초</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#005bac] mt-1">•</span>
                    <span className="text-gray-700">텍스트 및 이미지 생성형 AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#005bac] mt-1">•</span>
                    <span className="text-gray-700">시뮬레이션 기반 리서치</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#005bac] mt-1">•</span>
                    <span className="text-gray-700">개인별 리포트 작성</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-gradient-to-br from-orange-50 to-white rounded-lg border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#ff6600] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#ff6600]">평일 저녁 프로그램</h3>
                    <p className="text-sm text-gray-600">30시간</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6600] mt-1">•</span>
                    <span className="text-gray-700">AI 활용 보고서 작성</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6600] mt-1">•</span>
                    <span className="text-gray-700">한국 기업문화 이해</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6600] mt-1">•</span>
                    <span className="text-gray-700">퍼스널 브랜딩 기초</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6600] mt-1">•</span>
                    <span className="text-gray-700">비즈니스 커뮤니케이션</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-xl border-2 border-[#005bac]/20 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-[#005bac] mb-8 text-center">프로그램 일정</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#005bac] to-[#ff6600]"></div>
              {[
                { date: '2025년 4월', title: '모집', desc: '420명 지원, 20명 선발', color: 'blue' },
                { date: '2025년 4-6월', title: '교육', desc: '10주 집중 교육 프로그램', color: 'orange' },
                { date: '2025년 6월', title: '매칭', desc: '기업-학생 매칭 진행', color: 'green' },
                { date: '2025년 7-8월', title: '인턴십', desc: '2개월 전액 지원 인턴십', color: 'purple' },
                { date: '2025년 9월+', title: '채용', desc: 'D-10 비자 전환 및 정규직 채용', color: 'blue' }
              ].map((item, i) => (
                <div key={i} className={`relative flex items-center mb-8 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className={`p-6 bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all ${
                      item.color === 'blue' ? 'border-blue-200 hover:border-[#005bac]/50' :
                      item.color === 'orange' ? 'border-orange-200 hover:border-[#ff6600]/50' :
                      item.color === 'green' ? 'border-green-200 hover:border-green-500/50' :
                      'border-purple-200 hover:border-purple-500/50'
                    }`}>
                      <div className={`text-sm font-semibold mb-1 ${
                        item.color === 'blue' ? 'text-[#005bac]' :
                        item.color === 'orange' ? 'text-[#ff6600]' :
                        item.color === 'green' ? 'text-green-600' :
                        'text-purple-600'
                      }`}>{item.date}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white ${
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
    </div>
  );
}