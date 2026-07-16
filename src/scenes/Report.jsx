import { useEffect, useRef } from 'react'
import { ensureGsap } from '../lib/gsapSetup'
import { ZODIACS } from '../data'
import ZodiacStatue from '../components/ZodiacStatue'

export default function Report({ report, zodiac, onNext }) {
  const heroRef = useRef(null)
  const zInfo = ZODIACS.find((z) => z.id === zodiac)
  const chapterRefs = useRef([])

  useEffect(() => {
    const { gsap } = ensureGsap()
    gsap.fromTo(heroRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' })
    chapterRefs.current.forEach((el) => {
      if (!el) return
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: el, start: 'top 78%' } },
      )
    })
  }, [])

  const chapters = [
    { no: 'I', title: 'The First Impression', zh: '初次印象', text: report.firstImpression },
    { no: 'II', title: 'Hidden Frequency', zh: '隱藏頻率', text: report.hiddenFrequency },
    { no: 'III', title: 'Things To Avoid', zh: '絕對禁區', text: report.thingsToAvoid },
    {
      no: 'IV',
      title: 'Perfect Conversation Topics',
      zh: '最佳話題',
      text: '接下來翻開你的塔羅話題牌組，找到屬於這場見面的完美開場。',
    },
  ]

  return (
    <div className="relative">
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        {zInfo && (
          <div className="mb-6">
            <ZodiacStatue z={zInfo} size={132} />
          </div>
        )}
        <p className="text-[10px] uppercase tracking-[0.35em] text-ink/40 font-mono mb-6">
          Oracle Report — {report.targetName}
        </p>
        <p className="text-xs text-ink/40 uppercase tracking-widest font-mono mb-2">Compatibility</p>
        <div className="font-serif text-8xl sm:text-9xl text-[#1D4ED8]">{report.compatibility}%</div>
      </section>

      {chapters.map((c, i) => (
        <section
          key={c.no}
          ref={(el) => (chapterRefs.current[i] = el)}
          className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 max-w-2xl mx-auto"
        >
          <span className="font-serif text-4xl text-ink/20 mb-4">{c.no}</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-ink mb-1">{c.title}</h3>
          <p className="text-[10px] uppercase tracking-widest text-ink/40 font-mono mb-8">{c.zh}</p>
          <p className="text-base sm:text-lg text-ink/70 leading-relaxed">{c.text}</p>
        </section>
      ))}

      <div className="flex justify-center pb-24">
        <button
          type="button"
          onClick={onNext}
          className="px-10 py-4 rounded-full border border-ink/30 text-xs uppercase tracking-[0.3em] font-mono hover:bg-ink hover:text-cream hover:border-ink transition-colors duration-500"
        >
          Open Your Tarot Cards
        </button>
      </div>
    </div>
  )
}
