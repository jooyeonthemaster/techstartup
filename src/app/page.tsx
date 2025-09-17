import { Suspense } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import PurposeSection from '@/components/sections/PurposeSection'
import MembershipTargetSection from '@/components/sections/MembershipTargetSection'
import BusinessPlan2025Section from '@/components/sections/BusinessPlan2025Section'
import MembershipFeesSection from '@/components/sections/MembershipFeesSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PurposeSection />
      <MembershipTargetSection />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <BusinessPlan2025Section />
      </Suspense>
      <MembershipFeesSection />
      <ContactSection />
    </>
  )
}