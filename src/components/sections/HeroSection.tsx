'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, Rocket, Globe } from 'lucide-react'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [accentColor, setAccentColor] = useState('#00d4aa')

  useEffect(() => {
    // CSS 변수에서 accent 색상 읽어오기
    const getAccentColor = () => {
      if (typeof window !== 'undefined') {
        const root = document.documentElement
        const accentHsl = getComputedStyle(root).getPropertyValue('--accent').trim()
        if (accentHsl) {
          // HSL 값을 HEX로 변환하거나 직접 사용
          // 일단 청록색으로 설정
          setAccentColor('#00d4aa')
        }
      }
    }
    
    getAccentColor()

    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01
        meshRef.current.rotation.y += 0.01
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color={accentColor}
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        emissive={accentColor}
        emissiveIntensity={0.2}
        transparent={true}
        opacity={0.8}
      />
    </Sphere>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/10"
      style={{ y, opacity }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-background/50 backdrop-blur-sm border-primary/20">
            <Zap className="w-4 h-4 mr-2" />
            2025년 미래 기술 혁신을 선도하는 협회
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              기술의 미래를
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              함께 만들어갑니다
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          혁신적인 기술과 창의적인 아이디어를 바탕으로 한 벤처스타트업들이 
          글로벌 경쟁력을 갖출 수 있도록 <span className="text-foreground font-semibold">압도적인 지원</span>을 제공합니다.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">회원사</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">500억+</div>
            <div className="text-sm text-muted-foreground">투자 유치</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">프로그램</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 text-lg">
              <Rocket className="w-5 h-5 mr-2" />
              협회 가입하기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg backdrop-blur-sm bg-background/50">
              <Globe className="w-5 h-5 mr-2" />
              사업 안내 보기
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-3 h-3 bg-primary/50 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/70 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-muted-foreground"
        >
          <span className="text-sm mb-2">스크롤하여 더보기</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
