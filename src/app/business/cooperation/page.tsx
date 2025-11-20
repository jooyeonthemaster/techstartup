'use client';

import { motion } from 'framer-motion';
import { Handshake, Building2, GraduationCap, Target, FileText, Users, CheckCircle, Briefcase, Lightbulb, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CooperationPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#004094]">
        <div className="absolute inset-0 opacity-50">
          <Image 
            src="/images/business/cooperation-1.png" 
            alt="Cooperation Hero" 
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
              <span className="text-sm font-bold tracking-wider uppercase">Business Area 03</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-sm">
              산학협력
            </h1>
            <p className="text-xl text-blue-50 max-w-2xl mx-auto font-light drop-shadow-sm">
              기업과 대학의 혁신적 만남으로<br />
              미래 기술을 선도합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Program Overview & Types - Modern Split Layout */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left: Program Overview */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#004094] mb-8 leading-tight">
                2025년 산학연 협력<br />
                <span className="text-gray-900">R&D 사업</span>
              </h2>
              <div className="prose prose-lg text-gray-600 mb-10">
                <p>
                  중소기업과 대학·연구기관 간의 공동 기술개발 및 사업화를 지원하는
                  정부 지원 R&D 프로그램입니다. 혁신적 성장과 일자리 창출을 도모합니다.
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-6 bg-blue-50 rounded-2xl text-center group hover:bg-[#004094] transition-colors duration-300">
                  <div className="text-3xl font-bold text-[#004094] mb-2 group-hover:text-white">450억</div>
                  <div className="text-sm text-gray-600 font-medium group-hover:text-blue-100">총 예산</div>
                </div>
                <div className="p-6 bg-orange-50 rounded-2xl text-center group hover:bg-[#ff6600] transition-colors duration-300">
                  <div className="text-3xl font-bold text-[#ff6600] mb-2 group-hover:text-white">562개</div>
                  <div className="text-sm text-gray-600 font-medium group-hover:text-orange-100">지원 과제</div>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl text-center group hover:bg-[#004094] transition-colors duration-300">
                  <div className="text-3xl font-bold text-[#004094] mb-2 group-hover:text-white">100%</div>
                  <div className="text-sm text-gray-600 font-medium group-hover:text-blue-100">정부 지원</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Program Types Card */}
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
                  <Briefcase className="w-6 h-6 text-[#ff6600]" />
                  과제 유형
                </h3>

                <div className="space-y-6">
                  {/* 일반형 */}
                  <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl border border-blue-100 hover:border-[#004094]/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-[#004094] uppercase tracking-wide bg-white px-2 py-1 rounded-md shadow-sm">Type A</span>
                      <span className="text-2xl font-bold text-[#004094]">351억원</span>
                    </div>
                    <div className="mb-2">
                      <h4 className="text-lg font-bold text-gray-900">일반형</h4>
                    </div>
                    <p className="text-sm text-gray-600">1:1 협력 구조, 예비 414개 + 사업화 148개</p>
                  </div>

                  {/* 컨소시엄형 */}
                  <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-2xl border border-orange-100 hover:border-[#ff6600]/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-[#ff6600] uppercase tracking-wide bg-white px-2 py-1 rounded-md shadow-sm">Type B</span>
                      <span className="text-2xl font-bold text-[#ff6600]">100억원</span>
                    </div>
                    <div className="mb-2">
                      <h4 className="text-lg font-bold text-gray-900">컨소시엄형</h4>
                    </div>
                    <p className="text-sm text-gray-600">국가 전략기술, 레전드 50+ 과제</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Support Services - 3 Step Cards */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#004094] font-bold tracking-widest uppercase text-sm">Support</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">협회 지원 서비스</h2>
            <p className="text-gray-500 mt-4">성공적인 R&D 수행을 위한 전문 지원</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: FileText,
                title: '정부 R&D 일정 공유',
                color: 'blue',
                desc: '최신 공고 및 준비사항을 실시간으로 업데이트하여 제공',
                features: ['실시간 공고 모니터링', '맞춤형 알림 서비스', '준비 체크리스트 제공', '신청 일정 관리']
              },
              {
                step: '02',
                icon: Users,
                title: '맞춤형 컨설팅',
                color: 'orange',
                desc: '산업별 맞춤 컨설팅 및 컨소시엄 매칭 서비스',
                features: ['기술 전문가 매칭', '컨소시엄 구성 지원', '프로젝트 기획 워크샵', '성공사례 벤치마킹']
              },
              {
                step: '03',
                icon: Target,
                title: '제안서 및 예산 설계',
                color: 'blue',
                desc: '사업계획서 작성 및 발표 코칭으로 선정 확률 극대화',
                features: ['제안서 템플릿 제공', '예산 설계 가이드라인', '전문가 리뷰 서비스', '발표 시뮬레이션']
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 group ${
                  item.color === 'blue' ? 'border-[#004094]' : 'border-[#ff6600]'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform ${
                    item.color === 'blue' ? 'bg-[#004094]' : 'bg-[#ff6600]'
                  }`}>
                    {item.step}
                  </div>
                  <item.icon className={`w-8 h-8 ${
                    item.color === 'blue' ? 'text-blue-100' : 'text-orange-100'
                  }`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-6 min-h-[40px]">{item.desc}</p>
                
                <ul className="space-y-2 bg-gray-50 p-4 rounded-xl">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${
                        item.color === 'blue' ? 'text-blue-500' : 'text-orange-500'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Target & Process - Vertical Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          
          {/* Target */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">지원 대상</h2>
              <p className="text-gray-500 mt-2">산학협력 R&D 참여 주체</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Building2, title: '중소기업', desc: '기업부설연구소 보유 중소기업', color: 'blue' },
                { icon: GraduationCap, title: '대학', desc: '산학협력단 등록 대학', color: 'orange' },
                { icon: Handshake, title: '연구기관', desc: '정부출연 연구기관 및 전문연구소', color: 'blue' }
              ].map((target, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg text-center hover:border-blue-200 transition-all"
                >
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    target.color === 'blue' ? 'bg-blue-50 text-[#004094]' : 'bg-orange-50 text-[#ff6600]'
                  }`}>
                    <target.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{target.title}</h3>
                  <p className="text-gray-600">{target.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">지원 프로세스</h2>
            </div>
            <div className="relative pl-8 border-l-2 border-gray-100 space-y-8">
              {[
                { step: '01', title: '초기 상담', desc: '프로젝트 기획 상담', time: '1주', color: 'blue' },
                { step: '02', title: '매칭 지원', desc: '컨소시엄 구성 지원', time: '2주', color: 'orange' },
                { step: '03', title: '서류 준비', desc: '제안서 작성 지원', time: '3주', color: 'blue' },
                { step: '04', title: '선정 지원', desc: '발표 코칭 및 심사 대응', time: '1주', color: 'orange' }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm ${
                    item.color === 'blue' ? 'bg-[#004094]' : 'bg-[#ff6600]'
                  }`} />
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-sm font-bold px-2 py-1 rounded ${
                        item.color === 'blue' ? 'bg-blue-50 text-[#004094]' : 'bg-orange-50 text-[#ff6600]'
                      }`}>Step {item.step}</span>
                      <span className="text-sm text-gray-400">{item.time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Benefits - Split Cards */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">기대 효과</h2>
            <p className="text-gray-500 mt-4">산학연 협력의 시너지</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#004094]"
            >
              <h3 className="text-2xl font-bold text-[#004094] mb-6 flex items-center">
                <Building2 className="w-6 h-6 mr-3" />
                기업 혜택
              </h3>
              <ul className="space-y-4">
                {[
                  'R&D 자금 확보 (최대 75% 정부 지원)',
                  '우수 연구인력 활용 기회',
                  '핵심 기술 개발 및 사업화',
                  '지식재산권 확보'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 p-3 bg-blue-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#004094] mr-3 flex-shrink-0" />
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
                <GraduationCap className="w-6 h-6 mr-3" />
                대학/연구기관 혜택
              </h3>
              <ul className="space-y-4">
                {[
                  '연구 성과 실용화 기회',
                  '산업 현장 수요 파악',
                  '연구비 확보 및 인력 양성',
                  '기업과의 네트워크 구축'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 p-3 bg-orange-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3 flex-shrink-0" />
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
