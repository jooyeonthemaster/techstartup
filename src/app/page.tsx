import Header from '@/components/layout/Header'
import HeroSection from '@/components/sections/HeroSection'
import AboutSectionTech from '@/components/sections/tech/AboutSectionTech'
import ServicesSectionTech from '@/components/sections/tech/ServicesSectionTech'
import ProgramsSectionTech from '@/components/sections/tech/ProgramsSectionTech'
import ContactSectionTech from '@/components/sections/tech/ContactSectionTech'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <AboutSectionTech />
      <ServicesSectionTech />
      <ProgramsSectionTech />
      <ContactSectionTech />
      
{/* Tech Footer */}
      <footer className="bg-foreground text-background py-16 relative overflow-hidden">
{/* Tech Grid Background */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.background)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.background)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-background rounded flex items-center justify-center mr-3">
                  <span className="text-foreground font-mono font-bold text-sm">T</span>
                </div>
                <div>
                  <h5 className="text-lg font-bold font-mono">
                    TECH_VENTURE_STARTUP_ASSOCIATION
                  </h5>
                  <div className="text-xs font-mono text-background/60">v2025.1.0</div>
                </div>
              </div>
              <div className="bg-background/10 p-4 rounded border border-background/20 font-mono text-sm mb-6">
                <div className="text-background/60 mb-1">{`// MISSION:`}</div>
                <div className="text-background">
                  기술벤처스타트업 생태계의 성장과 발전을 지원하는 전문 비영리 단체
                </div>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h6 className="font-bold mb-4 font-mono text-sm">QUICK_LINKS:</h6>
              <ul className="space-y-2 text-background/70 font-mono text-sm">
                <li><a href="#about" className="hover:text-background transition-colors">협회소개</a></li>
                <li><a href="#services" className="hover:text-background transition-colors">사업안내</a></li>
                <li><a href="#programs" className="hover:text-background transition-colors">프로그램</a></li>
                <li><a href="#contact" className="hover:text-background transition-colors">연락처</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-bold mb-4 font-mono text-sm">CONTACT_INFO:</h6>
              <div className="space-y-2 text-background/70 font-mono text-sm">
                <div>ADDR: 서울특별시 강남구 테헤란로 123</div>
                <div>TEL: 02-1234-5678</div>
                <div>EMAIL: info@techventure.or.kr</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-12 pt-8 text-center">
            <div className="bg-background/10 p-4 rounded border border-background/20 font-mono text-sm max-w-2xl mx-auto">
              <div className="text-background/60 mb-1">{`// COPYRIGHT_NOTICE:`}</div>
              <div className="text-background">
                &copy; 2025 TECH_VENTURE_STARTUP_ASSOCIATION. ALL_RIGHTS_RESERVED.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}