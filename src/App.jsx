import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { ensureGsap } from './lib/gsapSetup'
import { generateOracleReport, generateTopicDeck, localScreenshotSignal } from './data'
import { generateOracleReportAI, analyzeScreenshotAI } from './lib/gemini'
import AmbientBackground from './components/AmbientBackground'
import ZodiacOrbit from './components/ZodiacOrbit'
import Amphora from './components/Amphora'
import GreekMeander from './components/GreekMeander'
import Opening from './scenes/Opening'
import ChooseSoul from './scenes/ChooseSoul'
import Profiles from './scenes/Profiles'
import Ritual from './scenes/Ritual'
import Report from './scenes/Report'
import Cards from './scenes/Cards'
import Chat from './scenes/Chat'
import Share from './scenes/Share'

// Scenes where the decorative chrome (orbit wheel + amphora) steps back so the
// reveal reads as its own dedicated realm, distinct from the "GOOD SIGN" ritual shell.
const CHROME_HIDDEN_SCENES = new Set(['report', 'cards', 'chat', 'share'])

export default function App() {
  const [scene, setScene] = useState('opening')
  const [profile, setProfile] = useState({ you: {}, target: {}, meetingType: '', environment: '' })
  const [report, setReport] = useState(null)
  const [topicDeck, setTopicDeck] = useState([])
  const pendingResult = useRef(null)

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

  function handleTargetChosen(zodiac) {
    setProfile((p) => ({ ...p, target: { ...p.target, zodiac } }))
  }

  async function handleProfilesComplete({ screenshotFile, ...vals }) {
    setProfile(vals)
    setScene('ritual')

    // Kick off report generation in parallel with the ritual animation —
    // Gemini first (if a key is configured), silently falling back to the
    // local weighted algorithm on missing key, network failure, or bad JSON.
    pendingResult.current = (async () => {
      let screenshotSignal = null
      if (screenshotFile) {
        screenshotSignal = (await analyzeScreenshotAI(screenshotFile)) ?? localScreenshotSignal(screenshotFile)
      }
      const payload = { ...vals, screenshotSignal }

      const aiReport = await generateOracleReportAI(payload)
      const localReport = generateOracleReport(payload)
      const deck = generateTopicDeck(payload)

      if (aiReport) {
        return {
          report: {
            targetName: localReport.targetName,
            godName: localReport.godName,
            compatibility: aiReport.survivalRate,
            firstImpression: aiReport.relationshipOverview,
            hiddenFrequency: localReport.hiddenFrequency,
            thingsToAvoid: localReport.thingsToAvoid,
            rescueLine: localReport.rescueLine,
          },
          deck: aiReport.cards.map((c, i) => ({ id: i, title: c.title, reason: c.reason, score: c.rate, avoidSaying: c.avoidSaying })),
        }
      }
      return { report: localReport, deck }
    })()
  }

  async function handleRitualDone() {
    const result = (await pendingResult.current) ?? {
      report: generateOracleReport(profile),
      deck: generateTopicDeck(profile),
    }
    setReport(result.report)
    setTopicDeck(result.deck)
    setScene('report')
  }

  function handleRestart() {
    setScene('opening')
    setProfile({ you: {}, target: {}, meetingType: '', environment: '' })
    setReport(null)
    setTopicDeck([])
  }

  const showChrome = !CHROME_HIDDEN_SCENES.has(scene)

  return (
    <div className="relative min-h-screen bg-cream text-ink overflow-x-hidden">
      <AmbientBackground />
      <GreekMeander />
      {showChrome && <ZodiacOrbit />}
      {showChrome && <Amphora />}

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
            <ChooseSoul value={profile.target.zodiac ?? ''} onChange={handleTargetChosen} onNext={() => setScene('profiles')} />
          )}

          {scene === 'profiles' && (
            <Profiles targetZodiac={profile.target.zodiac ?? ''} onComplete={handleProfilesComplete} />
          )}

          {scene === 'ritual' && <Ritual onDone={handleRitualDone} />}

          {scene === 'report' && report && (
            <Report report={report} zodiac={profile.target.zodiac} onNext={() => setScene('cards')} />
          )}

          {scene === 'cards' && <Cards cards={topicDeck} onNext={() => setScene('chat')} />}

          {scene === 'chat' && <Chat target={profile.target} onNext={() => setScene('share')} />}

          {scene === 'share' && report && <Share report={report} onRestart={handleRestart} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
