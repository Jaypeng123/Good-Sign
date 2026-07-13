import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Ritual({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 6000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_18s_linear_infinite]">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#1D4ED8" strokeOpacity="0.25" strokeWidth="0.4" strokeDasharray="1 3" />
          <circle cx="50" cy="50" r="34" fill="none" stroke="#1D4ED8" strokeOpacity="0.35" strokeWidth="0.3" />
        </svg>
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          style={{ animation: 'spin 28s linear infinite reverse' }}
        >
          <circle cx="50" cy="50" r="20" fill="none" stroke="#2C2A29" strokeOpacity="0.3" strokeWidth="0.3" strokeDasharray="0.5 2" />
        </svg>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#1D4ED8]"
            style={{ top: '50%', left: '50%' }}
            animate={{
              x: [0, Math.cos((i / 8) * Math.PI * 2) * 110],
              y: [0, Math.sin((i / 8) * Math.PI * 2) * 110],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        className="mt-12 font-serif text-2xl sm:text-3xl text-ink text-center leading-relaxed"
      >
        The stars
        <br />
        are aligning.
      </motion.p>
      <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-ink/40 font-mono">解讀星象頻率中</p>
    </div>
  )
}
