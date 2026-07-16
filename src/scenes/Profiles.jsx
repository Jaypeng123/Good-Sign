import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ZODIACS, MBTIS, GENDERS, CHAT_STYLES, ATTACHMENT_STYLES, MEETING_TYPES, ENVIRONMENTS_V2,
} from '../data'

function Field({ label, children }) {
  return (
    <div className="mb-5">
      <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40 font-mono mb-2">{label}</p>
      {children}
    </div>
  )
}

function PillGroup({ options, value, onChange, getLabel = (o) => o.label, getId = (o) => o.id }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const id = getId(o)
        const active = value === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(active ? '' : id)}
            className={`px-3.5 py-2 rounded-full border text-xs font-mono tracking-wide transition-colors ${
              active ? 'bg-ink text-cream border-ink' : 'border-ink/20 text-ink/70 hover:border-ink/60'
            }`}
          >
            {getLabel(o)}
          </button>
        )
      })}
    </div>
  )
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/40 backdrop-blur-sm border border-ink/20 rounded-xl px-3 py-2.5 text-sm font-mono text-ink outline-none focus:border-[#1D4ED8]/60 transition-colors appearance-none"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

function PersonColumn({ title, subtitle, person, setPerson, showZodiac, showOccupation }) {
  function set(key, val) {
    setPerson((p) => ({ ...p, [key]: val }))
  }

  return (
    <div className="flex-1 min-w-[260px] bg-white/30 backdrop-blur-md border border-ink/15 rounded-3xl px-6 py-8 shadow-[0_20px_50px_-25px_rgba(44,42,41,0.4)]">
      <p className="font-serif text-2xl text-ink mb-0.5">{title}</p>
      <p className="text-[10px] uppercase tracking-[0.3em] text-ink/40 font-mono mb-6">{subtitle}</p>

      {showZodiac && (
        <Field label="星座 Zodiac">
          <Select
            value={person.zodiac ?? ''}
            onChange={(v) => set('zodiac', v)}
            placeholder="選擇星座"
            options={ZODIACS.map((z) => ({ value: z.id, label: z.label }))}
          />
        </Field>
      )}

      <Field label="MBTI">
        <Select
          value={person.mbti ?? ''}
          onChange={(v) => set('mbti', v)}
          placeholder="不知道 / 跳過"
          options={MBTIS.map((m) => ({ value: m, label: m }))}
        />
      </Field>

      <Field label="性別 Gender">
        <PillGroup options={GENDERS} value={person.gender} onChange={(v) => set('gender', v)} />
      </Field>

      <Field label="年齡 Age">
        <input
          type="number"
          min="0"
          max="120"
          value={person.age ?? ''}
          onChange={(e) => set('age', e.target.value)}
          placeholder="輸入年齡"
          className="w-full bg-white/40 backdrop-blur-sm border border-ink/20 rounded-xl px-3 py-2.5 text-sm font-mono text-ink outline-none focus:border-[#1D4ED8]/60 transition-colors"
        />
      </Field>

      {showOccupation && (
        <Field label="職業 Occupation">
          <input
            type="text"
            value={person.occupation ?? ''}
            onChange={(e) => set('occupation', e.target.value)}
            placeholder="輸入職業（選填）"
            className="w-full bg-white/40 backdrop-blur-sm border border-ink/20 rounded-xl px-3 py-2.5 text-sm font-mono text-ink outline-none focus:border-[#1D4ED8]/60 transition-colors"
          />
        </Field>
      )}

      <Field label="興趣 Interests">
        <input
          type="text"
          value={person.interests ?? ''}
          onChange={(e) => set('interests', e.target.value)}
          placeholder="用逗號分隔，例如：爬山, 貓, 電影"
          className="w-full bg-white/40 backdrop-blur-sm border border-ink/20 rounded-xl px-3 py-2.5 text-sm font-mono text-ink outline-none focus:border-[#1D4ED8]/60 transition-colors"
        />
      </Field>

      <Field label="聊天風格 Chat Style">
        <PillGroup options={CHAT_STYLES} value={person.chatStyle} onChange={(v) => set('chatStyle', v)} />
      </Field>

      <Field label="依戀風格 Attachment Style">
        <PillGroup options={ATTACHMENT_STYLES} value={person.attachmentStyle} onChange={(v) => set('attachmentStyle', v)} />
      </Field>
    </div>
  )
}

function ScreenshotUpload({ file, onChange }) {
  const [previewUrl, setPreviewUrl] = useState(null)

  function handleFile(e) {
    const f = e.target.files?.[0] ?? null
    onChange(f)
    setPreviewUrl(f ? URL.createObjectURL(f) : null)
  }

  function clear() {
    onChange(null)
    setPreviewUrl(null)
  }

  return (
    <Field label="對話截圖 Chat Screenshot（選填）">
      <p className="text-xs text-ink/50 mb-3">上傳與對方的聊天截圖，AI 會分析互動氣氛並納入契合度計算。</p>
      {file ? (
        <div className="flex items-center gap-3">
          {previewUrl && (
            <img src={previewUrl} alt="截圖預覽" className="w-16 h-16 object-cover rounded-xl border border-ink/15" />
          )}
          <div className="flex-1 text-xs text-ink/60 truncate">{file.name}</div>
          <button
            type="button"
            onClick={clear}
            className="px-3 py-1.5 rounded-full border border-ink/20 text-xs font-mono hover:border-ink transition-colors"
          >
            移除
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center px-4 py-3 rounded-xl border border-dashed border-ink/25 text-xs font-mono text-ink/50 cursor-pointer hover:border-ink/50 transition-colors">
          點擊上傳截圖
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      )}
    </Field>
  )
}

export default function Profiles({ targetZodiac, onComplete }) {
  const [you, setYou] = useState({})
  const [target, setTarget] = useState({ zodiac: targetZodiac })
  const [meetingType, setMeetingType] = useState('')
  const [environment, setEnvironment] = useState('')
  const [screenshotFile, setScreenshotFile] = useState(null)

  const blocked = !you.zodiac || !meetingType || !environment

  return (
    <div className="relative min-h-screen flex flex-col items-center px-6 pt-24 pb-16">
      <p className="text-[10px] uppercase tracking-[0.35em] text-ink/40 font-mono mb-3">Step 02 — Intention Calibration</p>
      <h2 className="font-serif text-3xl sm:text-4xl text-ink text-center mb-2">Two souls, one story.</h2>
      <p className="text-xs text-ink/40 mb-10">填寫雙方的靈魂座標</p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl flex flex-col sm:flex-row gap-5"
      >
        <PersonColumn
          title="You"
          subtitle="你自己"
          person={you}
          setPerson={setYou}
          showZodiac
          showOccupation={false}
        />
        <PersonColumn
          title="Target"
          subtitle={ZODIACS.find((z) => z.id === targetZodiac)?.label ?? '對象'}
          person={target}
          setPerson={setTarget}
          showZodiac={false}
          showOccupation
        />
      </motion.div>

      <div className="w-full max-w-4xl mt-8 bg-white/30 backdrop-blur-md border border-ink/15 rounded-3xl px-6 py-8">
        <Field label="見面性質 Meeting Type">
          <div className="flex flex-wrap gap-2">
            {MEETING_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setMeetingType(t.id)}
                className={`px-4 py-2.5 rounded-full border text-sm font-serif transition-colors ${
                  meetingType === t.id ? 'bg-ink text-cream border-ink' : 'border-ink/20 hover:border-ink/60'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Field>
        <Field label="見面環境 Environment">
          <div className="flex flex-wrap gap-2">
            {ENVIRONMENTS_V2.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setEnvironment(e.id)}
                className={`px-4 py-2.5 rounded-full border text-sm font-serif transition-colors ${
                  environment === e.id ? 'bg-ink text-cream border-ink' : 'border-ink/20 hover:border-ink/60'
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </Field>
        <ScreenshotUpload file={screenshotFile} onChange={setScreenshotFile} />
      </div>

      <motion.button
        type="button"
        disabled={blocked}
        onClick={() => onComplete({ you, target, meetingType, environment, screenshotFile })}
        whileHover={!blocked ? { scale: 1.05 } : {}}
        className={`mt-12 px-10 py-4 rounded-full border text-xs uppercase tracking-[0.3em] font-mono transition-colors duration-500 ${
          blocked ? 'border-ink/10 text-ink/20 cursor-not-allowed' : 'border-ink/30 hover:bg-ink hover:text-cream hover:border-ink'
        }`}
      >
        Reveal My Sign
      </motion.button>
    </div>
  )
}
