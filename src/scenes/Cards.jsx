import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function CardBack() {
  return (
    <div
      className="absolute inset-0 rounded-3xl border-2 border-[#1D4ED8]/50 bg-ink flex flex-col items-center justify-center gap-4"
      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
    >
      <div className="absolute inset-3 rounded-2xl border border-[#1D4ED8]/30 pointer-events-none" />
      <div className="absolute inset-6 rounded-xl border border-[#1D4ED8]/15 pointer-events-none" />
      <span className="font-['Cinzel'] text-cream/80 text-xl tracking-[0.3em]">GOOD SIGN</span>
      <span className="text-[#1D4ED8] text-4xl">✦</span>
      <span className="text-[10px] uppercase tracking-widest text-cream/40 font-mono">Tap to draw</span>
    </div>
  )
}

function CardFront({ card, index, total }) {
  return (
    <div
      className="absolute inset-0 rounded-3xl border-2 border-[#1D4ED8]/40 bg-cream p-7 sm:p-10 flex flex-col shadow-[0_25px_60px_-15px_rgba(29,78,216,0.3)] overflow-hidden"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="absolute inset-3 rounded-2xl border border-[#1D4ED8]/20 pointer-events-none" />
      <div className="absolute inset-6 rounded-xl border border-[#1D4ED8]/10 pointer-events-none" />
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-xs text-ink/40 tracking-widest">No. {index + 1} / {total}</span>
        <span className="font-serif text-3xl text-[#1D4ED8]">{card.score}%</span>
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl text-ink leading-snug mb-5">{card.title}</h3>
      <p className="text-sm sm:text-base text-ink/60 leading-relaxed flex-1 overflow-y-auto">{card.reason}</p>
      {card.avoidSaying && (
        <div className="mt-5 pt-4 border-t border-ink/10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#1D4ED8]/50 font-mono mb-1.5">Avoid Saying</p>
          <p className="text-xs sm:text-sm text-ink/50 leading-relaxed">{card.avoidSaying}</p>
        </div>
      )}
      <div className="mt-4 text-center text-[#1D4ED8]/40 text-lg">✦</div>
    </div>
  )
}

export default function Cards({ cards, onNext }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [index])

  if (!cards.length) return null
  const card = cards[index]

  function go(delta) {
    setDirection(delta)
    setIndex((i) => (i + delta + cards.length) % cards.length)
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <p className="text-[10px] uppercase tracking-[0.35em] text-ink/40 font-mono mb-2">Tarot Conversation Cards</p>
      <h2 className="font-serif text-2xl sm:text-3xl text-ink text-center mb-10">{cards.length} 張破冰話題牌組</h2>

      <div className="relative w-full max-w-md h-[440px] sm:h-[520px]" style={{ perspective: 1200 }}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={card.id}
            initial={{ x: direction > 0 ? 220 : -220, opacity: 0, rotate: direction > 0 ? 8 : -8 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: direction > 0 ? -220 : 220, opacity: 0, rotate: direction > 0 ? -8 : 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -80) go(1)
              else if (info.offset.x > 80) go(-1)
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              onClick={() => setFlipped((f) => !f)}
            >
              <CardBack />
              <CardFront card={card} index={index} total={cards.length} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button
          type="button"
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center hover:border-ink transition-colors text-lg"
        >
          ‹
        </button>
        <span className="text-xs font-mono text-ink/40 tracking-widest">{index + 1} / {cards.length}</span>
        <button
          type="button"
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center hover:border-ink transition-colors text-lg"
        >
          ›
        </button>
      </div>
      <p className="mt-2 text-[10px] uppercase tracking-widest text-ink/30 font-mono sm:hidden">
        點擊翻牌・左右滑動切換
      </p>
      <p className="hidden sm:block mt-2 text-[10px] uppercase tracking-widest text-ink/30 font-mono">
        Click to flip · Drag to browse
      </p>

      <button
        type="button"
        onClick={onNext}
        className="mt-14 px-10 py-4 rounded-full border border-ink/30 text-xs uppercase tracking-[0.3em] font-mono hover:bg-ink hover:text-cream hover:border-ink transition-colors duration-500"
      >
        Share This Reading
      </button>
    </div>
  )
}
