import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { ensureGsap } from './lib/gsapSetup'
import { generateOracleReport, generateTopicDeck } from './data'
import AmbientBackground from './components/AmbientBackground'
import ZodiacOrbit from './components/ZodiacOrbit'
import Amphora from './components/Amphora'
import Opening from './scenes/Opening'
import ChooseSoul from './scenes/ChooseSoul'
import Calibration from './scenes/Calibration'
import Ritual from './scenes/Ritual'
import Report from './scenes/Report'
import Cards from './scenes/Cards'
import Share from './scenes/Share'

export default function App() {
  const [scene, setScene] = useState('opening')
  const [zodiac, setZodiac] = useState('')
  const [selections, setSelections] = useState({})
  const [report, setReport] = useState(null)
  const [topicDeck, setTopicDeck] = useState([])

  // Lenis smooth scroll, synced to GSAP's ScrollTrigger + ticker.
  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap()
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const update = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const { ScrollTrigger } = ensureGsap()
    ScrollTrigger.refresh()
  }, [scene])

  function handleCalibrationComplete(vals) {
    setSelections(vals)
    setScene('ritual')
  }

  function handleRitualDone() {
    const oracle = generateOracleReport({
      zodiac,
      mbti: selections.mbti,
      meetingType: selections.meetingType,
      environment: selections.environment,
    })
    setReport(oracle)
    setTopicDeck(
      generateTopicDeck({ zodiac, mbti: selections.mbti, purpose: selections.meetingType, energy: 'high' }),
    )
    setScene('report')
  }

  function handleRestart() {
    setScene('opening')
    setZodiac('')
    setSelections({})
    setReport(null)
    setTopicDeck([])
  }

  return (
    <div className="relative min-h-screen bg-cream text-ink overflow-x-hidden">
      <AmbientBackground />
      <ZodiacOrbit />
      <Amphora />

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="relative"
          style={{ zIndex: 10 }}
        >
          {scene === 'opening' && <Opening onEnter={() => setScene('chooseSoul')} />}

          {scene === 'chooseSoul' && (
            <ChooseSoul value={zodiac} onChange={setZodiac} onNext={() => setScene('calibration')} />
          )}

          {scene === 'calibration' && <Calibration onComplete={handleCalibrationComplete} />}

          {scene === 'ritual' && <Ritual onDone={handleRitualDone} />}

          {scene === 'report' && report && <Report report={report} onNext={() => setScene('cards')} />}

          {scene === 'cards' && <Cards cards={topicDeck} onNext={() => setScene('share')} />}

          {scene === 'share' && report && <Share report={report} onRestart={handleRestart} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
