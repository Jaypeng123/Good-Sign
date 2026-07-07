// src/data.js

export const ZODIACS = [
  { id: 'aries', label: '牡羊座', god: '公羊 Aries', element: 'fire', desc: '展現出如古星圖中奮力奔騰的公羊姿態，具備無畏的開創性與純粹的行動意志。' },
  { id: 'taurus', label: '金牛座', god: '野牛 Taurus', element: 'earth', desc: '如同破雲而出的雄渾野牛，靈魂深處錨定著對物質與美感的極高鑑賞力與沉穩耐性。' },
  { id: 'gemini', label: '雙子座', god: '雙子 Gemini', element: 'air', desc: '形同星圖中親密依偎的孿生子，思維在兩個維度間自由切換，熱愛流動的智識與資訊。' },
  { id: 'cancer', label: '巨蟹座', god: '巨蟹 Cancer', element: 'water', desc: '具備寫實甲殼的巨蟹意象，外殼堅固冷靜，內裡卻包裹著如同海洋潮汐般細膩的防衛與直覺。' },
  { id: 'leo', label: '獅子座', god: '雄獅 Leo', element: 'fire', desc: '步伐昂首的傲慢雄獅，天生需要成為空間中的核心座標，慷慨且極度看重尊嚴。' },
  { id: 'virgo', label: '處女座', god: '翼之女神 Virgo', element: 'earth', desc: '手持麥穗、展翅佇立的翼之女神，用極致的理性與冷靜，在混亂的凡間梳理出優雅的秩序。' },
  { id: 'libra', label: '天秤座', god: '正義天秤 Libra', element: 'air', desc: '懸浮於星空中央的黃金天秤，終生在人際、美感與核心法碼之間，尋求最不費力的極致平衡。' },
  { id: 'scorpio', label: '天蠍座', god: '毒蠍 Scorpius', element: 'water', desc: '帶著神祕引力的潛伏毒蠍，擁有看透言外之意的敏銳洞察力，情感絕對純粹且帶有強烈領域感。' },
  { id: 'sagittarius', label: '射手座', god: '半人馬射手 Sagittarius', element: 'fire', desc: '挽弓拉滿、蓄勢待發的半人馬戰士，靈魂永遠望向更高遠的哲學星空，嚮往絕對自由。' },
  { id: 'capricorn', label: '摩羯座', god: '海山羊 Capricornus', element: 'earth', desc: '古老神話中的海山羊，既能在陡峭的山巔攀登，亦能在深邃的海底泅泳，堅韌且耐得住時光洗鍊。' },
  { id: 'aquarius', label: '水瓶座', god: '持甕侍者 Waseerman', element: 'air', desc: '傾倒神聖泉水的持甕智者，思想前衛叛逆，靈魂獨立於大眾常規之外，只對真理對頻。' },
  { id: 'pisces', label: '雙魚座', god: '游動雙魚 Pisces', element: 'water', desc: '被命運絲帶相連、朝相反方向游動的雙魚，精神世界無垠開闊，交織著極高的同理心與夢境想像。' },
]

export const MBTIS = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP',
]

export const PURPOSES = [
  { id: 'romantic', label: '浪漫約會', hint: '微醺、曖昧' },
  { id: 'work', label: '職場 Networking', hint: '專業、得體' },
  { id: 'friend', label: '純網友面基', hint: '同好交流' },
  { id: 'forced', label: '被迫營業', hint: '尷尬社交' },
]

export const ENVIRONMENTS = [
  { id: 'quiet_cafe', label: '安靜獨立咖啡廳' },
  { id: 'loud_restaurant', label: '吵鬧熱炒 / 火鍋店' },
  { id: 'outdoor', label: '戶外市集 / 展覽' },
 ]
 
export const ENERGIES = [
  { id: 'high', label: '高能量', hint: '嗨咖模式' },
  { id: 'low', label: '低能量', hint: '靜謐沉穩' },
]

export function generateComprehensiveAnalysis({ zodiac, mbti, purpose, environment, energy, screenshotScores }) {
  const zInfo = ZODIACS.find(z => z.id === zodiac);
  const targetPersona = zInfo ? `${zInfo.label} (${zInfo.god})` : (mbti || '神祕觀測對象');
  
  // 計算假想的生存機率，借鑑 Moor AI 增加好勝心
  let survivalRate = 72;
  if (environment === 'loud_restaurant' && energy === 'low') survivalRate = 42;
  if (environment === 'quiet_cafe' && mbti?.includes('I')) survivalRate = 89;
  if (screenshotScores) {
    survivalRate = Math.max(12, Math.min(96, survivalRate - Math.floor(screenshotScores.freezeRate / 3)));
  }

  // 1. 宏觀大方向分析 (ChatGPT 諮商風)
  let macroAssessment = `走進當前的情境，我們會發現 ${targetPersona} 的核心氣場呈現出一種非常細膩的流動。`;
  if (zInfo) {
    macroAssessment += `在古典天體圖譜中，這類靈魂與「${zInfo.god}」的原始圖騰深深共鳴，這意味著在日常表象之下，他們${zInfo.desc}`;
  }
  if (mbti) {
    macroAssessment += `結合其 ${mbti} 的特質，他們在與人初次建立連結時，並不會盲目地釋放熱情，而是習慣在心中先建立一個隱形的觀察座標，確認彼此的邊界與舒適度。`;
  } else {
    macroAssessment += `雖然目前缺乏人格代碼（MBTI）的輔助加權，但其純粹的星象底蘊已經展現出極高的特質清晰度。`;
  }
  
  if (energy === 'high') {
    macroAssessment += ` 今日他們的精神頻道正處於高昂的接收狀態，更容易對具備思辨色彩、或是能帶動強大情緒張力的話題產生共鳴。`;
  } else {
    macroAssessment += ` 值得注意的是，今日他們的霛魂更傾向於一種靜謐、溫和且卸下防備的低能量沉澱，過於喧鬧的開場可能會讓他們悄悄築起防禦牆。`;
  }

  // 2. 多維度話題與原因剖析
  let topics = [];
  if (purpose === 'romantic') {
    topics = [
      {
        title: '聊聊彼此生命中「最著迷的一種感官特徵或物件細節」',
        reason: '對方的星象底蘊在浪漫維度下極度重視精神共振。談論具體而微的感官細節（如某一首特定曲目的器樂編排、或是某個下雨天老書房的氣味），能溫柔地繞過表面社交的寒暄，直接觸動其潛意識中柔軟的情感連結。'
      },
      {
        title: '分享一個只有極少數人知道的「私房生活儀式或怪癖」',
        reason: '這類型的人格在關係建立初期往往帶有不易察覺的客氣與防衛心。由你主動暴露一個無傷大雅、帶有反差感的私密特徵，能迅速在空氣中建立「心理安全感（Psychological Safety）」，進而促使他們也樂意向你展示真實的自己。'
      },
      {
        title: '探討「如果有一整天不被任何人打擾，你最想在哪個角落度過」',
        reason: '依據當前調諧的環境脈絡，對方的思緒此時最適合進行一場輕量的精神逃離。這道題目既能優雅地探知對方的私密審美，又能讓緊繃的初次會面轉化為一場無壓力的腦海漫遊。'
      }
    ];
  } else if (purpose === 'work') {
    topics = [
      {
        title: '探討目前行業或日常節奏中，最讓你感到興奮的一項「未來變革」',
        reason: '具備智識深度的人，內心深處都在尋求能夠與其在思維框架上對頻的夥伴。拋出具備前瞻性與宏觀視野的議題，能在一秒內建立起你在對方心中的專業分量與談話價值。'
      },
      {
        title: '聊聊自己在過往專業生涯中，印象最深刻的一段「轉折或低谷重組」',
        reason: '與其講述完美的成功，不如坦誠地聊聊有養分的失敗。這展現了極高的自我覺察力與心理韌性，能讓重視內在邏輯與誠實特質的他們，對你產生極大的信任感。'
      }
    ];
  } else {
    topics = [
      {
        title: '最近在你的興趣領域裡，有沒有哪一個作品或考據讓你徹底廢寢忘食？',
        reason: '同好面基最忌諱流於形式的問候。直接切入最硬核、最充滿熱情靈魂的特定領域，能瞬間點燃他們內心的分享欲，讓對話的能量密度瞬間拉滿。'
      },
      {
        title: '探討彼此在網路螢幕背後，與現實生活實際相處時，反差最大的一個特質',
        reason: '利用線上線下的落差作為話題切入點，能非常巧妙地消解數位虛擬感帶來的隔閡，是一道非常安全、幽默且極易引發相視一笑的人際橋樑。'
      }
    ];
  }

  // 3. 急救台詞
  let rescueLine = '「今天能坐在這裡一起聊聊天真的很開心，不用有壓力，我們就隨心所欲地跟著感覺走。」';
  if (screenshotScores && screenshotScores.freezeRate > 55) {
    rescueLine = `「其實實不相瞞，我出門前還在心裡排練了好幾次冷場該怎麼辦，但現在看到你，我覺得我們可以先聊聊今天這杯咖啡的風味。」`;
  }

  // 4. 雷區
  let forbidden = '請絕對避免在對話初期過度探聽其隱私細線（例如過往關係細節或具體薪資），那會讓注重安全邊界的守護神瞬間降下冰封閘門。';
  if (zodiac === 'libra' || zodiac === 'virgo') {
    forbidden = '請絕對避免在現場強迫他們做出兩難的抉擇（例如：強烈追問這兩道菜哪個好）。這會打破他們精心維持的內心和諧，引發潛意識的焦慮。';
  }

  return {
    targetName: zInfo ? zInfo.label : (mbti || '觀測對象'),
    godName: zInfo ? zInfo.god : '神祕星體',
    survivalRate,
    macroAssessment,
    topics,
    rescueLine,
    forbidden
  };
}

export function analyzeScreenshot(file) {
  let hash = 0;
  const name = file ? file.name : 'signal';
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  const freezeRate = (hash % 50) + 25;
  const balanceScore = ((hash >> 2) % 40) + 50;
  const auraLevel = ((hash >> 4) % 35) + 60;
  return { freezeRate, balanceScore, auraLevel };
}
