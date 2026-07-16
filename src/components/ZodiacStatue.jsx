import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ZodiacEngraving from './ZodiacEngraving'

// A pseudo-3D "statuette" treatment: no 3D asset files, just light-sculpting via
// layered CSS (mix-blend-mode tinting + radial highlight/shadow) plus a real
// perspective tilt driven by cursor position, so each zodiac reads as a small
// marble/bronze figure standing on a pedestal rather than a flat illustration.
const ELEMENT_TONE = {
  fire: '#B08968',
  earth: '#A67C52',
  air: '#D9D2C5',
  water: '#B8C4C9',
}

export default function ZodiacStatue({ z, size = 120, interactive = true }) {
  const [errored, setErrored] = useState(false)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, lightX: 30, lightY: 30 })
  const wrapRef = useRef(null)
  const tone = ELEMENT_TONE[z.element] ?? '#D9D2C5'

  function handleMove(e) {
    if (!interactive || !wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({
      rx: (0.5 - py) * 22,
      ry: (px - 0.5) * 26,
      lightX: 20 + px * 60,
      lightY: 15 + py * 50,
    })
  }

  function handleLeave() {
    setTilt({ rx: 0, ry: 0, lightX: 30, lightY: 30 })
  }

  return (
    <div className="flex flex-col items-center" style={{ perspective: 700 }}>
      <motion.div
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        <div
          className="absolute inset-0 rounded-full overflow-hidden shadow-[0_18px_30px_-12px_rgba(44,42,41,0.55)]"
          style={{ backgroundColor: tone }}
        >
          {z.image && !errored ? (
            <img
              src={z.image}
              alt={z.label}
              loading="lazy"
              onError={() => setErrored(true)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ mixBlendMode: 'multiply', filter: 'grayscale(1) contrast(1.15) brightness(1.1)' }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ZodiacEngraving z={z} size={size * 0.8} tone="#2C2A29" />
            </div>
          )}

          {/* light-sculpting overlays: a warm highlight where the "light" hits, a cool falloff on the far side */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${tilt.lightX}% ${tilt.lightY}%, rgba(255,253,245,0.65) 0%, rgba(255,253,245,0) 45%)`,
              mixBlendMode: 'screen',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${100 - tilt.lightX}% ${100 - tilt.lightY}%, rgba(20,18,17,0.5) 0%, rgba(20,18,17,0) 55%)`,
              mixBlendMode: 'multiply',
            }}
          />
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(44,42,41,0.35)' }} />
        </div>
      </motion.div>

      {/* pedestal */}
      <svg width={size * 0.7} height={size * 0.22} viewBox="0 0 70 22" className="-mt-1">
        <ellipse cx="35" cy="6" rx="32" ry="6" fill="#2C2A29" opacity="0.08" />
        <ellipse cx="35" cy="4" rx="26" ry="4" fill="none" stroke="#2C2A29" strokeWidth="0.6" opacity="0.4" />
        <ellipse cx="35" cy="4" rx="18" ry="2.4" fill="none" stroke="#2C2A29" strokeWidth="0.4" opacity="0.25" />
      </svg>
    </div>
  )
}
