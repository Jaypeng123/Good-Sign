import { useState } from 'react'
import { motion } from 'framer-motion'

// Left-edge decorative vase — hovering pours a thin stream of "holy water" downward.
export default function Amphora() {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="pointer-events-auto hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center opacity-60 hover:opacity-100 transition-opacity duration-500"
      style={{ zIndex: 0 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <svg width="52" height="76" viewBox="0 0 56 80" fill="none">
        <path
          d="M20 6 Q28 0 36 6 L34 14 Q40 20 40 34 L40 60 Q40 74 28 76 Q16 74 16 60 L16 34 Q16 20 22 14 Z"
          stroke="#2C2A29"
          strokeWidth="1"
          fill="none"
        />
        <ellipse cx="28" cy="6" rx="8" ry="3" stroke="#2C2A29" strokeWidth="1" fill="none" />
        <path d="M22 30 Q28 34 34 30" stroke="#2C2A29" strokeWidth="0.5" fill="none" opacity="0.5" />
        <path d="M20 46 Q28 50 36 46" stroke="#2C2A29" strokeWidth="0.5" fill="none" opacity="0.5" />
      </svg>
      <motion.div
        className="w-px bg-gradient-to-b from-[#1D4ED8]/70 via-[#1D4ED8]/40 to-transparent"
        initial={{ height: 0, opacity: 0 }}
        animate={hover ? { height: 96, opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
    </div>
  )
}
