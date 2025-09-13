import {
  Calendar,
  Users,
  Trophy,
  Rocket,
  Target,
  Zap,
  ArrowRight,
  Clock,
  MapPin,
  DollarSign,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Award,
  BookOpen,
  Briefcase,
  Code,
  Globe,
  TrendingUp,
  UserCheck,
  Building,
  GraduationCap,
  Lightbulb,
  Network,
  Shield,
  Star
} from 'lucide-react'

export const programCategories = {
  accelerator: {
    title: '액셀러레이터',
    icon: Rocket,
    description: '초기 스타트업의 빠른 성장을 위한 집중 프로그램',
    programs: [
      {
        title: 'Tech Boost 2025',
        duration: '3개월',
        participants: '10팀',
        funding: '최대 1억원',
        tags: ['시드투자', '멘토링', '네트워킹'],
        features: ['1:1 전담 멘토', '주간 피칭 연습', '투자자 데모데이'],
        status: 'recruiting',
        deadline: '2025.02.15',
        icon: Zap,
        gradient: 'from-yellow-400 to-orange-500'
      },
      {
        title: 'AI Startup Camp',
        duration: '6개월',
        participants: '15팀',
        funding: '최대 2억원',
        tags: ['AI/ML', 'B2B', '글로벌'],
        features: ['GPU 크레딧 지원', 'AI 전문가 멘토링', '해외 진출 지원'],
        status: 'ongoing',
        icon: Lightbulb,
        gradient: 'from-purple-400 to-pink-500'
      },
      {
        title: 'Green Tech Initiative',
        duration: '4개월',
        participants: '8팀',
        funding: '최대 1.5억원',
        tags: ['ESG', '그린테크', '임팩트'],
        features: ['ESG 컨설팅', '정부 지원 연계', '임팩트 측정'],
        status: 'upcoming',
        deadline: '2025.03.31',
        icon: Shield,
        gradient: 'from-green-400 to-teal-500'
      }
    ]
  },
  education: {
    title: '교육 프로그램',
    icon: GraduationCap,
    description: '실무 중심의 체계적인 창업 교육 커리큘럼',
    programs: [
      {
        title: '창업 부트캠프',
        duration: '8주',
        participants: '30명',
        level: '초급',
        tags: ['기초', '실습', '네트워킹'],
        features: ['비즈니스 모델링', 'MVP 개발', '피칭 훈련'],
        status: 'recruiting',
        deadline: '2025.01.31',
        icon: BookOpen,
        gradient: 'from-blue-400 to-cyan-500'
      },
      {
        title: '리더십 아카데미',
        duration: '12주',
        participants: '20명',
        level: '중급',
        tags: ['리더십', '조직관리', '성장전략'],
        features: ['CEO 코칭', '팀빌딩 워크샵', '사례 연구'],
        status: 'ongoing',
        icon: UserCheck,
        gradient: 'from-indigo-400 to-purple-500'
      },
      {
        title: '글로벌 진출 전략',
        duration: '6주',
        participants: '15명',
        level: '고급',
        tags: ['해외진출', '현지화', '투자유치'],
        features: ['해외 시장 분석', '현지 파트너십', '글로벌 IR'],
        status: 'upcoming',
        deadline: '2025.04.15',
        icon: Globe,
        gradient: 'from-red-400 to-pink-500'
      }
    ]
  },
  mentoring: {
    title: '멘토링',
    icon: Users,
    description: '업계 전문가와의 1:1 맞춤형 멘토링',
    programs: [
      {
        title: '시니어 멘토링',
        duration: '3개월',
        participants: '1:1',
        specialty: '경영 전략',
        tags: ['CEO', '임원진', '시리즈 A+'],
        features: ['월 2회 세션', '24/7 슬랙 지원', '네트워크 소개'],
        status: 'recruiting',
        icon: Award,
        gradient: 'from-amber-400 to-orange-500'
      },
      {
        title: '테크 멘토링',
        duration: '6개월',
        participants: '1:2',
        specialty: '기술 개발',
        tags: ['CTO', '개발팀', '기술혁신'],
        features: ['코드 리뷰', '아키텍처 설계', '기술 로드맵'],
        status: 'ongoing',
        icon: Code,
        gradient: 'from-cyan-400 to-blue-500'
      },
      {
        title: '마케팅 멘토링',
        duration: '4개월',
        participants: '1:3',
        specialty: '성장 해킹',
        tags: ['CMO', '그로스', '브랜딩'],
        features: ['채널 최적화', 'A/B 테스트', '퍼포먼스 분석'],
        status: 'upcoming',
        deadline: '2025.02.28',
        icon: TrendingUp,
        gradient: 'from-pink-400 to-red-500'
      }
    ]
  },
  networking: {
    title: '네트워킹',
    icon: Network,
    description: '스타트업 생태계 네트워크 구축 및 확장',
    programs: [
      {
        title: '월례 데모데이',
        duration: '매월',
        participants: '50명',
        format: '오프라인',
        tags: ['피칭', '투자연결', '데모'],
        features: ['5분 피칭', '투자자 피드백', '네트워킹 세션'],
        status: 'ongoing',
        nextEvent: '2025.01.25',
        icon: Play,
        gradient: 'from-violet-400 to-purple-500'
      },
      {
        title: '기업가 포럼',
        duration: '분기별',
        participants: '100명',
        format: '하이브리드',
        tags: ['포럼', '강연', '토론'],
        features: ['키노트 스피치', '패널 토크', '워크샵'],
        status: 'recruiting',
        nextEvent: '2025.03.15',
        icon: Users,
        gradient: 'from-emerald-400 to-teal-500'
      },
      {
        title: '글로벌 컨퍼런스',
        duration: '연간',
        participants: '500명',
        format: '하이브리드',
        tags: ['컨퍼런스', '해외연사', '전시'],
        features: ['3일 프로그램', '해외 연사진', '투자 매칭'],
        status: 'upcoming',
        nextEvent: '2025.11.18',
        icon: Globe,
        gradient: 'from-blue-400 to-indigo-500'
      }
    ]
  }
}

export const testimonials = [
  {
    name: '김지영',
    company: 'TechFlow',
    program: 'Tech Boost 2024',
    content: '3개월간의 액셀러레이터 프로그램을 통해 체계적인 사업 검증과 함께 시리즈 A 투자를 성공적으로 유치할 수 있었습니다.',
    funding: '15억원 투자 유치',
    avatar: '/images/testimonials/kim-jiyoung.jpg'
  },
  {
    name: '박민수',
    company: 'AI Solutions',
    program: 'AI Startup Camp',
    content: '전문 멘토진의 체계적인 지원과 실전 경험을 통해 글로벌 시장 진출의 발판을 마련할 수 있었습니다.',
    achievement: '해외 진출 성공',
    avatar: '/images/testimonials/park-minsu.jpg'
  },
  {
    name: '이서현',
    company: 'GreenTech',
    program: 'Green Tech Initiative',
    content: 'ESG 전문 컨설팅과 정부 지원 연계를 통해 임팩트 있는 사업 모델을 구축하고 지속가능한 성장을 이룰 수 있었습니다.',
    impact: '탄소 절감 30%',
    avatar: '/images/testimonials/lee-seohyun.jpg'
  }
]

export const upcomingEvents = [
  {
    id: 1,
    title: '2025 스타트업 데모데이',
    date: '2025.01.25',
    time: '14:00 - 18:00',
    location: '코엑스 컨퍼런스룸',
    type: '데모데이',
    participants: 50,
    description: '혁신적인 스타트업들이 한자리에 모여 자신들의 아이디어를 선보이는 자리입니다.',
    tags: ['피칭', '투자연결', '네트워킹'],
    status: 'open',
    image: '/images/events/demo-day-2025.jpg'
  },
  {
    id: 2,
    title: 'AI 스타트업 워크샵',
    date: '2025.02.08',
    time: '10:00 - 17:00',
    location: '온라인 + 오프라인',
    type: '워크샵',
    participants: 30,
    description: 'AI 기술을 활용한 스타트업 창업과 성장 전략에 대한 실무 중심 워크샵입니다.',
    tags: ['AI/ML', '실무교육', '핸즈온'],
    status: 'open',
    image: '/images/events/ai-workshop.jpg'
  },
  {
    id: 3,
    title: '투자유치 전략 세미나',
    date: '2025.02.22',
    time: '15:00 - 18:00',
    location: '강남 스타트업센터',
    type: '세미나',
    participants: 80,
    description: '성공적인 투자유치를 위한 전략과 노하우를 공유하는 세미나입니다.',
    tags: ['투자유치', 'IR', '전략'],
    status: 'upcoming',
    image: '/images/events/investment-seminar.jpg'
  },
  {
    id: 4,
    title: 'ESG 스타트업 포럼',
    date: '2025.03.15',
    time: '13:00 - 17:00',
    location: '잠실 롯데타워',
    type: '포럼',
    participants: 120,
    description: '지속가능한 비즈니스 모델과 ESG 경영에 대한 인사이트를 나누는 포럼입니다.',
    tags: ['ESG', '지속가능성', '임팩트'],
    status: 'upcoming',
    image: '/images/events/esg-forum.jpg'
  }
]