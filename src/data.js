// src/data.js

export const ZODIACS = [
  { id: 'aries', label: '牡羊座', god: '阿瑞斯 Ares', trait: '戰神意象', element: 'fire', desc: '充滿開創性與無畏的行動力，內心藏著不願妥協的英雄主義。' },
  { id: 'taurus', label: '金牛座', god: '狄蜜特 Demeter', trait: '豐收女神', element: 'earth', desc: '追求感官的極致和諧與穩定，擁有極高的審美眼光與務實靈魂。' },
  { id: 'gemini', label: '雙子座', god: '荷米斯 Hermes', trait: '神使傳情', element: 'air', desc: '思維如風般敏捷流轉，熱愛探索未知的資訊，靈魂永遠保持好奇。' },
  { id: 'cancer', label: '巨蟹座', god: '塞勒涅 Selene', trait: '月亮女神', element: 'water', desc: '情感細膩且具備強大的直覺包容力，內心深處極度重視安全感。' },
  { id: 'leo', label: '獅子座', god: '阿波羅 Apollo', trait: '光明之神', element: 'fire', desc: '天生自帶舞台焦點的光芒，慷慨熱情，同時極度捍衛尊嚴與榮譽。' },
  { id: 'virgo', label: '處女座', god: '阿斯特莉亞 Astraea', trait: '正義女神', element: 'earth', desc: '追求純粹與極致的秩序，用冷靜客觀的雙眼梳理混亂的凡間事物。' },
  { id: 'libra', label: '天秤座', god: '阿芙蘿黛蒂 Aphrodite', trait: '美與愛神', element: 'air', desc: '終生在尋求美感、人際與內心法碼的極致平衡，溫和而優雅。' },
  { id: 'scorpio', label: '天蠍座', god: '黑帝斯 Hades', trait: '冥王意志', element: 'water', desc: '具備看透人性的敏銳洞察力，情感濃烈且絕對忠誠，帶有神祕引力。' },
  { id: 'sagittarius', label: '射手座', god: '宙斯 Zeus', trait: '眾神之王', element: 'fire', desc: '嚮往思想與肉體的絕對自由，熱愛哲學思考，視人生為一場冒險。' },
  { id: 'capricorn', label: '摩羯座', god: '克洛諾斯 Cronus', trait: '時間之神', element: 'earth', desc: '沈穩、堅韌且耐得住孤寂，用無比的恆心在時間的洪流中築起城堡。' },
  { id: 'aquarius', label: '水瓶座', god: '烏拉諾斯 Uranus', trait: '天空之神', element: 'air', desc: '跳脫傳統框架的先驅者，思想前衛自由，靈魂不屬於任何單一集體。' },
  { id: 'pisces', label: '雙魚座', god: '波賽頓 Poseidon', trait: '海神波瀾', element: 'water', desc: '靈魂深處交織著無垠的想像力與同理心，情感如同海洋般包容萬物。' },
]

export const MBTIS = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP',
]

export const PURPOSES = [
  { id: 'romantic', label: '浪漫約會', hint: '微醺、曖昧' },
  { id: 'work', label: '職場 Networking', hint: '專業、得體' },
  { id: 'friend', label: '純網友面基', hint: '同好交流' },
  { id: 'forced', label: '被迫營業', hint: '長輩介紹、尷尬社交' },
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

// 根據使用者填答動態生成平易近人、具備 ChatGPT 風格的深度分析
export function generateComprehensiveAnalysis({ zodiac, mbti, purpose, environment, energy, screenshotScores }) {
  const zInfo = ZODIACS.find(z => z.id === zodiac);
  const targetName = zInfo ? `${zInfo.label} (${zInfo.god.split(' ')[0]})` : (mbti || '神祕對象');
  
  // 1. 宏觀大方向分析 (Macro Assessment)
  let macroAssessment = '';
  if (zInfo) {
    macroAssessment += `對方的靈魂核心與古希臘神話中的「${zInfo.god}」深刻共鳴。在日常互動中，他們展現出${zInfo.desc}`;
  }
  if (mbti) {
    macroAssessment += `結合其 ${mbti} 的人格特質，這意味著他們在面對未知人際關係時，傾向於用更理性且有條理的方式整理思緒。`;
  } else {
    macroAssessment += `目前雖然缺乏 MBTI 數據，但光從星象底蘊來看，其特質已經足夠鮮明。`;
  }
  
  if (energy === 'high') {
    macroAssessment += ` 今日見面，他們的情緒頻道處於高能量狀態，更容易被熱情、具備強大故事張力的話題吸引。`;
  } else {
    macroAssessment += ` 今日他們的靈魂更嚮往一場靜謐、有深度且卸下防備的低能量交流。`;
  }

  // 2. 深入客製化話題庫（含原因剖析）
  let topics = [];
  if (purpose === 'romantic') {
    topics = [
      {
        title: '聊聊彼此生命中「最著迷的一種感官體驗」',
        reason: `因為對方的星象特質在浪漫氛圍下非常重視靈魂共振。在當前環境中談論具體而微的感受（如某首特定的歌、某個下雨天的氣味），能迅速繞過表面的社交寒暄，觸動其潛意識中的情感開關。`
      },
      {
        title: '分享一個只有少數人知道的「私房生活怪癖」',
        reason: `這類型的人格在親密關係初期帶有微妙的防衛心。由你主動暴露一個無傷大雅的私密特徵，能建立「心理安全感」，促使他們也樂意向你展現最真實的反差面。`
      },
      {
        title: '探討「假如擁有無限時間，最想去哪個平行時空旅行」',
        reason: `結合場景的能量流動，對方的思維此時非常適合天馬行空的思想實驗。這不僅能測試彼此的審美契合度，更能讓緊繃的初次見面轉化為一場輕鬆的思緒漫遊。`
      }
    ];
  } else if (purpose === 'work') {
    topics = [
      {
        title: '探討目前領域中，最讓人興奮的一項「未來趨勢或變革」',
        reason: `擁有卓越思維的專業人士，內心深處都渴望在同儕中找到能對頻的智識夥伴。拋出宏觀且具備前瞻性的議題，能一秒建立你在他們心中的專業份量。`
      },
      {
        title: '分享自己在專業生涯中「最漂亮的一次失敗與重組經驗」',
        reason: `與其一味展現完美，不如坦承聊聊有養分的低谷。這展現了極高的心理韌性，能讓重視內在邏輯的他們對你產生極大的信任與敬佩。`
      }
    ];
  } else {
    topics = [
      {
        title: '最近在你的興趣圈子裡，最讓你廢寢忘食的一個作品或考據',
        reason: `同好面基最忌諱客套。直接切入最硬核、最充滿熱情的領域，能激發他們骨子裡的分享欲，讓對話能量瞬間拉滿。`
      },
      {
        title: '聊聊彼此在網路上跟現實生活中，落差最大的一個特質',
        reason: `利用線上線下的反差作為破冰點，能有效消解網路虛擬感帶來的隔閡，是一道非常安全且容易引發笑聲的人際橋樑。`
      }
    ];
  }

  // 3. 急救台詞
  let rescueLine = '「今天能坐在這裡一起聊聊真的很難得，放輕鬆，我們就隨心所欲地走這段旅程。」';
  if (screenshotScores && screenshotScores.freezeRate > 60) {
    rescueLine = `「實不相瞞，我剛剛上車前還在腦補待會冷場該怎麼辦，但一看到你，我覺得我們可以先聊聊這杯咖啡的主題。」`;
  }

  // 4. 地獄雷區
  let forbidden = '請絕對避免在對話初期過度探聽其隱私底線（例如過往關係或薪資細節），那會讓注重和諧的希臘守護神瞬間築起防衛高牆。';
  if (zInfo?.id === 'libra') {
    forbidden = '請絕對避免強迫他們在現場做出兩難的二選一抉擇（例如：這兩家店哪家比較好），這會引發天秤正義女神的焦慮，打破精心維持的平衡表面。';
  }

  return {
    targetName,
    macroAssessment,
    topics,
    rescueLine,
    forbidden
  };
}

export function analyzeScreenshot(file) {
  let hash = 0;
  const name = file ? file.name : 'default';
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  const freezeRate = (hash % 60) + 20;
  const balanceScore = ((hash >> 2) % 50) + 45;
  const auraLevel = ((hash >> 4) % 40) + 55;
  return { freezeRate, balanceScore, auraLevel };
}
