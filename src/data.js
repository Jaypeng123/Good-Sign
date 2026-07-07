// src/data.js

// `symbol` is a monochrome text-presentation glyph (U+FE0E forces non-emoji rendering).
// `image` points at /public/zodiac/<id>.jpg — stays null until real photo assets are supplied,
// the icon grid falls back to `symbol` automatically when it's missing or fails to load.
// `traits` are the four Greek-mythology-flavoured dimensions shown in the insight panel.
export const ZODIACS = [
  { id: 'aries', label: '牡羊座', god: '公羊 Aries', element: 'fire', desc: '展現出如古星圖中奮力奔騰的公羊姿態，具備無畏的開創性與純粹的行動意志。', symbol: '♈︎', image: null, traits: {
    aphrodite: '戀愛時衝很快，一句「在幹嘛」都能腦補成告白現場，黏人期通常只維持三天，新鮮感一過就開始找下一個目標。',
    athena: '工作上見不得別人比自己快，交辦出去的事情永遠自己搶著做，控制狂指數爆表但美其名叫「效率」。',
    hestia: '對家人朋友嘴很硬但事情做很多，永遠是那個嘴巴說不要、身體卻已經在處理的人。',
    core: '死穴是輸的感覺，輸了什麼都可以，就是輸了面子不行，傲嬌到會為了嘴硬而硬拗到底。',
  } },
  { id: 'taurus', label: '金牛座', god: '野牛 Taurus', element: 'earth', desc: '如同破雲而出的雄渾野牛，靈魂深處錨定著對物質與美感的極高鑑賞力與沉穩耐性。', symbol: '♉︎', image: null, traits: {
    aphrodite: '黏人度看心情，但一旦認定你就會用食物和禮物瘋狂表達愛意，隱藏訊號是幫你記住所有小細節。',
    athena: '職場控制狂等級中等，但對於自己負責的區塊寸土不讓，改一個字都要問三次為什麼。',
    hestia: '私底下其實很依賴熟悉的人事物，換一間常去的店都會不開心，家人面前完全放飛自我。',
    core: '死穴是被逼著改變步調，慢工出細活是信仰，越催他越故意放慢，傲嬌到懶得解釋。',
  } },
  { id: 'gemini', label: '雙子座', god: '雙子 Gemini', element: 'air', desc: '形同星圖中親密依偎的孿生子，思維在兩個維度間自由切換，熱愛流動的智識與資訊。', symbol: '♊︎', image: null, traits: {
    aphrodite: '戀愛時話術一流，黏人度忽高忽低全看新鮮感，隱藏訊號是突然開始密集傳迷因給你。',
    athena: '職場上點子超多但執行力看心情，控制狂指數低，比較像放養型主管或同事。',
    hestia: '對家人朋友是兩種人格，熟人面前話多到停不下來，陌生場合秒變安靜臉。',
    core: '死穴是被說膚淺或善變，明明博學卻最怕被貼標籤，傲嬌起來會瘋狂科普證明自己。',
  } },
  { id: 'cancer', label: '巨蟹座', god: '巨蟹 Cancer', element: 'water', desc: '具備寫實甲殼的巨蟹意象，外殼堅固冷靜，內裡卻包裹著如同海洋潮汐般細膩的防衛與直覺。', symbol: '♋︎', image: null, traits: {
    aphrodite: '黏人度天花板等級，戀愛腦一發動就會想把對方納入生活的每個細節，隱藏訊號是默默幫你囤食物。',
    athena: '職場控制狂指數中高，特別在意團隊氣氛，容易把同事的情緒也扛在自己身上。',
    hestia: '對家人朋友是真的用生命在對待，記得每個人的生日和喜好，護短程度驚人。',
    core: '死穴是被說不被需要，表面說沒關係其實會偷偷難過很久，傲嬌到會用鬧脾氣代替直說。',
  } },
  { id: 'leo', label: '獅子座', god: '雄獅 Leo', element: 'fire', desc: '步伐昂首的傲慢雄獅，天生需要成為空間中的核心座標，慷慨且極度看重尊嚴。', symbol: '♌︎', image: null, traits: {
    aphrodite: '黏人度看場合，公開場合超大方放閃，私下反而需要被哄，隱藏訊號是特別愛在你面前耍帥。',
    athena: '職場控制狂指數頂級，天生想當主角，交辦出去的事情還是會忍不住盯場。',
    hestia: '對熟人超級講義氣，請客從不手軟，但也偷偷希望大家記得他的好。',
    core: '死穴是被忽視，比起被討厭更怕沒有存在感，傲嬌到寧願裝沒事也不會主動求關注。',
  } },
  { id: 'virgo', label: '處女座', god: '翼之女神 Virgo', element: 'earth', desc: '手持麥穗、展翅佇立的翼之女神，用極致的理性與冷靜，在混亂的凡間梳理出優雅的秩序。', symbol: '♍︎', image: null, traits: {
    aphrodite: '黏人度低調但很勤勞，戀愛時會用「幫你解決問題」代替說甜話，隱藏訊號是開始糾正你的生活習慣。',
    athena: '職場控制狂本尊，細節魔人，別人的作業不改到滿意會渾身不對勁。',
    hestia: '對家人朋友嘴巴挑剔但行動誠實，會默默把你該做的事情都做完再念你一頓。',
    core: '死穴是被說不夠好，明明已經很努力還是覺得可以更完美，傲嬌到永遠先自我批評。',
  } },
  { id: 'libra', label: '天秤座', god: '正義天秤 Libra', element: 'air', desc: '懸浮於星空中央的黃金天秤，終生在人際、美感與核心法碼之間，尋求最不費力的極致平衡。', symbol: '♎︎', image: null, traits: {
    aphrodite: '黏人度中等但很會製造浪漫氛圍，戀愛時特別在意公平，隱藏訊號是開始認真配合你的喜好。',
    athena: '職場控制狂指數偏低，很怕當壞人，但決策拖延症容易讓人抓狂。',
    hestia: '對熟人來說是超級好相處的和事佬，私下其實很難真正表態自己想要什麼。',
    core: '死穴是被說偏心或不公平，最怕選邊站，傲嬌到寧願自己委屈也要維持表面和諧。',
  } },
  { id: 'scorpio', label: '天蠍座', god: '毒蠍 Scorpius', element: 'water', desc: '帶著神祕引力的潛伏毒蠍，擁有看透言外之意的敏銳洞察力，情感絕對純粹且帶有強烈領域感。', symbol: '♏︎', image: null, traits: {
    aphrodite: '黏人度隱藏在細節裡，表面高冷私下超級占有慾，隱藏訊號是開始默默關注你在忙什麼。',
    athena: '職場控制狂等級極高，喜歡掌握全局資訊，不喜歡被蒙在鼓裡的感覺。',
    hestia: '對真正的自己人赴湯蹈火，但要先通過他漫長的觀察期才算數。',
    core: '死穴是被背叛或被看穿心事，明明很敏感卻硬要裝作雲淡風輕，傲嬌到用冷漠掩飾在意。',
  } },
  { id: 'sagittarius', label: '射手座', god: '半人馬射手 Sagittarius', element: 'fire', desc: '挽弓拉滿、蓄勢待發的半人馬戰士，靈魂永遠望向更高遠的哲學星空，嚮往絕對自由。', symbol: '♐︎', image: null, traits: {
    aphrodite: '黏人度看自由度夠不夠，戀愛時最怕被綁住，隱藏訊號是開始規劃兩人的下一趟旅行。',
    athena: '職場控制狂指數低，比較在意方向對不對，細節通常交給別人煩惱。',
    hestia: '對朋友家人很夠意思但常常人在心不在，忘記約定是家常便飯。',
    core: '死穴是被限制自由，一旦感覺被綁住就會想逃，傲嬌到用「開玩笑」包裝真心話。',
  } },
  { id: 'capricorn', label: '摩羯座', god: '海山羊 Capricornus', element: 'earth', desc: '古老神話中的海山羊，既能在陡峭的山巔攀登，亦能在深邃的海底泅泳，堅韌且耐得住時光洗鍊。', symbol: '♑︎', image: null, traits: {
    aphrodite: '黏人度低但很實際，戀愛像簽長期合約，隱藏訊號是開始跟你討論未來規劃。',
    athena: '職場控制狂天花板，事必躬親、目標感超強，看不慣沒效率的流程。',
    hestia: '對家人責任感重到有點沉重，習慣把情緒收起來自己扛。',
    core: '死穴是被說沒有成就或不夠努力，明明很拼還是覺得不夠，傲嬌到用工作逃避情緒。',
  } },
  { id: 'aquarius', label: '水瓶座', god: '持甕侍者 Waseerman', element: 'air', desc: '傾倒神聖泉水的持甕智者，思想前衛叛逆，靈魂獨立於大眾常規之外，只對真理對頻。', symbol: '♒︎', image: null, traits: {
    aphrodite: '黏人度看心情且很跳躍，戀愛時把你當最好的朋友，隱藏訊號是開始想跟你討論奇怪的理論。',
    athena: '職場控制狂指數低，喜歡打破常規，規則對他來說是拿來挑戰的。',
    hestia: '對熟人很講義氣但情感表達很間接，關心的方式常常讓人抓不到重點。',
    core: '死穴是被說跟大家一樣，最怕失去獨特性，傲嬌到會刻意特立獨行證明自己。',
  } },
  { id: 'pisces', label: '雙魚座', god: '游動雙魚 Pisces', element: 'water', desc: '被命運絲帶相連、朝相反方向游動的雙魚，精神世界無垠開闊，交織著極高的同理心與夢境想像。', symbol: '♓︎', image: null, traits: {
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
