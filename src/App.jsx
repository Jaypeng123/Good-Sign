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

// 十七世紀銅雕星圖風格的內聯高精度向量 SVG 組件
function VintageZodiacIcon({ id, active }) {
  const strokeColor = active ? '#F6F3ED' : '#1D4ED8';
  
  switch (id) {
    case 'aries': // 公羊：帶有古典羊角與螺旋星軌紋理
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" fill="none" />
          <path d="M30,35 Q50,15 50,55 M70,35 Q50,15 50,55 M50,55 L50,80" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M30,35 Q20,30 25,20 Q35,15 42,28 M70,35 Q80,30 75,20 Q65,15 58,28" stroke={strokeColor} strokeWidth="1" fill="none" />
          <circle cx="50" cy="25" r="1.5" fill={strokeColor} /><circle cx="25" cy="20" r="1.5" fill={strokeColor} /><circle cx="75" cy="20" r="1.5" fill={strokeColor} />
        </svg>
      );
    case 'taurus': // 雄牛：古星圖前半身 charging bull 犄角剪影
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 2" fill="none" />
          <path d="M25,25 Q50,55 75,25 M35,42 A 15 15 0 1 0 65 42 A 15 15 0 1 0 35 42 Z" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M25,25 Q15,20 20,12 Q30,15 37,30 M75,25 Q85,20 80,12 Q70,15 63,30" stroke={strokeColor} strokeWidth="1" fill="none" />
          <circle cx="50" cy="42" r="2" fill={strokeColor} /><circle cx="20" cy="12" r="1.5" fill={strokeColor} /><circle cx="80" cy="12" r="1.5" fill={strokeColor} />
        </svg>
      );
    case 'gemini': // 雙子：兩根古典多立克柱交織星軌，象徵孿生雙子
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M35,30 L35,70 M65,30 L65,70 M25,25 L75,25 M25,75 L75,75 M35,40 L65,40 M35,60 L65,60" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="35" cy="30" r="2" fill={strokeColor} /><circle cx="65" cy="30" r="2" fill={strokeColor} /><circle cx="50" cy="50" r="1.5" fill={strokeColor} />
        </svg>
      );
    case 'cancer': // 巨蟹：寫實多足硬殼螃蟹幾何線條
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" strokeDasharray="1 3" fill="none" />
          <rect x="35" y="40" width="30" height="20" rx="10" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M35,45 Q20,35 25,25 M65,45 Q80,35 75,25 M30,50 Q15,50 20,55 M70,50 Q85,50 80,55 M32,55 Q18,65 25,70 M68,55 Q82,65 75,70" stroke={strokeColor} strokeWidth="1" fill="none" />
          <circle cx="45" cy="47" r="1.5" fill={strokeColor} /><circle cx="55" cy="47" r="1.5" fill={strokeColor} />
        </svg>
      );
    case 'leo': // 雄獅：帶有豐厚捲曲鬃毛與心宿二焦點的獅子首輪廓
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M45,25 C30,25 25,45 40,50 C30,60 35,80 55,75 C70,75 75,55 65,45 C75,30 60,25 45,25 Z" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <circle cx="45" cy="40" r="2.5" fill={strokeColor} />
          <path d="M45,40 Q55,45 60,35" stroke={strokeColor} strokeWidth="1" fill="none" />
        </svg>
      );
    case 'virgo': // 處女：背負羽翼、手持豐收麥穗的處女座女神剪影
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <path d="M50,25 L50,75 M35,35 Q50,45 50,25 M65,35 Q50,45 50,25 M40,55 L60,55 M45,65 L55,65" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M50,32 Q60,35 58,45 M50,42 Q40,45 42,55" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M50,75 L45,82 M50,75 L55,82" stroke={strokeColor} strokeWidth="1" fill="none" />
          <circle cx="50" cy="20" r="2" fill={strokeColor} />
        </svg>
      );
    case 'libra': // 天秤：由三角形支架與極細絲線懸掛的黃金雙盤天秤
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M50,25 L50,70 M25,35 L75,35 M30,35 L30,55 M70,35 L70,55" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M20,55 Q30,55 30,55 Q40,55 40,55 M60,55 Q70,55 70,55 Q80,55 80,55" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M20,55 C20,62 40,62 40,55 M60,55 C60,62 80,62 80,55" stroke={strokeColor} strokeWidth="1" fill="none" />
          <circle cx="50" cy="25" r="2" fill={strokeColor} />
        </svg>
      );
    case 'scorpio': // 天蠍：星圖具體寫實長條毒蠍，末端帶有倒鉤
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" strokeDasharray="6 2" fill="none" />
          <path d="M50,22 L50,65 Q50,75 38,75 M35,30 Q20,25 25,40 M65,30 Q80,25 75,40" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M38,75 L32,68 M38,75 L44,68" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M50,35 L30,38 M50,45 L30,48 M50,55 L30,58 M50,35 L70,38 M50,45 L70,48 M50,55 L70,58" stroke={strokeColor} strokeWidth="1" fill="none" />
        </svg>
      );
    case 'sagittarius': // 射手：拉滿弓弦的半人馬複合十字長弓與箭矢
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M30,70 L70,30 M60,30 L70,30 L70,40" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M40,25 Q75,50 50,75" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M30,70 L25,75 M34,66 L29,71" stroke={strokeColor} strokeWidth="1" fill="none" />
          <circle cx="70" cy="30" r="2" fill={strokeColor} />
        </svg>
      );
    case 'capricorn': // 摩羯：前半身山羊尖角，後半身魚尾微幅捲曲
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" strokeDasharray="1 4" fill="none" />
          <path d="M35,35 L50,55 L65,35 C65,55 50,75 35,70 C25,65 30,55 45,55" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M35,35 Q25,25 30,15 M50,55 Q45,35 42,18" stroke={strokeColor} strokeWidth="1" fill="none" />
          <circle cx="30" cy="15" r="1.5" fill={strokeColor} /><circle cx="42" cy="18" r="1.5" fill={strokeColor} />
        </svg>
      );
    case 'aquarius': // 水瓶：古希臘雙耳陶甕細線白描，泉水傾倒而出
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M42,30 L58,30 M40,40 L60,40 M35,55 C35,70 65,70 65,55 L60,40 L40,40 Z" stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
          <path d="M35,45 Q25,50 35,55 M65,45 Q75,50 65,55" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M50,65 Q50,85 35,82 M48,65 Q45,85 30,80" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'pisces': // 雙魚：朝相反方向游動的兩條古風圖騰魚，中間以雙線絲帶相連
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
          <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M25,40 C45,30 45,50 25,40 Z M75,60 C55,50 55,70 75,60 Z" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M35,42 Q50,50 65,58" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" fill="none" />
          <circle cx="28" cy="38" r="1" fill={strokeColor} /><circle cx="72" cy="58" r="1" fill={strokeColor} />
        </svg>
      );
    default:
      return null;
  }
}

export default function App() {
  // 輸入狀態管理，精簡移除自我輸入
  const [targetZodiac, setTargetZodiac] = useState('')
  const [targetMbti, setTargetMbti] = useState('')
  const [purpose, setPurpose] = useState('')
  const [environment, setEnvironment] = useState('')
  const [energy, setEnergy] = useState('')

  // 截圖上傳與波形掃描狀態
  const [dragOver, setDragOver] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [scores, setScores] = useState(null)
  const fileInputRef = useRef(null)

  // 核心視圖控制狀態 (多頁面架構控制)
  const [currentView, setCurrentView] = useState('input') // 'input' | 'result'
  const [analysisResult, setAnalysisResult] = useState(null)

  // 驗證邏輯：星座與 MBTI 二擇一，情境必填即可解鎖按鈕
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
      {/* 頂部古羅馬字體風格巨大版頭 (Athens-26 頂級美學) */}
      <header className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-12 border-b border-sand/60">
        <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-ink/40 font-mono mb-6">
          <span>A.26 — CELESTIAL ALIGNMENT</span>
          <span>FIELD EMISSION — VERSION 2.0</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 古希臘/羅馬字符風變體標題，使用大膽的皇家藍配色 */}
          <h1 className="font-serif text-6xl md:text-8xl leading-none font-bold lg:col-span-7 tracking-tighter text-ink select-none">
            ΓΟΟΔ—ΣΙΓΝ.
          </h1>
          <p className="text-xs md:text-sm text-ink/60 lg:col-span-5 leading-relaxed font-sans pt-2 border-t lg:border-t-0 lg:border-l border-sand/80 pl-0 lg:pl-8">
            傾聽古典黃道天體與當代人格科學的交織回響。
            我們摒棄冗餘的自身數據，專注於剖析目標對象隱匿於聊天對話框與物理環境背後的真實波長，
            為跨越虛擬與實體的靈魂，策展出一份具備極高心理學共情厚度的見面指南。
          </p>
        </div>
      </header>

      {/* 視圖切換邏輯：第一頁（輸入表單頁） */}
      {currentView === 'input' && (
        <main className="max-w-6xl mx-auto px-6 pb-36 animate-fadeIn">
          {/* 區塊 A：神話星座浮雕 */}
          <section className="py-14 border-b border-sand/60 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-semibold tracking-wider">I.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-ink">目標神話星象</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1 font-mono">Zodiac Pantheons (Pick One)</p>
            </div>
            <div className="lg:col-span-9">
              {/* 12星座網格佈局，支援完美的手機版 RWD 自動縮放 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {ZODIACS.map((z) => {
                  const isSelected = targetZodiac === z.id;
                  return (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setTargetZodiac(isSelected ? '' : z.id)}
                      className={`group relative flex flex-col items-center p-6 border transition-all duration-500 ease-out ${
                        isSelected
                          ? 'bg-ink text-cream border-ink shadow-[0_16px_32px_-12px_rgba(44,42,41,0.35)]'
                          : 'bg-transparent text-ink border-sand hover:border-ink/60'
                      }`}
                    >
                      {/* 仿製 Athens 2026 照片中大理石與水銀流體般的立體金屬 hover 特效層 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
                      
                      <div className="mb-2 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
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

          {/* 區塊 B：MBTI 獨立大項（明確標註非必填） */}
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
                若能填寫，則會激活雙重相性權重，使破冰話題產生更細緻的人格加權。
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

          {/* 區塊 C：場景控制項 */}
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

          {/* 區塊 D：截圖上傳 */}
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

          {/* 核心觸發器 */}
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
              分析
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
          {/* 優雅的返回上一步細線連結 */}
          <button
            type="button"
            onClick={() => setCurrentView('input')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/50 hover:text-ink transition-colors font-mono mb-8 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> 返回上一步修改條件
          </button>

          {/* 報告書實體容器 */}
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
              
              {/* 借鑑 Moor AI 遊戲副本化指標：生存機率 */}
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink/40 block mb-1">
                  預測首次防冷場機率
                </span>
                <span className="font-serif text-4xl text-ink font-bold">
                  {analysisResult.survivalRate}%
                </span>
              </div>
            </div>

            {/* 1. 宏觀大方向分析 (ChatGPT 溫暖諮商文風) */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">📍 氣場大方向評估 Assessment</h3>
              <p className="text-base text-ink/80 leading-relaxed font-sans bg-cream p-6 border border-sand/40 font-normal">
                {analysisResult.macroAssessment}
              </p>
            </div>

            {/* 2. 深度話題與背後心理學剖析 */}
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

            {/* 3. 現場高難度急救台詞 */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">⚡ 現場高難度急救台詞 Emergency</h3>
              <div className="bg-ink text-cream p-6 md:p-8 text-center relative shadow-sm">
                <p className="font-serif text-lg md:text-xl italic tracking-wide leading-relaxed">
                  “{analysisResult.rescueLine}”
                </p>
              </div>
            </div>

            {/* 4. 地獄雷區 */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">❌ 絕對禁忌地獄雷區 No-Go Zone</h3>
              <p className="text-xs md:text-sm text-red-900 bg-red-50/30 border border-red-200/40 p-4 leading-relaxed font-sans">
                {analysisResult.forbidden}
              </p>
            </div>
          </div>
        </main>
      )}

      {/* 底部線條與雅致刻印 */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-sand/60 text-[9px] font-mono uppercase tracking-[0.2em] text-ink/30 flex justify-between">
        <span>GOOD SIGN CO. ALL RIGHTS RESERVED.</span>
        <span>ATREUS PROTOCOL MATRIX 2026</span>
      </footer>
    </div>
  )
}
