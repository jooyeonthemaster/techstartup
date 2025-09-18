import MembershipApplySection from '@/components/sections/MembershipApplySection'
// Fees section intentionally not imported to remove payment instructions from apply page

export default function MembershipApplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="pt-24">
        <MembershipApplySection />
        {/* Payment info section removed as requested */}
      </div>
    </div>
  )
}


