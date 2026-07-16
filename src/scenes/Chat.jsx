import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZODIACS } from '../data'
import { chatWithPersonaAI, hasGeminiKey } from '../lib/gemini'
import ZodiacStatue from '../components/ZodiacStatue'

const FALLBACK_REPLIES = {
  fire: ['哈哈這樣講也太直接了吧，我喜歡！', '欸等等我剛剛在想別的事，你繼續說！', '好啊好啊，那我們就這樣約定了。'],
  earth: ['嗯…讓我想一下要怎麼回答比較準確。', '這個我倒是有認真想過，可以聊聊。', '好，那就照這個步調來吧，不急。'],
  air: ['等等這讓我想到一件超有趣的事！', '欸你這樣說我突然有一百萬個問題想問。', '哈哈跳個話題可以嗎，我想到別的了。'],
  water: ['聽你這樣說，我心裡有點被觸動到。', '嗯…我需要一點時間消化一下這句話。', '謝謝你願意跟我說這些，感覺很珍貴。'],
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-ink/40"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}

export default function Chat({ zodiac, onNext }) {
  const zInfo = ZODIACS.find((z) => z.id === zodiac)
  const [messages, setMessages] = useState([
    { role: 'model', text: `嗨，我是${zInfo?.label ?? '對方'}人格模擬，來練習聊聊天吧？`, read: true },
  ])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  async function send() {
    const text = draft.trim()
    if (!text || typing) return
    const nextMessages = [...messages, { role: 'user', text, read: false }]
    setMessages(nextMessages)
    setDraft('')

    window.setTimeout(() => {
      setMessages((m) => m.map((msg) => (msg.role === 'user' ? { ...msg, read: true } : msg)))
    }, 500)

    setTyping(true)
    const history = nextMessages.map((m) => ({ role: m.role, text: m.text }))
    let reply = null
    if (zInfo) reply = await chatWithPersonaAI({ zodiac: zInfo, history, userMessage: text })
    if (!reply) {
      const pool = FALLBACK_REPLIES[zInfo?.element] ?? FALLBACK_REPLIES.air
      reply = pool[Math.floor(Math.random() * pool.length)]
      await new Promise((r) => window.setTimeout(r, 700 + Math.random() * 500))
    }
    setTyping(false)
    setMessages((m) => [...m, { role: 'model', text: reply, read: true }])
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center px-6 pt-24 pb-16">
      <p className="text-[10px] uppercase tracking-[0.35em] text-ink/40 font-mono mb-2">AI Practice Chat Room</p>
      {zInfo && (
        <div className="mb-3">
          <ZodiacStatue z={zInfo} size={84} />
        </div>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl text-ink text-center mb-1">和 {zInfo?.label ?? '對方'} 練習聊天</h2>
      <p className="text-[10px] text-ink/30 font-mono mb-8">
        {hasGeminiKey() ? '由 Gemini 驅動的人格模擬' : '本地人格模擬（未設定 Gemini API Key）'}
      </p>

      <div className="w-full max-w-lg bg-white/30 backdrop-blur-md border border-ink/15 rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_50px_-25px_rgba(44,42,41,0.4)]">
        <div className="flex-1 h-[420px] overflow-y-auto px-5 py-6 flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-[75%] flex flex-col ${m.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' ? 'bg-ink text-cream rounded-br-sm' : 'bg-white/70 text-ink rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
                {m.role === 'user' && (
                  <span className="text-[9px] text-ink/30 font-mono mt-1 mr-1">{m.read ? '已讀' : '傳送中'}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <div className="self-start bg-white/70 px-4 py-3 rounded-2xl rounded-bl-sm">
              <TypingDots />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="flex items-center gap-2 border-t border-ink/10 px-4 py-3 bg-white/20">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="輸入訊息練習開場白…"
            className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink/30"
          />
          <button
            type="button"
            onClick={send}
            className="px-4 py-2 rounded-full bg-ink text-cream text-xs font-mono tracking-wide hover:opacity-90 transition-opacity"
          >
            送出
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="mt-12 px-10 py-4 rounded-full border border-ink/30 text-xs uppercase tracking-[0.3em] font-mono hover:bg-ink hover:text-cream hover:border-ink transition-colors duration-500"
      >
        Continue To Sharing
      </button>
    </div>
  )
}
