'use client'

import { ArrowUpRight } from 'lucide-react'

export default function OrganizationSection() {
  return (
    <div className="relative pt-32 pb-20">
      {/* Minimal Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Premium Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-bold tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-200 uppercase mb-4">
            ORGANIZATION
          </p>
          <h1 className="text-4xl md:text-5xl font-thin text-gray-900 dark:text-white mb-4">
            협회 <span className="font-normal">조직 구성</span>
          </h1>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto mb-8" />
          <p className="text-sm text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
            체계적이고 전문적인 조직 구성으로 회원사들의 성장을 지원합니다
          </p>
        </div>

        <div className="space-y-16">
          {/* President Section - Premium Design */}
          <div className="flex justify-center">
            <div className="group relative max-w-3xl w-full">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              
              <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-10 transition-all duration-500 group-hover:-translate-y-1">
                {/* Glass overlays */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/[0.02] opacity-60" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent to-white/30 dark:to-white/[0.01]" />
                
                <div className="relative flex items-center gap-10">
                  {/* Text Section */}
                  <div className="flex-1 text-center">
                    <div className="mb-4">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold tracking-wide">
                        협회장
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      김기홍 대표
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      (주)링크드코리아
                    </p>
                  </div>
                  
                  {/* Image Section */}
                  <div className="flex-1">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                      <img 
                        src="/images/president.png" 
                        alt="김기홍 협회장" 
                        className="w-full h-auto object-cover rounded-2xl"
                      />
                      {/* Image overlay for hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center">
            <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500/50 to-purple-500/50"></div>
          </div>

          {/* Three Main Sections - Modern Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Advisory Committee */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-slate-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8 h-full transition-all duration-500 group-hover:-translate-y-1">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/[0.02] opacity-60" />
                
                <div className="relative">
                  <div className="text-center mb-8">
                    <div className="text-4xl font-thin text-gray-300 dark:text-gray-700 mb-2">01</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      자문위원단
                    </h3>
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-4" />
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
                        className="group/item rounded-xl border border-gray-100 dark:border-gray-900 bg-white/70 dark:bg-black/30 backdrop-blur-sm p-3 hover:bg-white/90 dark:hover:bg-black/50 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {advisor.name} <span className="font-normal text-gray-600 dark:text-gray-400">{advisor.role}</span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {advisor.company}
                            </div>
                          </div>
                          <ArrowUpRight className="w-3 h-3 text-gray-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Vice Presidents - Grid Layout */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8 h-full transition-all duration-500 group-hover:-translate-y-1">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/[0.02] opacity-60" />
                
                <div className="relative">
                  <div className="text-center mb-8">
                    <div className="text-4xl font-thin text-gray-300 dark:text-gray-700 mb-2">02</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      부회장단
                    </h3>
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-4" />
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
                        className="rounded-lg border border-gray-100 dark:border-gray-900 bg-white/70 dark:bg-black/30 backdrop-blur-sm p-2 text-center hover:bg-white/90 dark:hover:bg-black/50 transition-all duration-300"
                      >
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">
                          {vp}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Consultant */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8 h-full transition-all duration-500 group-hover:-translate-y-1">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/[0.02] opacity-60" />
                
                <div className="relative flex flex-col justify-center h-full">
                  <div className="text-center">
                    <div className="text-4xl font-thin text-gray-300 dark:text-gray-700 mb-6">03</div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/40 backdrop-blur-sm mb-4">
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">고문</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      김요섭 회장
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      (주)디자인파크
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center">
            <div className="w-[1px] h-16 bg-gradient-to-b from-purple-500/50 to-blue-500/50"></div>
          </div>

          {/* Bottom Sections - Premium Layout */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* 4 Departments */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-10 transition-all duration-500 group-hover:-translate-y-1">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/[0.02] opacity-60" />
                
                <div className="relative">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      4개 분과
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500">전문 분야별 운영 조직</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        name: "투자분과",
                        leader: "변우석 대표",
                        color: "from-blue-500 to-cyan-500",
                        number: "01"
                      },
                      {
                        name: "학술분과",
                        leader: "신수희 대표",
                        color: "from-purple-500 to-pink-500",
                        number: "02"
                      },
                      {
                        name: "사업운영분과",
                        leader: "지효선 대표",
                        color: "from-green-500 to-emerald-500",
                        number: "03"
                      },
                      {
                        name: "산학협력분과",
                        leader: "김민지 대표",
                        color: "from-orange-500 to-red-500",
                        number: "04"
                      }
                    ].map((dept, index) => (
                      <div key={dept.name} className="group/dept relative rounded-2xl border border-gray-100 dark:border-gray-900 bg-white/80 dark:bg-black/40 backdrop-blur-sm p-5 hover:border-gray-200 dark:hover:border-gray-800 transition-all duration-300 hover:-translate-y-0.5">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent dark:from-white/[0.01] opacity-50" />
                        
                        <div className="relative">
                          <div className="flex items-start justify-between mb-3">
                            <span className="text-2xl font-thin text-gray-300 dark:text-gray-700">
                              {dept.number}
                            </span>
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${dept.color} opacity-10 group-hover/dept:opacity-20 transition-opacity`} />
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                            {dept.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                              분과장
                            </span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              {dept.leader}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Office */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-10 transition-all duration-500 group-hover:-translate-y-1">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/[0.02] opacity-60" />
                
                <div className="relative">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      사무국
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500">협회 운영 실무 조직</p>
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
                        className="group/member rounded-xl border border-gray-100 dark:border-gray-900 bg-white/80 dark:bg-black/40 backdrop-blur-sm p-4 hover:bg-white/90 dark:hover:bg-black/50 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {member.name}
                              </span>
                              {member.level === 'senior' && (
                                <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-[10px] font-semibold text-blue-700 dark:text-blue-400">
                                  {member.position}
                                </span>
                              )}
                            </div>
                            {member.company && (
                              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {member.company}
                              </div>
                            )}
                            {member.level === 'junior' && (
                              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {member.position}
                              </div>
                            )}
                          </div>
                          <ArrowUpRight className="w-3 h-3 text-gray-400 opacity-0 group-hover/member:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}