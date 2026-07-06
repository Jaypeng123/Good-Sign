// U+FE0E forces monochrome "text" glyph style instead of colorful emoji rendering
export const ZODIACS = [
  { id: 'aries', label: '牡羊座', element: 'fire', symbol: '♈︎' },
  { id: 'taurus', label: '金牛座', element: 'earth', symbol: '♉︎' },
  { id: 'gemini', label: '雙子座', element: 'air', symbol: '♊︎' },
  { id: 'cancer', label: '巨蟹座', element: 'water', symbol: '♋︎' },
  { id: 'leo', label: '獅子座', element: 'fire', symbol: '♌︎' },
  { id: 'virgo', label: '處女座', element: 'earth', symbol: '♍︎' },
  { id: 'libra', label: '天秤座', element: 'air', symbol: '♎︎' },
  { id: 'scorpio', label: '天蠍座', element: 'water', symbol: '♏︎' },
  { id: 'sagittarius', label: '射手座', element: 'fire', symbol: '♐︎' },
  { id: 'capricorn', label: '摩羯座', element: 'earth', symbol: '♑︎' },
  { id: 'aquarius', label: '水瓶座', element: 'air', symbol: '♒︎' },
  { id: 'pisces', label: '雙魚座', element: 'water', symbol: '♓︎' },
]

export const MBTIS = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
]

export const AGE_VIBES = [
  { id: 'genz', label: 'Z 世代迷因愛好者', hint: '活在哏圖與迷因裡' },
  { id: 'corporate', label: '處事圓滑的社畜', hint: '講話滴水不漏' },
  { id: 'old_soul', label: '思想老成的退休靈魂', hint: '心態比實際年齡老很多' },
]

export const CHAT_STYLES = [
  { id: 'cold', label: '高冷已讀機', hint: '已讀不回是日常' },
  { id: 'hot', label: '熱情秒回怪', hint: '訊息秒讀秒回' },
  { id: 'cipher', label: '密碼學大師', hint: '句句都要解碼' },
]

// I. 愛慾與浪漫 (Aphrodite's Touch)　II. 神殿事業/修煉 (Athena's Shield)
// III. 凡間社交/家庭 (Hestia's Hearth)　IV. 靈魂核心 (Core Ego)
export const ZODIAC_TRAITS = {
  aries: {
    aphrodite: '戀愛時衝很快，一句「在幹嘛」都能腦補成告白現場，黏人期通常只維持三天，新鮮感一過就開始找下一個目標。',
    athena: '工作上見不得別人比自己快，交辦出去的事情永遠自己搶著做，控制狂指數爆表但美其名叫「效率」。',
    hestia: '對家人朋友嘴很硬但事情做很多，永遠是那個嘴巴說不要、身體卻已經在處理的人。',
    core: '死穴是輸的感覺，輸了什麼都可以，就是輸了面子不行，傲嬌到會為了嘴硬而硬拗到底。',
  },
  taurus: {
    aphrodite: '黏人度看心情，但一旦認定你就會用食物和禮物瘋狂表達愛意，隱藏訊號是幫你記住所有小細節。',
    athena: '職場控制狂等級中等，但對於自己負責的區塊寸土不讓，改一個字都要問三次為什麼。',
    hestia: '私底下其實很依賴熟悉的人事物，換一間常去的店都會不開心，家人面前完全放飛自我。',
    core: '死穴是被逼著改變步調，慢工出細活是信仰，越催他越故意放慢，傲嬌到懶得解釋。',
  },
  gemini: {
    aphrodite: '戀愛時話術一流，黏人度忽高忽低全看新鮮感，隱藏訊號是突然開始密集傳迷因給你。',
    athena: '職場上點子超多但執行力看心情，控制狂指數低，比較像放養型主管或同事。',
    hestia: '對家人朋友是兩種人格，熟人面前話多到停不下來，陌生場合秒變安靜臉。',
    core: '死穴是被說膚淺或善變，明明博學卻最怕被貼標籤，傲嬌起來會瘋狂科普證明自己。',
  },
  cancer: {
    aphrodite: '黏人度天花板等級，戀愛腦一發動就會想把對方納入生活的每個細節，隱藏訊號是默默幫你囤食物。',
    athena: '職場控制狂指數中高，特別在意團隊氣氛，容易把同事的情緒也扛在自己身上。',
    hestia: '對家人朋友是真的用生命在對待，記得每個人的生日和喜好，護短程度驚人。',
    core: '死穴是被說不被需要，表面說沒關係其實會偷偷難過很久，傲嬌到會用鬧脾氣代替直說。',
  },
  leo: {
    aphrodite: '黏人度看場合，公開場合超大方放閃，私下反而需要被哄，隱藏訊號是特別愛在你面前耍帥。',
    athena: '職場控制狂指數頂級，天生想當主角，交辦出去的事情還是會忍不住盯場。',
    hestia: '對熟人超級講義氣，請客從不手軟，但也偷偷希望大家記得他的好。',
    core: '死穴是被忽視，比起被討厭更怕沒有存在感，傲嬌到寧願裝沒事也不會主動求關注。',
  },
  virgo: {
    aphrodite: '黏人度低調但很勤勞，戀愛時會用「幫你解決問題」代替說甜話，隱藏訊號是開始糾正你的生活習慣。',
    athena: '職場控制狂本尊，細節魔人，別人的作業不改到滿意會渾身不對勁。',
    hestia: '對家人朋友嘴巴挑剔但行動誠實，會默默把你該做的事情都做完再念你一頓。',
    core: '死穴是被說不夠好，明明已經很努力還是覺得可以更完美，傲嬌到永遠先自我批評。',
  },
  libra: {
    aphrodite: '黏人度中等但很會製造浪漫氛圍，戀愛時特別在意公平，隱藏訊號是開始認真配合你的喜好。',
    athena: '職場控制狂指數偏低，很怕當壞人，但決策拖延症容易讓人抓狂。',
    hestia: '對熟人來說是超級好相處的和事佬，私下其實很難真正表態自己想要什麼。',
    core: '死穴是被說偏心或不公平，最怕選邊站，傲嬌到寧願自己委屈也要維持表面和諧。',
  },
  scorpio: {
    aphrodite: '黏人度隱藏在細節裡，表面高冷私下超級占有慾，隱藏訊號是開始默默關注你在忙什麼。',
    athena: '職場控制狂等級極高，喜歡掌握全局資訊，不喜歡被蒙在鼓裡的感覺。',
    hestia: '對真正的自己人赴湯蹈火，但要先通過他漫長的觀察期才算數。',
    core: '死穴是被背叛或被看穿心事，明明很敏感卻硬要裝作雲淡風輕，傲嬌到用冷漠掩飾在意。',
  },
  sagittarius: {
    aphrodite: '黏人度看自由度夠不夠，戀愛時最怕被綁住，隱藏訊號是開始規劃兩人的下一趟旅行。',
    athena: '職場控制狂指數低，比較在意方向對不對，細節通常交給別人煩惱。',
    hestia: '對朋友家人很夠意思但常常人在心不在，忘記約定是家常便飯。',
    core: '死穴是被限制自由，一旦感覺被綁住就會想逃，傲嬌到用「開玩笑」包裝真心話。',
  },
  capricorn: {
    aphrodite: '黏人度低但很實際，戀愛像簽長期合約，隱藏訊號是開始跟你討論未來規劃。',
    athena: '職場控制狂天花板，事必躬親、目標感超強，看不慣沒效率的流程。',
    hestia: '對家人責任感重到有點沉重，習慣把情緒收起來自己扛。',
    core: '死穴是被說沒有成就或不夠努力，明明很拼還是覺得不夠，傲嬌到用工作逃避情緒。',
  },
  aquarius: {
    aphrodite: '黏人度看心情且很跳躍，戀愛時把你當最好的朋友，隱藏訊號是開始想跟你討論奇怪的理論。',
    athena: '職場控制狂指數低，喜歡打破常規，規則對他來說是拿來挑戰的。',
    hestia: '對熟人很講義氣但情感表達很間接，關心的方式常常讓人抓不到重點。',
    core: '死穴是被說跟大家一樣，最怕失去獨特性，傲嬌到會刻意特立獨行證明自己。',
  },
  pisces: {
    aphrodite: '黏人度爆表且戀愛腦嚴重，很容易把曖昧腦補成偶像劇，隱藏訊號是開始幫你寫小劇本式的訊息。',
    athena: '職場控制狂指數低，容易心軟被拗，但創意和同理心是強項。',
    hestia: '對家人朋友情感豐沛到有點戲劇化，別人的情緒他都會不小心一起扛。',
    core: '死穴是被說太敏感或想太多，明明受傷了還是會先體諒別人，傲嬌到用沉默代替訴苦。',
  },
}

const FORBIDDEN_BY_ZODIAC = {
  aries: '千萬別讓他當著別人的面認輸或被比較，牡羊的嘴硬防線一秒崩潰。',
  taurus: '別催他快點決定或改變計畫，越催金牛只會更故意慢下來。',
  gemini: '別說他善變或膚淺，雙子會瞬間開啟長篇大論反擊模式。',
  cancer: '別讓他覺得自己被排除在外，巨蟹會表面沒事但心裡記一輩子。',
  leo: '別在公開場合忽略他或搶他的風頭，獅子的自尊心經不起冷落。',
  virgo: '別隨口說「差不多就好」，處女座聽到會忍不住開始挑錯。',
  libra: '別逼他當場選邊站，天秤最怕被迫得罪任何一方。',
  scorpio: '別假裝好奇追問他的過去或秘密，天蠍會直接把心門關上。',
  sagittarius: '別提太多規矩或長期承諾的壓力，射手一聽到「綁住」就想找出口。',
  capricorn: '別質疑他的努力還不夠，摩羯座對這句話特別沒有抵抗力。',
  aquarius: '別說他跟別人沒什麼不同，水瓶最在意自己的獨特性被否定。',
  pisces: '別說他想太多或太敏感，雙魚會瞬間陷入自我懷疑的漩渦。',
}

const GENERIC_FORBIDDEN = '避免一開口就追問太私人的過去或秘密，先從輕鬆話題建立信任感再慢慢深入。'

const ELEMENT_BASE = { fire: 72, earth: 58, air: 75, water: 52 }

const SIGNAL_COMMENTS = [
  { min: 88, text: '訊號強到不用猜，直接照著本能走就對了，這局你贏面很大。' },
  { min: 75, text: '整體訊號偏樂觀，剩下的就看你敢不敢先開口。' },
  { min: 60, text: '訊號中規中矩，需要一點技巧鋪墊，別急著跳結論。' },
  { min: 45, text: '訊號有點忽冷忽熱，建議先從安全話題試水溫，別一次全押。' },
  { min: 0, text: '訊號偏弱不代表沒機會，純粹考驗你的臨場反應與耐心。' },
]

const TOPIC_POOL_BY_ELEMENT = {
  fire: [
    '問他最近有沒有什麼想立刻衝去做的計畫',
    '跟他討論一件你們都在意輸贏的小事，看他怎麼回應',
    '問他這輩子做過最衝動但不後悔的決定',
    '稱讚他一件事做得很有魄力，觀察他怎麼接話',
    '問他如果現在能立刻出發去一個地方，會選哪裡',
    '跟他玩一個小小的競賽或猜謎，看他認真起來的樣子',
  ],
  earth: [
    '問他最近在忙的事情裡，哪個小細節讓他最有成就感',
    '請他推薦一個他很熟悉、值得信賴的口袋名單（餐廳/店家都行）',
    '問他對於「穩定」這件事的定義是什麼',
    '聊聊他習慣的生活節奏，看他怎麼描述自己的日常',
    '問他最近有沒有在存錢或規劃什麼長遠的事',
    '請教他一個他很擅長、你完全不懂的實用技能',
  ],
  air: [
    '問他最近腦子裡在轉的怪點子是什麼',
    '跟他聊一個最近很紅的話題，看他有什麼獨特角度',
    '問他有沒有正在追的劇或播客，讓他隨便科普',
    '問他覺得這個對話目前的氣氛怎麼樣，直接玩後設哏',
    '問他如果要向外星人解釋一個地球習俗，會選哪個',
    '跟他玩文字接龍或腦筋急轉彎，看他反應速度',
  ],
  water: [
    '問他最近有沒有被什麼小事情感動到',
    '問他心目中最放鬆的一個地方或時刻長怎樣',
    '聊聊他最近在意的一段關係（朋友/家人都算）',
    '問他小時候印象最深刻的一個回憶',
    '問他最近有沒有夢到什麼奇怪但難忘的夢',
    '請他形容一下今天的心情像哪種天氣',
  ],
}

const GENERIC_TOPICS = [
  '問對方最近生活裡最占據心思的一件事',
  '問對方今天這個場合裡最想被問到的問題是什麼',
  '請對方推薦一個他最近很喜歡的小東西（歌/店/物品都行）',
  '問對方如果今天可以提早結束，最想拿這段時間做什麼',
  '問對方最近有沒有學到什麼讓他很有感的小道理',
  '請對方用一個詞形容自己最近的狀態',
]

const RESCUE_LINES = {
  cold: [
    '「我知道已讀不回是你的預設模式，那我換個問題——你最近在忙的事，有什麼想被問的嗎？」',
    '「感覺你話不多但很有想法，要不要挑一個你真正想聊的話題，我認真聽？」',
    '「我先降低期待值，你隨意回，我隨意接，這樣壓力應該會小一點？」',
  ],
  hot: [
    '「你回覆速度比我打字還快，那我們乾脆直接進入下一個更好玩的話題？」',
    '「感覺你能量很夠，要不要來點更刺激的問題，我準備好了。」',
    '「你的秒回讓我覺得很安心，那我就大膽問一個比較深的問題囉？」',
  ],
  cipher: [
    '「我發現要解碼你的訊息需要一點時間，那我先講白話版，你直接告訴我對不對？」',
    '「你的回覆都很有哏中哏，那我猜猜看你想表達的意思，猜錯你要糾正我喔。」',
    '「感覺你講話都留一手，那我換個直球問題，看你會不會鬆口。」',
  ],
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

export function getZodiacTraits(zodiacId) {
  return ZODIAC_TRAITS[zodiacId] ?? null
}

export function computeSignal({ zodiacId, mbti, ageVibe, chatStyle, scores }) {
  const zodiac = ZODIACS.find((z) => z.id === zodiacId)
  let base = zodiac ? ELEMENT_BASE[zodiac.element] : 62

  let mbtiAdj = 0
  if (mbti) {
    mbtiAdj += mbti[0] === 'E' ? 8 : -6
    mbtiAdj += mbti[2] === 'F' ? 4 : -2
  }

  const ageAdj = { genz: 6, corporate: 0, old_soul: -6 }[ageVibe] ?? 0
  const chatAdj = { hot: 10, cold: -10, cipher: -3 }[chatStyle] ?? 0
  const screenshotAdj = scores ? Math.round((50 - scores.freezeRate) * 0.3) : 0

  const rng = mulberry32(seedFromString(`${zodiacId}-${mbti}-${ageVibe}-${chatStyle}`))
  const jitter = Math.floor(rng() * 11) - 5

  let score = base + mbtiAdj + ageAdj + chatAdj + screenshotAdj + jitter
  score = Math.max(28, Math.min(97, score))

  const comment = SIGNAL_COMMENTS.find((c) => score >= c.min)?.text ?? ''

  return { score, comment }
}

export function pickTopics({ zodiacId, ageVibe, chatStyle }) {
  const zodiac = ZODIACS.find((z) => z.id === zodiacId)
  const pool = zodiac ? TOPIC_POOL_BY_ELEMENT[zodiac.element] : GENERIC_TOPICS
  const rng = mulberry32(seedFromString(`${zodiacId}-${ageVibe}-${chatStyle}`))
  const shuffled = [...pool].sort(() => rng() - 0.5)
  return shuffled.slice(0, 3)
}

export function getForbiddenTopic(zodiacId) {
  return FORBIDDEN_BY_ZODIAC[zodiacId] ?? GENERIC_FORBIDDEN
}

export function analyzeScreenshot(file) {
  const seed = seedFromString(`${file.name}-${file.size}-${file.lastModified}`)
  const rng = mulberry32(seed)
  const freezeRate = Math.floor(rng() * 100)
  const balanceScore = Math.floor(rng() * 100)
  const auraLevel = Math.floor(rng() * 100)
  return { freezeRate, balanceScore, auraLevel }
}

export function getRescueLine({ chatStyle, ageVibe, scores }) {
  const lines = RESCUE_LINES[chatStyle] ?? RESCUE_LINES.cold
  let idx
  if (scores) {
    idx = scores.freezeRate < 34 ? 0 : scores.freezeRate < 67 ? 1 : 2
  } else {
    idx = { genz: 0, corporate: 1, old_soul: 2 }[ageVibe] ?? 0
  }
  return lines[idx % lines.length]
}
