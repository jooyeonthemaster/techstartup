
import Link from 'next/link'

const businessPlans = [
  {
    number: '01',
    title: '기술벤처 산학협력',
    subtitle: 'R&D 예산 420억 증가',
    description: '2025년 산학연 예산 전년 대비 420억 증가로 동국대, 서울대와 산학협력 연계 강화',
  },
  {
    number: '02',
    title: '회원기업 채용지원',
    subtitle: '서울시 일자리 사업',
    description: '서울시 일자리 사업 수주로 2달 동안 풀타임 직무교육, 매칭 후 3개월 인건비 전액 지원',
  },
  {
    number: '03',
    title: '기술스타트업 육성',
    subtitle: '개인투자조합 3.2억원',
    description: '창업교육 프로그램 운영과 코맥스벤처러스가 GP인 개인투자조합 결성으로 스타트업 직접 투자',
  },
  {
    number: '04',
    title: '학술세미나 & 네트워킹',
    subtitle: '지속적인 지식 교류',
    description: '기술특강 또는 논문 세미나를 기술창업대학원 주관으로 서울대AICEO와 동국대 석·박사 교류',
  }
]

export default function BusinessPlan2025Section() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Traditional Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold" style={{ color: '#005bac' }}>
            2025 사업계획
          </h2>
          <p className="text-sm text-[#666] mt-2">4대 핵심 활동</p>
        </div>

        {/* Traditional Grid Layout - Simple boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {businessPlans.map((plan) => (
            <div key={plan.number} className="bg-[#f8f8f8] border border-[#ddd] p-5 hover:shadow-md transition-shadow">
              {/* Number Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[#ff6600] text-white text-sm font-bold">
                  {plan.number}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-base font-bold text-[#333] mb-2">
                {plan.title}
              </h3>
              
              {/* Subtitle */}
              <p className="text-sm text-[#ff6600] font-bold mb-3">
                {plan.subtitle}
              </p>
              
              {/* Description */}
              <p className="text-xs text-[#666] leading-relaxed">
                {plan.description}
              </p>
            </div>
          ))}
        </div>

        {/* Traditional CTA Button */}
        <div className="text-center mt-8">
          <Link 
            href="/business"
            className="inline-block px-8 py-3 bg-[#005bac] text-white font-bold text-sm hover:bg-[#004890] transition-colors"
          >
            사업 자세히 보기 →
          </Link>
        </div>
      </div>
    </section>
  )
}
