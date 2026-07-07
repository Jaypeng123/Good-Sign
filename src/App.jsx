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

// 十七世紀復古星圖經典線條木刻白描 SVG 具象人像（完全捨棄符號，重現古星圖神話生命力）
function VintageZodiacIcon({ id, active }) {
  const getDeityPath = (zId) => {
    switch (zId) {
      case 'aries': return "M25,55 Q35,35 55,38 Q65,40 75,32 Q82,25 78,42 Q74,55 60,60 M68,34 Q65,20 52,22 M28,58 L24,72 M33,60 L32,74";
      case 'taurus': return "M75,55 Q60,40 45,45 Q35,48 25,35 Q18,25 32,28 M30,30 Q15,10 22,8 M35,28 Q30,5 38,4";
      case 'gemini': return "M38,30 C38,20 48,20 48,30 C48,40 38,45 38,55 L38,80 M58,35 C58,25 68,25 68,35 C68,45 58,50 58,60";
      case 'cancer': return "M30,50 Q20,32 35,25 Q50,18 65,25 Q80,32 70,50 M32,30 Q12,25 18,45 M68,30 Q88,25 82,45";
      case 'leo': return "M20,65 Q35,55 45,58 Q60,60 70,42 Q78,25 65,18 M45,22 C38,15 24,24 28,38 M22,55 L16,78";
      case 'virgo': return "M50,22 C50,15 42,15 42,22 C42,28 50,32 50,42 L46,82 M54,42 L58,82 M38,55 L24,65";
      case 'libra': return "M50,15 L50,75 M15,30 L85,30 M30,35 L30,55 M70,35 L70,55 M15,58 Q30,64 45,58 Z";
      case 'scorpio': return "M50,15 L50,60 Q50,78 30,75 Q15,72 25,62 L38,65 M42,24 Q22,12 28,32";
      case 'sagittarius': return "M30,70 L70,30 M60,30 L70,30 M40,25 Q75,50 50,75 M34,66 L29,71";
      case 'capricorn': return "M25,38 Q38,48 50,45 Q68,42 78,55 Q85,68 68,75 M28,32 Q14,18 24,12";
      case 'aquarius': return "M42,30 L58,30 M40,40 L60,40 M35,55 C35,70 65,70 65,55 M72,55 Q76,75 85,82";
      case 'pisces': return "M15,35 C35,22 45,45 22,48 Z M85,55 C65,68 55,45 78,42 Z";
      default: return "";
    }
  };

  const strokeColor = active ? '#F6F3ED' : '#2C2A29'; 
  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 transition-all duration-700">
      <path d={getDeityPath(id)} stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" fill="none" />
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
  const [currentCardIdx, setCurrentCardIdx] = useState(0) 
  const [shareNotify, setShareNotify] = useState(false)

  const titleRef = useRef(null);
  const [mouseCoord, setMouseCoord] = useState({ x: '50%', y: '50%' })
  const [isTitleHovered, setIsTitleHovered] = useState(false)

  const handleTitleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 + '%';
    const y = ((e.clientY - rect.top) / rect.height) * 100 + '%';
    setMouseCoord({ x, y });
  };

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
    const text = `我在 GOOD SIGN 啟動了星曜靈魂破冰指南！防冷場對頻指數達 ${analysisResult?.survivalRate}%！`;
    
    if (platform === 'link') {
      navigator.clipboard.writeText(`${text} 觀測通道: ${shareUrl}`);
      setShareNotify(true);
      window.setTimeout(() => setShareNotify(false), 2000);
    } else if (platform === 'fb') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
    } else {
      alert(`已複製分析摘要！您可以打開 Instagram 限時動態直接貼上：\n\n"${text}"`);
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F3ED] text-[#2C2A29] antialiased font-sans relative overflow-x-hidden selection:bg-[#2C2A29] selection:text-[#F6F3ED]">
      
      {/* 🏛️ 裝飾性背景：緩慢旋轉的希臘天體年輪與星芒碎屑 */}
      <div className="absolute top-40 right-[-120px] w-96 h-96 border border-[#2C2A29]/10 rounded-full animate-spin pointer-events-none select-none hidden lg:block" style={{ animationDuration: '60s' }}>
        <div className="absolute inset-4 border border-dashed border-[#2C2A29]/5 rounded-full" />
        <div className="absolute inset-12 border border-double border-[#2C2A29]/10 rounded-full" />
      </div>
      <div className="absolute top-[35rem] right-16 text-lg opacity-25 animate-bounce pointer-events-none hidden md:block" style={{ animationDuration: '7s' }}>✦</div>
      <div className="absolute top-[65rem] left-12 text-sm opacity-20 animate-pulse pointer-events-none hidden md:block" style={{ animationDuration: '5s' }}>✧</div>

      {/* 🏺 左側倒聖水雙耳瓶互動元件：Hover 時流洩出藍色細線 */}
      <div className="absolute top-96 left-8 z-20 group pointer-events-auto hidden xl:block">
        <div className="text-3xl cursor-crosshair transition-transform duration-700 group-hover:rotate-45 font-serif text-[#1D4ED8] flex flex-col items-center select-none">
          <span>🏺</span>
          <span className="text-[9px] uppercase tracking-widest text-[#2C2A29]/30 mt-1 font-mono">Amphora</span>
        </div>
        <div className="w-px h-0 bg-gradient-to-b from-[#1D4ED8] to-transparent mx-auto opacity-0 group-hover:h-56 group-hover:opacity-100 transition-all duration-1000 ease-out" />
      </div>

      <style>{`
        .font-greek-title {
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          color: #2C2A29;
        }
        .dynamic-engraved-hover:hover {
          color: transparent !important;
          background-image: linear-gradient(135deg, #4b5563 0%, #d1d5db 25%, #ffffff 50%, #d1d5db 75%, #4b5563 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-mask-image: radial-gradient(circle 200px at var(--x, 50%) var(--y, 50%), black 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
          mask-image: radial-gradient(circle 200px at var(--x, 50%) var(--y, 50%), black 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .tarot-card-container {
          box-shadow: 0 35px 70px -15px rgba(44,42,41,0.22), 
                      inset 0 1px 0 rgba(255,255,255,0.7),
                      0 0 0 1px rgba(44,42,41,0.06);
        }
        @keyframes scanline { 0% { top: 0%; } 100% { top: 100%; } }
        .animate-scanline { animation: scanline 2.2s ease-in-out infinite alternate; }
      `}</style>

      {/* 視圖控制：第一頁（輸入表單首頁） */}
      {currentView === 'input' && (
        <>
          <header className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center relative z-10">
            <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-[#2C2A29]/40 font-mono mb-6">
              <span>A.26 — CELESTIAL ALIGNMENT</span>
              <span>FIELD EMISSION — VERSION 2.0</span>
            </div>
            
            {/* 💡 修正 1：標題採用真正的古羅馬優雅大寫「G」，拿掉橫線與句號，尺寸放到極致大，掛載游標探照燈金屬特效 */}
            <div 
              onMouseMove={handleTitleMouseMove}
              onMouseEnter={() => setIsTitleHovered(true)}
              onMouseLeave={() => setIsTitleHovered(false)}
              className="font-greek-title text-5xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-bold uppercase leading-none my-10 dynamic-engraved-hover cursor-crosshair tracking-tight relative transition-all duration-500"
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
            {/* 💡 修正 2：12星座全面套用 Athens-26 自由排版，Staggered（高低交錯）且完全撤除符號圈圈 */}
            <section className="py-14 border-b border-[#2C2A29]/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <span className="font-serif text-3xl text-[#2C2A29]/30 font-semibold tracking-wider">I.</span>
                <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-[#2C2A29]">目標神話星象</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#2C2A29]/40 mt-1 font-mono">Zodiac Pantheons (Asymmetric Art Gallery)</p>
              </div>
              <div className="lg:col-span-9">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-4">
                  {ZODIACS.map((z, idx) => {
                    const isSelected = targetZodiac === z.id;
                    // 透過索引給予高低錯落（Staggered）的自由律動感
                    const staggerY = idx % 3 === 1 ? 'translate-y-6' : idx % 3 === 2 ? '-translate-y-2' : 'translate-y-0';
                    return (
                      <button
                        key={z.id}
                        type="button"
                        onClick={() => setTargetZodiac(isSelected ? '' : z.id)}
                        className={`group relative flex flex-col items-center p-6 border transition-all duration-500 ease-out ${staggerY} ${
                          isSelected
                            ? 'bg-[#2C2A29] text-[#F6F3ED] border-[#2C2A29] shadow-2xl scale-105 z-10'
                            : 'bg-white/20 text-[#2C2A29] border-[#2C2A29]/10 hover:border-[#2C2A29]/40 hover:bg-white/60'
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
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

                {/* 點擊展開的毛玻璃裝飾面板 */}
                {selectedZodiacData && (
                  <div className="mt-14 p-6 glass-panel animate-fadeIn">
                    <h3 className="font-serif text-lg text-[#2C2A29] font-medium border-b border-[#2C2A29]/10 pb-2 mb-3">
                      {selectedZodiacData.label} · 靈魂星軌側寫
                    </h3>
                    <p className="text-sm leading-relaxed text-[#2C2A29]/70 font-serif italic">
                      {selectedZodiacData.desc}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* 區塊 II：MBTI 獨立區塊 */}
            <section className="py-14 border-b border-[#2C2A29]/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <span className="font-serif text-3xl text-[#2C2A29]/30 font-semibold tracking-wider">II.</span>
                <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-[#2C2A29]">人格矩陣代碼</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#2C2A29]/40 mt-1 font-mono">MBTI Matrix (Optional)</p>
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

            {/* 區塊 III：情境脈絡 */}
            <section className="py-14 border-b border-[#2C2A29]/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <span className="font-serif text-3xl text-[#2C2A29]/30 font-semibold tracking-wider">III.</span>
                <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-[#2C2A29]">場景脈絡校準</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#2C2A29]/40 mt-1 font-mono">Context Filters</p>
              </div>
              <div className="lg:col-span-9 space-y-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#2C2A29]/40 block mb-3 font-mono">A. 見面意圖 Intention</span>
                  <div className="flex flex-wrap gap-2">
                    {PURPOSES.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setPurpose(o.id)}
                        className={`px-4 py-2 border text-xs transition-all duration-300 ${
                          purpose === o.id ? 'bg-
