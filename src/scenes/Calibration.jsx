import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MBTIS, MEETING_TYPES, ENVIRONMENTS_V2 } from '../data'

const STEPS = ['mbti', 'type', 'env']

export default function Calibration({ onComplete }) {
  const [step, setStep] = useState(0)
  const [mbti, setMbti] = useState('')
  const [meetingType, setMeetingType] = useState('')
  const [environment, setEnvironment] = useState('')

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1)
    else onComplete({ mbti, meetingType, environment })
  }
  function back() {
    if (step > 0) setStep((s) => s - 1)
  }

  const blocked = (step === 1 && !meetingType) || (step === 2 && !environment)

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <p className="text-[10px] uppercase tracking-[0.35em] text-ink/40 font-mono mb-10">
        Step {String(step + 2).padStart(2, '0')} — Intention Calibration
      </p>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="mbti"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md text-center"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">Do you know their personality code?</h2>
            <p className="text-xs text-ink/40 mb-10">MBTI（非必填，不知道可以跳過）</p>
            <div className="grid grid-cols-4 gap-2">
              {MBTIS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMbti(mbti === m ? '' : m)}
                  className={`py-2.5 rounded-full border text-xs font-mono tracking-wide transition-colors ${
                    mbti === m ? 'bg-ink text-cream border-ink' : 'border-ink/20 text-ink hover:border-ink/60'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="type"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md text-center"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">What kind of meeting awaits?</h2>
            <p className="text-xs text-ink/40 mb-10">選擇見面的性質</p>
            <div className="flex flex-col gap-3">
              {MEETING_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setMeetingType(t.id)}
                  className={`px-6 py-4 rounded-2xl border text-left transition-colors ${
                    meetingType === t.id ? 'bg-ink text-cream border-ink' : 'border-ink/20 hover:border-ink/60'
                  }`}
                >
                  <span className="font-serif text-lg block">{t.label}</span>
                  <span
                    className={`text-[10px] uppercase tracking-widest font-mono ${
                      meetingType === t.id ? 'text-cream/50' : 'text-ink/40'
                    }`}
                  >
                    {t.title} · {t.hint}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="env"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md text-center"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">Where will your story happen?</h2>
            <p className="text-xs text-ink/40 mb-10">選擇見面環境</p>
            <div className="flex flex-wrap justify-center gap-3">
              {ENVIRONMENTS_V2.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setEnvironment(e.id)}
                  className={`px-6 py-3 rounded-full border text-sm font-serif transition-colors ${
                    environment === e.id ? 'bg-ink text-cream border-ink' : 'border-ink/20 hover:border-ink/60'
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 mt-14">
        {step > 0 && (
          <button type="button" onClick={back} className="text-xs uppercase tracking-widest text-ink/40 hover:text-ink font-mono">
            ← Back
          </button>
        )}
        <motion.button
          type="button"
          onClick={next}
          disabled={blocked}
          whileHover={!blocked ? { scale: 1.05 } : {}}
          className={`px-10 py-4 rounded-full border text-xs uppercase tracking-[0.3em] font-mono transition-colors duration-500 ${
            blocked ? 'border-ink/10 text-ink/20 cursor-not-allowed' : 'border-ink/30 hover:bg-ink hover:text-cream hover:border-ink'
          }`}
        >
          {step === STEPS.length - 1 ? 'Reveal My Sign' : 'Continue'}
        </motion.button>
      </div>
    </div>
  )
}
