'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Target, Shield, Award, BarChart3, PieChart, CheckCircle } from 'lucide-react';

export default function InvestmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Fund Overview with Enhanced Cards */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* AICEO Fund Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 rounded-xl border-2 border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-[#005bac] mb-6">개인투자조합 AICEO 펀드</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  코맥스벤처스 GP와 협력하여 운영하는 초기 스타트업 투자 프로그램입니다.
                  AI와 딥테크 분야의 혁신 기업을 중점적으로 발굴하고 육성합니다.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                    <div className="text-2xl font-bold text-[#005bac]">5억원</div>
                    <div className="text-sm text-gray-600">펀드 규모</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
                    <div className="text-2xl font-bold text-[#ff6600]">70%</div>
                    <div className="text-sm text-gray-600">AI 투자 비중</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                    <div className="text-2xl font-bold text-green-600">7.0%</div>
                    <div className="text-sm text-gray-600">목표 수익률</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fund Structure Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-[#005bac]/5 to-white p-10 rounded-xl border-2 border-[#005bac]/20 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-[#005bac] mb-6">펀드 구성</h2>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border-2 border-blue-200 hover:border-[#005bac]/50 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">GP (업무집행조합원)</p>
                      <p className="text-lg font-semibold text-[#005bac]">코맥스벤처스 + 김기홍</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#005bac]">2천만원</p>
                      <p className="text-sm text-gray-600">4% 지분</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border-2 border-orange-200 hover:border-[#ff6600]/50 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">LP (유한책임조합원)</p>
                      <p className="text-lg font-semibold text-[#ff6600]">AICEO 동문</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#ff6600]">4.8억원</p>
                      <p className="text-sm text-gray-600">96% 지분</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Strategy Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#005bac] mb-4">투자 전략</h2>
            <p className="text-lg text-gray-500">체계적인 포트폴리오 구성과 전략적 투자</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                icon: Target,
                title: '주요 투자 분야 - AI & 딥테크 (70%)',
                description: '인공지능, 빅데이터, 스마트 기술 등 핵심 기술 중심 투자',
                details: [
                  '생성형 AI 및 LLM 애플리케이션',
                  '컴퓨터 비전 및 자율 시스템',
                  '로봇 공학 및 자동화 기술',
                  '빅데이터 분석 플랫폼'
                ],
                color: 'blue'
              },
              {
                icon: TrendingUp,
                title: '신산업 분야 (30%)',
                description: '성장 잠재력이 높은 신기술 분야에 대한 전략적 투자',
                details: [
                  '블록체인 및 Web3 인프라',
                  '바이오텍 및 헬스케어 혁신',
                  '클린테크 및 지속가능 에너지',
                  '핀테크 및 디지털 금융 솔루션'
                ],
                color: 'orange'
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
                  'border-orange-200 hover:border-[#ff6600]/50'
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                    item.color === 'blue' ? 'bg-[#005bac]' : 'bg-[#ff6600]'
                  }`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 ${
                      item.color === 'blue' ? 'text-[#005bac]' : 'text-[#ff6600]'
                    }`}>{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {item.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                            item.color === 'blue' ? 'text-blue-400' : 'text-orange-400'
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

      {/* Process Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-xl border-2 border-[#005bac]/20 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-[#005bac] mb-8 text-center">펀드 조성 프로세스</h2>
            <div className="relative">
              <div className="absolute left-8 top-0 w-1 h-full bg-gradient-to-b from-[#005bac] to-[#ff6600] md:left-1/2 md:transform md:-translate-x-1/2"></div>
              {[
                { date: '2025년 5월', phase: '계획 수립', desc: '펀드 조성 계획 승인', color: 'blue' },
                { date: '2025년 6월', phase: '계좌 개설', desc: '은행 계좌 개설', color: 'orange' },
                { date: '2025년 6월', phase: '출자금 납입', desc: 'LP 출자금 납입', color: 'green' },
                { date: '2025년 7월', phase: '결성 총회', desc: '중소벤처기업부 결성 총회', color: 'purple' },
                { date: '2025년 7월', phase: '등록 완료', desc: '중소벤처기업부 승인 완료', color: 'blue' }
              ].map((item, i) => (
                <div key={i} className={`relative flex items-center mb-8 md:mb-0 ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? 'md:w-5/12 md:text-right md:pr-8' : 'md:w-5/12 md:text-left md:pl-8'}`}>
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.phase}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  <div className={`absolute left-8 w-4 h-4 rounded-full border-4 border-white md:left-1/2 md:transform md:-translate-x-1/2 ${
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

      {/* Operation Model Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#005bac] mb-4">운영 모델</h2>
            <p className="text-lg text-gray-500">체계적인 투자 프로세스와 성장 지원</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: '투자 사이클',
                items: [
                  '딜 소싱',
                  '실사 진행',
                  '투자 실행',
                  '포트폴리오 관리',
                  'Exit 전략'
                ],
                color: 'blue'
              },
              {
                icon: Award,
                title: '성장 프로그램',
                items: [
                  'TIPS 프로그램 연계',
                  '액셀러레이터 파트너십',
                  '멘토 네트워크 제공',
                  '글로벌 진출 지원',
                  '후속 투자 유치'
                ],
                color: 'orange'
              },
              {
                icon: PieChart,
                title: '성과보수 구조',
                items: [
                  '허들레이트: 7.0%',
                  '캐리: 초과수익 30%',
                  'GP 배분: 50/50',
                  'LP 우선 배분',
                  'Waterfall 구조'
                ],
                color: 'green'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white p-8 rounded-xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  item.color === 'blue' ? 'border-blue-200 hover:border-[#005bac]/50' :
                  item.color === 'orange' ? 'border-orange-200 hover:border-[#ff6600]/50' :
                  'border-green-200 hover:border-green-500/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  item.color === 'blue' ? 'bg-blue-100' :
                  item.color === 'orange' ? 'bg-orange-100' :
                  'bg-green-100'
                }`}>
                  <item.icon className={`w-6 h-6 ${
                    item.color === 'blue' ? 'text-[#005bac]' :
                    item.color === 'orange' ? 'text-[#ff6600]' :
                    'text-green-600'
                  }`} />
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  item.color === 'blue' ? 'text-[#005bac]' :
                  item.color === 'orange' ? 'text-[#ff6600]' :
                  'text-green-600'
                }`}>{item.title}</h3>
                <ul className="space-y-3">
                  {item.items.map((listItem, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={`mt-1 ${
                        item.color === 'blue' ? 'text-blue-400' :
                        item.color === 'orange' ? 'text-orange-400' :
                        'text-green-400'
                      }`}>•</span>
                      <span className="text-gray-700">{listItem}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-xl border-2 border-blue-100 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-[#005bac] mb-8 text-center">투자 혜택</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 hover:border-[#005bac]/50 transition-all">
                <h3 className="text-xl font-semibold text-[#005bac] mb-4">스타트업 혜택</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">초기 자금 확보 및 후속 투자 연계</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">전문 멘토링 및 네트워킹 기회</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">정부 지원 사업 연계 및 컨설팅</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">글로벌 시장 진출 지원</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-gradient-to-br from-orange-50 to-white rounded-xl border-2 border-orange-200 hover:border-[#ff6600]/50 transition-all">
                <h3 className="text-xl font-semibold text-[#ff6600] mb-4">투자자 혜택</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">검증된 초기 스타트업 투자 기회</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">전문 GP의 체계적인 포트폴리오 관리</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">투명한 운영 및 정기적인 성과 보고</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">스타트업 생태계 네트워킹</span>
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