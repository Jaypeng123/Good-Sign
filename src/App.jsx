// src/App.jsx

import { useState, useRef } from 'react'
import {
  ZODIACS,
  MBTIS,
  PURPOSES,
  ENVIRONMENTS,
  ENERGIES,
  analyzeScreenshot,
  generateComprehensiveAnalysis,
} from './data'

// 高級希臘神話金屬質感與擬真石雕陰影的星座人像 SVG Cameo
function ZodiacCameo({ id, label, god, active, onClick }) {
  // 對應不同星座的幾何神話意象 SVG 路徑段落
  const getDeityPath = (zId) => {
    switch (zId) {
      case 'aries': return "M12 4 L20 12 L16 20 L8 20 L4 12 Z M12 8 L12 16";
      case 'taurus': return "M12 6 A 6 6 0 1 0 12 18 A 6 6 0 1 0 12 6 M6 6 Q12 12 18 6";
      case 'gemini': return "M6 4 L6 20 M18 4 L18 20 M4 4 L20 4 M4 20 L20 20 M12 6 L12 18";
      case 'cancer': return "M12 12 A 4 4 0 1 1 8 8 M12 12 A 4 4 0 1 0 16 16 M4 8 L20 16";
      case 'leo': return "M12 8 A 3 3 0 1 0 9 11 Q12 16 16 12 A 4 4 0 1 0 12 8";
      case 'virgo': return "M6 6 Q10 2 12 10 Q14 2 18 6 M12 10 L12 22 M8 14 L16 14";
      case 'libra': return "M4 16 L20 16 M12 4 L12 16 M6 8 L10 8 M14 8 L18 8 M12 4 Q12 2 12 4";
      case 'scorpio': return "M6 6 L6 16 Q6 20 10 20 L18 20 M14 16 L18 20 L14 24";
      case 'sagittarius': return "M4 20 L20 4 M12 4 L20 4 L20 12 M7 13 L13 19";
      case 'capricorn': return "M6 6 L12 18 L18 6 Q18 16 12 20 Q6 16 6 6";
      case 'aquarius': return "M4 8 Q8 4 12 8 T20 8 M4 14 Q8 10 12 14 T20 14";
      case 'pisces': return "M6 4 Q12 12 6 20 M18 4 Q12 12 18 20 M4 12 L20 12";
      default: return "M12 4 L20 20 L4 20 Z";
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-center p-5 border transition-all duration-500 ease-out ${
        active
          ? 'bg-ink text-cream border-ink shadow-[0_12px_24px_-8px_rgba(44,42,41,0.3)]'
          : 'bg-transparent text-ink border-sand hover:border-ink/60'
      }`}
      style={{
        boxShadow: active ? 'inset 0 0 20px rgba(255,255,255,0.05)' : 'none'
      }}
    >
      {/* 仿真希臘浮雕水銀金屬光澤濾鏡層 */}
      <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay`} />
      
      <div className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-500 ${
        active ? 'border-cream/30 bg-cream/10' : 'border-sand bg-ink/[0.02] group-hover:bg-ink/[0.05] group-hover:shadow-[inset_0_2px_8px_rgba(44,42,41,0.08)]'
      }`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-8 h-8 transition-transform duration-700 group-hover:rotate-[360deg] group-hover:scale-110 ${
            active ? 'text-cream' : 'text-ink/80'
          }`}
        >
          <path d={getDeityPath(id)} />
        </svg>
      </div>

      <span className="font-serif text-base mt-4 tracking-wide">{label}</span>
      <span className={`text-[10px] uppercase tracking-widest mt-1 ${active ? 'text-cream/50' : 'text-ink/40'}`}>
        {god.split(' ')[0]}
      </span>
    </button>
  )
}

export default function App() {
  // 表單核心狀態，移除自身輸入
  const [targetZodiac, setTargetZodiac] = useState('')
  const [targetMbti, setTargetMbti] = useState('')
  const [purpose, setPurpose] = useState('')
  const [environment, setEnvironment] = useState('')
  const [energy, setEnergy] = useState('')

  // 截圖狀態
  const [dragOver, setDragOver] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [scores, setScores] = useState(null)
  const fileInputRef = useRef(null)

  // 雙頁面切換控制控制 (View state)
  const [currentStep, setCurrentStep] = useState('input') // 'input' | 'result'
  const [finalReport, setFinalReport] = useState(null)

  // 驗證二擇一必填邏輯：星座或 MBTI 至少擇一，且情境必填
  const isZodiacOrMbtiFilled = targetZodiac || targetMbti
  const canAnalyze = soccerCondition()
  
  function soccerCondition() {
    return isZodiacOrMbtiFilled && purpose && environment && energy;
  }

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    setImagePreview(url)
    setScores(null)
    setScanning(true)
    window.setTimeout(() => {
      setScores(analyzeScreenshot(file))
      setScanning(false)
    }, 1800)
  }

  function startAnalysis() {
    if (!canAnalyze) return
    
    const report = generateComprehensiveAnalysis({
      zodiac: targetZodiac,
      mbti: targetMbti,
      purpose,
      environment,
      energy,
      screenshotScores: scores
    })

    setFinalReport(report)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep('result')
  }

  const selectedZodiacInfo = ZODIACS.find(z => z.id === targetZodiac)

  return (
    <div className="min-h-screen bg-cream text-ink antialiased selection:bg-ink selection:text-cream">
      {/* 頂部高級版頭排版，完美融入 Athens-26 語彙 */}
      <header className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-12 border-b border-sand/60">
        <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-ink/40 font-mono">
          <span>A.26 — ROMAN ACCENTS</span>
          <span>GOOD SIGN PROTOTYPE — V.02</span>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
          <h1 className="font-serif text-5xl md:text-7xl leading-none tracking-tight md:col-span-6 text-ink">
            GOOD SIGN.
          </h1>
          <p className="text-xs md:text-sm text-ink/60 md:col-span-6 font-sans leading-relaxed border-l-0 md:border-l border-sand/80 pl-0 md:pl-6">
            融合奧林帕斯神殿星象徵兆與現代特質，解譯交友軟體文字波動。
            透過精密的情境感知矩陣，為在溫潤砂岩與大理石間游移的靈魂，策展出最具洞察力的見面破冰指南。
          </p>
        </div>
      </header>

      {/* 視圖控制：輸入頁面 */}
      {currentStep === 'input' && (
        <main className="max-w-6xl mx-auto px-6 pb-32">
          {/* Section I: 星座浮雕選單 */}
          <section className="py-12 border-b border-sand/60 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-medium">I.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide">神話星象特徵</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1.5">Zodiac Pantheons (Optional)</p>
            </div>
            <div className="md:col-span-9">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {ZODIACS.map((z) => (
                  <ZodiacCameo
                    key={z.id}
                    id={z.id}
                    label={z.label}
                    god={z.god}
                    active={targetZodiac === z.id}
                    onClick={() => setTargetZodiac(targetZodiac === z.id ? '' : z.id)}
                  />
                ))}
              </div>

              {/* 互動式星座側寫展示面板 */}
              {selectedZodiacInfo && (
                <div className="mt-6 p-6 border border-sand bg-ink/[0.01] transition-all duration-500 animate-fadeIn">
                  <div className="flex items-baseline justify-between border-b border-sand/50 pb-3 mb-4">
                    <h3 className="font-serif text-lg text-ink flex items-center gap-2">
                      <span>{selectedZodiacInfo.label}</span>
                      <span className="text-xs font-sans text-ink/50 uppercase tracking-widest bg-sand/30 px-2 py-0.5">
                        {selectedZodiacInfo.trait}
                      </span>
                    </h3>
                    <span className="text-xs text-ink/40 font-serif italic">Curated Insight</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm leading-relaxed">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">愛慾與浪漫 Aphrodite</span>
                      <p className="text-ink/70">注重心靈平衡。一旦感受到不對等便會優雅退場，極度需要和諧的交流對頻。</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">神殿事業 Athena's Shield</span>
                      <p className="text-ink/70">理性克制，害怕衝突，在群體協調中常扮演冷靜的仲裁者與美感把關者。</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">凡間社交 Hestia</span>
                      <p className="text-ink/70">私底下具有令人驚訝的傲嬌反差，習慣隱藏內心的真實渴望來維持大局和諧。</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">靈魂核心 Core Ego</span>
                      <p className="text-ink/80 font-medium">死穴是被貼上偏心或不公的標籤，寧願委屈自己也不願打破表面的平靜美感。</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section II: MBTI Standalone Major Section */}
          <section className="py-12 border-b border-sand/60 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-medium">II.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide">人格矩陣代碼</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1.5">MBTI Core Type (Optional)</p>
            </div>
            <div className="md:col-span-9">
              <p className="text-xs text-ink/50 mb-4 leading-relaxed max-w-xl">
                MBTI 為非必填項目。若對方尚未向你透露這層密碼，本平台將純粹仰賴古典星象天體軌道進行推演。
                若兩者皆備，分析矩陣將能融合科學與神祕學，為對話訊號進行雙重加權。
              </p>
              <div className="relative border-b border-sand focus-within:border-ink max-w-xs transition-colors">
                <select
                  value={targetMbti}
                  onChange={(e) => setTargetMbti(e.target.value)}
                  className="w-full appearance-none bg-transparent py-2.5 pr-8 text-base text-ink outline-none cursor-pointer font-mono tracking-wider"
                >
                  <option value="">保留未知（純星象推演）</option>
                  {MBTIS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-ink/40 text-xs">▾</span>
              </div>
            </div>
          </section>

          {/* Section III: Context Controls */}
          <section className="py-12 border-b border-sand/60 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-medium">III.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide">場景脈絡調諧</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1.5">Context Parameters (Required)</p>
            </div>
            <div className="md:col-span-9 space-y-8">
              {/* 各場景選擇按鈕組 */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-ink/40 block mb-3 font-mono">A. 見面意圖 Purpose</span>
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
                <span className="text-[10px] uppercase tracking-[0.15em] text-ink/40 block mb-3 font-mono">C. 靈魂能量流動 Energy</span>
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

          {/* Section IV: Optional Screenshot Upload */}
          <section className="py-12 border-b border-sand/60 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-medium">IV.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide">對話波形擷取</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1.5">Screenshot Telemetry (Optional)</p>
            </div>
            <div className="md:col-span-9">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]); }}
                onClick={() => fileInputRef.current?.click()}
                className={`relative overflow-hidden border border-dashed cursor-pointer transition-all duration-300 text-center ${
                  dragOver ? 'border-ink bg-ink/[0.02]' : 'border-sand hover:border-ink/40'
                } ${imagePreview ? 'py-4' : 'py-12'}`}
              >
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
                {!imagePreview && (
                  <div className="px-4">
                    <p className="font-serif text-base">拖放或點擊上傳聊天紀錄截圖</p>
                    <p className="mt-1 text-[9px] text-ink/40 uppercase tracking-widest font-mono">Dating Telemetry Zone — Optional</p>
                  </div>
                )}
                {imagePreview && (
                  <div className="relative inline-block max-w-full">
                    <img src={imagePreview} alt="Telemetry" className="max-h-[180px] object-contain mx-auto bg-ink/[0.01]" />
                    {scanning && (
                      <div className="absolute inset-0 bg-cream/80 flex flex-col items-center justify-center">
                        <div className="w-full h-px bg-ink/40 absolute top-0 animate-scanline" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-ink/60">波形同步中...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {scores && !scanning && (
                <div className="mt-4 text-xs font-mono text-ink/60 flex gap-6">
                  <span>[冷場頻率: {scores.freezeRate}%]</span>
                  <span>[對話對等: {scores.balanceScore}%]</span>
                  <span>[潛在氣場: {scores.auraLevel}%]</span>
                </div>
              )}
            </div>
          </section>

          {/* Action Trigger */}
          <div className="pt-16 flex flex-col items-center">
            <button
              type="button"
              disabled={!canAnalyze}
              onClick={startAnalysis}
              className={`px-12 py-4 font-serif text-lg tracking-widest border transition-all duration-500 ${
                canAnalyze
                  ? 'bg-ink text-cream border-ink hover:opacity-90 shadow-lg'
                  : 'bg-transparent text-ink/20 border-sand cursor-not-allowed'
              }`}
            >
              開啟靈魂分析
            </button>
            {!canAnalyze && (
              <p className="text-[10px] font-mono text-ink/40 uppercase tracking-widest mt-3">
                * 請至少選取一項星座或 MBTI，並完成場景調諧
              </p>
            )}
          </div>
        </main>
      )}

      {/* 視圖控制：獨立分析結果頁面 */}
      {currentStep === 'result' && finalReport && (
        <main className="max-w-4xl mx-auto px-6 pb-32 pt-12 animate-fadeIn">
          {/* 返回上一步 */}
          <button
            type="button"
            onClick={() => setCurrentStep('input')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/50 hover:text-ink transition-colors font-mono mb-8"
          >
            ← 返回上一步修改條件
          </button>

          <div className="border border-sand p-8 bg-ink/[0.005] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-sand/40 opacity-20 pointer-events-none" />
            
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink/40 block mb-2">
              Telemetric Prediction Report
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink border-b border-sand/60 pb-4 mb-6">
              關於 {finalReport.targetName} 的對頻報告
            </h2>

            {/* 1. 大方向評估 */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">📍 氣場大方向評估Assessment</h3>
              <p className="text-base text-ink/80 leading-relaxed font-sans bg-cream p-5 border border-sand/40">
                {finalReport.macroAssessment}
              </p>
            </div>

            {/* 2. 深度話題庫（含心理原因剖析） */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">💬 深度客製化破冰提案 Icebreakers</h3>
              <div className="space-y-4">
                {finalReport.topics.map((topic, idx) => (
                  <div key={idx} className="border-l-2 border-ink pl-4 py-1">
                    <h4 className="font-serif text-lg text-ink font-medium">{idx + 1}. {topic.title}</h4>
                    <p className="text-sm text-ink/60 mt-1.5 leading-relaxed font-sans">
                      <strong className="text-ink/80 font-medium">背後心理學原由：</strong>{topic.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. 現場急救開場白 */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">⚡ 現場高難度急救台詞 Emergency</h3>
              <div className="bg-ink text-cream p-6 text-center">
                <p className="font-serif text-xl italic tracking-wide">“{finalReport.rescueLine}”</p>
              </div>
            </div>

            {/* 4. 地獄雷區 */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">❌ 絕對禁忌地獄雷區 No-Go Zone</h3>
              <p className="text-sm text-red-800 bg-red-50/40 border border-red-200/50 p-4 leading-relaxed font-sans">
                {finalReport.forbidden}
              </p>
            </div>
          </div>
        </main>
      )}

      {/* 底部線條與銘文 */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-sand/60 text-[10px] font-mono uppercase tracking-[0.2em] text-ink/30 flex justify-between">
        <span>GOOD SIGN CO. ALL RIGHTS RESERVED.</span>
        <span>ATREUS PROTOCOL 2026</span>
      </footer>
    </div>
  )
}
