'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users } from 'lucide-react'

// 조직도 데이터 (내용 유지)
const advisors = [
  { name: "전병윤", role: "교수", company: "동국대학교" },
  { name: "이찬영", role: "교수", company: "동국대학교" },
  { name: "유병준", role: "교수", company: "서울대학교" },
  { name: "이교구", role: "교수", company: "서울대학교" },
  { name: "곽노준", role: "교수", company: "서울대학교" },
  { name: "홍철기", role: "교수", company: "서강대학교" },
  { name: "최대수", role: "교수", company: "충북대학교" }
]

const vicePresidents = [
  "구태언", "김민지", "박지섭", "백주아", "변우석", "신수희",
  "윤성업", "윤지영", "이현우", "임한규", "조충규", "지효선"
]

const departments = [
  { name: "투자분과", leader: "변우석 대표" },
  { name: "학술분과", leader: "신수희 대표" },
  { name: "사업운영분과", leader: "지효선 대표" },
  { name: "산학협력분과", leader: "김민지 대표" }
]

const officeMembers = [
  { name: "조지형", position: "사무국장" },
  { name: "김예진", position: "대표", company: "포플러플래닛" },
  { name: "인재원", position: "사원" },
  { name: "신동규", position: "사원" }
]

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function OrganizationSection() {
  return (
    <div className="relative pt-32 pb-32 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#004094_1px,transparent_1px),linear-gradient(to_bottom,#004094_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#004094] mb-6">협회 조직도</h1>
          <div className="w-20 h-1.5 bg-[#ff6b00] mx-auto mb-8" />
          <p className="text-xl text-gray-600">체계적이고 전문적인 조직 구성으로 회원사들의 성장을 지원합니다</p>
        </motion.div>

        {/* Organization Tree */}
        <motion.div 
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          
          {/* 1. President (Level 1) */}
          <motion.div variants={itemVariants} className="relative z-20 mb-16">
            <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-3xl mx-auto hover:border-[#004094] transition-colors duration-300">
              <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                <div className="absolute inset-0 bg-blue-50 rounded-full transform -rotate-6" />
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image 
                    src="/images/president.png" 
                    alt="김기홍 협회장" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#004094] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md border-2 border-white">
                  협회장
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-[#004094] mb-2">김기홍 대표</h2>
                <p className="text-lg text-gray-600 font-medium mb-4">(주)링크드코리아</p>
                <p className="text-gray-500 leading-relaxed text-sm max-w-md">
                  대한민국 기술벤처 스타트업의 혁신과 성장을 위해<br />
                  끊임없이 소통하고 지원하겠습니다.
                </p>
              </div>
            </div>
            {/* Vertical Line Down */}
            <div className="absolute left-1/2 -bottom-16 w-0.5 h-16 bg-gray-300 -translate-x-1/2" />
          </motion.div>

          {/* 2. High Level Org (Advisors, VP, Consultant) (Level 2) */}
          <div className="relative w-full mb-20">
            {/* Connecting Horizontal Line */}
            <div className="absolute top-0 left-[16.66%] right-[16.66%] h-0.5 bg-gray-300" />
            {/* Connecting Vertical Lines */}
            <div className="absolute top-0 left-[16.66%] w-0.5 h-10 bg-gray-300" />
            <div className="absolute top-0 left-1/2 w-0.5 h-10 bg-gray-300 -translate-x-1/2" />
            <div className="absolute top-0 right-[16.66%] w-0.5 h-10 bg-gray-300" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
              
              {/* 자문위원단 */}
              <motion.div variants={itemVariants} className="flex flex-col items-center">
                <div className="bg-white border-t-4 border-[#004094] rounded-xl shadow-lg p-6 w-full max-w-sm relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#004094] text-white px-6 py-2 rounded-full font-bold shadow-md text-sm">
                    자문위원단
                  </div>
                  <div className="mt-4 space-y-2">
                    {advisors.map((adv) => (
                      <div key={adv.name} className="flex justify-between items-center text-sm py-1.5 border-b border-gray-50 last:border-0">
                        <span className="font-bold text-gray-800">{adv.name} {adv.role}</span>
                        <span className="text-gray-500 text-xs">{adv.company}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 부회장단 */}
              <motion.div variants={itemVariants} className="flex flex-col items-center">
                <div className="bg-white border-t-4 border-[#ff6600] rounded-xl shadow-lg p-6 w-full max-w-sm relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#ff6600] text-white px-6 py-2 rounded-full font-bold shadow-md text-sm">
                    부회장단
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    {vicePresidents.map((vp) => (
                      <div key={vp} className="text-sm text-gray-700 py-1 bg-orange-50 rounded hover:bg-orange-100 transition-colors cursor-default">
                        {vp}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Line down to departments */}
                <div className="h-16 w-0.5 bg-gray-300 mt-0 mx-auto" />
              </motion.div>

              {/* 고문 */}
              <motion.div variants={itemVariants} className="flex flex-col items-center">
                <div className="bg-white border-t-4 border-green-600 rounded-xl shadow-lg p-6 w-full max-w-sm relative text-center">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-md text-sm">
                    고문
                  </div>
                  <div className="mt-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-3 overflow-hidden">
                        {/* Placeholder for Consultant Image if needed */}
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Users className="w-8 h-8" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">김요섭 회장</h3>
                    <p className="text-gray-500 text-sm">(주)디자인파크</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* 3. Departments & Office (Level 3) */}
          <div className="relative w-full max-w-4xl">
             {/* Connecting Lines */}
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-300" />
             <div className="absolute top-0 left-[25%] right-[25%] h-0.5 bg-gray-300" />
             <div className="absolute top-0 left-[25%] w-0.5 h-10 bg-gray-300" />
             <div className="absolute top-0 right-[25%] w-0.5 h-10 bg-gray-300" />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
                
                {/* 4개 분과 */}
                <motion.div variants={itemVariants} className="flex flex-col items-center">
                   <div className="bg-white rounded-2xl shadow-lg p-8 w-full border border-gray-100">
                      <div className="text-center mb-6">
                         <span className="inline-block px-4 py-1 bg-blue-50 text-[#004094] font-bold rounded-full text-sm">전문 분과</span>
                         <h3 className="text-xl font-bold text-gray-900 mt-2">4개 분과 위원회</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         {departments.map((dept, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-xl text-center hover:bg-blue-50 transition-colors group">
                               <div className="text-sm font-bold text-[#004094] mb-1">{dept.name}</div>
                               <div className="text-xs text-gray-500 group-hover:text-[#004094]">{dept.leader}</div>
                            </div>
                         ))}
                      </div>
                   </div>
                </motion.div>

                {/* 사무국 */}
                <motion.div variants={itemVariants} className="flex flex-col items-center">
                   <div className="bg-white rounded-2xl shadow-lg p-8 w-full border border-gray-100">
                      <div className="text-center mb-6">
                         <span className="inline-block px-4 py-1 bg-purple-50 text-purple-700 font-bold rounded-full text-sm">운영 지원</span>
                         <h3 className="text-xl font-bold text-gray-900 mt-2">사무국</h3>
                      </div>
                      <div className="space-y-3">
                         {officeMembers.map((member, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors">
                               <div className="flex items-center gap-3">
                                  <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-400 shadow-sm">
                                     {idx + 1}
                                  </span>
                                  <span className="text-sm font-bold text-gray-800">{member.name}</span>
                               </div>
                               <div className="text-xs text-gray-500">
                                  {member.company ? member.company : member.position}
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </motion.div>

             </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
