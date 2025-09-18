import MembershipFeesSection from '@/components/sections/MembershipFeesSection'

export default function MembershipFeesPage() {
  return (
    <>
      {/* Hero: Ultra minimal design */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
        {/* Subtle background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `
                radial-gradient(circle at 10% 20%, rgba(120, 119, 198, 0.02) 0%, transparent 40%),
                radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.02) 0%, transparent 40%)
              `,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Minimal badge */}
            <div className="inline-block mb-8">
              <span className="text-xs font-medium tracking-[0.3em] text-gray-400 dark:text-gray-600 uppercase">
                Membership Fees
              </span>
            </div>
            
            {/* Main title with subtle animation */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
              투명하고 <span className="font-normal">합리적인</span> 협회비
            </h1>
            
            {/* Subtle divider */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mx-auto mb-6" />
            
            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              회원 등급별 혜택과 함께 생태계 발전에 기여하는 의미있는 투자
            </p>
          </div>
        </div>
      </section>

      {/* Content: Membership fees section */}
      <MembershipFeesSection showHeader={false} />
    </>
  )
}


