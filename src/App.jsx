import { useEffect, useRef, useState } from 'react'
import {
  ZODIACS,
  MBTIS,
  AGE_VIBES,
  CHAT_STYLES,
  getZodiacTraits,
  computeSignal,
  pickTopics,
  getForbiddenTopic,
  analyzeScreenshot,
  getRescueLine,
} from './data'

const BLUE = '#1D4ED8'

function Marker({ children }) {
  return <span className="font-serif text-2xl md:text-3xl text-[#1D4ED8] select-none">{children}</span>
}

function SectionLabel({ marker, title, sub }) {
  return (
    <div className="md:col-span-3">
      <Marker>{marker}</Marker>
      <h2 className="font-serif text-xl md:text-2xl mt-2 text-[#1D4ED8]">{title}</h2>
      <p className="text-[11px] uppercase tracking-[0.15em] text-[#1D4ED8]/45 mt-2">{sub}</p>
    </div>
  )
}

function FieldSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.15em] text-[#1D4ED8]/60">{label}</span>
      <div className="relative mt-2 border-b border-[#1D4ED8]/25 focus-within:border-[#1D4ED8] transition-colors">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent py-2 pr-6 text-base text-[#1D4ED8] outline-none cursor-pointer"
        >
          <option value="">不指定</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[#1D4ED8]/40 text-xs">▾</span>
      </div>
    </label>
  )
}

function TraitRow({ marker, title, sub, text }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-4 border-b border-[#1D4ED8]/15 last:border-b-0">
      <div className="sm:col-span-4">
        <span className="font-serif text-lg text-[#1D4ED8]">{marker}</span>{' '}
        <span className="font-serif text-lg text-[#1D4ED8]">{title}</span>
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#1D4ED8]/45 mt-1">{sub}</p>
      </div>
      <p className="sm:col-span-8 text-sm md:text-base text-[#1D4ED8]/80 leading-relaxed">{text}</p>
    </div>
  )
}

function ZodiacInsightPanel({ zodiac }) {
  const [visible, setVisible] = useState(false)
  const traits = getZodiacTraits(zodiac.id)

  useEffect(() => {
    setVisible(false)
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [zodiac.id])

  if (!traits) return null

  return (
    <div
      className={`mt-6 border border-[#1D4ED8]/25 bg-[#1D4ED8]/[0.03] px-5 md:px-8 py-6 transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-3xl font-serif text-[#1D4ED8]">{zodiac.symbol}</span>
        <div>
          <p className="font-serif text-xl text-[#1D4ED8]">{zodiac.label} 策展檔案</p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-[#1D4ED8]/45">Zodiac Characteristics Insight</p>
        </div>
      </div>
      <TraitRow marker="I." title="愛慾與浪漫" sub="Aphrodite's Touch" text={traits.aphrodite} />
      <TraitRow marker="II." title="神殿事業/修煉" sub="Athena's Shield" text={traits.athena} />
      <TraitRow marker="III." title="凡間社交/家庭" sub="Hestia's Hearth" text={traits.hestia} />
      <TraitRow marker="IV." title="靈魂核心" sub="Core Ego" text={traits.core} />
    </div>
  )
}

function ZodiacGrid({ value, onChange }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 md:gap-4">
      {ZODIACS.map((z) => {
        const active = value === z.id
        return (
          <button
            key={z.id}
            type="button"
            onClick={() => onChange(active ? '' : z.id)}
            className={`flex flex-col items-center justify-center gap-1 aspect-square rounded-2xl border transition-all duration-300 ${
              active
                ? 'bg-[#1D4ED8] border-[#1D4ED8] text-[#F6F3ED] -translate-y-1 shadow-[0_10px_24px_rgba(29,78,216,0.35)]'
                : 'bg-[#F6F3ED] border-[#1D4ED8]/20 text-[#1D4ED8] hover:-translate-y-1 hover:border-[#1D4ED8] hover:shadow-[0_10px_20px_rgba(29,78,216,0.18)]'
            } shadow-[inset_1px_1px_2px_rgba(255,255,255,0.7),inset_-3px_-3px_8px_rgba(29,78,216,0.12)]`}
          >
            <span className="text-2xl md:text-4xl font-serif leading-none">{z.symbol}</span>
            <span className="text-[9px] md:text-xs tracking-wide">{z.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function ScoreBar({ label, value, delay }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs uppercase tracking-[0.15em] text-[#1D4ED8]/55">{label}</span>
        <span className="font-serif text-lg text-[#1D4ED8]">{value}%</span>
      </div>
      <div className="h-[3px] bg-[#1D4ED8]/15 w-full overflow-hidden">
        <div
          className="h-full bg-[#1D4ED8] transition-all ease-out"
          style={{ width: `${value}%`, transitionDuration: '900ms', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  )
}

function InterrogationModal({ step, onAgeVibe, onChatStyle }) {
  if (!step) return null
  const isStepOne = step === 1
  const options = isStepOne ? AGE_VIBES : CHAT_STYLES
  const onPick = isStepOne ? onAgeVibe : onChatStyle

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#1D4ED8]/10 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#F6F3ED] border border-[#1D4ED8]/30 px-6 sm:px-10 py-10 shadow-[0_20px_60px_rgba(29,78,216,0.25)]">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#1D4ED8]/50 mb-2">
          AI 訊號調諧中 — Step {step} / 2
        </p>
        <h3 className="font-serif text-2xl text-[#1D4ED8] mb-8 leading-snug">
          {isStepOne
            ? '請選擇對方的物理年齡 Vibe？'
            : '對方的聊天頻率屬於？'}
        </h3>
        <div className="space-y-3">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => onPick(o.id)}
              className="w-full text-left px-5 py-4 border border-[#1D4ED8]/25 hover:border-[#1D4ED8] hover:bg-[#1D4ED8]/5 transition-all duration-300"
            >
              <span className="font-serif text-lg text-[#1D4ED8]">{o.label}</span>
              <span className="ml-2 text-xs text-[#1D4ED8]/50">{o.hint}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 flex gap-2">
          <span className={`h-1 flex-1 ${isStepOne ? 'bg-[#1D4ED8]' : 'bg-[#1D4ED8]/20'}`} />
          <span className={`h-1 flex-1 ${!isStepOne ? 'bg-[#1D4ED8]' : 'bg-[#1D4ED8]/20'}`} />
        </div>
      </div>
    </div>
  )
}

const TARGET_DEFAULT = { zodiac: '', mbti: '' }

export default function App() {
  const [target, setTarget] = useState(TARGET_DEFAULT)

  const [dragOver, setDragOver] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [scores, setScores] = useState(null)
  const fileInputRef = useRef(null)

  const [interrogationStep, setInterrogationStep] = useState(0)
  const [ageVibe, setAgeVibe] = useState('')

  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const resultRef = useRef(null)

  const selectedZodiac = ZODIACS.find((z) => z.id === target.zodiac) ?? null
  const canGenerate = Boolean(target.zodiac || target.mbti)

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    setImagePreview(url)
    setScores(null)
    setScanning(true)
    window.setTimeout(() => {
      setScores(analyzeScreenshot(file))
      setScanning(false)
    }, 2000)
  }

  function onDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    handleFile(file)
  }

  function openInterrogation() {
    if (!canGenerate) return
    setInterrogationStep(1)
  }

  function handleAgeVibeChoice(id) {
    setAgeVibe(id)
    setInterrogationStep(2)
  }

  function handleChatStyleChoice(chatStyle) {
    const signal = computeSignal({
      zodiacId: target.zodiac,
      mbti: target.mbti,
      ageVibe,
      chatStyle,
      scores,
    })
    const topics = pickTopics({ zodiacId: target.zodiac, ageVibe, chatStyle })
    const forbidden = getForbiddenTopic(target.zodiac)
    const rescue = getRescueLine({ chatStyle, ageVibe, scores })

    setResult({ signal, topics, forbidden, rescue, chatStyle, ageVibe })
    setInterrogationStep(0)
    setShowResult(false)
    requestAnimationFrame(() => {
      setShowResult(true)
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const ageVibeLabel = (id) => AGE_VIBES.find((a) => a.id === id)?.label ?? ''
  const chatStyleLabel = (id) => CHAT_STYLES.find((c) => c.id === id)?.label ?? ''

  return (
    <div className="min-h-screen bg-[#F6F3ED] text-[#1D4ED8]">
      <header className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-10">
        <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-[#1D4ED8]/50 mb-8">
          <span>Cosmic Field Guide</span>
          <span>Athens 2026 Edition</span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] tracking-tight">GOOD SIGN.</h1>
        <p className="mt-5 text-sm md:text-base text-[#1D4ED8]/60 max-w-2xl leading-relaxed">
          鎖定目標對象的星座或 MBTI（擇一即可，兩者皆填分析更精準），選填聊天截圖，
          再回答兩題 AI 訊號調諧問題，取得專屬這個人的破冰遙測報告。
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 border-t border-[#1D4ED8]/15">
        {/* Section A */}
        <section className="border-b border-[#1D4ED8]/15 py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <SectionLabel marker="A." title="目標對象特徵" sub="Target Signature — pick one, or both" />
          <div className="md:col-span-9">
            <ZodiacGrid value={target.zodiac} onChange={(id) => setTarget((t) => ({ ...t, zodiac: id }))} />

            {selectedZodiac && <ZodiacInsightPanel zodiac={selectedZodiac} />}

            <div className="mt-8 max-w-xs">
              <FieldSelect
                label="對方的 MBTI（非必填）"
                value={target.mbti}
                onChange={(v) => setTarget((t) => ({ ...t, mbti: v }))}
                options={MBTIS}
              />
            </div>
            <p className="mt-4 text-xs text-[#1D4ED8]/45 uppercase tracking-[0.15em]">
              星座與 MBTI 至少擇一即可解鎖生成，兩者皆填分析更精準
            </p>
          </div>
        </section>

        {/* Section B */}
        <section className="border-b border-[#1D4ED8]/15 py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <SectionLabel marker="B." title="聊天截圖 Vibe 診斷室" sub="Chat Screenshot Analyzer — optional" />
          <div className="md:col-span-9">
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative overflow-hidden border border-dashed cursor-pointer transition-colors duration-300 ${
                dragOver ? 'border-[#1D4ED8] bg-[#1D4ED8]/[0.04]' : 'border-[#1D4ED8]/25 hover:border-[#1D4ED8]/60'
              } ${imagePreview ? 'min-h-[220px]' : 'py-16'}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              {!imagePreview && (
                <div className="text-center px-6">
                  <p className="font-serif text-lg">拖放或點擊上傳聊天截圖</p>
                  <p className="mt-2 text-xs text-[#1D4ED8]/45 uppercase tracking-[0.15em]">
                    Drag &amp; Drop Zone — JPG / PNG
                  </p>
                </div>
              )}
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="聊天截圖預覽"
                    className="w-full max-h-[320px] object-contain bg-[#1D4ED8]/[0.03]"
                  />
                  {scanning && (
                    <div className="absolute inset-0 bg-[#1D4ED8]/5 overflow-hidden">
                      <div className="absolute left-0 right-0 h-px bg-[#1D4ED8]/70 shadow-[0_0_12px_2px_rgba(29,78,216,0.4)] animate-[scanline_1.6s_ease-in-out_infinite_alternate]" />
                      <div className="absolute bottom-3 left-0 right-0 text-center text-[11px] uppercase tracking-[0.2em] text-[#1D4ED8]/70">
                        Analyzing Vibe Signals…
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {scores && !scanning && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <ScoreBar label="冷場指數 Freeze Rate" value={scores.freezeRate} delay={0} />
                <ScoreBar label="回覆對等度 Balance Score" value={scores.balanceScore} delay={120} />
                <ScoreBar label="曖昧熱度 Aura Level" value={scores.auraLevel} delay={240} />
              </div>
            )}
          </div>
        </section>

        {/* Generate */}
        <section className="py-12 flex flex-col items-center gap-4">
          <button
            type="button"
            disabled={!canGenerate}
            onClick={openInterrogation}
            className={`px-10 py-3.5 font-serif text-lg tracking-wide transition-all duration-300 ${
              canGenerate
                ? 'bg-[#1D4ED8] text-[#F6F3ED] hover:opacity-90'
                : 'bg-transparent text-[#1D4ED8]/30 border border-[#1D4ED8]/25 cursor-not-allowed'
            }`}
          >
            生成專屬破冰指南
          </button>
          {!canGenerate && (
            <p className="text-xs text-[#1D4ED8]/40 uppercase tracking-[0.15em]">
              請先選擇目標對象的星座或 MBTI（截圖為選填）
            </p>
          )}
        </section>
      </main>

      <InterrogationModal
        step={interrogationStep}
        onAgeVibe={handleAgeVibeChoice}
        onChatStyle={handleChatStyleChoice}
      />

      {result && (
        <section
          ref={resultRef}
          className={`max-w-5xl mx-auto px-6 pb-24 transition-all duration-700 ease-out ${
            showResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="border-t border-[#1D4ED8]/15 pt-12 mb-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#1D4ED8]/45">Good Sign 遙測報告</p>
          </div>

          {/* I. Signal */}
          <div className="border-b border-[#1D4ED8]/15 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <SectionLabel marker="I." title="訊號強度" sub="Signal Score" />
            <div className="md:col-span-9">
              <p className="text-sm text-[#1D4ED8]/50 mb-2">
                {selectedZodiac ? selectedZodiac.label : '未指定星座'}
                {target.mbti ? ` · ${target.mbti}` : ''} · {ageVibeLabel(result.ageVibe)} ·{' '}
                {chatStyleLabel(result.chatStyle)}
              </p>
              <div className="font-serif text-7xl md:text-8xl leading-none">{result.signal.score}%</div>
              <p className="mt-4 text-base text-[#1D4ED8]/70 max-w-xl leading-relaxed">{result.signal.comment}</p>
            </div>
          </div>

          {/* II. Topics */}
          <div className="border-b border-[#1D4ED8]/15 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <SectionLabel marker="II." title="安全破冰話題" sub="3 Safe Icebreakers" />
            <div className="md:col-span-9 space-y-0">
              {result.topics.map((t, i) => (
                <div
                  key={t}
                  className={`flex gap-4 py-4 ${
                    i !== result.topics.length - 1 ? 'border-b border-[#1D4ED8]/10' : ''
                  }`}
                >
                  <span className="font-serif text-lg text-[#1D4ED8]/40 w-6 shrink-0">{i + 1}.</span>
                  <p className="text-base leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* III. Rescue line */}
          <div className="border-b border-[#1D4ED8]/15 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <SectionLabel marker="III." title="現場急救開場白" sub="Emergency Opening Line" />
            <div className="md:col-span-9">
              <p className="font-serif text-xl md:text-2xl italic leading-relaxed">“{result.rescue}”</p>
            </div>
          </div>

          {/* IV. Forbidden */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <SectionLabel marker="IV." title="地獄雷區話題" sub="Absolute No-Go Zone" />
            <div className="md:col-span-9">
              <div className="border border-[#1D4ED8]/70 px-6 py-5">
                <p className="text-base leading-relaxed">{result.forbidden}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="max-w-5xl mx-auto px-6 py-10 border-t border-[#1D4ED8]/15 text-[11px] uppercase tracking-[0.2em] text-[#1D4ED8]/35">
        Good Sign — Athens 2026 Curated Field Guide
      </footer>
    </div>
  )
}
