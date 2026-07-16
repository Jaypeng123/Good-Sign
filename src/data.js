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

// 多維度在地基礎配對演算法
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
    if (you.mbti[1] === target.mbti[1]) score += 8;
    if (you.mbti[0] !== target.mbti[0]) score += 4;
  }

  if (you.age && target.age) {
    const gap = Math.abs(parseInt(you.age) - parseInt(target.age));
    if (gap <= 3) score += 4;
    else if (gap > 10) score -= 3;
  }

  return Math.max(50, Math.min(98, score));
}

// 🌟 關鍵修正：確實定義並匯出 generateComprehensiveAnalysis，確保無 Key 時也能完美渲染！
export function generateComprehensiveAnalysis({ you, target }) {
  const calculatedScore = calculateFallbackScore(you, target);
  const zInfo = ZODIACS.find(z => z.id === target.zodiac);
  const targetName = zInfo ? zInfo.label : (target.mbti || '觀測對象');

  let macroAssessment = `根據星宿與當代性格軌道的密契觀測，雙方的氣場呈現出一種極具美感的動態共鳴。`;
  if (zInfo) {
    macroAssessment += `當前對象深深共鳴於「${zInfo.god}」的守護能量。這意味著在日常社交的防禦機制背後，他們${zInfo.desc}`;
  }
  if (target.mbti) {
    macroAssessment += `結合其 ${target.mbti} 的人格特質與今日較低調的能量級別，這次見面更適合深入的精神共振，而非流於表面的世俗客套。`;
  }

  const cards = [
    {
      title: `探討彼此在 ${you.profession || '日常領域'} 與 ${target.profession || '專業學門'} 之間的思維反差`,
      rate: calculatedScore + 3,
      reason: `利用雙方的職業背景差異，以輕鬆好奇的角度切入，能瞬間建立有深度的智識對頻。`,
      avoidSaying: `「那你們這行是不是都很閒/很賺？」等刻板偏見。`
    },
    {
      title: `分享一個最能代表你對「${target.interest || '特定領域'}」熱忱的私房瞬間`,
      rate: calculatedScore,
      reason: `當人談論自己真正熱愛的事物時，眼神中的光芒與能量波長最具感染力。`,
      avoidSaying: `漫不經心地滑手機或給予敷衍的回應。`
    },
    {
      title: `聊聊在 ${you.mbti || '當前'} 與 ${target.mbti || '對象'} 的世界裡，最容易感到能量耗盡的社交情境`,
      rate: calculatedScore - 2,
      reason: `共同吐槽社交中的「低效消耗」，能在心理學上迅速拉近距離，建立共同防禦陣線。`,
      avoidSaying: `強行給對方灌輸過度樂觀的社交正能量。`
    },
    {
      title: `假如可以自由支配時間，最想在當前環境進行什麼樣的精神逃離`,
      rate: calculatedScore + 1,
      reason: `將話題錨定在當前見面的物理環境延伸，能創造沉浸式的臨場感與浪漫共鳴。`,
      avoidSaying: `批判對方的放鬆方式不切實際。`
    },
    {
      title: `探討彼此心目中，覺得「真正被他人理解」的微小瞬間是什麼模樣`,
      rate: calculatedScore + 5,
      reason: `直擊靈魂核心的極致溫柔對頻，能讓守護神對你徹底卸下心防。`,
      avoidSaying: `急於保證自己就是那個完美理解者。`
    }
  ];

  return {
    targetName,
    survivalRate: calculatedScore,
    macroAssessment,
    cards,
    rescueLine: `「實不相瞞，我出門前還在心裡演練了好幾次冷場該怎麼辦，但現在看到你，我覺得可以先放鬆聊聊今天這杯咖啡的風味。」`,
    forbidden: `請絕對避免在對話初期過度探聽其隱私底線（例如過往關係細節），那會讓注重邊界的守護神瞬間降下冰封閘門。`
  };
}
