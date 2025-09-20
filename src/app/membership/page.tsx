import MembershipTargetSection from '@/components/sections/MembershipTargetSection'

export default function MembershipPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#005bac]">회원 모집 대상</h1>
          <p className="mt-3 text-gray-600">아래 대상에 해당하시는 분들의 참여를 환영합니다</p>
        </div>
        <MembershipTargetSection />
      </div>
    </div>
  )
}


