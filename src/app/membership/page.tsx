'use client'

import MembershipTargetSection from '@/components/sections/MembershipTargetSection'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function MembershipPage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-[#004094]">
        <div className="absolute inset-0 opacity-40">
          <Image 
            src="/images/network-connection.png" 
            alt="Membership Hero" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#004094]/90 to-[#004094]/80" />
        
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 border border-white/30 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-sm font-bold tracking-wider uppercase">Join Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-sm">
              회원 모집 대상
            </h1>
            <p className="text-xl text-blue-50 max-w-2xl mx-auto font-light drop-shadow-sm">
              기술벤처스타트업협회와 함께<br />
              혁신의 미래를 만들어갈 분들을 모십니다.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <MembershipTargetSection />
      </div>
    </div>
  )
}
