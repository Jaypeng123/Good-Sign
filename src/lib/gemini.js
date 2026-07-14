// Thin native-fetch client for Gemini 1.5 Flash. No SDK dependency.
// Every export degrades to `null`/throws on missing key or any network/parse
// failure — callers always keep the local algorithm as the source of truth.
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

const REPORT_SYSTEM_PROMPT = `你是「GOOD SIGN」的 AI 神諭系統，融合古希臘神話原型與現代關係心理學（依戀理論、MBTI、星座元素）。
根據使用者提供的「你」與「對象」雙方的星座、人格代碼、性別、年齡、職業、興趣、聊天風格、依戀風格，以及本次見面的情境與地點，生成一份精準、溫暖但犀利、帶有神話詩意語感的關係解讀報告。
務必只回傳合法 JSON，不要包含 markdown code fence、不要有任何額外文字，格式必須完全符合：
{"relationshipOverview": string（150-220字的整體關係解讀，繁體中文）, "survivalRate": number（50 到 98 之間的整數，代表這場見面的存活/契合機率）, "cards": [{"title": string（一個破冰話題，15字以內）, "rate": number（0-100，這個話題的推薦指數）, "reason": string（為何推薦此話題，40-70字）, "avoidSaying": string（這個情境下最好避免說的一句話或話題，20-40字）}]}
cards 陣列必須恰好包含 5 張話題卡，彼此主題不重複。`

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

function personaSystemPrompt({ label, god, desc }) {
  return `你現在要扮演「${label}（${god}）」所代表的人格原型，正在跟使用者進行一場練習對話，模擬真實見面前的破冰聊天，讓使用者可以提前練習怎麼聊天。
這個星座的性格底蘊是：${desc}
你的語氣、用字、回覆速度感、標點符號習慣都必須完全符合這個星座的典型個性。回覆務必簡短、口語化、像真人在傳訊息，一次不要超過兩句話，可以適度使用表情符號或口語語助詞。
絕對不要提及你是 AI、語言模型、Gemini 或任何形式的程式；也不要跳出角色、不要加旁白或星號動作描述。`
}

export async function chatWithPersonaAI({ zodiac, history, userMessage }) {
  try {
    const contents = [
      ...history.map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
      { role: 'user', parts: [{ text: userMessage }] },
    ]
    const text = await callGemini({
      systemPrompt: personaSystemPrompt(zodiac),
      contents,
      jsonMode: false,
    })
    return text ? text.trim() : null
  } catch {
    return null
  }
}
