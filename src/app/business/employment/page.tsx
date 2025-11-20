'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Briefcase, TrendingUp, Calendar, Users, Award } from 'lucide-react';
import Image from 'next/image';

export default function EmploymentPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Hero Section - Updated Visibility */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#004094]">
        <div className="absolute inset-0 opacity-50">
          <Image 
            src="/images/business/employment-cover.png" 
            alt="Employment Hero" 
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
              <span className="text-sm font-bold tracking-wider uppercase">Business Area 01</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-sm">
              채용지원
            </h1>
            <p className="text-xl text-blue-50 max-w-2xl mx-auto font-light drop-shadow-sm">
              우수한 글로벌 인재와 혁신 기업을 연결하여<br />
              새로운 가치를 창출합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Program Overview & Stats - Modern Split Layout */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left: Program Info */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#004094] mb-8 leading-tight">
                AI 마케팅 역량 강화<br />
                <span className="text-gray-900">프로그램</span>
              </h2>
              <div className="prose prose-lg text-gray-600 mb-10">
                <p>
                  외국인 유학생을 대상으로 한 AI 마케팅 실무 프로젝트 기반 채용연계 프로그램입니다.
                  생성형 AI를 활용한 해외시장 진출 시장조사 설계 및 리포트 작성 교육을 제공합니다.
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-6 bg-blue-50 rounded-2xl text-center group hover:bg-[#004094] transition-colors duration-300">
                  <div className="text-3xl font-bold text-[#004094] mb-2 group-hover:text-white">10주</div>
                  <div className="text-sm text-gray-600 font-medium group-hover:text-blue-100">교육 기간</div>
                </div>
                <div className="p-6 bg-orange-50 rounded-2xl text-center group hover:bg-[#ff6600] transition-colors duration-300">
                  <div className="text-3xl font-bold text-[#ff6600] mb-2 group-hover:text-white">110<span className="text-lg">시간</span></div>
                  <div className="text-sm text-gray-600 font-medium group-hover:text-orange-100">총 교육 시간</div>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl text-center group hover:bg-[#004094] transition-colors duration-300">
                  <div className="text-3xl font-bold text-[#004094] mb-2 group-hover:text-white">100%</div>
                  <div className="text-sm text-gray-600 font-medium group-hover:text-blue-100">지원금</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Stats Card - Glassmorphism style */}
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
                  <Award className="w-6 h-6 text-[#ff6600]" />
                  프로그램 성과
                </h3>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm text-gray-500 mb-1 font-medium uppercase tracking-wide">지원자</div>
                    <div className="text-5xl font-bold text-[#004094]">420<span className="text-2xl text-gray-400 ml-1">명</span></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 font-medium uppercase tracking-wide">최종 선발</div>
                    <div className="text-5xl font-bold text-[#ff6600]">26<span className="text-2xl text-gray-400 ml-1">명</span></div>
                  </div>
                  <div className="col-span-2 h-px bg-gray-100" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1 font-medium uppercase tracking-wide">인턴십 포지션</div>
                    <div className="text-4xl font-bold text-gray-800">44<span className="text-xl text-gray-400 ml-1">개</span></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 font-medium uppercase tracking-wide">협력 대학</div>
                    <div className="text-4xl font-bold text-gray-800">3<span className="text-xl text-gray-400 ml-1">개</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Program Structure - Horizontal Steps */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#004094] font-bold tracking-widest uppercase text-sm">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">프로그램 구조</h2>
            <p className="text-gray-500 mt-4">체계적인 3단계 프로세스로 운영됩니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                phase: '01',
                title: '학생 모집',
                desc: '동국대, 중앙대, 건국대 국제처와의 협력을 통한 우수 인재 선발',
                items: ['26명 사전 선발 완료', 'TOPIK 4급 이상, 비자 및 전공 확인', '인성 및 역량 평가 실시']
              },
              {
                phase: '02',
                title: '역량 강화 교육',
                desc: '생성형 AI를 활용한 해외시장 진출 시장조사 설계 역량 강화',
                items: ['생성형 AI 활용 시장조사 방법론', '리포트 작성 실무 교육', '한국 기업문화 이해 프로그램']
              },
              {
                phase: '03',
                title: '인턴십 매칭',
                desc: '회원사와의 전략적 매칭 및 채용 연계',
                items: ['44개 인턴십 포지션 확보', '포트폴리오 플랫폼 공유', '시간제 취업 허가 지원']
              }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-[#004094] group"
              >
                <div className="absolute -top-6 left-8 w-12 h-12 bg-[#004094] text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                  {step.phase}
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-6 min-h-[40px]">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-[#ff6600] mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curriculum & Schedule - 2 Column Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Curriculum */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-10 flex items-center">
                <Briefcase className="w-8 h-8 text-[#004094] mr-3" />
                교육 커리큘럼
              </h2>
              <div className="space-y-6">
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[#004094]">토요일 프로그램</h3>
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-bold text-[#004094] shadow-sm">80시간</span>
                  </div>
                  <ul className="grid grid-cols-2 gap-3">
                    {['디지털 마케팅 기초', '텍스트 및 이미지 생성형 AI', '시뮬레이션 기반 리서치', '개인별 리포트 작성'].map((item) => (
                      <li key={item} className="flex items-center text-gray-700 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#004094] mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[#ff6600]">평일 저녁 프로그램</h3>
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-bold text-[#ff6600] shadow-sm">30시간</span>
                  </div>
                  <ul className="grid grid-cols-2 gap-3">
                    {['AI 활용 보고서 작성', '한국 기업문화 이해', '퍼스널 브랜딩 기초', '비즈니스 커뮤니케이션'].map((item) => (
                      <li key={item} className="flex items-center text-gray-700 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff6600] mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Schedule - Clean Timeline */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-10 flex items-center">
                <Calendar className="w-8 h-8 text-[#ff6600] mr-3" />
                프로그램 일정
              </h2>
              <div className="relative pl-8 border-l-2 border-gray-100 space-y-10">
                {[
                  { date: '2025년 4월', title: '모집', desc: '420명 지원, 20명 선발' },
                  { date: '2025년 4-6월', title: '교육', desc: '10주 집중 교육 프로그램' },
                  { date: '2025년 6월', title: '매칭', desc: '기업-학생 매칭 진행' },
                  { date: '2025년 7-8월', title: '인턴십', desc: '2개월 전액 지원 인턴십' },
                  { date: '2025년 9월+', title: '채용', desc: 'D-10 비자 전환 및 정규직 채용' }
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm ${idx % 2 === 0 ? 'bg-[#004094]' : 'bg-[#ff6600]'}`} />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-1">
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">{item.date}</span>
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}