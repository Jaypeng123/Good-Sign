// src/data.js

// 12 星座古典守護者定義與核心四象
export const ZODIACS = [
  { id: 'aries', label: '牡羊座', god: '金羊 Ares', element: 'fire', desc: '星圖中奮力奔騰的黃金公羊，具備無畏的開創性與純粹的行動意志。' },
  { id: 'taurus', label: '金牛座', god: '山嶽 Demeter', element: 'earth', desc: '破雲而出的雄渾野牛，靈魂深處錨定著對物質與美感的極高鑑賞力。' },
  { id: 'gemini', label: '雙子座', god: '孿生 Hermes', element: 'air', desc: '星圖中親密依偎的孿生子，思維在兩個維度間自由切換，熱愛資訊。' },
  { id: 'cancer', label: '巨蟹座', god: '巨蟹 Selene', element: 'water', desc: '具備堅固冷靜的外殼，內裡卻包裹著如同海洋潮汐般細膩的直覺。' },
  { id: 'leo', label: '獅子座', god: '雄獅 Apollo', element: 'fire', desc: '步伐昂首的傲慢雄獅，天生需要成為空間的核心座標，看重尊嚴。' },
  { id: 'virgo', label: '處女座', god: '翼之女神 Astraea', element: 'earth', desc: '手持麥穗、展翅佇立的女神，用極致的理性在凡間梳理出優雅秩序。' },
  { id: 'libra', label: '天秤座', god: '黃金秤 Aphrodite', element: 'air', desc: '懸浮於星空中央的黃金天秤，終生在人際、美感間尋求最不費力的平衡。' },
  { id: 'scorpio', label: '天蠍座', god: '隱曜 Hades', element: 'water', desc: '帶著神祕引力的潛伏毒蠍，情感絕對純粹且帶有強烈的精神防禦。' },
  { id: 'sagittarius', label: '射手座', god: '半人馬 Zeus', element: 'fire', desc: '挽弓拉滿、蓄勢待發的半人馬戰士，靈魂永遠望向更高遠的冒險星空。' },
  { id: 'capricorn', label: '摩羯座', god: '海山羊 Cronus', element: 'earth', desc: '古老神秘的海山羊，既能在陡峭山巔攀登，亦能在深邃海底泅泳。' },
  { id: 'aquarius', label: '水瓶座', god: '持甕侍者 Uranus', element: 'air', desc: '傾倒泉水的持甕智者，思想前衛叛逆，靈魂不屬於任何單一框架。' },
  { id: 'pisces', label: '雙魚座', god: '雙魚 Poseidon', element: 'water', desc: '被絲帶相連、朝相反方向游動的雙魚，精神世界無垠且具備強大同理心。' },
];

export const MBTIS = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

export const PURPOSES = [
  { id: 'romantic', label: '浪漫約會', hint: '微醺、曖昧' },
  { id: 'work', label: '專業社交', hint: '得體、人脈' },
  { id: 'friend', label: '網友見面', hint: '同好、無壓' },
  { id: 'forced', label: '公事營業', hint: '客套、解任務' },
];

export const ENVIRONMENTS = [
  { id: 'quiet_cafe', label: '安靜獨立咖啡廳' },
  { id: 'loud_restaurant', label: '吵鬧居酒屋/熱炒' },
  { id: 'outdoor', label: '戶外展覽/市集' },
];

export const ENERGIES = [
  { id: 'high', label: '高能量 (開朗熱情)', hint: '主動積極' },
  { id: 'low', label: '低能量 (寧靜沉穩)', hint: '慢熱傾聽' },
];

// 預設在地備用話題庫（當網路斷線或 API 限制時的安全 Fallback 機制）
export const FALLBACK_TAROT_DECK = [
  { title: '聊聊彼此生命中最著迷的一種感官特徵或物件細節', rate: 95, reason: '繞過表面的社交客套，直接以美學特徵開啟高度共情。', avoidSaying: '過度打聽對方的具體薪水與資產。' },
  { title: '分享一個只有極少數人知道的私房生活儀式與怪癖', rate: 92, reason: '主動暴露反差萌的怪癖，能在心理學上建立強大的安全感。', avoidSaying: '對對方的習慣露出嫌惡的表情。' },
  { title: '假如有一整天不被任何人打擾，你最想在哪個角落度過', rate: 89, reason: '無壓力的精神逃離，能輕鬆探知對方的審美與防禦機制。', avoidSaying: '強行推銷自己的旅行經歷。' },
  { title: '最近在你的興趣圈子裡，有沒有哪一個作品讓你廢寢忘食', rate: 94, reason: '切入硬核興趣領域，最能點燃靈魂深處的分享與敘事欲。', avoidSaying: '對對方的愛好潑冷水或糾正細節。' },
  { title: '聊聊你在過往生涯中，印象最深刻的一段低谷重組經驗', rate: 90, reason: '比起完美的成功，有養分的低谷更有利於建立深層精神連結。', avoidSaying: '將話題變成無止盡的負能量抱怨。' }
];

// 多維度在地基礎配對演算法（用來給 AI 生成報告前，做基準加權參考）
export function calculateFallbackScore(you, target) {
  let score = 75;
  const elements = {
    aries: 'fire', leo: 'fire', sagittarius: 'fire',
    taurus: 'earth', virgo: 'earth', capricorn: 'earth',
    gemini: 'air', libra: 'air', aquarius: 'air',
    cancer: 'water', scorpio: 'water', pisces: 'water'
  };

  const youEl = elements[you.zodiac] || 'unknown';
  const tarEl = elements[target.zodiac] || 'unknown';

  if (youEl !== 'unknown' && tarEl !== 'unknown') {
    if (youEl === tarEl) score += 10;
    else if (
      (youEl === 'fire' && tarEl === 'air') || (youEl === 'air' && tarEl === 'fire') ||
      (youEl === 'earth' && tarEl === 'water') || (youEl === 'water' && tarEl === 'earth')
    ) score += 7;
    else score -= 4;
  }

  if (you.mbti && target.mbti) {
    if (you.mbti[1] === target.mbti[1]) score += 8; // N/S 契合
    if (you.mbti[0] !== target.mbti[0]) score += 4; // E/I 互補
  }

  if (you.age && target.age) {
    const gap = Math.abs(parseInt(you.age) - parseInt(target.age));
    if (gap <= 3) score += 4;
    else if (gap > 10) score -= 3;
  }

  return Math.max(50, Math.min(98, score));
}
