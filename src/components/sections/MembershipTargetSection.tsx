'use client'

import { GraduationCap, Brain, Building2, BookOpen, TrendingUp, Users, ArrowRight, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const targets = [
  {
    icon: GraduationCap,
    title: '동국대학교 일반대학원 기술창업학과',
    subtitle: '석·박사 동문',
    description: '기술창업학의 이론과 실무를 겸비한 전문 인력',
    color: 'blue',
  },
  {
    icon: Brain,
    title: '서울대학교 인공지능 최고경영자과정',
    subtitle: '(AICEO) 동문',
    description: 'AI 기술과 경영 능력을 겸비한 최고경영진',
    color: 'orange',
  },
  {
    icon: Building2,
    title: '기술벤처 스타트업',
    subtitle: '대표자 및 임원',
    description: '혁신적인 기술을 보유한 벤처기업 경영진',
    color: 'blue',
  },
  {
    icon: BookOpen,
    title: '기술창업 전문가',
    subtitle: '(대학 교수 등)',
    description: '기술창업 분야의 학술적 전문성을 갖춘 연구자',
    color: 'orange',
  },
  {
    icon: TrendingUp,
    title: '개인투자자, 액셀러레이터',
    subtitle: 'VC, PE',
    description: '기술 기반 스타트업 투자 전문 기관 및 개인',
    color: 'blue',
  }
]

export default function MembershipTargetSection() {
  return (
    <section id="membership" className="py-20">
      <div className="container mx-auto px-4">
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/membership/apply"
              className="group px-8 py-4 bg-[#ff6600] text-white font-bold hover:bg-[#e65c00] transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
            >
              협회 가입 신청하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/membership/fees"
              className="group px-8 py-4 bg-white text-[#005bac] font-bold border-2 border-[#005bac] hover:bg-blue-50 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center gap-2"
            >
              협회비 안내 보기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Target Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-24">
          {targets.map((target, index) => {
            const Icon = target.icon
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <div className={`
                  relative h-full bg-white rounded-2xl p-8 md:p-10
                  border-2 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2
                  ${
                    target.color === 'blue' 
                      ? 'border-blue-100 hover:border-[#005bac]/30 group' 
                      : 'border-orange-100 hover:border-[#ff6600]/30 group'
                  }
                `}>
                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                    target.color === 'blue' ? 'bg-blue-600' : 'bg-orange-600'
                  }`} />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-8">
                      <div className={`
                        w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm transform group-hover:scale-110 transition-transform duration-300
                        ${
                          target.color === 'blue' 
                            ? 'bg-blue-50 text-[#005bac]' 
                            : 'bg-orange-50 text-[#ff6600]'
                        }
                      `}>
                        <Icon className="w-10 h-10" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`
                      text-xl font-bold mb-3 leading-snug
                      ${
                        target.color === 'blue' ? 'text-[#005bac]' : 'text-[#ff6600]'
                      }
                    `}>
                      {target.title}
                    </h3>

                    {/* Subtitle */}
                    <div className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                      {target.subtitle}
                    </div>

                    {/* Divider */}
                    <div className={`w-12 h-1 mb-6 ${
                      target.color === 'blue' ? 'bg-blue-100' : 'bg-orange-100'
                    }`} />

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-lg flex-grow">
                      {target.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Benefits Section - Enhanced Design */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-10 md:p-16 border-2 border-blue-100 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#005bac] to-[#ff6600]" />
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
          
          <div className="relative z-10 text-center">
            <span className="text-[#005bac] font-bold tracking-widest uppercase text-sm mb-3 block">Benefits</span>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">회원 혜택</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#004094] transition-colors duration-300">
                  <Brain className="w-10 h-10 text-[#005bac] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#004094] transition-colors">전문 네트워킹</h4>
                <p className="text-gray-600 leading-relaxed">산·학·연 전문가들과의<br />네트워킹 기회 제공</p>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-[#ff6600] transition-colors duration-300">
                  <TrendingUp className="w-10 h-10 text-[#ff6600] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#ff6600] transition-colors">투자 기회</h4>
                <p className="text-gray-600 leading-relaxed">개인투자조합을 통한<br />투자 참여 기회</p>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#004094] transition-colors duration-300">
                  <BookOpen className="w-10 h-10 text-[#005bac] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#004094] transition-colors">학술 활동</h4>
                <p className="text-gray-600 leading-relaxed">기술창업 관련<br />학술세미나 및 연구 참여</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
