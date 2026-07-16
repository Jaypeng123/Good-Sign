// Thin native-fetch client for Gemini 1.5 Flash. No SDK dependency.
// Every export degrades to `null`/throws on missing key or any network/parse
// failure — callers always keep the local algorithm as the source of truth.
import { ZODIACS, CHAT_STYLES, ATTACHMENT_STYLES } from '../data'

const MODEL = 'gemini-1.5-flash'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

export function hasGeminiKey() {
  return Boolean(import.meta.env.VITE_GEMINI_API_KEY)
}

async function callGemini({ systemPrompt, contents, jsonMode = false }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) return null

  const body = {
    systemInstruction: { role: 'system', parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: jsonMode
      ? { responseMimeType: 'application/json', temperature: 0.9 }
      : { temperature: 0.95, maxOutputTokens: 200 },
  }

  const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Gemini request failed: ${res.status}`)
  const json = await res.json()
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Gemini returned no text')
  return text
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '')
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const REPORT_SYSTEM_PROMPT = `你是「GOOD SIGN」的 AI 神諭系統，融合古希臘神話原型與現代關係心理學（依戀理論、MBTI、星座元素）。
根據使用者提供的「你」與「對象」雙方的星座、人格代碼、性別、年齡、職業、興趣、聊天風格、依戀風格，以及本次見面的情境與地點，生成一份精準、溫暖但犀利、帶有神話詩意語感的關係解讀報告。若輸入資料包含 screenshotSignal（既有聊天截圖的互動分析），請把它自然地融入你的判讀語氣中，而不是機械式引用數字。
務必只回傳合法 JSON，不要包含 markdown code fence、不要有任何額外文字，格式必須完全符合：
{"relationshipOverview": string（150-220字的整體關係解讀，繁體中文）, "survivalRate": number（50 到 98 之間的整數，代表這場見面的存活/契合機率）, "cards": [{"title": string（一個破冰話題，15字以內）, "rate": number（0-100，這個話題的推薦指數）, "reason": string（為何推薦此話題，40-70字，需針對這兩個人的具體條件量身說明，不能是泛用句子）, "avoidSaying": string（這個情境下最好避免說的一句話或話題，20-40字）}]}
cards 陣列必須恰好包含 5 張話題卡，彼此主題不重複，且分數與理由必須反映輸入資料的差異——不同輸入應產生不同結果，絕不輸出固定模板。`

export async function generateOracleReportAI(profile) {
  try {
    const text = await callGemini({
      systemPrompt: REPORT_SYSTEM_PROMPT,
      jsonMode: true,
      contents: [
        {
          role: 'user',
          parts: [{ text: `以下是本次占卜的完整輸入資料（JSON）：\n${JSON.stringify(profile)}` }],
        },
      ],
    })
    if (!text) return null
    const parsed = JSON.parse(text)
    if (!parsed || typeof parsed.survivalRate !== 'number' || !Array.isArray(parsed.cards)) return null
    return parsed
  } catch {
    return null
  }
}

const SCREENSHOT_SYSTEM_PROMPT = `你是一位聊天互動分析師，會根據使用者上傳的聊天截圖畫面，評估這段對話呈現出的互動氣氛與節奏（回覆速度感、語氣溫暖度、話題延展性），僅憑畫面線索合理推測即可，不需要也不應該辨識或複誦畫面中出現的任何具體人名或隱私內容。
務必只回傳合法 JSON，不要包含 markdown code fence，格式必須完全符合：
{"responsiveness": number（0-100，回覆速度與積極度的推測）, "warmth": number（0-100，語氣溫暖度）, "engagement": number（0-100，話題延展性與投入程度）, "summary": string（30-50字，繁體中文，簡短描述這段互動給人的整體感覺）}
若圖片內容難以判讀為聊天畫面，仍請給出合理的中性估計值（50 上下）而不是拒絕回答。`

export async function analyzeScreenshotAI(file) {
  if (!file) return null
  try {
    const base64 = await fileToBase64(file)
    const text = await callGemini({
      systemPrompt: SCREENSHOT_SYSTEM_PROMPT,
      jsonMode: true,
      contents: [
        {
          role: 'user',
          parts: [
            { text: '請分析這張聊天截圖的互動氣氛與節奏。' },
            { inlineData: { mimeType: file.type || 'image/png', data: base64 } },
          ],
        },
      ],
    })
    if (!text) return null
    const parsed = JSON.parse(text)
    if (typeof parsed.responsiveness !== 'number') return null
    return parsed
  } catch {
    return null
  }
}

function personaSystemPrompt(target) {
  const zInfo = ZODIACS.find((z) => z.id === target?.zodiac)
  const label = zInfo?.label ?? '神祕對象'
  const god = zInfo?.god ?? ''
  const desc = zInfo?.desc ?? '性格帶有獨特而難以歸類的氣質。'
  const chatStyleLabel = CHAT_STYLES.find((c) => c.id === target?.chatStyle)?.label
  const attachmentLabel = ATTACHMENT_STYLES.find((a) => a.id === target?.attachmentStyle)?.label

  let extra = ''
  if (target?.mbti && target.mbti !== 'unknown') extra += `\n人格代碼是 ${target.mbti}，請讓這個人格特質自然地反映在你的用詞與反應方式上。`
  if (chatStyleLabel) extra += `\n聊天習慣偏向「${chatStyleLabel}」，回覆的節奏感要符合這個特質。`
  if (attachmentLabel) extra += `\n依戀風格偏向「${attachmentLabel}」，在對話中要讓這種傾向自然流露，但不要直接說出這個心理學名詞。`
  if (target?.interests) extra += `\n對這些事物特別有興趣：${target.interests}，可以在合適時機自然帶到，但不要每句話都提。`

  return `你現在要扮演「${label}（${god}）」所代表的人格原型，正在跟使用者進行一場練習對話，模擬真實見面前的破冰聊天，讓使用者可以提前練習怎麼聊天。
這個星座的性格底蘊是：${desc}${extra}
你的語氣、用字、回覆速度感、標點符號習慣都必須完全符合以上人格設定的綜合體。回覆務必簡短、口語化、像真人在傳訊息，一次不要超過兩句話，可以適度使用表情符號或口語語助詞。
絕對不要提及你是 AI、語言模型、Gemini 或任何形式的程式；也不要跳出角色、不要加旁白或星號動作描述。`
}

export async function chatWithPersonaAI({ target, history, userMessage }) {
  try {
    const contents = [
      ...history.map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
      { role: 'user', parts: [{ text: userMessage }] },
    ]
    const text = await callGemini({
      systemPrompt: personaSystemPrompt(target),
      contents,
      jsonMode: false,
    })
    return text ? text.trim() : null
  } catch {
    return null
  }
}
