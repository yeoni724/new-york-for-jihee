import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Heart,
  MapPin,
  Sparkles,
  Gem,
  Wine,
  Camera,
  Star,
  ChevronDown,
  MessageCircleHeart,
  Trees,
  Sunset,
  Coffee,
} from 'lucide-react'

/* ──────────────────────────────────────────────
   Centered wrapper — ensures all content is centered
   ────────────────────────────────────────────── */
function CenteredBlock({
  children,
  className = '',
  maxWidth = 'max-w-3xl',
}: {
  children: React.ReactNode
  className?: string
  maxWidth?: string
}) {
  return (
    <div className={`w-full ${maxWidth} mx-auto px-6 ${className}`}>
      {children}
    </div>
  )
}

/* ──────────────────────────────────────────────
   Section wrapper with scroll-triggered fade-in
   ────────────────────────────────────────────── */
function Section({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.section>
  )
}

/* ──────────────────────────────────────────────
   Spot card component
   ────────────────────────────────────────────── */
function SpotCard({
  icon: Icon,
  title,
  subtitle,
  description,
  image,
  delay = 0,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
  description: string
  image: string
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      <div className="p-6 md:p-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Icon className="w-5 h-5 text-rose-400" />
          <span className="text-sm font-medium text-rose-400 tracking-wide uppercase">
            {subtitle}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-[#3d2f2f] mb-3">{title}</h3>
        <p className="text-[#6b5b5b] leading-relaxed text-sm md:text-base">{description}</p>
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   Floating hearts background
   ────────────────────────────────────────────── */
function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-200/30"
          initial={{
            x: `${10 + i * 12}vw`,
            y: '110vh',
            rotate: 0,
            scale: 0.5 + Math.random() * 0.8,
          }}
          animate={{
            y: '-10vh',
            rotate: 360,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2.5,
            ease: 'linear',
          }}
        >
          <Heart className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
        </motion.div>
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────
   Main App
   ────────────────────────────────────────────── */
export default function App() {
  const [letterOpen, setLetterOpen] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  const spots = [
    {
      icon: Gem,
      title: 'Harry Winston, 5th Avenue',
      subtitle: 'Fifth Avenue',
      description:
        '리본 밴드 웨딩링 구경하러 바로 고!!',
      image: 'https://images.unsplash.com/photo-1573663520878-8c38b10264fc?w=800&q=80',
    },
    {
      icon: Trees,
      title: '센트럴 파크 피크닉',
      subtitle: 'Central Park',
      description:
        '매일매일 센트럴파크 이곳저곳 산책하면서 힐링하면 너무 좋을 것 같아',
      image: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=80',
    },
    {
      icon: Sunset,
      title: 'Top of the Rock 야경',
      subtitle: 'Sunset View',
      description:
        '야경은 내가 좋아하는 거긴 하지만 지희랑 같이 보면 좋을 것 같아서',
      image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
    },
    {
      icon: Camera,
      title: '브루클린 브릿지 산책',
      subtitle: 'Brooklyn Bridge',
      description:
        '아침/낮에는 센트럴파크라면 저녁은 브루클린 브릿지에서!',
      image: 'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=800&q=80',
    },
    {
      icon: Wine,
      title: '루프탑에서의 저녁',
      subtitle: 'Rooftop Dinner',
      description:
        '맛있는 것들도 많이 찾아 돌아다니자!',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    },
    {
      icon: Star,
      title: 'Broadway Show',
      subtitle: 'Times Square',
      description:
        '끌리는 뮤지컬 있으면 뮤지컬도 같이 보자',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80',
    },
    {
      icon: Coffee,
      title: 'DUMBO 카페 투어',
      subtitle: 'Brooklyn Vibes',
      description:
        '유명한 카페들도 이곳저곳 찾아보자!',
      image: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800&q=80',
    },
    {
      icon: MapPin,
      title: '소호 & 첼시 마켓',
      subtitle: 'Shopping & Food',
      description:
        '지희가 좋아할만한 이쁜 것들 여러가지 골라보자!',
      image: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&q=80',
    },
  ]

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center w-full overflow-x-hidden"
    >
      <FloatingHearts />

      {/* ── Hero Section ── */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center w-full max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-[#6b5b5b] tracking-wide">
                September 2027 · New York City
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#3d2f2f] mb-6 leading-tight tracking-tight">
              우리의 9월은
              <br />
              <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-pink-200 bg-clip-text text-transparent">
                뉴욕에서
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#a39393] leading-relaxed mb-12 max-w-xl mx-auto">
              화난 마음 뉴욕 여행 상상하면서 풀어줘요
            </p>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-6 h-6 mx-auto text-rose-300" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Apology Message (Simple & Centered) ── */}
      <Section className="py-24 md:py-32">
        <CenteredBlock maxWidth="max-w-2xl" className="text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-rose-400" fill="currentColor" />
            <span className="text-sm font-medium text-rose-400 tracking-widest uppercase">
              I'm Sorry
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3d2f2f] leading-snug">
            화나게 해서 미안해.
          </h2>
        </CenteredBlock>
      </Section>

      {/* ── Curated Spots Grid ── */}
      <section className="w-full pb-24 md:pb-32">
        <Section className="mb-16">
          <CenteredBlock className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-rose-50 text-rose-400 text-sm font-medium mb-4">
              지희와 함께 가고 싶은 곳들
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3d2f2f]">
              September in New York
            </h2>
          </CenteredBlock>
        </Section>

        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {spots.map((spot, i) => (
            <SpotCard key={spot.title} {...spot} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ── Secret Letter ── */}
      <Section className="py-24 md:py-32">
        <CenteredBlock maxWidth="max-w-xl" className="text-center">
          <motion.div
            animate={{ rotate: [0, -3, 3, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="mb-8"
          >
            <MessageCircleHeart className="w-12 h-12 mx-auto text-rose-400" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#3d2f2f] mb-4">
            마지막으로,
          </h2>
          <p className="text-[#a39393] mb-10">
            아래 버튼을 누르면 내 진심을 볼 수 있어.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLetterOpen(true)}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            편지 열기
          </motion.button>
        </CenteredBlock>
      </Section>

      {/* ── Letter Modal ── */}
      <AnimatePresence>
        {letterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
            onClick={() => setLetterOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl relative text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-4 -right-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                >
                  <Sparkles className="w-8 h-8 text-amber-500" />
                </motion.div>
              </div>

              <Heart className="w-8 h-8 text-rose-400 mb-6 mx-auto" fill="currentColor" />

              <h3 className="text-2xl md:text-3xl font-bold text-[#3d2f2f] mb-6">
                지희에게
              </h3>

              <div className="space-y-4 text-[#6b5b5b] leading-relaxed text-sm md:text-base text-left max-w-md mx-auto">
                <p>
                  지희 화나게 해서 미안해.
                </p>
                <p>
                  고의는 아니었는데 지희가 섭섭하게 느낄 수 있었네.
                  앞으로는 내가 더 신경써서 지희 챙겨볼게!
                </p>
                <p>
                  우리 뉴욕에서 뭐할지 상상하면서 행복해지자!
                </p>
                <p className="font-medium text-[#3d2f2f]">
                  사랑해, 지희.
                  <br />
                  9월의 뉴욕에서 꼭 웃게 해줄게.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLetterOpen(false)}
                className="mt-8 px-6 py-3 rounded-full bg-rose-50 text-rose-400 font-medium text-sm hover:bg-rose-100 transition-colors cursor-pointer"
              >
                고마워, 알겠어 ♥
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="w-full py-12 text-center">
        <p className="text-[#a39393] text-sm">
          Made with <Heart className="inline w-4 h-4 text-rose-400 -mt-0.5" fill="currentColor" /> for 지희
        </p>
        <p className="text-[#a39393]/50 text-xs mt-2">September 2027 · NYC</p>
      </footer>
    </div>
  )
}
