// src/App.jsx

import { useState, useRef, useEffect } from 'react'
import {
  ZODIACS,
  MBTIS,
  PURPOSES,
  ENVIRONMENTS,
  ENERGIES,
  calculateFallbackScore,
  generateComprehensiveAnalysis
} from './data'

// 🏛️ 12 星座古典神祇線條向量 (整合 3D 卡牌意象)
function VintageZodiacIcon({ id, active }) {
  const getDeityPath = (zId) => {
    switch (zId) {
      case 'aries': return "M25,55 Q35,35 55,38 Q65,40 75,32 Q82,25 78,42 Q74,55 60,60 M68,34 Q65,20 52,22 M28,58 L24,72";
      case 'taurus': return "M75,55 Q60,40 45,45 Q35,48 25,35 Q18,25 32,28 M30,30 Q15,10 22,8 M35,28 Q30,5 38,4";
      case 'gemini': return "M38,30 C38,20 48,20 48,30 C48,40 38,45 38,55 L38,80 M58,35 C58,25 68,25 68,35";
      case 'cancer': return "M30,50 Q20,32 35,25 Q50,18 65,25 Q80,32 70,50 M32,30 Q12,25 18,45";
      case 'leo': return "M20,65 Q35,55 45,58 Q60,60 70,42 Q78,25 65,18 M45,22 C38,15 24,24 28,38";
      case 'virgo': return "M50,22 C50,15 42,15 42,22 C42,28 50,32 50,42 L46,82 M54,42 L58,82";
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
    <svg viewBox="0 0 100 100" className="w-16 h-16 transition-all duration-700">
      <path d={getDeityPath(id)} stroke={strokeColor} strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('landing') // 'landing' | 'input' | 'telemetry' | 'result'
  
  // 雙雕像數據
  const [you, setYou] = useState({
    zodiac: '', mbti: '', age: '25', profession: '', interest: '', purpose: '', environment: '', energy: ''
  })
  const [target, setTarget] = useState({
    zodiac: '', mbti: '', age: '25', profession: '', interest: '', purpose: '', environment: '', energy: ''
  })

  // 截圖上傳狀態
  const [dragOver, setDragOver] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [scanning, setScanning] = useState(false)

  // 觀測結果與話題卡
  const [analysisResult, setAnalysisResult] = useState(null)
  const [currentCardIdx, setCurrentCardIdx] = useState(0)
  const [shareNotify, setShareNotify] = useState(false)

  // 模擬聊天室
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  // 標題與上傳參照
  const titleRef = useRef(null)
  const fileInputRef = useRef(null)
  const [mouseCoord, setMouseCoord] = useState({ x: '50%', y: '50%' })
  const [isTitleHovered, setIsTitleHovered] = useState(false)
  const [hoveredZodiacId, setHoveredZodiacId] = useState(null)

  // 監聽滑鼠
  const handleTitleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 + '%';
    const y = ((e.clientY - rect.top) / rect.height) * 100 + '%';
    setMouseCoord({ x, y });
  };

  // 圖片轉 Base64
  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const canSubmit = (you.zodiac || you.mbti) && (target.zodiac || target.mbti) && you.purpose && you.environment && you.energy;

  function handleFileSelection(file) {
    if (!file || !file.type.startsWith('image/')) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  // 核心：多模態 AI 觀測引擎 (Gemini 1.5 Flash)
  async function executeAnalysis() {
    if (!canSubmit) return;
    setCurrentView('telemetry');
    setScanning(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AQ.Ab8RN6J1bWCI0ITdkyDC0MjwFt9GQtcf3vbTBxHgKWO3zpqUAQ";
    const baselineScore = calculateFallbackScore(you, target);

    let base64Image = null;
    if (imageFile) {
      try {
        base64Image = await fileToBase64(imageFile);
      } catch (e) {
        console.error("圖片轉檔失敗：", e);
      }
    }

    // 🌟 防崩潰機制：如果 API 呼叫失敗，絕對不拋出異常，而是 100% 走 Fallback 安全降級
    try {
      const promptText = `你是一位古希臘星象博物館館長兼高階關係諮商心理師。請分析 [YOU] 與 [TARGET] 的首次見面配對關係。
      
      雙方資料如下：
      [YOU]：星座: ${you.zodiac}, MBTI: ${you.mbti}, 年齡: ${you.age}, 職業: ${you.profession || '未知'}, 興趣: ${you.interest || '未知'}, 能量級別: ${you.energy}, 見面意圖: ${you.purpose}
      [TARGET]：星座: ${target.zodiac}, MBTI: ${target.mbti}, 年齡: ${target.age}, 職業: ${target.profession || '未知'}, 興趣: ${target.interest || '未知'}, 能量級別: ${target.energy}, 物理環境: ${you.environment}

      ${base64Image ? "【重要】我附上了一張我們目前的對話紀錄截圖。請分析對話中的冷熱溫度、回覆頻率、語氣波動，並將其高度納入評估中。" : ""}

      請撰寫一份充滿詩意、大氣、且具備高敏銳度心理諮商溫度的繁體中文報告。
      你必須且只能返回一個合法的 JSON 物件。不要包含任何 markdown 標記（如不要寫 \`\`\`json）：
      {
        "targetName": "${ZODIACS.find(z => z.id === target.zodiac)?.label || '觀測對象'}",
        "survivalRate": ${baselineScore}, 
        "macroAssessment": "（請在此處生成一段 150 字左右的雙方深層相性與對話氛圍評估，文字要極具文青美感）",
        "cards": [
          {
            "title": "（針對雙方職業、興趣、年齡與情境量身定做的深度話題）",
            "rate": 95,
            "reason": "（詳細分析此話題背後的心理學機制與推薦原因）",
            "avoidSaying": "（在現場聊這個話題時絕對不要說的雷區詞語）"
          }
        ], // 請精準生成 5 個客製化話題卡對象
        "rescueLine": "（現場高難度急救台詞，例如：『實不相瞞...』）",
        "forbidden": "（一整段絕對禁忌地獄雷區說明）"
      }`;

      // 檢查 Key 的合法性（真正的 Gemini Key 必須是 AIzaSy 開頭）
      if (!apiKey.startsWith("AIzaSy")) {
        throw new Error("Invalid API Key format (must start with AIzaSy).");
      }

      const parts = [{ text: promptText }];
      if (base64Image) {
        parts.push({
          inlineData: {
            mimeType: imageFile.type,
            data: base64Image
          }
        });
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts }] })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.candidates[0].content.parts[0].text.trim();
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      setAnalysisResult(parsed);
    } catch (err) {
      console.warn("Gemini API 連線失敗，無痕啟用在地防崩潰大腦：", err);
      // 🌟 核心修復：這裏現在絕對安全，100% 抓得到 generateComprehensiveAnalysis 函數！
      const fallbackData = generateComprehensiveAnalysis({ you, target });
      setAnalysisResult(fallbackData);
    }

    setTimeout(() => {
      setScanning(false);
      setCurrentCardIdx(0);
      setChatMessages([
        { sender: 'guardian', text: `吾乃 ${ZODIACS.find(z => z.id === target.zodiac)?.god || '星軌守護者'}。此處為對頻觀測之練習神殿，你可在首次會面前，在此與我進行對話練習。我將採用你為對方設定的個性與背景與你聊天。` }
      ]);
      setCurrentView('result');
    }, 2400);
  }

  // 模擬聊天室（AI 100% 鎖定對方性格與設定）
  async function handleSendMessage() {
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AQ.Ab8RN6J1bWCI0ITdkyDC0MjwFt9GQtcf3vbTBxHgKWO3zpqUAQ";
    const targetZodiacData = ZODIACS.find(z => z.id === target.zodiac);
    const guardianName = targetZodiacData ? targetZodiacData.god : "星軌守護者";

    try {
      if (!apiKey.startsWith("AIzaSy")) {
        throw new Error("Invalid API key format for chat.");
      }

      const historyPrompt = chatMessages.map(m => `${m.sender === 'user' ? 'User' : 'Target Guardian'}: ${m.text}`).join('\n');
      const prompt = `你現在是古希臘星象博物館中的星座守護神：【${guardianName}】。
      
      請 100% 扮演此角色與使用者（User）聊天。
      你所扮演的對象具有以下特定個性設定：
      - 守護天體性格：${targetZodiacData ? targetZodiacData.desc : '神祕、高冷'}
      - 人格 MBTI 屬性：${target.mbti || '未知'}
      - 職業背景：${target.profession || '學生/自由職業者'}
      - 興趣愛好：${target.interest || '無特定'}
      - 今日能量狀態：${target.energy || '寧靜沉穩'}

      規範：
      1. 你的回覆語氣必須完美鎖定在該星座角色的神話性格中（例如金牛穩重注重美感、天蠍神祕、獅子傲然）。
      2. 必須使用高雅優雅、帶有微文青感的繁體中文回覆。
      3. 長度必須保持在 80 字以內，符合即時通訊的簡短節奏。

      對話歷史：
      ${historyPrompt}
      User: ${userMsg.text}
      Target Guardian:`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      const reply = data.candidates[0].content.parts[0].text.trim();
      setChatMessages(prev => [...prev, { sender: 'guardian', text: reply }]);
    } catch (err) {
      console.warn("對話 API 失敗，使用備用對話大腦。");
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          sender: 'guardian', 
          text: `吾（${guardianName}）在此。對頻是一場雙向的探索，保持你的真實，無須過度迎合，星軌自會引領你們。` 
        }]);
        setIsTyping(false);
      }, 1000);
    } finally {
      setIsTyping(false);
    }
  }

  function handleShare(platform) {
    const text = `我在 GOOD SIGN 星象觀測所，測出了與對方的靈魂破冰指南！防冷場對頻率達 ${analysisResult?.survivalRate}%！`;
    if (platform === 'link') {
      navigator.clipboard.writeText(`${text} 觀測通道: ${window.location.href}`);
      setShareNotify(true);
      setTimeout(() => setShareNotify(false), 2000);
    } else {
      alert(`已複製分析摘要！您可以打開 Instagram 限動直接貼上：\n\n"${text}"`);
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F3ED] text-[#2C2A29] antialiased font-sans relative overflow-x-hidden selection:bg-[#2C2A29] selection:text-[#F6F3ED]">
      
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
          -webkit-mask-image: radial-gradient(circle 180px at var(--x, 50%) var(--y, 50%), black 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
          mask-image: radial-gradient(circle 180px at var(--x, 50%) var(--y, 50%), black 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
        }
        .meander-ring {
          animation: spin-clockwise 80s linear infinite;
        }
        @keyframes spin-clockwise {
          100% { transform: rotate(360deg); }
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .multiply-img {
          mix-blend-mode: multiply;
        }
        /* 🌟 3D 星座玻璃懸浮卡牌樣式 */
        .glass-3d-card {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(12px);
          transform-style: preserve-3d;
          perspective: 1000px;
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
        }
        .glass-3d-card:hover {
          transform: translateY(-6px) rotateX(8deg) rotateY(-8deg);
          border-color: #1D4ED8;
          box-shadow: 0 16px 32px 0 rgba(29, 78, 216, 0.12);
          background: rgba(29, 78, 216, 0.03);
        }
        .glass-3d-card-active {
          background: #2C2A29 !important;
          border-color: #2C2A29 !important;
          color: #F6F3ED !important;
          transform: translateY(-4px) scale(1.02);
        }
      `}</style>

      {/* 🪐 背景裝飾層 */}
      <div className="absolute top-40 right-[-120px] w-96 h-96 border border-[#2C2A29]/10 rounded-full meander-ring pointer-events-none select-none hidden lg:block">
        <div className="absolute inset-4 border border-dashed border-[#2C2A29]/5 rounded-full" />
        <div className="absolute inset-12 border border-double border-[#2C2A29]/10 rounded-full" />
      </div>

      {/* 🏺 左側雙耳瓶 */}
      <div className="absolute top-96 left-8 z-20 group pointer-events-auto hidden xl:block">
        <div className="text-3xl cursor-crosshair transition-transform duration-700 group-hover:rotate-45 font-serif text-[#1D4ED8] flex flex-col items-center select-none">
          <span>🏺</span>
          <span className="text-[9px] uppercase tracking-widest text-[#2C2A29]/30 mt-1 font-mono">Amphora</span>
        </div>
        <div className="w-px h-0 bg-gradient-to-b from-[#1D4ED8] to-transparent mx-auto opacity-0 group-hover:h-56 group-hover:opacity-100 transition-all duration-1000 ease-out" />
      </div>

      {/* 1. LANDING VIEW */}
      {currentView === 'landing' && (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#2C2A29]/40 mb-4 font-mono">The Observatory of Human Connection</p>
          <h2 className="font-greek-title text-3xl md:text-5xl italic font-light tracking-wide text-[#2C2A29]/80 mb-12 max-w-2xl leading-relaxed">
            “Not everyone is meant to enter your story.”
          </h2>
          <button
            type="button"
            onClick={() => setCurrentView('input')}
            className="px-12 py-4 border border-[#2C2A29] font-serif text-sm tracking-[0.2em] uppercase hover:bg-[#2C2A29] hover:text-[#F6F3ED] transition-all duration-500"
          >
            進入觀測所 Enter Sanctuary
          </button>
        </main>
      )}

      {/* 2. INPUT VIEW */}
      {currentView === 'input' && (
        <>
          <header className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center relative z-10">
            <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-[#2C2A29]/40 font-mono mb-6">
              <span>A.26 — CELESTIAL ALIGNMENT</span>
              <span>MUSEUM EDITION — VERSION 2.0</span>
            </div>
            
            <div 
              ref={titleRef}
              onMouseMove={handleTitleMouseMove}
              onMouseEnter={() => setIsTitleHovered(true)}
              onMouseLeave={() => setIsTitleHovered(false)}
              className="font-greek-title text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-bold uppercase leading-none my-10 dynamic-engraved-hover cursor-crosshair tracking-tight relative transition-all duration-500"
            >
              GOOD SIGN
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-6 pb-36 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* 左分欄：YOU */}
              <div className="glass-panel p-8 border border-[#2C2A29]/10">
                <span className="font-mono text-xs text-[#1D4ED8] tracking-widest block mb-2">// STATUE I</span>
                <h3 className="font-greek-title text-2xl font-bold mb-6">雕刻自我 Sculpt Yourself</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-3">A. 選擇你的守護星座 Zodiac</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3" onMouseLeave={() => setHoveredZodiacId(null)}>
                      {ZODIACS.map((z) => {
                        const isSelected = you.zodiac === z.id;
                        const isDimmed = hoveredZodiacId && hoveredZodiacId !== z.id;
                        return (
                          <button
                            key={z.id}
                            type="button"
                            onMouseEnter={() => setHoveredZodiacId(z.id)}
                            onClick={() => setYou({ ...you, zodiac: z.id })}
                            style={{ filter: isDimmed ? 'blur(1px)' : 'none', opacity: isDimmed ? 0.5 : 1 }}
                            className={`p-4 flex flex-col items-center justify-center rounded-xl glass-3d-card ${
                              isSelected ? 'glass-3d-card-active' : ''
                            }`}
                          >
                            <VintageZodiacIcon id={z.id} active={isSelected} />
                            <span className="text-xs font-serif tracking-widest mt-2 block font-semibold">{z.label}</span>
                            <span className="text-[9px] opacity-40 font-mono tracking-wider uppercase mt-0.5">{z.god}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-2">B. 人格矩陣 MBTI</label>
                      <select
                        value={you.mbti}
                        onChange={(e) => setYou({ ...you, mbti: e.target.value })}
                        className="w-full bg-white/30 border border-[#2C2A29]/10 p-2 text-xs font-mono outline-none"
                      >
                        <option value="">保留未知</option>
                        {MBTIS.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-2">C. 年齡 Age</label>
                      <input 
                        type="number" 
                        value={you.age} 
                        onChange={(e) => setYou({ ...you, age: e.target.value })}
                        className="w-full bg-white/30 border border-[#2C2A29]/10 p-2 text-xs font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-2">D. 職業 Profession</label>
                      <input 
                        type="text" 
                        placeholder="例如：設計師"
                        value={you.profession} 
                        onChange={(e) => setYou({ ...you, profession: e.target.value })}
                        className="w-full bg-white/30 border border-[#2C2A29]/10 p-2 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-2">E. 核心興趣 Core Interest</label>
                      <input 
                        type="text" 
                        placeholder="例如：攝影"
                        value={you.interest} 
                        onChange={(e) => setYou({ ...you, interest: e.target.value })}
                        className="w-full bg-white/30 border border-[#2C2A29]/10 p-2 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 右分欄：TARGET */}
              <div className="glass-panel p-8 border border-[#2C2A29]/10">
                <span className="font-mono text-xs text-[#1D4ED8] tracking-widest block mb-2">// STATUE II</span>
                <h3 className="font-greek-title text-2xl font-bold mb-6">雕刻對象 Sculpt Target</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-3">A. 選擇對方的守護星座 Zodiac</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3" onMouseLeave={() => setHoveredZodiacId(null)}>
                      {ZODIACS.map((z) => {
                        const isSelected = target.zodiac === z.id;
                        const isDimmed = hoveredZodiacId && hoveredZodiacId !== z.id;
                        return (
                          <button
                            key={z.id}
                            type="button"
                            onMouseEnter={() => setHoveredZodiacId(z.id)}
                            onClick={() => setTarget({ ...target, zodiac: z.id })}
                            style={{ filter: isDimmed ? 'blur(1px)' : 'none', opacity: isDimmed ? 0.5 : 1 }}
                            className={`p-4 flex flex-col items-center justify-center rounded-xl glass-3d-card ${
                              isSelected ? 'glass-3d-card-active' : ''
                            }`}
                          >
                            <VintageZodiacIcon id={z.id} active={isSelected} />
                            <span className="text-xs font-serif tracking-widest mt-2 block font-semibold">{z.label}</span>
                            <span className="text-[9px] opacity-40 font-mono tracking-wider uppercase mt-0.5">{z.god}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-2">B. 人格矩陣 MBTI</label>
                      <select
                        value={target.mbti}
                        onChange={(e) => setTarget({ ...target, mbti: e.target.value })}
                        className="w-full bg-white/30 border border-[#2C2A29]/10 p-2 text-xs font-mono outline-none"
                      >
                        <option value="">保留未知</option>
                        {MBTIS.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-2">C. 年齡 Age</label>
                      <input 
                        type="number" 
                        value={target.age} 
                        onChange={(e) => setTarget({ ...target, age: e.target.value })}
                        className="w-full bg-white/30 border border-[#2C2A29]/10 p-2 text-xs font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-2">D. 職業 Profession</label>
                      <input 
                        type="text" 
                        placeholder="例如：工程師"
                        value={target.profession} 
                        onChange={(e) => setTarget({ ...target, profession: e.target.value })}
                        className="w-full bg-white/30 border border-[#2C2A29]/10 p-2 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-2">E. 核心興趣 Core Interest</label>
                      <input 
                        type="text" 
                        placeholder="例如：電玩"
                        value={target.interest} 
                        onChange={(e) => setTarget({ ...target, interest: e.target.value })}
                        className="w-full bg-white/30 border border-[#2C2A29]/10 p-2 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 場景設定 */}
            <div className="glass-panel p-8 border border-[#2C2A29]/10 mt-8">
              <h4 className="font-greek-title text-lg font-bold mb-6">// SCENARIO MATRIX 場景校準</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-2">A. 見面意圖 Purpose</label>
                  <select
                    value={you.purpose}
                    onChange={(e) => setYou({ ...you, purpose: e.target.value })}
                    className="w-full bg-white/30 border border-[#2C2A29]/10 p-2 text-xs outline-none"
                  >
                    <option value="">選擇目的</option>
                    {PURPOSES.map((p) => <option key={p.id} value={p.id}>{p.label} ({p.hint})</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-2">B. 物理環境 Environment</label>
                  <select
                    value={you.environment}
                    onChange={(e) => setYou({ ...you, environment: e.target.value })}
                    className="w-full bg-white/30 border border-[#2C2A29]/10 p-2 text-xs outline-none"
                  >
                    <option value="">選擇物理環境</option>
                    {ENVIRONMENTS.map((env) => <option key={env.id} value={env.id}>{env.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#2C2A29]/50 block mb-2">C. 對方心靈能量 Energy Level</label>
                  <select
                    value={you.energy}
                    onChange={(e) => setYou({ ...you, energy: e.target.value })}
                    className="w-full bg-white/30 border border-[#2C2A29]/10 p-2 text-xs outline-none"
                  >
                    <option value="">選擇能量</option>
                    {ENERGIES.map((eng) => <option key={eng.id} value={eng.id}>{eng.label}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 多模態截圖上傳 */}
            <div className="glass-panel p-8 border border-[#2C2A29]/10 mt-8">
              <h4 className="font-greek-title text-lg font-bold mb-4">// DATING TELEMETRY 對話波形遙測</h4>
              <p className="text-xs text-[#2C2A29]/50 mb-4">上傳與對方的對話紀錄截圖，AI 將親自讀取並微調演算防冷場分數！</p>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileSelection(e.dataTransfer.files?.[0]); }}
                onClick={() => fileInputRef.current?.click()}
                className={`relative overflow-hidden border border-dashed py-8 text-center cursor-pointer ${
                  dragOver ? 'border-[#2C2A29] bg-white/40' : 'border-[#2C2A29]/20 hover:border-[#2C2A29]/50'
                }`}
              >
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileSelection(e.target.files?.[0])} />
                {!imagePreview ? (
                  <p className="text-xs text-[#2C2A29]/80">拖放或點擊上傳聊天紀錄截圖 (Optional)</p>
                ) : (
                  <img src={imagePreview} alt="Preview" className="max-h-32 mx-auto object-contain" />
                )}
              </div>
            </div>

            {/* 送出 */}
            <div className="pt-16 flex flex-col items-center">
              <button
                type="button"
                disabled={!canSubmit}
                onClick={executeAnalysis}
                className={`px-24 py-5 font-serif text-lg tracking-widest border transition-all duration-500 ${
                  canSubmit ? 'bg-[#2C2A29] text-[#F6F3ED] border-[#2C2A29] hover:bg-transparent hover:text-[#2C2A29] hover:scale-105' : 'bg-transparent text-[#2C2A29]/20 border-[#2C2A29]/10 cursor-not-allowed'
                }`}
              >
                靈魂分析
              </button>
            </div>
          </main>
        </>
      )}

      {/* 3. TELEMETRY VIEW */}
      {currentView === 'telemetry' && (
        <main className="min-h-screen flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 border-2 border-[#1D4ED8] border-t-transparent rounded-full animate-spin mb-8" />
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#1D4ED8] animate-pulse">
            Constellation Alignment drawing in progress...
          </p>
        </main>
      )}

      {/* 4. RESULT VIEW */}
      {currentView === 'result' && analysisResult && (
        <main className="max-w-4xl mx-auto px-6 pb-36 pt-20 animate-fadeIn relative z-10">
          
          <button
            type="button"
            onClick={() => setCurrentView('input')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#2C2A29]/60 hover:text-[#2C2A29] transition-colors font-mono mb-12 border-b border-[#2C2A29]/10 pb-1 group"
          >
            ← 返回觀測首頁
          </button>

          <div className="glass-panel p-8 md:p-12 relative border border-[#2C2A29]/10 mb-12">
            
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#2C2A29]/10 pb-6 mb-8 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#2C2A29]/40 block mb-1">
                  Moor AI Telemetric Report
                </span>
                <h2 className="font-greek-title text-3xl md:text-4xl text-[#2C2A29] font-bold">
                  {analysisResult.targetName} · 首次對頻觀測報告
                </h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#2C2A29]/40 block mb-1">
                  防冷場生存機率
                </span>
                <span className="font-serif text-5xl text-[#1D4ED8] font-black">
                  {analysisResult.survivalRate}%
                </span>
              </div>
            </div>

            {/* 大方向評估 + 實體星座版畫 (套用無痕 Multiply 去背融合) */}
            <div className="mb-14">
              <h3 className="text-xs uppercase tracking-widest text-[#2C2A29]/40 font-mono mb-4">📍 宏觀氣場特徵 Assessment</h3>
              
              {target.zodiac && (
                <div className="w-full max-w-sm mx-auto mb-6 bg-transparent overflow-hidden border border-[#2C2A29]/10">
                  <img 
                    src={`/assets/${target.zodiac}.png`} 
                    alt={target.zodiac} 
                    className="w-full h-auto multiply-img object-contain"
                  />
                </div>
              )}
              
              <p className="font-serif text-2xl md:text-3xl text-[#2C2A29]/80 leading-relaxed bg-white/20 p-6 border border-white/40 shadow-inner font-normal">
                {analysisResult.macroAssessment}
              </p>
            </div>

            {/* 🃏 巨大擬真「古神話塔羅話題卡」 */}
            <div className="mb-14">
              <h3 className="text-xs uppercase tracking-widest text-[#2C2A29]/40 font-mono mb-6">🃏 專屬話題占星塔羅牌陣 Tarot Decks</h3>
              
              <div className="flex flex-col items-center">
                <div className="w-full max-w-xl h-[440px] bg-[#FAF8F5] border-2 border-[#2C2A29] p-8 relative flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 select-none" style={{ boxShadow: '0 30px 60px -15px rgba(44,42,41,0.2)' }}>
                  
                  <div className="absolute inset-2 border border-[#2C2A29]/10 pointer-events-none" />
                  <div className="absolute inset-3 border border-dashed border-[#2C2A29]/5 pointer-events-none" />
                  
                  <div className="flex justify-between items-center border-b border-[#2C2A29]/10 pb-3 relative z-10">
                    <span className="font-serif text-xs italic text-[#2C2A29]/50">Arcana No. 0{currentCardIdx + 1}</span>
                    <span className="font-mono text-xs font-semibold bg-[#1D4ED8]/10 text-[#1D4ED8] px-2.5 py-1">
                      對頻加權 +{analysisResult.cards[currentCardIdx]?.rate || 90}%
                    </span>
                  </div>

                  <div className="my-6 text-center px-4 relative z-10">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#2C2A29]/40 mb-3">— THE PROMPT ORACLE —</div>
                    <h4 className="font-serif text-2xl md:text-3xl font-bold text-[#2C2A29] leading-snug">
                      {analysisResult.cards[currentCardIdx]?.title}
                    </h4>
                  </div>

                  <div className="border-t border-[#2C2A29]/10 pt-4 bg-white/40 p-4 relative z-10 text-left">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#1D4ED8] block mb-1 font-semibold">🔍 心理機制與推薦原因</span>
                    <p className="text-xs text-[#2C2A29]/70 leading-relaxed font-sans mb-1">
                      {analysisResult.cards[currentCardIdx]?.reason}
                    </p>
                    {analysisResult.cards[currentCardIdx]?.avoidSaying && (
                      <p className="text-[11px] text-red-900 font-sans">
                        <strong>避開：</strong>{analysisResult.cards[currentCardIdx]?.avoidSaying}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-8 mt-8 relative z-10">
                  <button 
                    type="button"
                    onClick={() => setCurrentCardIdx(prev => (prev === 0 ? analysisResult.cards.length - 1 : prev - 1))}
                    className="w-12 h-12 border border-[#2C2A29] text-lg font-serif bg-transparent hover:bg-[#2C2A29] hover:text-[#F6F3ED] transition-all duration-300"
                  >
                    ←
                  </button>
                  <span className="font-mono text-sm text-[#2C2A29]/50">
                    {currentCardIdx + 1} / {analysisResult.cards.length}
                  </span>
                  <button 
                    type="button"
                    onClick={() => setCurrentCardIdx(prev => (prev === analysisResult.cards.length - 1 ? 0 : prev + 1))}
                    className="w-12 h-12 border border-[#2C2A29] text-lg font-serif bg-transparent hover:bg-[#2C2A29] hover:text-[#F6F3ED] transition-all duration-300"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* 💬 AI 守護者模擬聊天室 */}
            <div className="mb-14 border-t border-[#2C2A29]/10 pt-10">
              <h3 className="text-xs uppercase tracking-widest text-[#2C2A29]/40 font-mono mb-4">💬 奧林帕斯模擬聊天練習室 Simulator</h3>
              
              <div className="glass-panel border border-[#2C2A29]/15 rounded-none overflow-hidden max-w-xl mx-auto">
                <div className="bg-[#2C2A29] text-[#F6F3ED] px-4 py-3 text-xs font-mono flex justify-between items-center">
                  <span>Chatting Practice Room</span>
                  <span className="text-[#1D4ED8] animate-pulse">● LIVE</span>
                </div>
                
                <div className="h-64 overflow-y-auto p-4 space-y-4 bg-white/25">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-4 py-2 text-xs leading-relaxed ${
                        msg.sender === 'user' ? 'bg-[#2C2A29] text-[#F6F3ED]' : 'bg-white border border-[#2C2A29]/10 text-[#2C2A29]'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-[#2C2A29]/10 px-4 py-2 text-xs text-[#2C2A29]/50 font-mono animate-pulse">
                        守護者正在思考回覆中...
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#2C2A29]/10 flex bg-white/55">
                  <input
                    type="text"
                    placeholder="試著用塔羅話題打破僵局聊天..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                    className="flex-1 bg-transparent px-4 py-3 text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="bg-[#2C2A29] text-[#F6F3ED] px-6 text-xs uppercase tracking-wider font-mono hover:bg-[#1D4ED8] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* 禁忌雷區 */}
            <div className="mb-14">
              <h3 className="text-xs uppercase tracking-widest text-[#2C2A29]/40 font-mono mb-3">❌ 絕對禁忌地獄雷區 No-Go Zone</h3>
              <p className="text-xs md:text-sm text-red-900 bg-red-50/40 border border-red-200/40 p-4 leading-relaxed font-sans">
                {analysisResult.forbidden}
              </p>
            </div>

            {/* 分享面板 */}
            <div className="border-t border-[#2C2A29]/10 pt-8 mt-8 relative z-10">
              <div className="bg-white/50 border border-[#2C2A29]/10 p-6 text-center relative overflow-hidden">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1D4ED8] block mb-2 font-bold font-mono">📢 SHARE THE ORACLE SIGN</span>
                <h4 className="font-serif text-lg text-[#2C2A29] mb-4">將這份與對方的默契密碼發佈至大眾社群</h4>
                
                <div className="flex flex-wrap justify-center gap-3">
                  <button 
                    type="button"
                    onClick={() => handleShare('link')}
                    className="px-5 py-2.5 bg-[#2C2A29] text-[#F6F3ED] text-xs uppercase tracking-widest font-mono hover:opacity-90 transition-opacity"
                  >
                    🔗 複製專屬觀測連結
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleShare('ig')}
                    className="px-5 py-2.5 border border-[#2C2A29] text-[#2C2A29] text-xs uppercase tracking-widest font-mono bg-transparent hover:bg-[#2C2A29]/5 transition-colors"
                  >
                    📸 產生限時動態文案
                  </button>
                </div>

                {shareNotify && (
                  <p className="text-xs text-[#1D4ED8] font-mono mt-3 animate-pulse">
                    ✓ 專屬觀測數據與連結已複製！
                  </p>
                )}
              </div>
            </div>

          </div>
        </main>
      )}

      {/* 底部 */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-[#2C2A29]/10 text-[9px] font-mono uppercase tracking-[0.2em] text-[#2C2A29]/30 flex justify-between relative z-10">
        <span>GOOD SIGN STUDIO. ALL RIGHTS RESERVED.</span>
        <span>ATREUS PROTOCOL MATRIX 2026</span>
      </footer>
    </div>
  )
}
