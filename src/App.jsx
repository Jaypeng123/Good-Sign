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

// 十七世紀銅板星圖風格寫實神話人像 SVG 組件
function VintageZodiacIcon({ id, active }) {
  const getDeityPath = (zId) => {
    switch (zId) {
      case 'aries': return "M25,55 Q35,35 55,38 Q65,40 75,32 Q82,25 78,42 Q74,55 60,60 Q45,62 30,70";
      case 'taurus': return "M75,55 Q60,40 45,45 Q35,48 25,35 Q18,25 32,28 Q42,32 55,25 Q68,18 70,38";
      case 'gemini': return "M38,30 C38,20 48,20 48,30 M58,35 C58,25 68,25 68,35";
      case 'cancer': return "M30,50 Q20,32 35,25 Q50,18 65,25 Q80,32 70,50 Q60,65 50,65 Q40,65 30,50 Z";
      case 'leo': return "M20,65 Q35,55 45,58 Q60,60 70,42 Q78,25 65,18 Q52,12 40,30 Q30,42 20,45";
      case 'virgo': return "M50,22 C50,15 42,15 42,22 C42,28 50,32 50,42 L46,82 M54,42 L58,82";
      case 'libra': return "M50,15 L50,75 M15,30 L85,30 M50,30 L50,25";
      case 'scorpio': return "M50,15 L50,60 Q50,78 30,75 Q15,72 25,62 L38,65";
      case 'sagittarius': return "M30,70 L70,30 M60,30 L70,30 L70,40";
      case 'capricorn': return "M25,38 Q38,48 50,45 Q68,42 78,55 Q85,68 68,75 Q52,80 42,65 Q35,52 50,55";
      case 'aquarius': return "M42,30 L58,30 M40,40 L60,40 M35,55 C35,70 65,70 65,55 L60,40 L40,40 Z";
      case 'pisces': return "M15,35 C35,22 45,45 22,48 Z";
      default: return "";
    }
  };

  const strokeColor = active ? '#F6F3ED' : '#1D4ED8';
  
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
      <path
        d={getDeityPath(id)}
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function App() {
  // 輸入狀態管理
  const [targetZodiac, setTargetZodiac] = useState('')
  const [targetMbti, setTargetMbti] = useState('')
  const [purpose, setPurpose] = useState('')
  const [environment, setEnvironment] = useState('')
  const [energy, setEnergy] = useState('')

  // 截圖上傳狀態
  const [dragOver, setDragOver] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [scores, setScores] = useState(null)
  const fileInputRef = useRef(null)

  // 核心視圖控制狀態 (多頁面架構控制)
  const [currentView, setCurrentView] = useState('input') // 'input' | 'result'
  const [analysisResult, setAnalysisResult] = useState(null)

  // 用於動態 Hover 特效的標題 Ref
  const titleRef = useRef(null);

  // 監聽巨大標題的滑鼠移動，動態計算並傳遞局部 X, Y 座標
  useEffect(() => {
    const titleElement = titleRef.current;
    if (!titleElement) return;

    const handleMouseMove = (e) => {
      const rect = titleElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100 + '%';
      const y = ((e.clientY - rect.top) / rect.height) * 100 + '%';
      titleElement.style.setProperty('--x', x);
      titleElement.style.setProperty('--y', y);
    };

    titleElement.addEventListener('mousemove', handleMouseMove);
    return () => {
      titleElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
    <div className="min-h-screen bg-cream text-ink antialiased font-sans selection:bg-ink selection:text-cream">
      
      {/* 💡 內嵌封裝 CSS：確保銀色雕刻探照燈特效完美運作且不衝突 */}
      <style>{`
        #good-sign-title {
          color: #2C2A29;
          font-family: 'Playfair Display', Georgia, serif;
          transition: color 0.3s ease;
        }
        @media (min-width: 768px) {
          #good-sign-title.dynamic-engraved-hover:hover {
            color: transparent;
            background-image: linear-gradient(135deg, #7e7e7e 0%, #d6d3d1 25%, #ffffff 50%, #d6d3d1 75%, #7e7e7e 100%);
            -webkit-background-clip: text;
            background-clip: text;
            filter: drop-shadow(1px 2px 4px rgba(44,42,41,0.15));
            
            /* 探照燈遮罩效果：只在滑鼠周圍 200px 內顯現銀色金屬雕刻質感 */
            -webkit-mask-image: radial-gradient(
              circle 200px at var(--x, 50%) var(--y, 50%),
              black 0%,
              rgba(0,0,0,0.7) 50%,
              transparent 100%
            );
            mask-image: radial-gradient(
              circle 200px at var(--x, 50%) var(--y, 50%),
              black 0%,
              rgba(0,0,0,0.7) 50%,
              transparent 100%
            );
          }
        }
      `}</style>

      {/* 頂部高級網格版頭 */}
      <header className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12 border-b border-sand/60 text-center">
        <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-ink/40 font-mono mb-8">
          <span>A.26 — CELESTIAL ALIGNMENT</span>
          <span>FIELD EMISSION — VERSION 2.0</span>
        </div>
        
        {/* 修正 1：巨幅單字設計，移除 - 與 .，並掛載滑鼠座標監聽 */}
        <h1
          ref={titleRef}
          id="good-sign-title"
          className="text-6xl sm:text-8xl md:text-[11rem] lg:text-[14rem] font-bold tracking-normal select-none leading-none uppercase w-full block my-8 dynamic-engraved-hover cursor-crosshair"
        >
          GOOD SIGN
        </h1>
        
        <p className="text-xs md:text-sm text-ink/60 max-w-3xl mx-auto leading-relaxed font-sans mt-8 pt-6 border-t border-sand/40">
          傾聽古典黃道天體與當代人格科學的交織回響。
          我們摒棄冗餘的自身數據，專注於剖析目標對象隱匿於聊天對話框與物理環境背後的真實波長，
          為跨越虛擬與實體的靈魂，策展出一份具備極高心理學共情厚度的見面指南。
        </p>
      </header>

      {/* 視圖切換邏輯：第一頁（輸入表單頁） */}
      {currentView === 'input' && (
        <main className="max-w-6xl mx-auto px-6 pb-36 animate-fadeIn">
          {/* 區塊 I：神話星座古星圖寫實線條 */}
          <section className="py-14 border-b border-sand/60 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-semibold tracking-wider">I.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-ink">目標神話星象</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1 font-mono">Zodiac Pantheons (Pick One)</p>
            </div>
            <div className="lg:col-span-9">
              {/* 修正 2：12星座全面換成具備十七世紀星圖生命力的寫實線條 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {ZODIACS.map((z) => {
                  const isSelected = targetZodiac === z.id;
                  return (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setTargetZodiac(isSelected ? '' : z.id)}
                      className={`group relative flex flex-col items-center p-6 border transition-all duration-500 ease-out overflow-hidden ${
                        isSelected
                          ? 'bg-ink text-cream border-ink shadow-[0_16px_32px_-12px_rgba(44,42,41,0.35)]'
                          : 'bg-transparent text-ink border-sand hover:border-ink/60'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
                      
                      <div className="mb-2 transition-transform duration-700 group-hover:scale-110">
                        <VintageZodiacIcon id={z.id} active={isSelected} />
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
                <div className="mt-6 p-6 border border-sand bg-ink/[0.005] animate-fadeIn">
                  <div className="flex items-baseline justify-between border-b border-sand/60 pb-3 mb-4">
                    <h3 className="font-serif text-lg text-ink font-medium">
                      {selectedZodiacData.label} · 守護天體側寫
                    </h3>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-ink/30">Mythological Blueprint</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs md:text-sm leading-relaxed text-ink/70">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">愛慾與浪漫 Aphrodite's Touch</span>
                      <p>追求純粹與對等。極度看重交流中的回饋頻率，一旦察覺失衡便會優雅收回情感。</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">神殿事業/修煉 Athena's Shield</span>
                      <p>具備克制的防禦機制，在緊要關頭傾向用冷靜且客觀的思維重新校準方向。</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">凡間社交/家庭 Hestia's Hearth</span>
                      <p>私底下對待認可的親密圈子帶有溫柔的反差，往往用隱忍來維持群體的和諧。</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1">靈魂核心 Core Ego</span>
                      <p className="text-ink/90 font-medium">最無法忍受粗暴的邊界跨越或偏見，寧可保持缄默也絕不向無效對話妥協。</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 區塊 II：MBTI 獨立大項 */}
          <section className="py-14 border-b border-sand/60 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-semibold tracking-wider">II.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-ink">人格矩陣代碼</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1 font-mono">MBTI Core Type (Optional)</p>
            </div>
            <div className="lg:col-span-9">
              <p className="text-xs md:text-sm text-ink/50 max-w-xl leading-relaxed mb-6">
                MBTI 欄位在此系統中為<span className="text-ink border-b border-ink/40 pb-0.5 mx-1 font-medium">非必填項目</span>。
                若對方的內心矩陣尚未對你解鎖，本指南將純粹依據星象黃道進行座標定位。
              </p>
              <div className="relative border-b border-sand focus-within:border-ink max-w-xs transition-colors">
                <select
                  value={targetMbti}
                  onChange={(e) => setTargetMbti(e.target.value)}
                  className="w-full appearance-none bg-transparent py-2 text-base text-ink outline-none cursor-pointer font-mono tracking-wider"
                >
                  <option value="">保留未知（純天體星象推演）</option>
                  {MBTIS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-ink/40 text-xs">▾</span>
              </div>
            </div>
          </section>

          {/* 區塊 III：場景控制項 */}
          <section className="py-14 border-b border-sand/60 grid grid-cols-1 lg:grid-cols-12 gap-8">
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
          <section className="py-14 border-b border-sand/60 grid grid-cols-1 lg:grid-cols-12 gap-8">
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

          {/* 修正 3：按鈕文字更換為「靈魂分析」 */}
          <div className="pt-16 flex flex-col items-center">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={executeAnalysis}
              className={`px-16 py-4 font-serif text-lg tracking-widest border transition-all duration-500 ${
                canSubmit
                  ? 'bg-ink text-cream border-ink hover:opacity-90 shadow-md'
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

      {/* 視圖切換邏輯：第二頁（獨立分析結果報告書頁面） */}
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
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">📍 氣場大方向評估 Assessment</h3>
              <p className="font-serif text-xl md:text-2xl text-ink/80 leading-relaxed bg-cream p-6 border border-sand/40 font-normal">
                {analysisResult.macroAssessment}
              </p>
            </div>

            {/* 核心修正：移除會阻礙編譯的系統註解，確保 map 100% 渲染流暢 */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-4">💬 深度客製化破冰提案 Icebreakers</h3>
              <div className="space-y-6">
                {analysisResult.topics.map((topic, idx) => (
                  <div key={idx} className="border-l border-ink/40 pl-5 py-1">
                    <h4 className="font-serif text-lg text-ink font-medium">
                      {idx + 1}. {topic.title}
                    </h4>
                    <p className="text-xs md:text-sm text-ink/60 mt-2 leading-relaxed font-sans">
                      <span className="text-ink/80 font-medium bg-sand/20 px-1 py-0.5 mr-1 font-mono text-[11px] uppercase tracking-wider">心理學機制</span> 
                      {topic.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 現場高難度急救台詞 */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">⚡ 現場高難度急救台詞 Emergency</h3>
              <div className="bg-ink text-cream p-6 md:p-8 text-center relative shadow-sm">
                <p className="font-serif text-lg md:text-xl italic tracking-wide leading-relaxed">
                  “{analysisResult.rescueLine}”
                </p>
              </div>
            </div>

            {/* 地獄雷區 */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">❌ 絕對禁忌地獄雷區 No-Go Zone</h3>
              <p className="text-xs md:text-sm text-red-900 bg-red-50/30 border border-red-200/40 p-4 leading-relaxed font-sans">
                {analysisResult.forbidden}
              </p>
            </div>
          </div>
        </main>
      )}

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-sand/60 text-[9px] font-mono uppercase tracking-[0.2em] text-ink/30 flex justify-between">
        <span>GOOD SIGN CO. ALL RIGHTS RESERVED.</span>
        <span>ATREUS PROTOCOL MATRIX 2026</span>
      </footer>
    </div>
  )
}
