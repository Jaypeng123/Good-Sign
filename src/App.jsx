// src/App.jsx

import { useState, useRef, useEffect } from 'react'
import {
  ZODIACS,
  MBTIS,
  PURPOSES,
  ENVIRONMENTS,
  ENERGIES,
  calculateFallbackScore,
  FALLBACK_TAROT_DECK,
  generateComprehensiveAnalysis // 🌟 修復 1：成功匯入備用分析大腦
} from './data'

// 十七世紀復古星圖線條木刻人像（當 active 時底色變深）
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

  // 標題探照燈
  const titleRef = useRef(null)
  const fileInputRef = useRef(null) // 🌟 修復 2：成功定義截圖 Input 參照
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

      // 建立多模態 Payload
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

      const data = await response.json();
      const rawText = data.candidates[0].content.parts[0].text.trim();
      const cleanJson = rawText.replace(/```json/g, '').replace(/
