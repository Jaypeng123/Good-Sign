// src/data.js

// `symbol` is a monochrome text-presentation glyph (U+FE0E forces non-emoji rendering).
// `image` points at the real parchment-style illustration living at /public/<id>.png —
// blended into the page via mix-blend-mode:multiply in ChooseSoul.
// `traits` are the four Greek-mythology-flavoured dimensions shown in the insight panel.
export const ZODIACS = [
  { id: 'aries', label: '牡羊座', god: '公羊 Aries', element: 'fire', desc: '展現出如古星圖中奮力奔騰的公羊姿態，具備無畏的開創性與純粹的行動意志。', symbol: '♈︎', image: '/aries.png', traits: {
    aphrodite: '戀愛時衝很快，一句「在幹嘛」都能腦補成告白現場，黏人期通常只維持三天，新鮮感一過就開始找下一個目標。',
    athena: '工作上見不得別人比自己快，交辦出去的事情永遠自己搶著做，控制狂指數爆表但美其名叫「效率」。',
    hestia: '對家人朋友嘴很硬但事情做很多，永遠是那個嘴巴說不要、身體卻已經在處理的人。',
    core: '死穴是輸的感覺，輸了什麼都可以，就是輸了面子不行，傲嬌到會為了嘴硬而硬拗到底。',
  } },
  { id: 'taurus', label: '金牛座', god: '野牛 Taurus', element: 'earth', desc: '如同破雲而出的雄渾野牛，靈魂深處錨定著對物質與美感的極高鑑賞力與沉穩耐性。', symbol: '♉︎', image: '/taurus.png', traits: {
    aphrodite: '黏人度看心情，但一旦認定你就會用食物和禮物瘋狂表達愛意，隱藏訊號是幫你記住所有小細節。',
    athena: '職場控制狂等級中等，但對於自己負責的區塊寸土不讓，改一個字都要問三次為什麼。',
    hestia: '私底下其實很依賴熟悉的人事物，換一間常去的店都會不開心，家人面前完全放飛自我。',
    core: '死穴是被逼著改變步調，慢工出細活是信仰，越催他越故意放慢，傲嬌到懶得解釋。',
  } },
  { id: 'gemini', label: '雙子座', god: '雙子 Gemini', element: 'air', desc: '形同星圖中親密依偎的孿生子，思維在兩個維度間自由切換，熱愛流動的智識與資訊。', symbol: '♊︎', image: '/gemini.png', traits: {
    aphrodite: '戀愛時話術一流，黏人度忽高忽低全看新鮮感，隱藏訊號是突然開始密集傳迷因給你。',
    athena: '職場上點子超多但執行力看心情，控制狂指數低，比較像放養型主管或同事。',
    hestia: '對家人朋友是兩種人格，熟人面前話多到停不下來，陌生場合秒變安靜臉。',
    core: '死穴是被說膚淺或善變，明明博學卻最怕被貼標籤，傲嬌起來會瘋狂科普證明自己。',
  } },
  { id: 'cancer', label: '巨蟹座', god: '巨蟹 Cancer', element: 'water', desc: '具備寫實甲殼的巨蟹意象，外殼堅固冷靜，內裡卻包裹著如同海洋潮汐般細膩的防衛與直覺。', symbol: '♋︎', image: '/cancer.png', traits: {
    aphrodite: '黏人度天花板等級，戀愛腦一發動就會想把對方納入生活的每個細節，隱藏訊號是默默幫你囤食物。',
    athena: '職場控制狂指數中高，特別在意團隊氣氛，容易把同事的情緒也扛在自己身上。',
    hestia: '對家人朋友是真的用生命在對待，記得每個人的生日和喜好，護短程度驚人。',
    core: '死穴是被說不被需要，表面說沒關係其實會偷偷難過很久，傲嬌到會用鬧脾氣代替直說。',
  } },
  { id: 'leo', label: '獅子座', god: '雄獅 Leo', element: 'fire', desc: '步伐昂首的傲慢雄獅，天生需要成為空間中的核心座標，慷慨且極度看重尊嚴。', symbol: '♌︎', image: '/leo.png', traits: {
    aphrodite: '黏人度看場合，公開場合超大方放閃，私下反而需要被哄，隱藏訊號是特別愛在你面前耍帥。',
    athena: '職場控制狂指數頂級，天生想當主角，交辦出去的事情還是會忍不住盯場。',
    hestia: '對熟人超級講義氣，請客從不手軟，但也偷偷希望大家記得他的好。',
    core: '死穴是被忽視，比起被討厭更怕沒有存在感，傲嬌到寧願裝沒事也不會主動求關注。',
  } },
  { id: 'virgo', label: '處女座', god: '翼之女神 Virgo', element: 'earth', desc: '手持麥穗、展翅佇立的翼之女神，用極致的理性與冷靜，在混亂的凡間梳理出優雅的秩序。', symbol: '♍︎', image: '/virgo.png', traits: {
    aphrodite: '黏人度低調但很勤勞，戀愛時會用「幫你解決問題」代替說甜話，隱藏訊號是開始糾正你的生活習慣。',
    athena: '職場控制狂本尊，細節魔人，別人的作業不改到滿意會渾身不對勁。',
    hestia: '對家人朋友嘴巴挑剔但行動誠實，會默默把你該做的事情都做完再念你一頓。',
    core: '死穴是被說不夠好，明明已經很努力還是覺得可以更完美，傲嬌到永遠先自我批評。',
  } },
  { id: 'libra', label: '天秤座', god: '正義天秤 Libra', element: 'air', desc: '懸浮於星空中央的黃金天秤，終生在人際、美感與核心法碼之間，尋求最不費力的極致平衡。', symbol: '♎︎', image: '/libra.png', traits: {
    aphrodite: '黏人度中等但很會製造浪漫氛圍，戀愛時特別在意公平，隱藏訊號是開始認真配合你的喜好。',
    athena: '職場控制狂指數偏低，很怕當壞人，但決策拖延症容易讓人抓狂。',
    hestia: '對熟人來說是超級好相處的和事佬，私下其實很難真正表態自己想要什麼。',
    core: '死穴是被說偏心或不公平，最怕選邊站，傲嬌到寧願自己委屈也要維持表面和諧。',
  } },
  { id: 'scorpio', label: '天蠍座', god: '毒蠍 Scorpius', element: 'water', desc: '帶著神祕引力的潛伏毒蠍，擁有看透言外之意的敏銳洞察力，情感絕對純粹且帶有強烈領域感。', symbol: '♏︎', image: '/scorpio.png', traits: {
    aphrodite: '黏人度隱藏在細節裡，表面高冷私下超級占有慾，隱藏訊號是開始默默關注你在忙什麼。',
    athena: '職場控制狂等級極高，喜歡掌握全局資訊，不喜歡被蒙在鼓裡的感覺。',
    hestia: '對真正的自己人赴湯蹈火，但要先通過他漫長的觀察期才算數。',
    core: '死穴是被背叛或被看穿心事，明明很敏感卻硬要裝作雲淡風輕，傲嬌到用冷漠掩飾在意。',
  } },
  { id: 'sagittarius', label: '射手座', god: '半人馬射手 Sagittarius', element: 'fire', desc: '挽弓拉滿、蓄勢待發的半人馬戰士，靈魂永遠望向更高遠的哲學星空，嚮往絕對自由。', symbol: '♐︎', image: '/sagittarius.png', traits: {
    aphrodite: '黏人度看自由度夠不夠，戀愛時最怕被綁住，隱藏訊號是開始規劃兩人的下一趟旅行。',
    athena: '職場控制狂指數低，比較在意方向對不對，細節通常交給別人煩惱。',
    hestia: '對朋友家人很夠意思但常常人在心不在，忘記約定是家常便飯。',
    core: '死穴是被限制自由，一旦感覺被綁住就會想逃，傲嬌到用「開玩笑」包裝真心話。',
  } },
  { id: 'capricorn', label: '摩羯座', god: '海山羊 Capricornus', element: 'earth', desc: '古老神話中的海山羊，既能在陡峭的山巔攀登，亦能在深邃的海底泅泳，堅韌且耐得住時光洗鍊。', symbol: '♑︎', image: '/capricorn.png', traits: {
    aphrodite: '黏人度低但很實際，戀愛像簽長期合約，隱藏訊號是開始跟你討論未來規劃。',
    athena: '職場控制狂天花板，事必躬親、目標感超強，看不慣沒效率的流程。',
    hestia: '對家人責任感重到有點沉重，習慣把情緒收起來自己扛。',
    core: '死穴是被說沒有成就或不夠努力，明明很拼還是覺得不夠，傲嬌到用工作逃避情緒。',
  } },
  { id: 'aquarius', label: '水瓶座', god: '持甕侍者 Waseerman', element: 'air', desc: '傾倒神聖泉水的持甕智者，思想前衛叛逆，靈魂獨立於大眾常規之外，只對真理對頻。', symbol: '♒︎', image: '/aquarius.png', traits: {
    aphrodite: '黏人度看心情且很跳躍，戀愛時把你當最好的朋友，隱藏訊號是開始想跟你討論奇怪的理論。',
    athena: '職場控制狂指數低，喜歡打破常規，規則對他來說是拿來挑戰的。',
    hestia: '對熟人很講義氣但情感表達很間接，關心的方式常常讓人抓不到重點。',
    core: '死穴是被說跟大家一樣，最怕失去獨特性，傲嬌到會刻意特立獨行證明自己。',
  } },
  { id: 'pisces', label: '雙魚座', god: '游動雙魚 Pisces', element: 'water', desc: '被命運絲帶相連、朝相反方向游動的雙魚，精神世界無垠開闊，交織著極高的同理心與夢境想像。', symbol: '♓︎', image: '/pisces.png', traits: {
    aphrodite: '黏人度爆表且戀愛腦嚴重，很容易把曖昧腦補成偶像劇，隱藏訊號是開始幫你寫小劇本式的訊息。',
    athena: '職場控制狂指數低，容易心軟被拗，但創意和同理心是強項。',
    hestia: '對家人朋友情感豐沛到有點戲劇化，別人的情緒他都會不小心一起扛。',
    core: '死穴是被說太敏感或想太多，明明受傷了還是會先體諒別人，傲嬌到用沉默代替訴苦。',
  } },
]

export const MBTIS = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP',
]

export const MEETING_TYPES = [
  { id: 'first_date', label: '第一次約會', title: 'First Date', hint: '心跳、曖昧未明' },
  { id: 'online_friend', label: '網友初次見面', title: 'Online Friend Meeting', hint: '線上熟悉、線下陌生' },
  { id: 'collaboration', label: '合作提案', title: 'Collaboration', hint: '專業、目標導向' },
  { id: 'new_friendship', label: '新朋友初識', title: 'New Friendship', hint: '同好、隨緣交流' },
]

export const ENVIRONMENTS_V2 = [
  { id: 'cafe', label: '咖啡廳', title: 'Cafe' },
  { id: 'restaurant', label: '餐廳', title: 'Restaurant' },
  { id: 'outdoor', label: '戶外', title: 'Outdoor' },
  { id: 'travel', label: '旅行途中', title: 'Travel' },
  { id: 'event', label: '活動現場', title: 'Event' },
]

export const GENDERS = [
  { id: 'female', label: '女性' },
  { id: 'male', label: '男性' },
  { id: 'nonbinary', label: '非二元' },
  { id: 'unspecified', label: '不透露' },
]

export const CHAT_STYLES = [
  { id: 'quick_reply', label: '已讀秒回', hint: '訊息一來立刻處理' },
  { id: 'slow_read', label: '已讀不回派', hint: '需要醞釀才回覆' },
  { id: 'voice', label: '語音派', hint: '打字太麻煩，語音比較快' },
  { id: 'sticker', label: '貼圖派', hint: '一張貼圖勝過千言萬語' },
]

export const ATTACHMENT_STYLES = [
  { id: 'secure', label: '安全型', hint: '穩定、能坦然表達需求' },
  { id: 'anxious', label: '焦慮型', hint: '渴望靠近、容易患得患失' },
  { id: 'avoidant', label: '逃避型', hint: '重視獨立、對親密有點警覺' },
  { id: 'disorganized', label: '矛盾型', hint: '既渴望靠近又害怕受傷' },
]

// --- 多維度加權契合度演算法 -------------------------------------------------
// 每個維度輸出 0~1 的原始分數，依權重加總後映射到 50~98 的最終百分比。
// 分數是輸入的確定性函式（同樣輸入必得同樣結果），並非固定值或純隨機。

const ELEMENT_COMPAT = {
  fire: { fire: 0.7, earth: 0.55, air: 0.95, water: 0.5 },
  earth: { fire: 0.55, earth: 0.75, air: 0.55, water: 0.9 },
  air: { fire: 0.95, earth: 0.55, air: 0.78, water: 0.6 },
  water: { fire: 0.5, earth: 0.9, air: 0.6, water: 0.85 },
}

const ATTACHMENT_COMPAT = {
  secure: { secure: 0.95, anxious: 0.85, avoidant: 0.8, disorganized: 0.75 },
  anxious: { secure: 0.85, anxious: 0.55, avoidant: 0.35, disorganized: 0.4 },
  avoidant: { secure: 0.8, anxious: 0.35, avoidant: 0.5, disorganized: 0.45 },
  disorganized: { secure: 0.75, anxious: 0.4, avoidant: 0.45, disorganized: 0.4 },
}

const CHAT_STYLE_COMPAT = {
  quick_reply: { quick_reply: 0.92, slow_read: 0.4, voice: 0.7, sticker: 0.75 },
  slow_read: { quick_reply: 0.4, slow_read: 0.8, voice: 0.55, sticker: 0.5 },
  voice: { quick_reply: 0.7, slow_read: 0.55, voice: 0.88, sticker: 0.6 },
  sticker: { quick_reply: 0.75, slow_read: 0.5, voice: 0.6, sticker: 0.85 },
}

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

function mbtiCompat(a, b) {
  if (!a || !b || a === 'unknown' || b === 'unknown') return 0.65
  let shared = 0
  for (let i = 0; i < 4; i++) if (a[i] === b[i]) shared++
  return 0.5 + shared * 0.11
}

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .split(/[,，、\s/]+/)
    .map((t) => t.trim())
    .filter(Boolean)
}

function interestsCompat(a, b, seed) {
  const ta = new Set(tokenize(a))
  const tb = new Set(tokenize(b))
  if (!ta.size || !tb.size) {
    return 0.55 + mulberry32(seed)() * 0.2
  }
  let overlap = 0
  ta.forEach((t) => { if (tb.has(t)) overlap++ })
  return Math.min(0.95, 0.55 + overlap * 0.12)
}

function ageCompat(a, b) {
  const na = Number(a)
  const nb = Number(b)
  if (!na || !nb) return 0.75
  return Math.max(0.5, 1 - Math.min(Math.abs(na - nb), 20) / 40)
}

const WEIGHTS = { element: 0.28, mbti: 0.22, attachment: 0.2, chatStyle: 0.15, interests: 0.1, age: 0.05 }
// When a chat-screenshot signal is available it earns its own slice of the
// weight, borrowed proportionally from every other dimension.
const WEIGHTS_WITH_SCREENSHOT = { element: 0.24, mbti: 0.19, attachment: 0.17, chatStyle: 0.13, interests: 0.08, age: 0.04, screenshot: 0.15 }

// Normalizes either the real Gemini-vision reading ({responsiveness, warmth,
// engagement}) or the local deterministic fallback into a single 0..1 score.
function screenshotCompat(signal) {
  if (!signal) return null
  const { responsiveness = 50, warmth = 50, engagement = 50 } = signal
  return Math.max(0, Math.min(1, (responsiveness + warmth + engagement) / 300))
}

export function calculateCompatibility({ you = {}, target = {}, screenshotSignal = null }) {
  const youEl = ZODIACS.find((z) => z.id === you.zodiac)?.element
  const targetEl = ZODIACS.find((z) => z.id === target.zodiac)?.element
  const elementScore = youEl && targetEl ? ELEMENT_COMPAT[youEl][targetEl] : 0.65

  const mbtiScore = mbtiCompat(you.mbti, target.mbti)
  const attachmentScore = ATTACHMENT_COMPAT[you.attachmentStyle]?.[target.attachmentStyle] ?? 0.65
  const chatScore = CHAT_STYLE_COMPAT[you.chatStyle]?.[target.chatStyle] ?? 0.65
  const seed = seedFromString(`${you.zodiac}-${target.zodiac}-${you.interests}-${target.interests}`)
  const interestsScore = interestsCompat(you.interests, target.interests, seed)
  const age = ageCompat(you.age, target.age)
  const screenshotScore = screenshotCompat(screenshotSignal)

  const w = screenshotScore !== null ? WEIGHTS_WITH_SCREENSHOT : WEIGHTS
  let weighted =
    elementScore * w.element +
    mbtiScore * w.mbti +
    attachmentScore * w.attachment +
    chatScore * w.chatStyle +
    interestsScore * w.interests +
    age * w.age
  if (screenshotScore !== null) weighted += screenshotScore * w.screenshot

  const score = Math.round(Math.max(50, Math.min(98, 50 + weighted * 48)))

  const breakdown = [
    { key: 'element', label: '元素共鳴', value: elementScore },
    { key: 'mbti', label: '人格頻率', value: mbtiScore },
    { key: 'attachment', label: '依戀契合', value: attachmentScore },
    { key: 'chatStyle', label: '溝通節奏', value: chatScore },
    { key: 'interests', label: '興趣重疊', value: interestsScore },
  ]
  if (screenshotScore !== null) breakdown.push({ key: 'screenshot', label: '截圖氛圍', value: screenshotScore })
  breakdown.sort((a, b) => b.value - a.value)

  return { score, breakdown }
}

// --- Oracle Report -----------------------------------------------------------
// Reshapes the You/Target profile pair into the four-chapter ritual structure
// (First Impression / Hidden Frequency / Things To Avoid / Perfect Conversation Topics).
export function generateOracleReport({ you = {}, target = {}, meetingType, environment, screenshotSignal = null }) {
  const zInfo = ZODIACS.find((z) => z.id === target.zodiac)
  const targetPersona = zInfo ? `${zInfo.label}（${zInfo.god}）` : (target.mbti || '神祕觀測對象')
  const { score: compatibility, breakdown } = calculateCompatibility({ you, target, screenshotSignal })
  const meetingLabel = MEETING_TYPES.find((m) => m.id === meetingType)?.label ?? '這場見面'
  const envLabel = ENVIRONMENTS_V2.find((e) => e.id === environment)?.label ?? '這個場合'

  let firstImpression = `走進當前的情境，我們會發現 ${targetPersona} 的核心氣場呈現出一種非常細膩的流動。`
  if (zInfo) {
    firstImpression += `在古典天體圖譜中，這類靈魂與「${zInfo.god}」的原始圖騰深深共鳴，這意味著在日常表象之下，他們${zInfo.desc}`
  }
  if (target.mbti && target.mbti !== 'unknown') {
    firstImpression += `結合其 ${target.mbti} 的特質，他們在與人初次建立連結時，並不會盲目地釋放熱情，而是習慣先建立一個隱形的觀察座標，確認彼此的邊界與舒適度。`
  } else {
    firstImpression += `雖然目前缺乏人格代碼的輔助加權，但其純粹的星象底蘊已經展現出極高的特質清晰度。`
  }
  firstImpression += ` 在「${meetingLabel}・${envLabel}」的座標下，這股氣場會比平常更容易顯現真實的一面。`
  if (screenshotSignal?.summary) {
    firstImpression += ` 從你上傳的對話截圖來看，${screenshotSignal.summary}`
  }

  let hiddenFrequency = '這個人的情緒訊號不會直接寫在臉上，需要一點耐心才能讀懂真正的頻率。'
  if (zInfo?.traits) {
    hiddenFrequency = `${zInfo.traits.hestia} ${zInfo.traits.core}`
  } else if (target.mbti && target.mbti !== 'unknown') {
    hiddenFrequency = target.mbti[0] === 'I'
      ? '這是一個需要蓄力才能開口的靈魂，安靜不代表沒興趣，只是還在醞釀。'
      : '這是一個容易被外界能量點燃的靈魂，你的回應速度會直接影響他們的敞開程度。'
  }
  const topAttachment = ATTACHMENT_STYLES.find((a) => a.id === target.attachmentStyle)
  if (topAttachment) {
    hiddenFrequency += ` 依戀傾向偏向「${topAttachment.label}」——${topAttachment.hint}，這會是這段互動裡最需要被溫柔對待的地方。`
  }

  let thingsToAvoid = '請絕對避免在對話初期過度探聽其隱私細線（例如過往關係細節或具體薪資），那會讓注重安全邊界的守護神瞬間降下冰封閘門。'
  if (target.zodiac === 'libra' || target.zodiac === 'virgo') {
    thingsToAvoid = '請絕對避免在現場強迫他們做出兩難的抉擇（例如：強烈追問這兩道菜哪個好）。這會打破他們精心維持的內心和諧，引發潛意識的焦慮。'
  }
  const weakestDim = breakdown[breakdown.length - 1]
  if (weakestDim && weakestDim.value < 0.55) {
    thingsToAvoid += ` 特別留意「${weakestDim.label}」是這次配對中最脆弱的一環，切勿在此處硬碰硬。`
  }

  return {
    targetName: zInfo ? zInfo.label : (target.mbti || '觀測對象'),
    godName: zInfo ? zInfo.god : '神祕星體',
    compatibility,
    breakdown,
    firstImpression,
    hiddenFrequency,
    thingsToAvoid,
    rescueLine: '「今天能坐在這裡一起聊聊天真的很開心，不用有壓力，我們就隨心所欲地跟著感覺走。」',
  }
}

// --- 塔羅話題牌組 (Tarot Topic Deck) -----------------------------------------
// A shared pool of icebreaker topics, each tagged with the meeting purposes it suits best
// and the zodiac elements it resonates with. generateTopicDeck() scores every topic against
// the current target + context and returns the full pool sorted by recommendation score.
const TOPIC_POOL = [
  { title: '最著迷的一種感官細節', reason: '談論具體而微的感官記憶（氣味、聲音、觸感），能溫柔繞過表面寒暄，直接觸動潛意識裡柔軟的情感連結。', tags: ['first_date', 'new_friendship'], elements: ['water', 'air'] },
  { title: '一個只有極少數人知道的私房怪癖', reason: '主動暴露一個無傷大雅的反差特徵，能迅速建立心理安全感，促使對方也樂意展示真實的自己。', tags: ['first_date', 'new_friendship'], elements: ['fire', 'water'] },
  { title: '如果一整天不被打擾，最想待在哪個角落', reason: '這題能優雅探知對方的私密審美，讓緊繃的初次會面轉化為一場無壓力的腦內漫遊。', tags: ['first_date'], elements: ['water', 'earth'] },
  { title: '目前領域裡最讓你興奮的一項未來變革', reason: '拋出具備前瞻視野的議題，能在一秒內建立你在對方心中的專業分量與談話價值。', tags: ['collaboration'], elements: ['fire', 'air'] },
  { title: '職涯裡印象最深的一段轉折或低谷', reason: '坦誠聊聊有養分的失敗，展現自我覺察力與心理韌性，容易讓重視誠實特質的人產生信任感。', tags: ['collaboration'], elements: ['earth'] },
  { title: '興趣領域裡讓你廢寢忘食的一個考據', reason: '直接切入最硬核、最有熱情的特定領域，能瞬間點燃分享欲，讓對話能量密度拉滿。', tags: ['online_friend', 'new_friendship'], elements: ['air', 'fire'] },
  { title: '線上線下反差最大的一個特質', reason: '用線上線下的落差當切入點，能巧妙消解虛擬感帶來的隔閡，是安全又幽默的人際橋樑。', tags: ['online_friend'], elements: ['air'] },
  { title: '介紹人到底跟你說了對方什麼', reason: '直球拆穿這種場合的尷尬本質，反而能讓雙方一起笑出來，瞬間卸下防備心。', tags: ['new_friendship'], elements: ['fire', 'air'] },
  { title: '這輩子做過最衝動但不後悔的決定', reason: '衝動決定往往藏著一個人最真實的價值排序，是快速認識對方底層性格的捷徑。', tags: ['first_date', 'new_friendship'], elements: ['fire'] },
  { title: '心目中最理想的一天怎麼度過', reason: '這是一道零風險又能看出生活步調與價值觀的萬用題，幾乎適合任何場合。', tags: ['first_date', 'collaboration', 'online_friend', 'new_friendship'], elements: ['earth', 'water'] },
  { title: '最近一次被小事情感動的瞬間', reason: '情感類話題能快速拉近距離，尤其對情感豐沛的對象特別有效，容易聊出真心話。', tags: ['first_date'], elements: ['water'] },
  { title: '如果有一筆意外之財，第一件事想做什麼', reason: '金錢假設題能有趣地揭露對方的優先順序與冒險傾向，且輕鬆不冒犯。', tags: ['new_friendship', 'online_friend'], elements: ['fire', 'earth'] },
  { title: '小時候印象最深的一段回憶', reason: '童年話題天生自帶柔軟濾鏡，能讓對話從社交模式切換到更真誠的頻道。', tags: ['first_date', 'new_friendship'], elements: ['water', 'earth'] },
  { title: '最近有沒有學到讓你很有感的小道理', reason: '這題能自然展現對方的思考深度，也給彼此一個交換價值觀的安全窗口。', tags: ['collaboration', 'new_friendship'], elements: ['air', 'earth'] },
  { title: '一首能代表你最近心情的歌', reason: '音樂是最低成本的自我揭露，用歌曲當媒介比直接問「你最近好嗎」更有記憶點。', tags: ['first_date', 'new_friendship'], elements: ['air', 'water'] },
  { title: '最近讓你上頭到停不下來的一件小事', reason: '這題輕鬆、無壓力，卻能意外挖出對方最近真正投入熱情的地方。', tags: ['new_friendship', 'online_friend'], elements: ['fire', 'air'] },
  { title: '如果可以跟歷史上任何人吃一頓飯，會選誰', reason: '想像題能側面看出對方欣賞的特質與價值取向，是很好的深度切入口。', tags: ['collaboration', 'new_friendship'], elements: ['fire', 'air'] },
  { title: '對「穩定」這兩個字的定義是什麼', reason: '這是溫和探詢對方人生階段與需求的方式，尤其適合帶點認真意圖的場合。', tags: ['first_date', 'collaboration'], elements: ['earth'] },
  { title: '最近一次為了誰而熬夜做的事', reason: '熬夜背後往往藏著一個人真正在意的關係，是不著痕跡打探重要性排序的好問題。', tags: ['first_date', 'new_friendship'], elements: ['water', 'fire'] },
  { title: '一個你正在努力戒掉或養成的習慣', reason: '自我成長話題展現真誠與自省，也給對方一個分享自身掙扎的安全空間。', tags: ['collaboration', 'online_friend'], elements: ['earth'] },
  { title: '最近一次讓你笑到不行的迷因或梗', reason: '幽默感是最快的破冰武器，共同笑點能瞬間拉近陌生感。', tags: ['new_friendship', 'online_friend'], elements: ['air', 'fire'] },
  { title: '如果可以立刻精通一項技能，會選什麼', reason: '這題能看出對方當下最渴望的能力缺口，也常常意外聊出深層的不安全感或嚮往。', tags: ['collaboration', 'new_friendship'], elements: ['fire', 'air'] },
  { title: '今天這個場合，你最想被問到的問題', reason: '把主導權交回給對方，直接展現體貼與自信，通常會得到意想不到的真心話。', tags: ['first_date', 'collaboration', 'new_friendship', 'online_friend'], elements: ['water', 'air'] },
  { title: '最近一次夢到印象深刻的夢', reason: '夢境話題自帶超現實趣味，很適合用來打破過度理性、公式化的對話節奏。', tags: ['first_date', 'new_friendship'], elements: ['water'] },
]

const AVOID_HINTS = {
  first_date: ['別急著問「你上一段感情怎麼結束的」，這會瞬間把約會變成偵訊。', '避免一直低頭滑手機回覆別的訊息，那是曖昧氣氛的頭號殺手。'],
  collaboration: ['別在還沒聊出信任感前就急著談報價或條件，會顯得太過功利。', '避免打斷對方講到一半的想法，專業場合最忌諱被搶話。'],
  online_friend: ['別一見面就對照對方的自拍濾鏡，這種落差話題很容易踩雷。', '避免劈頭就問「你本人怎麼跟照片差這麼多」，換個方式稱讚就好。'],
  new_friendship: ['別一開始就追問薪水、感情狀態這類過度私人的資訊。', '避免整場只顧著自己講，忘記留空間讓對方也分享。'],
}

function pickAvoidSaying(topic, meetingType, seed) {
  const pool = AVOID_HINTS[meetingType] ?? AVOID_HINTS.new_friendship
  const rng = mulberry32(seed)
  return pool[Math.floor(rng() * pool.length)]
}

export function generateTopicDeck({ you = {}, target = {}, meetingType, screenshotSignal = null }) {
  const zInfo = ZODIACS.find((z) => z.id === target.zodiac)
  const element = zInfo?.element

  return TOPIC_POOL.map((topic, idx) => {
    const seed = seedFromString(`${topic.title}-${target.zodiac}-${target.mbti}-${meetingType}-${you.zodiac}-${idx}`)
    const rng = mulberry32(seed)
    let score = 58
    if (meetingType && topic.tags.includes(meetingType)) score += 16
    if (element && topic.elements.includes(element)) score += 12
    if (target.mbti && target.mbti[0] === 'E') score += 3
    if (screenshotSignal?.engagement) score += Math.round((screenshotSignal.engagement - 50) / 10)
    score += Math.floor(rng() * 14)
    score = Math.max(42, Math.min(98, score))
    return {
      id: idx,
      title: topic.title,
      reason: topic.reason,
      score,
      avoidSaying: pickAvoidSaying(topic, meetingType, seed),
    }
  }).sort((a, b) => b.score - a.score)
}

export function analyzeScreenshot(file) {
  let hash = 0
  const name = file ? file.name : 'signal'
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  }
  const freezeRate = (hash % 50) + 25
  const balanceScore = ((hash >> 2) % 40) + 50
  const auraLevel = ((hash >> 4) % 35) + 60
  return { freezeRate, balanceScore, auraLevel }
}

// Local, deterministic stand-in for the Gemini vision reading — used whenever
// no API key is set or the vision request fails. Same {responsiveness,
// warmth, engagement, summary} shape as the AI path so callers don't care
// which one produced it.
export function localScreenshotSignal(file) {
  const { freezeRate, balanceScore, auraLevel } = analyzeScreenshot(file)
  const responsiveness = Math.max(0, Math.min(100, 100 - freezeRate))
  const warmth = balanceScore
  const engagement = auraLevel
  let summary = '這段對話的節奏偏向平穩，雙方都還在互相試探彼此的步調。'
  if (responsiveness > 70 && warmth > 65) {
    summary = '雙方回覆都很積極，對話氣氛熱絡，是很好的起手式。'
  } else if (responsiveness < 45) {
    summary = '回覆節奏偏慢，可能需要更有記憶點的開場話題來拉高互動意願。'
  } else if (warmth > 70) {
    summary = '語氣偏溫暖親近，感覺雙方已經有一定的熟悉感。'
  }
  return { responsiveness, warmth, engagement, summary }
}
