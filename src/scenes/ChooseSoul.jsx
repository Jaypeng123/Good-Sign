import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZODIACS } from '../data'
import ZodiacEngraving from '../components/ZodiacEngraving'

// Hand-placed asymmetric coordinates (percent) — deliberately not a grid, not a circle.
const POSITIONS = [
  { top: 10, left: 16 }, { top: 22, left: 54 }, { top: 6, left: 82 },
  { top: 40, left: 9 }, { top: 46, left: 42 }, { top: 32, left: 72 },
  { top: 63, left: 22 }, { top: 71, left: 52 }, { top: 56, left: 86 },
  { top: 86, left: 14 }, { top: 90, left: 62 }, { top: 76, left: 90 },
]

function ZodiacPortrait({ z, isSelected, isFocused, dimmed }) {
  const [errored, setErrored] = useState(false)
  const size = isSelected ? 108 : isFocused ? 116 : 76

  return (
    <div
      className="relative rounded-full overflow-hidden bg-cream transition-[filter,opacity] duration-500"
      style={{
        width: size,
        height: size,
        filter: dimmed ? 'blur(5px) grayscale(0.4)' : 'none',
        opacity: dimmed ? 0.35 : 1,
        border: `1px solid ${isSelected ? '#1D4ED8' : 'rgba(44,42,41,0.35)'}`,
      }}
    >
      {z.image && !errored ? (
        <img
          src={z.image}
          alt={z.label}
          loading="lazy"
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: 'multiply' }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <ZodiacEngraving z={z} size={size * 0.8} tone={isSelected ? '#1D4ED8' : '#2C2A29'} />
        </div>
      )}
    </div>
  )
}

export default function ChooseSoul({ value, onChange, onNext }) {
  const [hoverIdx, setHoverIdx] = useState(null)

  return (
    <div className="relative min-h-screen flex flex-col items-center px-6 pt-24 pb-16">
      <p className="text-[10px] uppercase tracking-[0.35em] text-ink/40 font-mono mb-3">Step 01 — Choose The Soul</p>
      <h2 className="font-serif text-3xl sm:text-4xl text-ink text-center mb-2">Who are you meeting?</h2>
      <p className="text-xs text-ink/40 mb-10">選擇對方的星座</p>

      <div className="relative w-full max-w-4xl h-[560px] sm:h-[640px]">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {hoverIdx !== null &&
            POSITIONS.map((p, i) => {
              if (i === hoverIdx) return null
              const a = POSITIONS[hoverIdx]
              return (
                <line
                  key={i}
                  x1={a.left}
                  y1={a.top}
                  x2={p.left}
                  y2={p.top}
                  stroke="#1D4ED8"
                  strokeWidth="0.15"
                  opacity="0.22"
                />
              )
            })}
        </svg>

        {ZODIACS.map((z, i) => {
          const pos = POSITIONS[i]
          const isSelected = value === z.id
          const isFocused = hoverIdx === i
          const dimmed = hoverIdx !== null && !isFocused
          return (
            <motion.button
              key={z.id}
              type="button"
              onClick={() => onChange(z.id)}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.12, zIndex: 20 }}
            >
              <ZodiacPortrait z={z} isSelected={isSelected} isFocused={isFocused} dimmed={dimmed} />
              <AnimatePresence>
                {(isFocused || isSelected) && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 text-[11px] font-serif tracking-wide text-ink whitespace-nowrap"
                  >
                    {z.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>

      <motion.button
        type="button"
        disabled={!value}
        onClick={onNext}
        whileHover={value ? { scale: 1.05 } : {}}
        className={`mt-12 px-10 py-4 rounded-full border text-xs uppercase tracking-[0.3em] font-mono transition-colors duration-500 ${
          value ? 'border-ink/30 hover:bg-ink hover:text-cream hover:border-ink' : 'border-ink/10 text-ink/20 cursor-not-allowed'
        }`}
      >
        Continue
      </motion.button>
    </div>
  )
}
