// src/App.jsx

import { useState, useRef, useEffect } from 'react'
import {
  ZODIACS,
  MBTIS,
  PURPOSES,
  ENVIRONMENTS,
  ENERGIES,
  analyzeScreenshot,
  generateComprehensiveAnalysis,
} from './data'

const SIGN_BLUE = '#1D4ED8'

// Real deity photography slots in via `z.image` (see data.js) — until those assets are
// supplied this renders the monochrome zodiac glyph instead, so the grid never looks broken.
function VintageZodiacIcon({ z, active }) {
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = z.image && !imgFailed

  if (showImage) {
    return (
      <img
        src={z.image}
        alt={z.label}
        onError={() => setImgFailed(true)}
        className="w-16 h-16 object-cover rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.6),inset_-2px_-2px_6px_rgba(29,78,216,0.2)]"
      />
    )
  }

  return (
    <span
      className="block w-16 h-16 leading-[4rem] text-center font-serif text-4xl transition-all duration-700"
      style={{ color: active ? '#F6F3ED' : SIGN_BLUE }}
    >
      {z.symbol}
    </span>
  )
}

function StarField() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-40"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(29,78,216,0.3) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }}
    />
  )
}

function CornerMarks() {
  return (
    <>
      <span className="absolute -top-1.5 -left-1.5 text-[#1D4ED8]/50 text-sm leading-none select-none">+</span>
      <span className="absolute -top-1.5 -right-1.5 text-[#1D4ED8]/50 text-sm leading-none select-none">+</span>
      <span className="absolute -bottom-1.5 -left-1.5 text-[#1D4ED8]/50 text-sm leading-none select-none">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 text-[#1D4ED8]/50 text-sm leading-none select-none">+</span>
    </>
  )
}

function DividerOrnament() {
  return (
    <span className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] w-2 h-2 rotate-45 bg-cream border border-[#1D4ED8]/40" />
  )
}

function Dropdown({ label, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={rootRef} className="relative max-w-xs">
      {label && <span className="text-[10px] uppercase tracking-[0.2em] text-[#1D4ED8]/40 font-mono block mb-2">{label}</span>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between border border-[#1D4ED8]/25 bg-cream px-4 py-2.5 text-base text-[#1D4ED8] font-mono tracking-wider hover:border-[#1D4ED8]/60 transition-colors duration-300"
      >
        <span className={value ? '' : 'text-[#1D4ED8]/40'}>{value || placeholder}</span>
        <span className={`text-xs transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      <div
        className={`absolute z-20 mt-1 w-full max-h-64 overflow-y-auto bg-cream border border-[#1D4ED8]/30 shadow-[0_16px_32px_rgba(29,78,216,0.18)] transition-all duration-200 origin-top ${
          open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => { onChange(''); setOpen(false) }}
          className={`w-full text-left px-4 py-2 text-sm font-mono transition-colors duration-150 hover:bg-[#1D4ED8]/10 ${
            !value ? 'text-[#1D4ED8]/40' : 'text-[#1D4ED8]'
          }`}
        >
          {placeholder}
        </button>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => { onChange(o); setOpen(false) }}
            className={`w-full text-left px-4 py-2 text-sm font-mono transition-colors duration-150 hover:bg-[#1D4ED8]/10 ${
              value === o ? 'bg-[#1D4ED8]/10 font-semibold text-[#1D4ED8]' : 'text-[#1D4ED8]/80'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [targetZodiac, setTargetZodiac] = useState('')
  const [targetMbti, setTargetMbti] = useState('')
  const [purpose, setPurpose] = useState('')
  const [environment, setEnvironment] = useState('')
  const [energy, setEnergy] = useState('')

  const [dragOver, setDragOver] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [scores, setScores] = useState(null)
  const fileInputRef = useRef(null)

  const [currentView, setCurrentView] = useState('input')
  const [analysisResult, setAnalysisResult] = useState(null)

  const isIdentityProvided = targetZodiac || targetMbti;
  const isContextProvided = purpose && environment && energy;
  const canSubmit = isIdentityProvided && isContextProvided;

  function handleFileSelection(file) {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    setImagePreview(url)
    setScores(null)
    setScanning(true)
    window.setTimeout(() => {
      setScores(analyzeScreenshot(file))
      setScanning(false)
    }, 1600)
  }

  function executeAnalysis() {
    if (!canSubmit) return
    const result = generateComprehensiveAnalysis({
      zodiac: targetZodiac,
      mbti: targetMbti,
      purpose,
      environment,
      energy,
      screenshotScores: scores
    })
    setAnalysisResult(result)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentView('result')
  }

  const selectedZodiacData = ZODIACS.find(z => z.id === targetZodiac)

  return (
    <div className="relative min-h-screen bg-cream text-ink antialiased font-sans selection:bg-ink selection:text-cream overflow-x-hidden">
      <StarField />
      {/* 頂部高級網格版頭 */}
      <header className="relative max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-12 border-b border-sand/60">
        <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-ink/40 font-mono mb-8">
          <span>A.26 — CELESTIAL ALIGNMENT</span>
          <span>FIELD EMISSION — VERSION 2.0</span>
        </div>

        <div className="flex flex-col items-center text-center select-none my-8">
          <span className="text-[#1D4ED8]/50 text-lg mb-3">✦</span>
          <div className="flex items-center gap-4 w-full max-w-xs mb-6">
            <span className="h-px flex-1 bg-[#1D4ED8]/30" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#1D4ED8]/50" />
            <span className="h-px flex-1 bg-[#1D4ED8]/30" />
          </div>
          <h1
            className="font-['Cinzel'] font-black text-5xl sm:text-7xl md:text-9xl tracking-[0.05em] leading-none text-[#1D4ED8] [transform:scaleY(1.18)] [transform-origin:bottom] drop-shadow-[0_2px_0_rgba(29,78,216,0.15)]"
          >
            GOOD SIGN.
          </h1>
          <div className="flex items-center gap-4 w-full max-w-xs mt-7">
            <span className="h-px flex-1 bg-[#1D4ED8]/30" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#1D4ED8]/50" />
            <span className="h-px flex-1 bg-[#1D4ED8]/30" />
          </div>
        </div>

        <p className="text-xs md:text-sm text-ink/60 max-w-3xl mx-auto leading-relaxed text-center pt-6 border-t border-sand/40">
          傾聽古典黃道天體與當代人格科學的交織回響。
          我們摒棄冗餘的自身數據，專注於剖析目標對象隱匿於聊天對話框與物理環境背後的真實波長，
          為跨越虛擬與實體的靈魂，策展出一份具備極高心理學共情厚度 Bureau 的見面指南。
        </p>
      </header>

      {/* 視圖切換邏輯：第一頁 */}
      {currentView === 'input' && (
        <main className="max-w-6xl mx-auto px-6 pb-36 animate-fadeIn">
          {/* 區塊 I：神話星座古星圖寫實線條 */}
          <section className="relative py-14 border-b border-sand/60 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <DividerOrnament />
            <div className="lg:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-semibold tracking-wider">I.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-ink">目標神話星象</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1 font-mono">Zodiac Pantheons (Pick One)</p>
            </div>
            <div className="lg:col-span-9">
              {/* 💡 這裡將星座圖標外框變成藍色元件 ( strokeColor 已更新 ) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {ZODIACS.map((z) => {
                  const isSelected = targetZodiac === z.id;
                  return (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setTargetZodiac(isSelected ? '' : z.id)}
                      className={`group relative flex flex-col items-center p-6 border rounded-2xl transition-all duration-500 ease-out overflow-hidden ${
                        isSelected
                          ? 'bg-[#1D4ED8] text-cream border-[#1D4ED8] -translate-y-1 shadow-[0_16px_32px_-12px_rgba(29,78,216,0.45)]'
                          : 'bg-cream text-ink border-[#1D4ED8]/20 hover:-translate-y-1 hover:border-[#1D4ED8] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.7),inset_-3px_-3px_8px_rgba(29,78,216,0.1)]'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
                      {/* metallic shimmer sweep */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                      <div className="mb-2 transition-transform duration-700 group-hover:scale-110">
                        <VintageZodiacIcon z={z} active={isSelected} />
                      </div>

                      <span className="font-serif text-base tracking-wide mt-2">{z.label}</span>
                      <span className={`text-[9px] uppercase tracking-widest font-mono mt-1 ${isSelected ? 'text-cream/40' : 'text-ink/40'}`}>
                        {z.god.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 側寫展開面板 */}
              {selectedZodiacData && (
                <div className="relative mt-6 p-6 border border-sand bg-ink/[0.005] animate-fadeIn">
                  <CornerMarks />
                  <div className="flex items-baseline justify-between border-b border-sand/60 pb-3 mb-4">
                    <h3 className="font-serif text-lg text-ink font-medium">
                      {selectedZodiacData.label} · 守護天體側寫
                    </h3>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-ink/30">Mythological Blueprint</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs md:text-sm leading-relaxed text-ink/70">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">愛慾與浪漫 Aphrodite's Touch</span>
                      <p>{selectedZodiacData.traits?.aphrodite}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">神殿事業/修煉 Athena's Shield</span>
                      <p>{selectedZodiacData.traits?.athena}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">凡間社交/家庭 Hestia's Hearth</span>
                      <p>{selectedZodiacData.traits?.hestia}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">靈魂核心 Core Ego</span>
                      <p className="text-ink/90 font-medium">{selectedZodiacData.traits?.core}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 區塊 II：MBTI 獨立大項 */}
          <section className="relative py-14 border-b border-sand/60 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <DividerOrnament />
            <div className="lg:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-semibold tracking-wider">II.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-ink">人格矩陣代碼</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1 font-mono">MBTI Core Type (Optional)</p>
            </div>
            <div className="lg:col-span-9">
              <Dropdown
                value={targetMbti}
                onChange={setTargetMbti}
                options={MBTIS}
                placeholder="保留未知（純天體星象推演）"
              />
            </div>
          </section>

          {/* 區塊 III：場景控制項 */}
          <section className="relative py-14 border-b border-sand/60 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <DividerOrnament />
            <div className="lg:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-semibold tracking-wider">III.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-ink">場景脈絡校準</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1 font-mono">Context Parameters (Required)</p>
            </div>
            <div className="lg:col-span-9 space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-ink/40 block mb-3 font-mono">A. 見面意圖 Intention</span>
                <div className="flex flex-wrap gap-2">
                  {PURPOSES.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setPurpose(o.id)}
                      className={`px-4 py-2 border text-xs transition-all duration-300 ${
                        purpose === o.id ? 'bg-ink text-cream border-ink' : 'bg-transparent text-ink border-sand hover:border-ink/60'
                      }`}
                    >
                      {o.label} <span className="opacity-40 ml-1">({o.hint})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-ink/40 block mb-3 font-mono">B. 物理環境 Environment</span>
                <div className="flex flex-wrap gap-2">
                  {ENVIRONMENTS.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setEnvironment(o.id)}
                      className={`px-4 py-2 border text-xs transition-all duration-300 ${
                        environment === o.id ? 'bg-ink text-cream border-ink' : 'bg-transparent text-ink border-sand hover:border-ink/60'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-ink/40 block mb-3 font-mono">C. 當前心靈能量 Energy Level</span>
                <div className="flex flex-wrap gap-2">
                  {ENERGIES.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setEnergy(o.id)}
                      className={`px-4 py-2 border text-xs transition-all duration-300 ${
                        energy === o.id ? 'bg-ink text-cream border-ink' : 'bg-transparent text-ink border-sand hover:border-ink/60'
                      }`}
                    >
                      {o.label} <span className="opacity-40 ml-1">({o.hint})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 區塊 IV：截圖上傳 */}
          <section className="relative py-14 border-b border-sand/60 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <DividerOrnament />
            <div className="lg:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-semibold tracking-wider">IV.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-ink">對話波形診斷</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1 font-mono">Dating Telemetry (Optional)</p>
            </div>
            <div className="lg:col-span-9">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileSelection(e.dataTransfer.files?.[0]); }}
                onClick={() => fileInputRef.current?.click()}
                className={`relative overflow-hidden border border-dashed transition-all duration-300 text-center cursor-pointer ${
                  dragOver ? 'border-ink bg-ink/[0.01]' : 'border-sand hover:border-ink/40'
                } ${imagePreview ? 'py-4' : 'py-14'}`}
              >
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileSelection(e.target.files?.[0])} />
                {!imagePreview && (
                  <div className="px-6">
                    <p className="font-serif text-base text-ink/80">拖放或點擊上傳聊天紀錄截圖</p>
                    <p className="mt-1 text-[9px] text-ink/40 uppercase tracking-widest font-mono">Dating Signal Capture Zone — Optional</p>
                  </div>
                )}
                {imagePreview && (
                  <div className="relative inline-block max-w-full">
                    <img src={imagePreview} alt="Waveform" className="max-h-[160px] object-contain mx-auto bg-ink/[0.01]" />
                    {scanning && (
                      <div className="absolute inset-0 bg-cream/90 flex flex-col items-center justify-center">
                        <div className="w-full h-px bg-ink/40 absolute top-0 animate-scanline" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-ink/50">訊號波形解碼中...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 🚀 修正：元件恢復 Royal Blue色調 */}
          {/* 這裡設定了 class `cta-soul-analysis`，請參考 CSS 設定 */}
          <div className="pt-16 flex flex-col items-center">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={executeAnalysis}
              className={`px-16 py-4 font-serif text-lg tracking-widest border transition-all duration-500 cta-soul-analysis ${
                canSubmit
                  ? 'hover:opacity-90 shadow-md'
                  : 'bg-transparent text-ink/20 border-sand cursor-not-allowed'
              }`}
            >
              靈魂分析
            </button>
            {!canSubmit && (
              <p className="text-[9px] font-mono text-ink/40 uppercase tracking-widest mt-3">
                * 請至少填取一項身分識別（星座或 MBTI），並完成場景校準即可解鎖分析功能
              </p>
            )}
          </div>
        </main>
      )}

      {/* 視圖切換邏輯：第二頁 */}
      {currentView === 'result' && analysisResult && (
        <main className="max-w-4xl mx-auto px-6 pb-36 pt-12 animate-fadeIn">
          <button
            type="button"
            onClick={() => setCurrentView('input')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/50 hover:text-ink transition-colors font-mono mb-8 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> 返回上一步修改條件
          </button>

          <div className="border border-sand p-8 md:p-12 bg-ink/[0.005] relative">
            <CornerMarks />
            <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-sand/30 opacity-25 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-sand/60 pb-6 mb-8 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink/40 block mb-1">
                  Telemetric Calibration Report
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-ink font-medium">
                  {analysisResult.targetName} 社交觀測報告
                </h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink/40 block mb-1">
                  預測首次防冷場機率
                </span>
                <span className="font-serif text-4xl text-ink font-bold">
                  {analysisResult.survivalRate}%
                </span>
              </div>
            </div>

            {/* 大方向評估：完美保持大字體有襯線體 */}
            {/* 💡 所有標籤與描述也應該變成藍色 */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3 zodiac-desc">📍 氣場大方向評估 Assessment</h3>
              <p className="font-serif text-xl md:text-2xl leading-relaxed bg-cream p-6 border border-sand/40 font-normal zodiac-desc">
                {analysisResult.macroAssessment}
              </p>
            </div>

            {/* 深度話題庫 */}
            {/* 💡 所有標籤與描述也應該變成藍色 */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-4 zodiac-desc">💬 深度客製化破冰提案 Icebreakers</h3>
              <div className="space-y-6">
                {analysisResult.topics.map((topic, idx) => (
                  <div key={idx} className="border-l border-ink/40 pl-5 py-1">
                    <h4 className="font-serif text-lg text-ink font-medium zodiac-desc">
                      {idx + 1}. {topic.title}
                    </h4>
                    <p className="text-xs md:text-sm text-ink/60 mt-2 leading-relaxed font-sans zodiac-desc">
                      <span className="text-ink/80 font-medium bg-sand/20 px-1 py-0.5 mr-1 font-mono text-[11px] uppercase tracking-wider zodiac-desc">心理學機制</span> 
                      {topic.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 現場高難度急救台詞 */}
            {/* 💡 所有標籤與描述也應該變成藍色 */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3 zodiac-desc">⚡ 現場高難度急救台詞 Emergency</h3>
              <div className="bg-ink text-cream p-6 md:p-8 text-center relative shadow-sm">
                <p className="font-serif text-lg md:text-xl italic tracking-wide leading-relaxed">
                  “{analysisResult.rescueLine}”
                </p>
              </div>
            </div>

            {/* 地獄雷區 */}
            {/* 💡 所有標籤與描述也應該變成藍色 */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3 zodiac-desc">❌ 絕對禁忌地獄雷區 No-Go Zone</h3>
              <p className="text-xs md:text-sm text-red-600 leading-relaxed font-sans zodiac-desc">
                {analysisResult.forbidden}
              </p>
            </div>
          </div>
        </main>
      )}

      {/* 底部線條與雅致刻印 */}
      {/* 💡 底部線條也是藍色 */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-sand/60 text-[9px] font-mono uppercase tracking-[0.2em] text-ink/30 flex justify-between">
        <span>GOOD SIGN CO. ALL RIGHTS RESERVED.</span>
        <span>ATREUS PROTOCOL MATRIX 2026</span>
      </footer>
    </div>
  )
}
