// src/data.js

export const ZODIACS = [
  { id: 'aries', label: '牡羊座', god: '金羊 Ares', element: 'fire', desc: '星圖中奮力奔騰的黃金公羊，具備無畏的開創性與純粹的行動意志。' },
  { id: 'taurus', label: '金牛座', god: '野牛 Demeter', element: 'earth', desc: '破雲而出的雄渾野牛，靈魂深處錨定著對物質與美感的極高鑑賞力。' },
  { id: 'gemini', label: '雙子座', god: '孿生 Hermes', element: 'air', desc: '星圖中親密依偎的孿生子，思維在兩個維度間自由切換，熱愛資訊。' },
  { id: 'cancer', label: '巨蟹座', god: '巨蟹 Selene', element: 'water', desc: '具備堅固冷靜的外殼，內裡卻包裹著如同海洋潮汐般細膩的直覺。' },
  { id: 'leo', label: '獅子座', god: '雄獅 Apollo', element: 'fire', desc: '步伐昂首的傲慢雄獅，天生需要成為空間的核心座標，看重尊嚴。' },
  { id: 'virgo', label: '處女座', god: '翼之女神 Astraea', element: 'earth', desc: '手持麥穗、展翅佇立的女神，用極致的理性在凡間梳理出優雅秩序。' },
  { id: 'libra', label: '天秤座', god: '黃金秤 Aphrodite', element: 'air', desc: '懸浮於星空中央的黃金天秤，終生在人際、美感間尋求最不費力的平衡。' },
  { id: 'scorpio', label: '天蠍座', god: '毒蠍 Hades', element: 'water', desc: '帶著神祕引力的潛伏毒蠍，情感絕對純粹且帶有強烈的精神防禦。' },
  { id: 'sagittarius', label: '射手座', god: '半人馬 Zeus', element: 'fire', desc: '挽弓拉滿、蓄勢待發的半人馬戰士，靈魂永遠望向更高遠的冒險星空。' },
  { id: 'capricorn', label: '摩羯座', god: '海山羊 Cronus', element: 'earth', desc: '古老神秘的海山羊，既能在陡峭山巔攀登，亦能在深邃海底泅泳。' },
  { id: 'aquarius', label: '水瓶座', god: '持甕侍者 Uranus', element: 'air', desc: '傾倒泉水的持甕智者，思想前衛叛逆，靈魂不屬於任何單一框架。' },
  { id: 'pisces', label: '雙魚座', god: '雙魚 Poseidon', element: 'water', desc: '被絲帶相連、朝相反方向游動的雙魚，精神世界無垠且具備強大同理心。' },
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

// 💡 22 道極具古典塔羅質感的深度話題庫與原因剖析
const COMPREHENSIVE_TAROT_BANK = [
  { id: 1, title: '聊聊彼此生命中「最著迷的一種感官特徵或物件細節」', rate: 98, reason: '此話題能迅速繞過表面的社交冷場，直接觸動靈魂深處的情感開關，特別適合當前環境下的靈魂對頻。' },
  { id: 2, title: '分享一個只有極少數人知道的「私房生活儀式與怪癖」', rate: 94, reason: '由你主動暴露一個無傷大雅的反差習慣，能在對話中建立強大的心理安全感，促使對方卸下心防。' },
  { id: 3, title: '探討「假如有一整天不被任何人打擾，你最想在哪個角落度過」', rate: 91, reason: '這道題目最適合進行輕量的精神逃離，既能探知對方的私密審美，又能讓初次會面化為無壓力的思緒漫遊。' },
  { id: 4, title: '目前在你的專業或日常節奏中，最讓你興奮的一項「未來變革」是什麼', rate: 88, reason: '具備智識深度的人，內心深處都在尋求思想框架的共鳴。拋出前瞻性議題能一秒建立你的知性分量。' },
  { id: 5, title: '聊聊自己在過往生涯中，印象最深刻的一段「低谷重組經驗」', rate: 95, reason: '與其講述完美的成功，不如聊聊有養分的低谷。這展現了極高的自我覺察力，容易引發高度的敬佩。' },
  { id: 6, title: '最近在你的興趣圈子裡，有沒有哪一個作品或考據讓你徹底廢寢忘食？', rate: 97, reason: '直接切入最硬核、最充滿熱情靈魂的特定領域，能點燃骨子裡的分享欲，讓對話能量密度瞬間拉滿。' },
  { id: 7, title: '探討彼此在網路螢幕背後，與現實生活實際相處時反差最大的一個特質', rate: 93, reason: '利用線上線下的反差作為話題切入點，能巧妙消解虛擬感帶來的隔閡，是一道非常幽默安全的人際橋樑。' },
  { id: 8, title: '如果能與歷史上任何一位哲學家或藝術家共進晚餐，你會選擇誰、聊什麼？', rate: 86, reason: '這是一道經典的靈魂投射題，對方的回答能讓你立刻看清其內心最嚮往的精神世界與核心價值觀。' },
  { id: 9, title: '聊聊你最喜歡的一座城市或空間，那裡的什麼細節讓你最想流連忘返？', rate: 89, reason: '空間偏好往往對應著內心的防禦機制。透過環境細節的描述，能建立起極具安全感的美學共鳴。' },
  { id: 10, title: '在你經歷過的所有相遇中，你覺得最像「宿命般不可思議」的瞬間是什麼？', rate: 96, reason: '直接引導對話進入帶有神祕學色彩的經驗分享，能大幅度加深當前的氛圍熱度，打破僵化的客套。' },
  { id: 11, title: '如果你可以擁有一種神話中的超能力，你最希望是哪一個？打算怎麼用它？', rate: 85, reason: '用天馬行空的思想實驗放鬆大腦皮質，非常適合打破因物理環境狹窄或嘈雜帶來的壓迫感。' },
  { id: 12, title: '聊聊一件你最近買過最無用、但卻帶給你極大快樂的垃圾小東西', rate: 92, reason: '卸下精緻的包裝，聊聊生活中的荒謬與溫柔，這種幽默感能瞬間拉近彼此的物理與心理距離。' },
  { id: 13, title: '在你目前的日常生活中，什麼事情最容易讓你一秒感到能量耗盡？', rate: 90, reason: '共同吐槽生活中的「能量黑洞」能建立起強大的同盟感，這在巨蟹或天蠍座的人格推演中效果加倍。' },
  { id: 14, title: '如果你的靈魂可以用一種古典樂器來形容，你覺得那會是什麼聲音？', rate: 87, reason: '極具亞典藝術感官的抽象隱喻題，能引導重視內在精神層次（如 INFJ/INFP）的對象展現深度思維。' },
  { id: 15, title: '探討一個你小時候深信不疑，但長大後發現完全是大人騙局的童年秘密', rate: 91, reason: '喚醒童年的純真與荒謬記憶，能瞬間在潛意識裡建立起宛如多年老友般的深層熟悉感。' },
  { id: 16, title: '分享一本對你的價值觀產生過顛覆性影響的書籍或電影，它改寫了你什麼看法？', rate: 100, reason: '這是高階知性對頻的終極試金石，能讓你們在短時間內觸及彼此的思想核心與靈魂邊界。' },
  { id: 17, title: '如果現在可以立刻拋下一切去學習一門全新的手藝或技術，你會選什麼？', rate: 88, reason: '這道題目背後隱喻著每個人未被滿足的隱藏自我，聊這個能看到對方眼神中閃爍的熱情火花。' },
  { id: 18, title: '聊聊你收過最溫暖或最荒謬的一句讚美，當時是什麼樣的情境？', rate: 93, reason: '正面情緒的記憶回溯能讓大腦分泌多巴胺，使雙方在物理空間中的氛圍變得更具包容力與安全感。' },
  { id: 19, title: '如果你要把當前的人生階段拍成一部電影，你會給它取什麼文青片名？', rate: 89, reason: '利用第三人稱的視角進行自我審視，既有文藝電影的史詩感，又不會顯得過於沉重刻板。' },
  { id: 20, title: '探討你覺得「真正懂你的人」，通常需要具備哪一種微小但關鍵的特質？', rate: 99, reason: '這是一道直擊靈魂核心（Core Ego）的試探題。對方在回答的同時，其實正在向你遞交走入他內心的鑰匙。' },
  { id: 21, title: '分享一個你最近嘗試過、且讓你覺得「世界真奇妙」的全新生活體驗', rate: 90, reason: '保持對世界的新鮮感是雙子與射手座的核心養分，分享新體驗能讓談話氣氛始終保持生動前衛。' },
  { id: 22, title: '聊聊你最不能忍受的一種社交假客套，以及你通常會怎麼冷靜應對？', rate: 92, reason: '坦率地面對社交中的虛偽，能建立起一種「我們都是真實之人」的默契，讓接下來的對話更有誠意。' }
];

export function generateComprehensiveAnalysis({ zodiac, mbti, purpose, environment, energy, screenshotScores }) {
  const zInfo = ZODIACS.find(z => z.id === zodiac);
  const targetPersona = zInfo ? `${zInfo.label} (${zInfo.god})` : (mbti || '神祕觀測對象');
  
  let survivalRate = 75;
  if (environment === 'quiet_cafe' && mbti?.includes('I')) survivalRate = 92;
  if (environment === 'loud_restaurant' && energy === 'low') survivalRate = 45;
  if (screenshotScores) {
    survivalRate = Math.max(15, Math.min(98, survivalRate - Math.floor(screenshotScores.freezeRate / 3)));
  }

  let macroAssessment = `觀測目前的情境脈絡，我們會發現 ${targetPersona} 的靈魂氣場呈現出一種深邃且極具質感的波動。`;
  if (zInfo) {
    macroAssessment += `在古典十七世紀天體圖譜中，這類靈魂與「${zInfo.god}」的原始雕刻圖騰深刻共鳴。這意味著在日常社交的表象之下，他們${zInfo.desc}`;
  }
  if (mbti) {
    macroAssessment += `再結合其 ${mbti} 的核心人格矩陣，他們在與人接觸時，習慣在心中先建立一個隱形的觀察網格，確認彼此的對頻邊界。`;
  } else {
    macroAssessment += `目前雖缺乏 MBTI 的科學加權，但其古典星象底蘊已足夠為這場會面提供清晰的人際處方。`;
  }
  
  if (energy === 'high') {
    macroAssessment += ` 今日他們的情緒頻道處於高昂的接收狀態，更嚮往充滿智識張力與思想實驗的話題。`;
  } else {
    macroAssessment += ` 值得注意的是，今日他們的靈魂更嚮往一場靜謐、溫和且卸下防備的低能量沉澱，過於生硬的破冰可能會讓他們悄悄退回防禦高牆。`;
  }

  // 隨機抽選 5 張大尺寸塔羅話題牌
  const shuffled = [...COMPREHENSIVE_TAROT_BANK].sort(() => 0.5 - Math.random());
  const selectedCards = shuffled.slice(0, 5);

  let rescueLine = '「今天能坐在這裡一起聊聊天真的很開心，不用有壓力，我們就隨心所欲地跟著感覺走。」';
  if (screenshotScores && screenshotScores.freezeRate > 55) {
    rescueLine = `「實不相瞞，我出門前還在心裡排練了好幾次冷場該怎麼辦，但現在看到你，我覺得我們可以先聊聊今天這杯咖啡的風味。」`;
  }

  let forbidden = '請絕對避免在對話初期過度探聽其隱私細線（例如過往關係細節或具體薪資），
