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

// 12星座古典寫實銅板雕刻 SVG 人像（重構拿掉制式符號圈圈，改為精細的古星圖線條）
function VintageZodiacIcon({ id, active }) {
  const getDeityPath = (zId) => {
    switch (zId) {
      case 'aries': return "M25,55 Q35,35 55,38 Q65,40 75,32 Q82,25 78,42 Q74,55 60,60 Q45,62 30,70 M68,34 Q65,20 52,22 M28,58 L24,72 M33,60 L32,74";
      case 'taurus': return "M75,55 Q60,40 45,45 Q35,48 25,35 Q18,25 32,28 M30,30 Q15,10 22,8 M35,28 Q30,5 38,4 M65,48 L58,68";
      case 'gemini': return "M38,30 C38,20 48,20 48,30 C48,40 38,45 38,55 L38,80 M58,35 C58,25 68,25 68,35 C68,45 58,50 58,60 M32,45 L26,60";
      case 'cancer': return "M30,50 Q20,32 35,25 Q50,18 65,25 Q80,32 70,50 Q60,65 50,65 Q40,65 30,50 Z M32,30 Q12,25 18,45 M68,30 Q88,25 82,45";
      case 'leo': return "M20,65 Q35,55 45,58 Q60,60 70,42 Q78,25 65,18 Q52,12 40,30 M45,22 C38,15 24,24 28,38 M22,55 L16,78 M28,58 L25,80";
      case 'virgo': return "M50,22 C50,15 42,15 42,22 C42,28 50,32 50,42 L46,82 M54,42 L58,82 M38,55 L24,65 M34,58 L20,68";
      case 'libra': return "M50,15 L50,75 M15,30 L85,30 M30,35 L30,55 M70,35 L70,55 M15,58 Q30,64 45,58 Z M55,58 Q70,64 85,58 Z";
      case 'scorpio': return "M50,15 L50,60 Q50,78 30,75 Q15,72 25,62 L38,65 M42,24 Q22,12 28,32 M58,24 Q78,12 72,32";
      case 'sagittarius': return "M30,70 L70,30 M60,30 L70,30 L70,40 M40,25 Q75,50 50,75 M34,66 L29,71";
      case 'capricorn': return "M25,38 Q38,48 50,45 Q68,42 78,55 Q85,68 68,75 Q52,80 42,65 M28,32 Q14,18 24,12 M34,34 Q24,12 36,10";
      case 'aquarius': return "M42,30 L58,30 M40,40 L60,40 M35,55 C35,70 65,70 65,55 L60,40 M72,55 Q76,75 85,82 M76,57 Q82,76 90,80";
      case 'pisces': return "M15,35 C35,22 45,45 22,48 Z M85,55 C65,68 55,45 78,42 Z M24,40 Q50,45 76,49";
      default: return "";
    }
  };

  const strokeColor = active ? '#F6F3ED' : '#2C2A29'; // 換成厚重深灰色字體色
  
  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 transition-all duration-700">
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
  const [currentCardIdx, setCurrentCardIdx] = useState(0) // 塔羅牌目前的索引
  const [shareNotify, setShareNotify] = useState(false)

  const titleRef = useRef(null);

  // 探照燈遮罩座標計算
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
    return () => titleElement.removeEventListener('mousemove', handleMouseMove);
  }, [currentView]);

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
    setCurrentCardIdx(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentView('result')
  }

  function handleShare(platform) {
    const shareUrl = window.location.href;
    const text = `我在 GOOD SIGN 測出了與對方的見面靈魂破冰指南！防冷場機率達 ${analysisResult?.survivalRate}%！`;
    
    if (platform === 'link') {
      navigator.clipboard.writeText(`${text} 傳送門: ${shareUrl}`);
      setShareNotify(true);
      window.setTimeout(() => setShareNotify(false), 2000);
    } else if (platform === 'fb') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
    } else {
      // Instagram Stories / Generic Prompt
      alert(`已複製分析摘要！您可以打開 Instagram 限時動態貼上背景：\n\n"${text}"`);
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F3ED] text-[#2C2A29] antialiased font-sans relative overflow-x-hidden selection:bg-[#2C2A29] selection:text-[#F6F3ED]">
      
      {/* 🔮 注入全螢幕裝飾性動態元件：緩慢轉動的古典年輪、倒聖水雙耳瓶、漂浮碎屑 */}
      <div className="absolute top-40 right-[-100px] w-96 h-96 border border-[#2C2A29]/10 rounded-full animate-spin pointer-events-none select-none hidden lg:block" style={{ animationDuration: '40s' }}>
        <div className="absolute inset-4 border border-dashed border-[#2C2A29]/5 rounded-full" />
        <div className="absolute inset-12 border border-double border-[#2C2A29]/10 rounded-full" />
      </div>

      {/* 🏺 左側倒聖水瓶裝飾：Hover 時傾斜並流洩出動態藍色聖水線條 */}
      <div className="absolute top-96 left-6 z-20 group pointer-events-auto hidden xl:block">
        <div className="text-2xl cursor-help transition-transform duration-500 group-hover:rotate-45 font-serif text-[#1D4ED8] flex flex-col items-center">
          <span>🏺</span>
          <span className="text-[9px] uppercase tracking-widest text-[#2C2A29]/40 mt-1 font-mono">Amphora</span>
        </div>
        <div className="w-px h-0 bg-gradient-to-b from-[#1D4ED8] to-transparent mx-auto opacity-0 group-hover:h-48 group-hover:opacity-100 transition-all duration-1000 ease-out" />
      </div>

      {/* 🍃 滾動時漂浮飛舞的歐式幾何碎屑意象 */}
      <div className="absolute top-[30rem] right-12 text-lg opacity-20 animate-bounce pointer-events-none hidden md:block" style={{ animationDuration: '6s' }}>✦</div>
      <div className="absolute top-[55rem] left-16 text-xs opacity-15 animate-pulse pointer-events-none hidden md:block" style={{ animationDuration: '4s' }}>✧</div>
      <div className="absolute top-[80rem] right-24 text-xl opacity-20 animate-bounce pointer-events-none" style={{ animationDuration: '8s' }}>✶</div>

      {/* 內嵌高擬真動態樣式 */}
      <style>{`
        .font-greek-title {
          font-family: 'Playfair Display', Georgia, serif;
          color: #2C2A29;
          transition: color 0.3s ease;
        }
        .dynamic-engraved-hover:hover {
          color: transparent !important;
          background-image: linear-gradient(135deg, #6b7280 0%, #d1d5db 25%, #ffffff 50%, #d1d5db 75%, #6b7280 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-mask-image: radial-gradient(circle 180px at var(--x, 50%) var(--y, 50%), black 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
          mask-image: radial-gradient(circle 180px at var(--x, 50%) var(--y, 50%), black 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .tarot-shadow {
          box-shadow: 0 30px 60px -15px rgba(44,42,41,0.25), 
                      inset 0 1px 0 rgba(255,255,255,0.6),
                      0 0 0 1px rgba(44,42,41,0.05);
        }
        @keyframes scanline { 0% { top: 0%; } 100% { top: 100%; } }
        .animate-scanline { animation: scanline 2s ease-in-out infinite alternate; }
      `}</style>

      {/* 視圖切換邏輯：第一頁（輸入表單首頁） */}
      {currentView === 'input' && (
        <>
          <header className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center relative z-10">
            <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-[#2C2A29]/40 font-mono mb-6">
              <span>A.26 — CELESTIAL ALIGNMENT</span>
              <span>FIELD EMISSION — VERSION 2.0</span>
            </div>
            
            {/* 💡 核心修改：標題完全拿掉橫線與句號，修正G字體，掛載滑鼠局部跟隨的銀色銅板雕刻特效 */}
            <div 
              ref={titleRef}
              className="font-greek-title text-6xl sm:text-8xl md:text-[11rem] lg:text-[13.5rem] font-bold uppercase leading-none my-8 dynamic-engraved-hover cursor-crosshair tracking-tight"
            >
              GOOD SIGN
            </div>
            
            <p className="text-xs md:text-sm text-[#2C2A29]/60 max-w-3xl mx-auto leading-relaxed font-sans pt-6 border-t border-[#2C2A29]/10">
              傾聽古典黃道天體與當代人格科學的交織回響。
              我們摒棄冗餘的自身數據，專注於剖析目標對象隱匿於聊天對話框與物理環境背後的真實波長，
              為跨越虛擬與實體的靈魂，策展出一份具備極高心理學共情厚度的見面指南。
            </p>
          </header>

          <main className="max-w-6xl mx-auto px-6 pb-36 relative z-10">
            {/* 區塊 I：非對稱、非制式、生動隨性交錯的 12星座排版 (參考 Athens-26 自由版面) */}
            <section className="py-14 border-b border-[#2C2A29]/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <span className="font-serif text-3xl text-[#2C2A29]/30 font-semibold tracking-wider">I.</span>
                <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-[#2C2A29]">目標神話星象</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#2C2A29]/40 mt-1 font-mono">Zodiac Pantheons (Off-Grid Layout)</p>
              </div>
              <div className="lg:col-span-9">
                {/* 💡 透過不同的 translate 與不規則跨欄，實現動態活潑的交錯感 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-6">
                  {ZODIACS.map((z, idx) => {
                    const isSelected = targetZodiac === z.id;
                    // 根據索引給予不規則的位移，徹底打破制式格柵
                    const offsetClass = idx % 3 === 1 ? 'translate-y-4' : idx % 3 === 2 ? '-translate-y-2' : 'translate-y-0';
                    return (
                      <button
                        key={z.id}
                        type="button"
                        onClick={() => setTargetZodiac(isSelected ? '' : z.id)}
                        className={`group relative flex flex-col items-center p-6 border transition-all duration-500 ease-out ${offsetClass} ${
                          isSelected
                            ? 'bg-[#2C2A29] text-[#F6F3ED] border-[#2C2A29] shadow-xl scale-105 z-10'
                            : 'bg-white/30 text-[#2C2A29] border-[#2C2A29]/10 hover:border-[#2C2A29]/40 hover:bg-white/60'
                        }`}
                      >
                        <div className="mb-2 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
                          <VintageZodiacIcon id={z.id} active={isSelected} />
                        </div>
                        <span className="font-serif text-base tracking-wide mt-2">{z.label}</span>
                        <span className={`text-[9px] uppercase tracking-widest font-mono mt-0.5 ${isSelected ? 'text-[#F6F3ED]/40' : 'text-[#2C2A29]/40'}`}>
                          {z.god.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* 毛玻璃點綴的星座說明面板 */}
                {selectedZodiacData && (
                  <div className="mt-12 p-6 glass-panel animate-fadeIn rounded-none">
                    <h3 className="font-serif text-lg text-[#2C2A29] font-medium border-b border-[#2C2A29]/10 pb-2 mb-3">
                      {selectedZodiacData.label} · 靈魂天體軌道
                    </h3>
                    <p className="text-sm leading-relaxed text-[#2C2A29]/70 font-serif italic">
                      {selectedZodiacData.desc}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* 區塊 II：MBTI 獨立大項 */}
            <section className="py-14 border-b border-[#2C2A29]/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <span className="font-serif text-3xl text-[#2C2A29]/30 font-semibold tracking-wider">II.</span>
                <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-[#2C2A29]">人格矩陣代碼</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#2C2A29]/40 mt-1 font-mono">MBTI Matrix Code (Optional)</p>
              </div>
              <div className="lg:col-span-9">
                <div className="relative border-b border-[#2C2A29]/20 focus-within:border-[#2C2A29] max-w-xs transition-colors">
                  <select
                    value={targetMbti}
                    onChange={(e) => setTargetMbti(e.target.value)}
                    className="w-full appearance-none bg-transparent py-2 text-base text-[#2C2A29] outline-none cursor-pointer font-mono tracking-wider"
                  >
                    <option value="">保留未知（純天體星象推演）</option>
                    {MBTIS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[#2C2A29]/40 text-xs">▾</span>
                </div>
              </div>
            </section>

            {/* 區塊 III：場景控制項 */}
            <section className="py-14 border-b border-[#2C2A29]/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <span className="font-serif text-3xl text-[#2C2A29]/30 font-semibold tracking-wider">III.</span>
                <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-[#2C2A29]">場景脈絡校準</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#2C2A29]/40 mt-1 font-mono">Context Parameters</p>
              </div>
              <div className="lg:col-span-9 space-y-8">
                {/* 採用毛玻璃標籤組 */}
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#2C2A29]/40 block mb-3 font-mono">A. 見面意圖 Intention</span>
                  <div className="flex flex-wrap gap-2">
                    {PURPOSES.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setPurpose(o.id)}
                        className={`px-4 py-2 border text-xs transition-all duration-300 ${
                          purpose === o.id ? 'bg-[#2C2A29] text-[#F6F3ED] border-[#2C2A29]' : 'glass-panel text-[#2C2A29] hover:border-[#2C2A29]/40'
                        }`}
                      >
                        {o.label} <span className="opacity-40 ml-1">({o.hint})</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#2C2A29]/40 block mb-3 font-mono">B. 物理環境 Environment</span>
                  <div className="flex flex-wrap gap-2">
                    {ENVIRONMENTS.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setEnvironment(o.id)}
                        className={`px-4 py-2 border text-xs transition-all duration-300 ${
                          environment === o.id ? 'bg-[#2C2A29] text-[#F6F3ED] border-[#2C2A29]' : 'glass-panel text-[#2C2A29] hover:border-[#2C2A29]/40'
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#2C2A29]/40 block mb-3 font-mono">C. 心靈能量 Energy Level</span>
                  <div className="flex flex-wrap gap-2">
                    {ENERGIES.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setEnergy(o.id)}
                        className={`px-4 py-2 border text-xs transition-all duration-300 ${
                          energy === o.id ? 'bg-[#2C2A29] text-[#F6F3ED] border-[#2C2A29]' : 'glass-panel text-[#2C2A29] hover:border-[#2C2A29]/40'
                        }`}
                      >
                        {o.label} <span className="opacity-40 ml-1">({o.hint})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 區塊 IV：對話截圖 */}
          <section className="py-14 border-b border-[#2C2A29]/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <span className="font-serif text-3xl text-[#2C2A29]/30 font-semibold tracking-wider">IV.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-[#2C2A29]">對話波形診斷</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#2C2A29]/40 mt-1 font-mono">Dating Telemetry (Optional)</p>
            </div>
            <div className="lg:col-span-9">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileSelection(e.dataTransfer.files?.[0]); }}
                onClick={() => fileInputRef.current?.click()}
                className={`relative overflow-hidden border border-dashed transition-all duration-300 text-center cursor-pointer ${
                  dragOver ? 'border-[#2C2A29] bg-white/40' : 'border-[#2C2A29]/20 hover:border-[#2C2A29]/50'
                } ${imagePreview ? 'py-4' : 'py-14'}`}
              >
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileSelection(e.target.files?.[0])} />
                {!imagePreview && (
                  <div className="px-6">
                    <p className="font-serif text-base text-[#2C2A29]/80">拖放或點擊上傳聊天紀錄截圖</p>
                    <p className="mt-1 text-[9px] text-[#2C2A29]/40 uppercase tracking-widest font-mono">Optional Signal Capture</p>
                  </div>
                )}
                {imagePreview && (
                  <div className="relative inline-block max-w-full">
                    <img src={imagePreview} alt="Waveform" className="max-h-[160px] object-contain mx-auto bg-transparent" />
                    {scanning && (
                      <div className="absolute inset-0 bg-[#F6F3ED]/90 flex flex-col items-center justify-center">
                        <div className="w-full h-px bg-[#2C2A29]/40 absolute top-0 animate-scanline" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#2C2A29]/50">解碼對話波動中...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 💡 CTA 按鈕更名為「靈魂分析」 */}
          <div className="pt-20 flex flex-col items-center">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={executeAnalysis}
              className={`px-20 py-5 font-serif text-xl tracking-widest border transition-all duration-500 shadow-sm ${
                canSubmit
                  ? 'bg-[#2C2A29] text-[#F6F3ED] border-[#2C2A29] hover:bg-transparent hover:text-[#2C2A29] hover:scale-105'
                  : 'bg-transparent text-[#2C2A29]/20 border-[#2C2A29]/10 cursor-not-allowed'
              }`}
            >
              靈魂分析
            </button>
          </div>
        </>
      )}

      {/* 視圖切換邏輯：第二頁（獨立分析結果報告書頁面，不呈現上方巨大標題） */}
      {currentView === 'result' && analysisResult && (
        <main className="max-w-4xl mx-auto px-6 pb-36 pt-20 animate-fadeIn relative z-10">
          
          {/* 返回首頁按鈕 */}
          <button
            type="button"
            onClick={() => setCurrentView('input')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#2C2A29]/60 hover:text-[#2C2A29] transition-colors font-mono mb-12 group border-b border-[#2C2A29]/20 pb-1"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1.5">←</span> 返回觀測首頁
          </button>

          {/* 報告核心面板 */}
          <div className="glass-panel p-8 md:p-12 relative border border-[#2C2A29]/10 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#2C2A29]/10 pb-6 mb-8 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#2C2A29]/40 block mb-1">
                  Moor AI Dynamic Telemetry Matrix
                </span>
                <h2 className="font-greek-title text-3xl md:text-4xl text-[#2C2A29] font-bold">
                  {analysisResult.targetName} · 社交星曜診斷報告
                </h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#2C2A29]/40 block mb-1">
                  首次安全防冷場率
                </span>
                <span className="font-serif text-5xl text-[#1D4ED8] font-black">
                  {analysisResult.survivalRate}%
                </span>
              </div>
            </div>

            {/* 大方向評估：放大並保持精緻襯線體 */}
            <div className="mb-12">
              <h3 className="text-xs uppercase tracking-widest text-[#2C2A29]/40 font-mono mb-4">📍 宏觀人格與氣場觀測 Assessment</h3>
              <p className="font-serif text-2xl md:text-3xl text-[#2C2A29]/80 leading-relaxed bg-white/20 p-6 border border-white/40 font-normal shadow-inner">
                {analysisResult.macroAssessment}
              </p>
            </div>

            {/* 🃏 核心修改 4：寫實逼真、超大尺寸的「塔羅牌話題抽卡陣列」 */}
            <div className="mb-12">
              <h3 className="text-xs uppercase tracking-widest text-[#2C2A29]/40 font-mono mb-6">🃏 專屬破冰話題塔羅矩陣 Tarot Decks</h3>
              
              <div className="flex flex-col items-center">
                {/* 大尺寸塔羅牌實體面卡片 */}
                <div className="w-full max-w-xl h-[420px] bg-[#FAF8F5] border-2 border-[#2C2A29] p-8 relative tarot-shadow flex flex-col justify-between transition-all duration-500 transform hover:-translate-y-2">
                  {/* 牌面古典花紋邊框裝飾 */}
                  <div className="absolute inset-2 border border-[#2C2A29]/10 pointer-events-none" />
                  <div className="absolute inset-3 border border-dashed border-[#2C2A29]/5 pointer-events-none" />
                  
                  {/* 牌頂部：推薦契合度數據 */}
                  <div className="flex justify-between items-center border-b border-[#2C2A29]/10 pb-3">
                    <span className="font-serif text-xs italic text-[#2C2A29]/50">Arcana No. 0{currentCardIdx + 1}</span>
                    <span className="font-mono text-xs font-semibold bg-[#1D4ED8]/10 text-[#1D4ED8] px-2.5 py-1">
                      推薦對頻指數 {analysisResult.cards[currentCardIdx].rate}%
                    </span>
                  </div>

                  {/* 牌面核心：巨大寫實的話題文字 */}
                  <div className="my-6 text-center px-4">
                    <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#2C2A29]/40 mb-3">— THE ICEBREAKER —</div>
                    <h4 className="font-serif text-2xl md:text-3xl font-bold text-[#2C2A29] leading-snug">
                      {analysisResult.cards[currentCardIdx].title}
                    </h4>
                  </div>

                  {/* 牌底部：ChatGPT 式細緻原由剖析 */}
                  <div className="border-t border-[#2C2A29]/10 pt-4 bg-white/40 p-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#1D4ED8] block mb-1 font-semibold">🔍 心理學機制與對頻原由</span>
                    <p className="text-xs md:text-sm text-[#2C2A29]/70 leading-relaxed font-sans">
                      {analysisResult.cards[currentCardIdx].reason}
                    </p>
                  </div>
                </div>

                {/* 塔羅牌切換控制導覽器：手機可用按鈕切換（並支援 swipe 隱喻），網頁提供左右古典按鈕 */}
                <div className="flex items-center gap-8 mt-6">
                  <button 
                    type="button"
                    onClick={() => setCurrentCardIdx(prev => (prev === 0 ? analysisResult.cards.length - 1 : prev - 1))}
                    className="w-12 h-12 border border-[#2C2A29] text-lg font-serif hover:bg-[#2C2A29] hover:text-[#F6F3ED] transition-all duration-300"
                  >
                    ←
                  </button>
                  <span className="font-mono text-sm text-[#2C2A29]/50">
                    {currentCardIdx + 1} / {analysisResult.cards.length}
                  </span>
                  <button 
                    type="button"
                    onClick={() => setCurrentCardIdx(prev => (prev === analysisResult.cards.length - 1 ? 0 : prev + 1))}
                    className="w-12 h-12 border border-[#2C2A29] text-lg font-serif hover:bg-[#2C2A29] hover:text-[#F6F3ED] transition-all duration-300"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* 3. 現場急救台詞 */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-[#2C2A29]/40 font-mono mb-3">⚡ 現場高難度急救台詞 Emergency</h3>
              <div className="bg-[#2C2A29] text-[#F6F3ED] p-8 text-center shadow-md">
                <p className="font-serif text-xl md:text-2xl italic tracking-wide leading-relaxed">
                  “{analysisResult.rescueLine}”
                </p>
              </div>
            </div>

            {/* 4. 地獄雷區 */}
            <div className="mb-16">
              <h3 className="text-xs uppercase tracking-widest text-[#2C2A29]/40 font-mono mb-3">❌ 絕對禁忌地獄雷區 No-Go Zone</h3>
              <p className="text-xs md:text-sm text-red-900 bg-red-50/40 border border-red-200/40 p-4 leading-relaxed font-sans">
                {analysisResult.forbidden}
              </p>
            </div>

            {/* 🔗 核心修改 3：高質感、活潑設計的社群分享擴展面板 (IG / FB / 複製連結) */}
            <div className="border-t border-[#2C2A29]/10 pt-8 mt-8">
              <div className="bg-white/50 border border-[#2C2A29]/10 p-6 text-center relative overflow-hidden">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1D4ED8] block mb-2 font-bold">📢 SHARE YOUR SIGN ORACLE</span>
                <h4 className="font-serif text-lg text-[#2C2A29] mb-4">將這份來自奧林帕斯的默契信號分享至社群矩陣</h4>
                
                <div className="flex flex-wrap justify-center gap-3">
                  <button 
                    type="button"
                    onClick={() => handleShare('link')}
                    className="px-5 py-2.5 bg-[#2C2A29] text-[#F6F3ED] text-xs uppercase tracking-widest font-mono hover:opacity-90 transition-opacity"
                  >
                    🔗 複製專屬分享連結
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleShare('ig')}
                    className="px-5 py-2.5 border border-[#2C2A29] text-[#2C2A29] text-xs uppercase tracking-widest font-mono bg-transparent hover:bg-[#2C2A29]/5 transition-colors"
                  >
                    📸 生成限時動態密碼
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleShare('fb')}
                    className="px-5 py-2.5 border border-[#1D4ED8] text-[#1D4ED8] text-xs uppercase tracking-widest font-mono bg-transparent hover:bg-[#1D4ED8]/5 transition-colors"
                  >
                    🔵 分享至 Facebook 副本
                  </button>
                </div>

                {shareNotify && (
                  <p className="text-xs text-[#1D4ED8] font-mono mt-3 animate-pulse">
                    ✓ 專屬分析摘要與連結已成功複製至剪貼簿！
                  </p>
                )}
              </div>
            </div>

          </div>
        </main>
      )}

      {/* 底部銘文 */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-[#2C2A29]/10 text-[9px] font-mono uppercase tracking-[0.2em] text-[#2C2A29]/30 flex justify-between relative z-10">
        <span>GOOD SIGN STUDIO. ALL RIGHTS RESERVED.</span>
        <span>ATREUS PROTOCOL MATRIX 2026</span>
      </footer>
    </div>
  )
}
