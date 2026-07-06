export const ZODIACS = [
  { id: 'aries', label: '牡羊座', element: 'fire' },
  { id: 'taurus', label: '金牛座', element: 'earth' },
  { id: 'gemini', label: '雙子座', element: 'air' },
  { id: 'cancer', label: '巨蟹座', element: 'water' },
  { id: 'leo', label: '獅子座', element: 'fire' },
  { id: 'virgo', label: '處女座', element: 'earth' },
  { id: 'libra', label: '天秤座', element: 'air' },
  { id: 'scorpio', label: '天蠍座', element: 'water' },
  { id: 'sagittarius', label: '射手座', element: 'fire' },
  { id: 'capricorn', label: '摩羯座', element: 'earth' },
  { id: 'aquarius', label: '水瓶座', element: 'air' },
  { id: 'pisces', label: '雙魚座', element: 'water' },
]

export const MBTIS = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
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

// 元素相性權重矩陣 (Elemental compatibility weight matrix)
const ELEMENT_MATRIX = {
  fire: { fire: 82, earth: 48, air: 88, water: 45 },
  earth: { fire: 48, earth: 80, air: 46, water: 90 },
  air: { fire: 88, earth: 46, air: 78, water: 50 },
  water: { fire: 45, earth: 90, air: 50, water: 84 },
}

const SNARKY_COMMENTS = [
  { min: 90, text: '這數字高到有點可疑，麻煩兩位不要在破冰現場當著大家的面官宣。' },
  { min: 80, text: '契合度直接開外掛，冷場的機率比中樂透還低，放心聊。' },
  { min: 70, text: '天菜級的化學反應，唯一風險是話題太多聊到店家打烊。' },
  { min: 60, text: '整體來說很順，只是偶爾會出現「喔…原來如此」的三秒尷尬，撐過去就好。' },
  { min: 50, text: '及格邊緣，建議雙方主動一點，不然話題會像手機沒訊號一樣時斷時續。' },
  { min: 40, text: '這組合需要一點運氣加持，開場前先深呼吸，把期望值調低一點會更好過。' },
  { min: 0, text: '契合度慘烈但不代表不能聊，純粹考驗雙方的臨場反應與求生欲。' },
]

const TOPIC_BANK = {
  romantic: {
    quiet_cafe: [
      '最近讓你心動又不敢承認的一件小事',
      '如果今晚不用回家，你會想做什麼',
      '你心目中最理想的週末早晨長怎樣',
      '最近一次讓你重新相信浪漫的瞬間',
    ],
    loud_restaurant: [
      '兩人默契比拚：猜猜對方碗裡最先吃掉什麼',
      '最近讓你上頭的一首歌或一部劇',
      '第一次見面前，你腦補了幾種可能的尷尬場面',
      '如果要幫今晚打分數，滿分十分你給幾分、為什麼',
    ],
    outdoor: [
      '如果可以現在買下一件攤位上的東西，你會選哪個',
      '你上一次因為一個地方而突然想拍照的瞬間',
      '兩人一起走走，你比較想聊天還是安靜享受',
      '最近一次讓你覺得「這城市其實不錯」的瞬間',
    ],
  },
  work: {
    quiet_cafe: [
      '最近在忙的專案裡，最有成就感的一部分',
      '你怎麼看待這個產業接下來一年的變化',
      '你是怎麼踏進現在這個領域的',
      '你覺得一個好的合作夥伴最重要的特質是什麼',
    ],
    loud_restaurant: [
      '這行最容易被外人誤解的一點是什麼',
      '你最近工作上學到最有用的一個經驗',
      '如果可以換一個職位體驗一天，你會選哪個',
      '你們公司最近有什麼有趣的內部趣聞',
    ],
    outdoor: [
      '你平常怎麼安排工作與生活的界線',
      '這個展覽 / 市集有沒有讓你想到工作上的靈感',
      '你覺得這個產業未來最大的機會在哪',
      '你最近有沒有想嘗試的新技能或新領域',
    ],
  },
  friend: {
    quiet_cafe: [
      '你是怎麼入坑這個興趣的，關鍵一集/一篇是什麼',
      '你收藏清單裡最近最想推薦的一部作品',
      '你覺得這個圈子裡最容易被誤解的地方',
      '你最近一次為了同好而熬夜做的事',
    ],
    loud_restaurant: [
      '你的社群帳號最近發的迷因是哪一個',
      '你收藏的爛梗圖裡最好笑的是哪張',
      '你最近安利朋友卻沒人理你的作品是什麼',
      '線上認識到線下見面，反差最大的地方是什麼',
    ],
    outdoor: [
      '這裡有沒有讓你想拍照發限動的角落',
      '你平常都在哪裡蒐集這類新資訊或周邊',
      '你會不會想把今天逛到的東西推薦給社群',
      '你覺得同好見面跟平常線上聊天最大的差別是什麼',
    ],
  },
  forced: {
    quiet_cafe: [
      '不如先聊聊介紹人到底跟你說了我什麼',
      '你平常放假最想耍廢的方式是什麼',
      '如果這頓能提前結束，你最想去哪裡',
      '你覺得長輩介紹最容易出現的尷尬瞬間是什麼',
    ],
    loud_restaurant: [
      '這種場合你通常怎麼撐過前十分鐘',
      '你有沒有練過什麼萬用的社交安全話題',
      '介紹人給你的情報準確度大概打幾分',
      '如果等等要交換聯絡方式，你會怎麼開口',
    ],
    outdoor: [
      '你平常被安排相親 / 見面的次數大概多頻繁',
      '這種場合你比較想早點結束還是隨緣聊聊',
      '你覺得這附近有沒有能順勢逃跑的理由',
      '長輩對你的期待跟你自己想的落差大嗎',
    ],
  },
}

const FORBIDDEN_TOPICS = {
  romantic: '前任的一切細節，包含「你們怎麼分的」——現場氣氛會瞬間降到冰點。',
  work: '薪資數字與公司內部八卦，這是唯一能讓專業形象一秒破功的話題。',
  friend: '批評對方的本命角色或作品，這是同好圈唯一不能踩的地雷。',
  forced: '追問「什麼時候要結婚 / 什麼時候要穩定下來」，長輩視角自動觸發但現場只會更尷尬。',
}

const RESCUE_LINES = [
  { max: 30, text: '「欸我發現我們都安靜太久了，要不要換我先講一件蠢事來救場？」' },
  { max: 55, text: '「我覺得我們節奏还在抓，不如先聊個輕鬆的——你剛剛在忙什麼？」' },
  { max: 75, text: '「這個話題我還蠻好奇的，可以多說一點嗎？」——順勢把話題丟回給對方。' },
  { max: 100, text: '「你講話的方式蠻有趣的欸，一直都這麼會聊嗎？」——直球稱讚打開下一輪話題。' },
]

function seedFromString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return hash
}

function mulberry32(seed) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function computeCompatibility({ myZodiac, otherZodiac, myMbti, otherMbti, energy1, energy2 }) {
  const z1 = ZODIACS.find((z) => z.id === myZodiac)
  const z2 = ZODIACS.find((z) => z.id === otherZodiac)
  const base = ELEMENT_MATRIX[z1.element][z2.element]

  let sharedLetters = 0
  for (let i = 0; i < 4; i++) {
    if (myMbti[i] === otherMbti[i]) sharedLetters++
  }
  const mbtiBonus = sharedLetters * 3

  const rng = mulberry32(seedFromString(`${myZodiac}-${otherZodiac}-${myMbti}-${otherMbti}`))
  const jitter = Math.floor(rng() * 13) - 6

  let score = base + mbtiBonus + jitter
  score = Math.max(38, Math.min(98, score))

  const comment = SNARKY_COMMENTS.find((c) => score >= c.min)?.text ?? ''

  return { score, comment }
}

export function pickTopics({ purpose, environment, energy }) {
  const pool = TOPIC_BANK[purpose]?.[environment] ?? []
  const rng = mulberry32(seedFromString(`${purpose}-${environment}-${energy}`))
  const shuffled = [...pool].sort(() => rng() - 0.5)
  return shuffled.slice(0, 3)
}

export function getForbiddenTopic(purpose) {
  return FORBIDDEN_TOPICS[purpose]
}

export function analyzeScreenshot(file) {
  const seed = seedFromString(`${file.name}-${file.size}-${file.lastModified}`)
  const rng = mulberry32(seed)
  const freezeRate = Math.floor(rng() * 100)
  const balanceScore = Math.floor(rng() * 100)
  const auraLevel = Math.floor(rng() * 100)
  return { freezeRate, balanceScore, auraLevel }
}

export function getRescueLine(freezeRate) {
  return RESCUE_LINES.find((r) => freezeRate <= r.max)?.text ?? RESCUE_LINES[RESCUE_LINES.length - 1].text
}
