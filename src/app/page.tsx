import { Suspense } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProgramsSection from '@/components/sections/ProgramsSection'
import ExecutivesSection from '@/components/sections/ExecutivesSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <ProgramsSection />
      </Suspense>
      <ExecutivesSection />
      <ContactSection />
    </>
  )
}