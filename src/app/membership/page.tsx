import MembershipTargetSection from '@/components/sections/MembershipTargetSection'
import { SectionBackground } from '@/components/ui/section-transition'

export default function MembershipPage() {
  return (
    <SectionBackground preset="membership">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">회원 모집 대상</h1>
          <p className="mt-3 text-muted-foreground">아래 대상에 해당하시는 분들의 참여를 환영합니다</p>
        </div>
        <MembershipTargetSection />
      </div>
    </SectionBackground>
  )
}


