'use client'

import { motion } from 'framer-motion'
import { Users, Award, Building2, Briefcase } from 'lucide-react'

export default function OrganizationSection() {
  return (
    <div className="relative pt-32 pb-20">
      {/* Background - 파란색 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#005bac] mb-4">
            협회 조직도
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#005bac] to-transparent mx-auto mb-8" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            체계적이고 전문적인 조직 구성으로 회원사들의 성장을 지원합니다
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* President Section - 파란색 테마 */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="max-w-3xl w-full">
              <div className="bg-white rounded-2xl border-2 border-blue-200 hover:border-[#005bac]/50 shadow-sm hover:shadow-lg transition-all duration-300 p-10">
                <div className="flex items-center gap-10">
                  {/* Text Section */}
                  <div className="flex-1 text-center">
                    <div className="mb-4">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#005bac] text-white text-xs font-semibold tracking-wide">
                        협회장
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#005bac] mb-2">
                      김기홍 대표
                    </h3>
                    <p className="text-sm text-gray-600">
                      (주)링크드코리아
                    </p>
                  </div>
                  
                  {/* Image Section */}
                  <div className="flex-1">
                    <div className="relative rounded-xl overflow-hidden shadow-md border border-gray-100">
                      <img 
                        src="/images/president.png" 
                        alt="김기홍 협회장" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connection Line */}
          <div className="flex justify-center">
            <div className="w-1 h-16 bg-gradient-to-b from-[#005bac] to-[#ff6600]"></div>
          </div>

          {/* Three Main Sections */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Advisory Committee - 파란색 */}
            <motion.div 
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl border-2 border-blue-200 hover:border-[#005bac]/50 shadow-sm hover:shadow-lg transition-all duration-300 p-8 h-full">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#005bac] rounded-full text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    01
                  </div>
                  <h3 className="text-xl font-bold text-[#005bac]">
                    자문위원단
                  </h3>
                  <div className="w-16 h-[2px] bg-[#005bac]/20 mx-auto mt-4" />
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "전병윤", role: "교수", company: "동국대학교" },
                    { name: "이찬영", role: "교수", company: "동국대학교" },
                    { name: "유병준", role: "교수", company: "서울대학교" },
                    { name: "이교구", role: "교수", company: "서울대학교" },
                    { name: "곽노준", role: "교수", company: "서울대학교" },
                    { name: "홍철기", role: "교수", company: "서강대학교" },
                    { name: "최대수", role: "교수", company: "충북대학교" }
                  ].map((advisor, index) => (
                    <div
                      key={advisor.name}
                      className="bg-blue-50 rounded-lg p-3 hover:bg-blue-100 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-[#005bac]">
                            {advisor.name} <span className="font-normal text-gray-600">{advisor.role}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {advisor.company}
                          </div>
                        </div>
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Vice Presidents - 주황색 */}
            <motion.div 
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white rounded-2xl border-2 border-orange-200 hover:border-[#ff6600]/50 shadow-sm hover:shadow-lg transition-all duration-300 p-8 h-full">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#ff6600] rounded-full text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    02
                  </div>
                  <h3 className="text-xl font-bold text-[#ff6600]">
                    부회장단
                  </h3>
                  <div className="w-16 h-[2px] bg-[#ff6600]/20 mx-auto mt-4" />
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "구태언", "김민지", "박지섭",
                    "백주아", "변우석", "신수희",
                    "윤성업", "윤지영", "이현우",
                    "임한규", "조충규", "지효선"
                  ].map((vp, index) => (
                    <div
                      key={vp}
                      className="bg-orange-50 rounded-lg p-2 text-center hover:bg-orange-100 transition-colors duration-300 border border-orange-200"
                    >
                      <div className="text-xs font-semibold text-[#ff6600]">
                        {vp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Consultant - 초록색 */}
            <motion.div 
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl border-2 border-green-200 hover:border-green-500/50 shadow-sm hover:shadow-lg transition-all duration-300 p-8 h-full">
                <div className="flex flex-col justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full text-white flex items-center justify-center font-bold text-xl mx-auto mb-6">
                      03
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 border border-green-300 mb-4">
                      <span className="text-xs font-semibold text-green-700">고문</span>
                    </div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">
                      김요섭 회장
                    </h3>
                    <p className="text-sm text-gray-600">
                      (주)디자인파크
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center">
            <div className="w-1 h-16 bg-gradient-to-b from-[#ff6600] to-purple-600"></div>
          </div>

          {/* Bottom Sections */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* 4 Departments - 각각 다른 색상 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 p-10">
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-bold text-[#005bac] mb-2">
                    4개 분과
                  </h3>
                  <p className="text-sm text-gray-500">전문 분야별 운영 조직</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: "투자분과",
                      leader: "변우석 대표",
                      color: "blue",
                      colorCode: "#005bac",
                      bgColor: "bg-blue-50",
                      borderColor: "border-blue-200",
                      hoverBorderColor: "hover:border-[#005bac]/50",
                      iconBg: "bg-[#005bac]",
                      number: "01"
                    },
                    {
                      name: "학술분과",
                      leader: "신수희 대표",
                      color: "orange",
                      colorCode: "#ff6600",
                      bgColor: "bg-orange-50",
                      borderColor: "border-orange-200",
                      hoverBorderColor: "hover:border-[#ff6600]/50",
                      iconBg: "bg-[#ff6600]",
                      number: "02"
                    },
                    {
                      name: "사업운영분과",
                      leader: "지효선 대표",
                      color: "green",
                      colorCode: "green-600",
                      bgColor: "bg-green-50",
                      borderColor: "border-green-200",
                      hoverBorderColor: "hover:border-green-500/50",
                      iconBg: "bg-green-600",
                      number: "03"
                    },
                    {
                      name: "산학협력분과",
                      leader: "김민지 대표",
                      color: "purple",
                      colorCode: "purple-600",
                      bgColor: "bg-purple-50",
                      borderColor: "border-purple-200",
                      hoverBorderColor: "hover:border-purple-500/50",
                      iconBg: "bg-purple-600",
                      number: "04"
                    }
                  ].map((dept, index) => (
                    <div key={dept.name} className={`${dept.bgColor} rounded-xl border-2 ${dept.borderColor} ${dept.hoverBorderColor} p-5 hover:shadow-md transition-all duration-300`}>
                      <div className="flex items-start justify-between mb-3">
                        <span className={`w-10 h-10 ${dept.iconBg} rounded-full text-white flex items-center justify-center text-sm font-bold`}>
                          {dept.number}
                        </span>
                        {index === 0 && <Briefcase className="w-5 h-5 text-blue-400" />}
                        {index === 1 && <Award className="w-5 h-5 text-orange-400" />}
                        {index === 2 && <Building2 className="w-5 h-5 text-green-400" />}
                        {index === 3 && <Users className="w-5 h-5 text-purple-400" />}
                      </div>
                      <h4 className={`text-sm font-bold text-${dept.color === 'green' || dept.color === 'purple' ? dept.color + '-700' : `[${dept.colorCode}]`} mb-2`}>
                        {dept.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full bg-white border ${dept.borderColor} text-gray-600`}>
                          분과장
                        </span>
                        <span className="text-xs font-medium text-gray-700">
                          {dept.leader}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Office - 보라색 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-white rounded-2xl border-2 border-purple-200 hover:border-purple-500/50 shadow-sm hover:shadow-lg transition-all duration-300 p-10">
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-bold text-purple-700 mb-2">
                    사무국
                  </h3>
                  <p className="text-sm text-gray-500">협회 운영 실무 조직</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "조지형", position: "사무국장", level: "senior" },
                    { name: "김예진", position: "대표", company: "포플러플래닛" },
                    { name: "인재원", position: "사원", level: "junior" },
                    { name: "신동규", position: "사원", level: "junior" }
                  ].map((member, index) => (
                    <div
                      key={member.name}
                      className="bg-purple-50 rounded-lg border border-purple-200 p-4 hover:bg-purple-100 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-purple-700">
                              {member.name}
                            </span>
                            {member.level === 'senior' && (
                              <span className="px-2 py-0.5 rounded-full bg-purple-600 text-[10px] font-semibold text-white">
                                {member.position}
                              </span>
                            )}
                          </div>
                          {member.company && (
                            <div className="text-xs text-gray-500 mt-1">
                              {member.company}
                            </div>
                          )}
                          {member.level === 'junior' && (
                            <div className="text-xs text-gray-500 mt-1">
                              {member.position}
                            </div>
                          )}
                        </div>
                        <Building2 className="w-4 h-4 text-purple-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
