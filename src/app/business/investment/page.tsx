'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Target, Shield, Award, BarChart3, PieChart, CheckCircle, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default function InvestmentPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#004094]">
        <div className="absolute inset-0 opacity-50">
          <Image 
            src="/images/business/investment-cover.png" 
            alt="Investment Hero" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#004094]/90 via-[#004094]/70 to-[#004094]/80" />
        
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 border border-white/30 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-sm font-bold tracking-wider uppercase">Business Area 02</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-sm">
              투자조합
            </h1>
            <p className="text-xl text-blue-50 max-w-2xl mx-auto font-light drop-shadow-sm">
              초기 스타트업의 성장 동력을 확보하고<br />
              성공적인 엑시트를 위한 전략적 투자를 지원합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Fund Overview & Structure - Modern Split Layout */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left: Fund Overview */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#004094] mb-8 leading-tight">
                개인투자조합<br />
                <span className="text-gray-900">AICEO 펀드</span>
              </h2>
              <div className="prose prose-lg text-gray-600 mb-10">
                <p>
                  코맥스벤처스 GP와 협력하여 운영하는 초기 스타트업 투자 프로그램입니다.
                  AI와 딥테크 분야의 혁신 기업을 중점적으로 발굴하고 육성합니다.
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-6 bg-blue-50 rounded-2xl text-center group hover:bg-[#004094] transition-colors duration-300">
                  <div className="text-3xl font-bold text-[#004094] mb-2 group-hover:text-white">5억원</div>
                  <div className="text-sm text-gray-600 font-medium group-hover:text-blue-100">펀드 규모</div>
                </div>
                <div className="p-6 bg-orange-50 rounded-2xl text-center group hover:bg-[#ff6600] transition-colors duration-300">
                  <div className="text-3xl font-bold text-[#ff6600] mb-2 group-hover:text-white">70%</div>
                  <div className="text-sm text-gray-600 font-medium group-hover:text-orange-100">AI 투자 비중</div>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl text-center group hover:bg-[#004094] transition-colors duration-300">
                  <div className="text-3xl font-bold text-[#004094] mb-2 group-hover:text-white">7.0%</div>
                  <div className="text-sm text-gray-600 font-medium group-hover:text-blue-100">목표 수익률</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Fund Structure Card */}
            <motion.div 
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-10 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10" />
                
                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <PieChart className="w-6 h-6 text-[#ff6600]" />
                  펀드 구성
                </h3>

                <div className="space-y-6">
                  {/* GP */}
                  <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl border border-blue-100 hover:border-[#004094]/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-[#004094] uppercase tracking-wide bg-white px-2 py-1 rounded-md shadow-sm">GP (업무집행조합원)</span>
                      <span className="text-2xl font-bold text-[#004094]">2천만원</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <h4 className="text-lg font-bold text-gray-900">코맥스벤처스 + 김기홍</h4>
                      <span className="text-sm text-gray-500">4% 지분</span>
                    </div>
                    <div className="mt-3 w-full bg-white rounded-full h-2 overflow-hidden">
                      <div className="bg-[#004094] h-full rounded-full" style={{ width: '4%' }}></div>
                    </div>
                  </div>

                  {/* LP */}
                  <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-2xl border border-orange-100 hover:border-[#ff6600]/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-[#ff6600] uppercase tracking-wide bg-white px-2 py-1 rounded-md shadow-sm">LP (유한책임조합원)</span>
                      <span className="text-2xl font-bold text-[#ff6600]">4.8억원</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <h4 className="text-lg font-bold text-gray-900">AICEO 동문</h4>
                      <span className="text-sm text-gray-500">96% 지분</span>
                    </div>
                    <div className="mt-3 w-full bg-white rounded-full h-2 overflow-hidden">
                      <div className="bg-[#ff6600] h-full rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Investment Strategy - Cards Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#004094] font-bold tracking-widest uppercase text-sm">Strategy</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">투자 전략</h2>
            <p className="text-gray-500 mt-4">체계적인 포트폴리오 구성과 전략적 투자</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                transition={{ delay: index * 0.2 }}
                className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 group ${
                  item.color === 'blue' ? 'border-[#004094]' : 'border-[#ff6600]'
                }`}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform ${
                    item.color === 'blue' ? 'bg-[#004094]' : 'bg-[#ff6600]'
                  }`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="space-y-3 bg-gray-50 p-6 rounded-xl">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        item.color === 'blue' ? 'text-blue-500' : 'text-orange-500'
                      }`} />
                      <span className="text-sm text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process & Model - Vertical Timeline & Cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Fund Process */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-10 flex items-center">
                <Briefcase className="w-8 h-8 text-[#004094] mr-3" />
                펀드 조성 프로세스
              </h2>
              <div className="relative pl-8 border-l-2 border-gray-100 space-y-8">
                {[
                  { date: '2025년 5월', phase: '계획 수립', desc: '펀드 조성 계획 승인', color: 'blue' },
                  { date: '2025년 6월', phase: '계좌 개설', desc: '은행 계좌 개설', color: 'orange' },
                  { date: '2025년 6월', phase: '출자금 납입', desc: 'LP 출자금 납입', color: 'blue' },
                  { date: '2025년 7월', phase: '결성 총회', desc: '중소벤처기업부 결성 총회', color: 'orange' },
                  { date: '2025년 7월', phase: '등록 완료', desc: '중소벤처기업부 승인 완료', color: 'blue' }
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm ${
                      item.color === 'blue' ? 'bg-[#004094]' : 'bg-[#ff6600]'
                    }`} />
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`text-sm font-bold mb-1 ${
                        item.color === 'blue' ? 'text-[#004094]' : 'text-[#ff6600]'
                      }`}>{item.date}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.phase}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operation Model */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-10 flex items-center">
                <BarChart3 className="w-8 h-8 text-[#ff6600] mr-3" />
                운영 모델
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: BarChart3,
                    title: '투자 사이클',
                    items: ['딜 소싱', '실사 진행', '투자 실행', '포트폴리오 관리', 'Exit 전략'],
                    color: 'blue'
                  },
                  {
                    icon: Award,
                    title: '성장 프로그램',
                    items: ['TIPS 프로그램 연계', '액셀러레이터 파트너십', '멘토 네트워크 제공', '글로벌 진출 지원'],
                    color: 'orange'
                  },
                  {
                    icon: PieChart,
                    title: '성과보수 구조',
                    items: ['허들레이트: 7.0%', '캐리: 초과수익 30%', 'GP 배분: 50/50', 'LP 우선 배분'],
                    color: 'blue'
                  }
                ].map((model, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        model.color === 'blue' ? 'bg-blue-100 text-[#004094]' : 'bg-orange-100 text-[#ff6600]'
                      }`}>
                        <model.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{model.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {model.items.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-600 border border-gray-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Benefits - 2 Card Grid */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">투자 혜택</h2>
            <p className="text-gray-500 mt-4">스타트업과 투자자 모두를 위한 가치 창출</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#004094]"
            >
              <h3 className="text-2xl font-bold text-[#004094] mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                스타트업 혜택
              </h3>
              <ul className="space-y-4">
                {[
                  '초기 자금 확보 및 후속 투자 연계',
                  '전문 멘토링 및 네트워킹 기회',
                  '정부 지원 사업 연계 및 컨설팅',
                  '글로벌 시장 진출 지원'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 p-3 bg-blue-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#004094] mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#ff6600]"
            >
              <h3 className="text-2xl font-bold text-[#ff6600] mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3" />
                투자자 혜택
              </h3>
              <ul className="space-y-4">
                {[
                  '검증된 초기 스타트업 투자 기회',
                  '전문 GP의 체계적인 포트폴리오 관리',
                  '투명한 운영 및 정기적인 성과 보고',
                  '스타트업 생태계 네트워킹'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 p-3 bg-orange-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
