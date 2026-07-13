import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ensureGsap } from '../lib/gsapSetup'

export default function Opening({ onEnter }) {
  const titleWrapRef = useRef(null)
  const [mouseCoord, setMouseCoord] = useState({ x: '50%', y: '50%' })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const { gsap } = ensureGsap()
    gsap.fromTo(
      titleWrapRef.current,
      { opacity: 0, y: 40, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleWrapRef.current, start: 'top 85%' },
      },
    )
  }, [])

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouseCoord({
      x: ((e.clientX - rect.left) / rect.width) * 100 + '%',
      y: ((e.clientY - rect.top) / rect.height) * 100 + '%',
    })
  }

  return (
    <div className="relative">
      {/* Chapter 01 — Opening Scene */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.45, delayChildren: 0.3 } } }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.4] text-ink"
        >
          {['Not everyone', 'is meant', 'to meet you.'].map((line) => (
            <motion.span
              key={line}
              variants={{
                hidden: { opacity: 0, y: 26 },
                show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: 'easeOut' } },
              }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1] }}
          transition={{ delay: 2.6, duration: 2.4, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-10 text-[10px] uppercase tracking-[0.3em] text-ink/40 font-mono"
        >
          Scroll to continue
        </motion.span>
      </section>

      {/* Chapter 02 — Brand Reveal */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div
          ref={titleWrapRef}
          onMouseMove={handleMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative cursor-crosshair"
        >
          <h1 className="font-['Cinzel'] font-black text-6xl sm:text-8xl md:text-[9rem] tracking-[0.05em] leading-none text-ink [transform:scaleY(1.15)] [transform-origin:bottom] m-0">
            GOOD SIGN
          </h1>
          <h1
            aria-hidden
            className="absolute inset-0 font-['Cinzel'] font-black text-6xl sm:text-8xl md:text-[9rem] tracking-[0.05em] leading-none [transform:scaleY(1.15)] [transform-origin:bottom] m-0 pointer-events-none transition-opacity duration-300"
            style={{
              color: 'transparent',
              backgroundImage:
                'linear-gradient(135deg, #6b7280 0%, #c9a876 25%, #fffdf5 50%, #c9a876 75%, #6b7280 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              opacity: hovered ? 1 : 0,
              WebkitMaskImage: `radial-gradient(circle 220px at ${mouseCoord.x} ${mouseCoord.y}, black 0%, rgba(0,0,0,0.35) 60%, transparent 100%)`,
              maskImage: `radial-gradient(circle 220px at ${mouseCoord.x} ${mouseCoord.y}, black 0%, rgba(0,0,0,0.35) 60%, transparent 100%)`,
            }}
          >
            GOOD SIGN
          </h1>
        </div>

        <p className="mt-8 text-xs sm:text-sm uppercase tracking-[0.3em] text-ink/50 font-mono max-w-md">
          Not a horoscope. A cinematic ritual before your first meeting.
        </p>

        <motion.button
          type="button"
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="mt-16 px-10 py-4 rounded-full border border-ink/30 text-xs uppercase tracking-[0.3em] font-mono hover:bg-ink hover:text-cream hover:border-ink transition-colors duration-500"
        >
          Begin The Ritual
        </motion.button>
      </section>
    </div>
  )
}
