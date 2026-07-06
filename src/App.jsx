import { useMemo, useRef, useState } from 'react'
import {
  ZODIACS,
  MBTIS,
  PURPOSES,
  ENVIRONMENTS,
  ENERGIES,
  computeCompatibility,
  pickTopics,
  getForbiddenTopic,
  analyzeScreenshot,
  getRescueLine,
} from './data'

function Marker({ children }) {
  return (
    <span className="font-serif text-2xl md:text-3xl text-ink/80 select-none">{children}</span>
  )
}

function SectionLabel({ marker, title, sub }) {
  return (
    <div className="md:col-span-3">
      <Marker>{marker}</Marker>
      <h2 className="font-serif text-xl md:text-2xl mt-2">{title}</h2>
      <p className="text-[11px] uppercase tracking-[0.15em] text-ink/45 mt-2">{sub}</p>
    </div>
  )
}

function FieldSelect({ label, value, onChange, options, getLabel = (o) => o, getValue = (o) => o }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.15em] text-ink/50">{label}</span>
      <div className="relative mt-2 border-b border-sand focus-within:border-ink transition-colors">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent py-2 pr-6 text-base text-ink outline-none cursor-pointer"
        >
          <option value="" disabled>
            請選擇...
          </option>
          {options.map((o) => (
            <option key={getValue(o)} value={getValue(o)}>
              {getLabel(o)}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-ink/40 text-xs">▾</span>
      </div>
    </label>
  )
}

function PillGroup({ label, value, onChange, options }) {
  return (
    <div>
      <span className="text-[11px] uppercase tracking-[0.15em] text-ink/50">{label}</span>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {options.map((o) => {
          const active = value === o.id
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              className={`px-4 py-2 border text-sm transition-all duration-300 ${
                active
                  ? 'bg-ink text-cream border-ink'
                  : 'bg-transparent text-ink border-sand hover:border-ink/60'
              }`}
            >
              <span>{o.label}</span>
              {o.hint && (
                <span className={`ml-1.5 text-xs ${active ? 'text-cream/60' : 'text-ink/40'}`}>
                  {o.hint}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ScoreBar({ label, value, delay }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs uppercase tracking-[0.15em] text-ink/55">{label}</span>
        <span className="font-serif text-lg">{value}%</span>
      </div>
      <div className="h-[3px] bg-sand/70 w-full overflow-hidden">
        <div
          className="h-full bg-ink transition-all ease-out"
          style={{ width: `${value}%`, transitionDuration: '900ms', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  )
}

const PERSON_DEFAULT = { zodiac: '', mbti: '' }

export default function App() {
  const [me, setMe] = useState(PERSON_DEFAULT)
  const [other, setOther] = useState(PERSON_DEFAULT)
  const [purpose, setPurpose] = useState('')
  const [environment, setEnvironment] = useState('')
  const [energy, setEnergy] = useState('')

  const [dragOver, setDragOver] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [scores, setScores] = useState(null)
  const fileInputRef = useRef(null)

  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const resultRef = useRef(null)

  const canGenerate = me.zodiac && me.mbti && other.zodiac && other.mbti && purpose && environment && energy

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

  function generate() {
    if (!canGenerate) return
    const compat = computeCompatibility({
      myZodiac: me.zodiac,
      otherZodiac: other.zodiac,
      myMbti: me.mbti,
      otherMbti: other.mbti,
    })
    const topics = pickTopics({ purpose, environment, energy })
    const forbidden = getForbiddenTopic(purpose)
    const rescue = getRescueLine(scores ? scores.freezeRate : 50)

    setResult({ compat, topics, forbidden, rescue })
    setShowResult(false)
    requestAnimationFrame(() => {
      setShowResult(true)
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const zodiacLabel = (id) => ZODIACS.find((z) => z.id === id)?.label ?? ''

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-10">
        <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-ink/50 mb-8">
          <span>Cosmic Vibe Check</span>
          <span>V.02 — Field Guide</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.15]">
          星曜人格
          <span className="text-ink/35 mx-2 md:mx-3">・</span>
          網友見面破冰指南
        </h1>
        <p className="mt-5 text-sm md:text-base text-ink/60 max-w-2xl leading-relaxed">
          輸入雙方的星座與 MBTI，設定今天見面的目的、環境與能量，我們會依照你的實際場景，
          生成專屬的破冰話題、急救開場白，以及一個絕對不能踩的地雷。
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 border-t border-sand">
        {/* Section A */}
        <section className="border-b border-sand py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <SectionLabel marker="A." title="基礎人格輸入" sub="Base Personality Input" />
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.15em] text-ink/40">我</p>
              <FieldSelect
                label="我的星座"
                value={me.zodiac}
                onChange={(v) => setMe((s) => ({ ...s, zodiac: v }))}
                options={ZODIACS}
                getLabel={(o) => o.label}
                getValue={(o) => o.id}
              />
              <FieldSelect
                label="我的 MBTI"
                value={me.mbti}
                onChange={(v) => setMe((s) => ({ ...s, mbti: v }))}
                options={MBTIS}
              />
            </div>
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.15em] text-ink/40">對方</p>
              <FieldSelect
                label="對方的星座"
                value={other.zodiac}
                onChange={(v) => setOther((s) => ({ ...s, zodiac: v }))}
                options={ZODIACS}
                getLabel={(o) => o.label}
                getValue={(o) => o.id}
              />
              <FieldSelect
                label="對方的 MBTI"
                value={other.mbti}
                onChange={(v) => setOther((s) => ({ ...s, mbti: v }))}
                options={MBTIS}
              />
            </div>
          </div>
        </section>

        {/* Section B */}
        <section className="border-b border-sand py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <SectionLabel marker="B." title="見面場景設定" sub="Context-Driven Filters" />
          <div className="md:col-span-9 space-y-8">
            <PillGroup label="見面目的" value={purpose} onChange={setPurpose} options={PURPOSES} />
            <PillGroup label="物理環境" value={environment} onChange={setEnvironment} options={ENVIRONMENTS} />
            <PillGroup label="當下情緒能量" value={energy} onChange={setEnergy} options={ENERGIES} />
          </div>
        </section>

        {/* Section C */}
        <section className="border-b border-sand py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <SectionLabel marker="C." title="聊天截圖 Vibe 診斷室" sub="Chat Screenshot Analyzer" />
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
                dragOver ? 'border-ink bg-ink/[0.03]' : 'border-sand hover:border-ink/40'
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
                  <p className="mt-2 text-xs text-ink/45 uppercase tracking-[0.15em]">
                    Drag &amp; Drop Zone — JPG / PNG
                  </p>
                </div>
              )}
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="聊天截圖預覽"
                    className="w-full max-h-[320px] object-contain bg-ink/[0.02]"
                  />
                  {scanning && (
                    <div className="absolute inset-0 bg-ink/5 overflow-hidden">
                      <div className="absolute left-0 right-0 h-px bg-ink/70 shadow-[0_0_12px_2px_rgba(44,42,41,0.4)] animate-scanline" />
                      <div className="absolute bottom-3 left-0 right-0 text-center text-[11px] uppercase tracking-[0.2em] text-ink/70">
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
            onClick={generate}
            className={`px-10 py-3.5 font-serif text-lg tracking-wide transition-all duration-300 ${
              canGenerate
                ? 'bg-ink text-cream hover:opacity-90'
                : 'bg-transparent text-ink/30 border border-sand cursor-not-allowed'
            }`}
          >
            生成專屬破冰指南
          </button>
          {!canGenerate && (
            <p className="text-xs text-ink/40 uppercase tracking-[0.15em]">
              請完成 A、B 兩區塊的選擇（截圖為選填）
            </p>
          )}
        </section>
      </main>

      {result && (
        <section
          ref={resultRef}
          className={`max-w-5xl mx-auto px-6 pb-24 transition-all duration-700 ease-out ${
            showResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="border-t border-sand pt-12 mb-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-ink/45">Your Result</p>
          </div>

          {/* I. Compatibility */}
          <div className="border-b border-sand py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <SectionLabel marker="I." title="見面 Vibe 契合度" sub="Compatibility Score" />
            <div className="md:col-span-9">
              <p className="text-sm text-ink/50 mb-2">
                {zodiacLabel(me.zodiac)} · {me.mbti} 與 {zodiacLabel(other.zodiac)} · {other.mbti}
              </p>
              <div className="font-serif text-7xl md:text-8xl leading-none">{result.compat.score}%</div>
              <p className="mt-4 text-base text-ink/70 max-w-xl leading-relaxed">{result.compat.comment}</p>
            </div>
          </div>

          {/* II. Topics */}
          <div className="border-b border-sand py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <SectionLabel marker="II." title="安全破冰話題" sub="3 Safe Icebreakers" />
            <div className="md:col-span-9 space-y-0">
              {result.topics.map((t, i) => (
                <div
                  key={t}
                  className={`flex gap-4 py-4 ${i !== result.topics.length - 1 ? 'border-b border-sand/70' : ''}`}
                >
                  <span className="font-serif text-lg text-ink/40 w-6 shrink-0">{i + 1}.</span>
                  <p className="text-base leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* III. Rescue line */}
          <div className="border-b border-sand py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <SectionLabel marker="III." title="現場急救開場白" sub="Emergency Opening Line" />
            <div className="md:col-span-9">
              <p className="font-serif text-xl md:text-2xl italic leading-relaxed">“{result.rescue}”</p>
              {!scores && (
                <p className="mt-3 text-xs text-ink/40 uppercase tracking-[0.15em]">
                  未上傳截圖，此為通用建議 — 上傳截圖可取得更精準的急救台詞
                </p>
              )}
            </div>
          </div>

          {/* IV. Forbidden */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <SectionLabel marker="IV." title="地獄雷區話題" sub="Absolute No-Go Zone" />
            <div className="md:col-span-9">
              <div className="border border-ink/70 px-6 py-5">
                <p className="text-base leading-relaxed">{result.forbidden}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="max-w-5xl mx-auto px-6 py-10 border-t border-sand text-[11px] uppercase tracking-[0.2em] text-ink/35">
        Cosmic Vibe Check v2 — For internal UI/UX vibe coding demo
      </footer>
    </div>
  )
}
