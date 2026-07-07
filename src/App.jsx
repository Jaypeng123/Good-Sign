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

// 十七世紀銅板星圖風格 (Copperplate Etching Style) 寫實神話人像 SVG
function VintageZodiacIcon({ id, active }) {
  const strokeColor = active ? '#F6F3ED' : '#1D4ED8';
  
  switch (id) {
    case 'aries': // 牡羊座：寫實公羊躍動之姿、厚實羊角與毛皮排線
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M25,55 Q35,35 55,38 Q65,40 75,32 Q82,25 78,42 Q74,55 60,60 Q45,62 30,70" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M68,34 Q65,20 52,22 Q45,24 48,34 Q53,40 64,36" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M66,35 Q58,26 52,32" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M72,36 L75,45 M75,38 L77,46 M28,58 L24,72 M33,60 L32,74 M58,60 L58,75 M64,59 L66,73" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M40,45 L38,50 M45,46 L43,52 M52,48 L50,55 M58,50 L57,56" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" fill="none" />
        </svg>
      );
    case 'taurus': // 金牛座：破雲而出的強壯雄牛、扭曲犄角與厚重前胸陰影
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M75,55 Q60,40 45,45 Q35,48 25,35 Q18,25 32,28 Q42,32 55,25 Q68,18 70,38" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M30,30 Q15,10 22,8 Q30,8 33,24 M35,28 Q30,5 38,4 Q45,4 42,22" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M65,48 L58,68 M70,52 L66,72 M28,38 L20,48" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M48,38 L45,43 M52,37 L49,43 M56,37 L53,44 M60,38 L58,45" stroke={strokeColor} strokeWidth="0.8" opacity="0.7" fill="none" />
          <path d="M50,48 Q60,54 70,50" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2 1" fill="none" />
        </svg>
      );
    case 'gemini': // 雙子座：星圖中依偎並行的孿生希臘古典人像
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M38,30 C38,20 48,20 48,30 C48,40 38,45 38,55 L38,80 M48,35 L58,40 L58,55 M32,45 L26,60" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M58,35 C58,25 68,25 68,35 C68,45 58,50 58,60 L58,80 M68,40 L76,55 M50,45 L42,50" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M35,65 L32,80 M42,65 L45,80 M55,65 L52,80 M62,65 L65,80" stroke={strokeColor} strokeWidth="1" fill="none" />
          <circle cx="43" cy="24" r="1.5" fill={strokeColor} /><circle cx="63" cy="28" r="1.5" fill={strokeColor} />
          <path d="M36,45 L40,45 M36,50 L40,50 M56,50 L60,50" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" fill="none" />
        </svg>
      );
    case 'cancer': // 巨蟹座：多節甲殼與巨大寫實蟹螯、古典解剖線條
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M30,50 Q20,32 35,25 Q50,18 65,25 Q80,32 70,50 Q60,65 50,65 Q40,65 30,50 Z" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M32,30 Q12,25 18,45 L30,38 M68,30 Q88,25 82,45 L70,38" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M25,45 Q10,50 15,58 M26,52 Q12,62 20,68 M28,58 Q16,74 26,78" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M75,45 Q90,50 85,58 M74,52 Q88,62 80,68 M72,58 Q86,74 74,78" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M40,35 L40,55 M45,32 L45,58 M50,30 L50,60 M55,32 L55,58 M60,35 L60,55" stroke={strokeColor} strokeWidth="0.7" opacity="0.5" fill="none" />
        </svg>
      );
    case 'leo': // 獅子座：昂首雄獅、帶有細密波浪堆疊的流暢鬃毛排線
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M20,65 Q35,55 45,58 Q60,60 70,42 Q78,25 65,18 Q52,12 40,30 Q30,42 20,45" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M45,22 C38,15 24,24 28,38 C22,42 26,56 38,50 C38,58 52,56 50,44" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M32,25 Q26,30 32,35 M36,22 Q28,28 34,38 M40,20 Q32,32 42,40" stroke={strokeColor} strokeWidth="0.8" fill="none" />
          <path d="M22,55 L16,78 M28,58 L25,80 M56,58 L58,78 M64,54 L68,76" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M48,45 Q55,48 62,44" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3 1" fill="none" />
        </svg>
      );
    case 'virgo': // 處女座：背負古典雙翼、手持豐收麥穗的希臘翼之女神
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M50,22 C50,15 42,15 42,22 C42,28 50,32 50,42 L46,82 M54,42 L58,82" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M42,32 Q20,18 28,45 Q35,55 46,50" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M54,32 Q76,18 68,45 Q63,55 52,50" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M28,28 L34,36 M26,35 L33,42 M26,42 L34,46 M68,28 L62,36 M70,35 L63,42" stroke={strokeColor} strokeWidth="0.8" fill="none" />
          <path d="M38,55 L24,65 M34,58 L20,68 C15,72 22,78 28,72 L42,62" stroke={strokeColor} strokeWidth="1" fill="none" />
          <circle cx="20" cy="68" r="1" fill={strokeColor} /><circle cx="17" cy="71" r="1" fill={strokeColor} />
          <path d="M46,48 L54,48 M45,55 L53,55 M45,62 L53,62 M45,70 L52,70" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" fill="none" />
        </svg>
      );
    case 'libra': // 天秤座：細緻三角巴洛克支架、懸掛雙盤與法碼刻度線
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M50,15 L50,75 M15,30 L85,30 M50,30 L50,25" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M25,30 L20,58 M35,30 L40,58 M65,30 L60,58 M75,30 L80,58" stroke={strokeColor} strokeWidth="0.8" fill="none" />
          <path d="M15,58 Q30,64 45,58 Z M55,58 Q70,64 85,58 Z" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M50,15 L42,25 L58,25 Z" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M46,38 L42,38 M46,46 L40,46 M46,54 L42,54 M54,38 L58,38 M54,46 L60,46 M54,54 L58,54" stroke={strokeColor} strokeWidth="0.8" opacity="0.7" fill="none" />
          <circle cx="50" cy="12" r="2" fill={strokeColor} />
        </svg>
      );
    case 'scorpio': // 天蠍座：巴洛克寫實毒蠍、甲殼分節與多關節螯肢排線
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M50,15 L50,60 Q50,78 30,75 Q15,72 25,62 L38,65" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M44,22 C44,15 56,15 56,22 C56,35 44,40 44,52" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M42,24 Q22,12 28,32 L44,28 M58,24 Q78,12 72,32 L56,28" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M45,35 L20,38 M45,42 L18,46 M45,49 L20,54 M55,35 L80,38 M55,42 L82,46 M55,49 L80,54" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M47,28 L53,28 M46,34 L54,34 M45,40 L55,40 M45,46 L55,46 M46,52 L54,52" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" fill="none" />
        </svg>
      );
    case 'sagittarius': // 射手座：張弓拉滿、蓄勢待發的半人馬戰士肌肉排線
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M22,72 Q38,55 52,60 Q65,65 78,52 M64,55 L68,78 M74,52 L80,75 M22,72 L14,84 M30,70 L28,85" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M52,60 Q50,42 62,35 C70,30 75,45 68,52" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M72,30 Q45,20 40,48 M72,30 L38,44" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M55,10 Q85,15 62,55" stroke={strokeColor} strokeWidth="1" fill="none" />
          <circle cx="65" cy="24" r="1.5" fill={strokeColor} />
          <path d="M56,42 L52,48 M59,45 L56,51 M62,47 L60,53" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" fill="none" />
        </svg>
      );
    case 'capricorn': // 摩羯座：古星圖經典海山羊、前半身羊角與後半身魚尾鱗片
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M25,38 Q38,48 50,45 Q68,42 78,55 Q85,68 68,75 Q52,80 42,65 Q35,52 50,55" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M28,32 Q14,18 24,12 Q32,15 32,32 M34,34 Q24,12 36,10 Q42,12 39,30" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M22,42 L16,56 M28,45 L25,58" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M58,52 Q62,58 68,56 M54,58 Q58,64 65,60 M52,64 Q56,70 60,66" stroke={strokeColor} strokeWidth="0.8" opacity="0.7" fill="none" />
          <circle cx="25" cy="12" r="1.5" fill={strokeColor} /><circle cx="38" cy="10" r="1.5" fill={strokeColor} />
        </svg>
      );
    case 'aquarius': // 水瓶座：持古希臘雙耳陶甕傾倒神聖泉水的神話侍者
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M25,42 C25,32 35,32 35,42 C35,52 25,58 25,68 L28,85 M35,48 L46,55 L42,72 M16,55 L24,52" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M42,32 Q62,25 58,45 Q52,58 72,55 L78,38 L54,32 Z" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M48,25 Q78,35 68,15" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M72,55 Q76,75 85,82 M76,57 Q82,76 90,80" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" fill="none" />
          <circle cx="30" cy="26" r="2" fill={strokeColor} />
          <path d="M52,40 L62,38 M50,46 L60,44 M48,52 L56,50" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" fill="none" />
        </svg>
      );
    case 'pisces': // 雙魚座：命運絲帶緊扣、朝相反方向游動的雙魚與魚鱗排線
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 transition-all duration-700" filter="url(#good-sign-etching)">
          <path d="M15,35 C35,22 45,45 22,48 Z" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M12,42 L5,38 M14,46 L6,48 M22,48 L32,55" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M85,55 C65,68 55,45 78,42 Z" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M88,48 L95,52 M86,42 L94,40 M78,42 L68,35" stroke={strokeColor} strokeWidth="1" fill="none" />
          <path d="M24,40 Q50,45 76,49" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <path d="M18,34 Q22,38 20,42 M78,54 Q82,50 80,46" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" fill="none" />
          <circle cx="16" cy="42" r="1" fill={strokeColor} /><circle cx="84" cy="46" r="1" fill={strokeColor} />
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
      {/* 注入古典銅板雕刻的微噪點濾鏡，重現17世紀木刻紙張質感 */}
      <svg className="hidden">
        <filter id="good-sign-etching">
          <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* 🚀 頂部歷史巨幅 Banner 版頭排版 (完美對應 WILD WEEK 大小比例) */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-12 border-b border-sand/60 text-center">
        <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-ink/40 font-mono mb-8">
          <span>A.26 — CELESTIAL ALIGNMENT</span>
          <span>FIELD EMISSION — VERSION 2.0</span>
        </div>
        
        {/* 核心修正 1：徹底破壞格柵欄位限制，字體放到極致大，重現頂級大氣感 */}
        <h1 className="font-serif text-6xl sm:text-8xl md:text-[11rem] lg:text-[14rem] font-bold tracking-normal text-ink select-none leading-none uppercase w-full block my-4">
          ΓΟΟΔ—ΣΙΓΝ.
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
          {/* 區塊 I：神話星座浮雕 */}
          <section className="py-14 border-b border-sand/60 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <span className="font-serif text-3xl text-ink/30 font-semibold tracking-wider">I.</span>
              <h2 className="font-serif text-xl md:text-2xl mt-1 tracking-wide text-ink">目標神話星象</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1 font-mono">Zodiac Pantheons (Pick One)</p>
            </div>
            <div className="lg:col-span-9">
              {/* 核心修正 2：完全揚棄圓圈與扁平占星符號，直接展示細緻的寫實神話人像 */}
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
                      {/* 仿製 Athens 2026 照片中大理石與水銀流體般的立體金屬 hover 特效層 */}
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

          {/* 區塊 II：MBTI 獨立大項（明確標註非必填） */}
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

          {/* 核心分析按鈕 */}
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

            {/* 📍 1. 大方向評估 — 放大並改成有襯線體 */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">📍 氣場大方向評估 Assessment</h3>
              <p className="font-serif text-xl md:text-2xl text-ink/80 leading-relaxed bg-cream p-6 border border-sand/40 font-normal">
                {analysisResult.macroAssessment}
              </p>
            </div>

            {/* 💬 2. 深度話題與背後心理學剖析 */}
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

            {/* ⚡ 3. 現場高難度急救台詞 */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 font-mono mb-3">⚡ 現場高難度急救台詞 Emergency</h3>
              <div className="bg-ink text-cream p-6 md:p-8 text-center relative shadow-sm">
                <p className="font-serif text-lg md:text-xl italic tracking-wide leading-relaxed">
                  “{analysisResult.rescueLine}”
                </p>
              </div>
            </div>

            {/* ❌ 4. 地獄雷區 */}
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
