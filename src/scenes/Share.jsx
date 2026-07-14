import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'

function ShareCard({ innerRef, report }) {
  return (
    <div ref={innerRef} className="w-[360px] bg-cream border-2 border-[#1D4ED8] p-8 flex flex-col items-center text-center gap-3 rounded-2xl">
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#1D4ED8]/60 font-mono">GOOD SIGN — Oracle Report</span>
      <h2 className="font-['Cinzel'] font-black text-3xl text-ink">{report.targetName}</h2>
      <div className="font-serif text-6xl text-[#1D4ED8]">{report.compatibility}%</div>
      <p className="text-xs text-ink/60 leading-relaxed">{report.firstImpression.slice(0, 70)}…</p>
      <span className="text-[10px] uppercase tracking-widest text-ink/30 font-mono mt-2">good-sign-tau.vercel.app</span>
    </div>
  )
}

function buildCaption(report) {
  return `我剛用 GOOD SIGN 解讀了跟 ${report.targetName} 見面的星象契合度，居然有 ${report.compatibility}%！\n${report.firstImpression.slice(0, 40)}…\n#GOODSIGN #星座配對 #人類連結數位觀測所`
}

export default function Share({ report, onRestart }) {
  const cardRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [captionCopied, setCaptionCopied] = useState(false)
  const caption = buildCaption(report)

  async function handleCopyCaption() {
    try {
      await navigator.clipboard.writeText(caption)
      setCaptionCopied(true)
      window.setTimeout(() => setCaptionCopied(false), 2000)
    } catch {
      // clipboard unavailable — nothing more we can do silently
    }
  }

  async function handleShareLink() {
    const shareText = `我剛用 GOOD SIGN 解讀了 ${report.targetName}，契合度 ${report.compatibility}%！`
    const shareData = { title: 'GOOD SIGN', text: shareText, url: window.location.href }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // cancelled — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareData.url}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — nothing more we can do silently
    }
  }

  async function handleDownload() {
    if (!cardRef.current) return
    const canvas = await html2canvas(cardRef.current, { backgroundColor: '#F6F3ED', scale: 2 })
    const link = document.createElement('a')
    link.download = 'good-sign-result.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-serif text-2xl sm:text-3xl text-ink mb-1"
      >
        This reading exists only once.
      </motion.p>
      <p className="text-[10px] uppercase tracking-[0.3em] text-ink/40 font-mono mb-12">此刻的星象，僅此一次</p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-10 shadow-[0_20px_50px_-15px_rgba(29,78,216,0.3)] rounded-2xl"
      >
        <ShareCard innerRef={cardRef} report={report} />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          type="button"
          onClick={handleShareLink}
          className="px-6 py-3 rounded-full bg-ink text-cream text-sm font-mono tracking-wide hover:opacity-90 transition-opacity"
        >
          {copied ? '已複製連結 ✓' : '分享連結'}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="px-6 py-3 rounded-full border border-ink/30 text-ink text-sm font-mono tracking-wide hover:border-ink transition-colors"
        >
          下載分享圖（IG / FB 用）
        </button>
      </div>

      <div className="w-full max-w-sm bg-white/30 backdrop-blur-md border border-ink/15 rounded-2xl p-5 text-left">
        <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40 font-mono mb-2">IG / Threads 文案草稿</p>
        <p className="text-sm text-ink/70 whitespace-pre-line leading-relaxed mb-3">{caption}</p>
        <button
          type="button"
          onClick={handleCopyCaption}
          className="px-4 py-2 rounded-full border border-ink/20 text-xs font-mono tracking-wide hover:border-ink transition-colors"
        >
          {captionCopied ? '已複製文案 ✓' : '複製文案'}
        </button>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-16 text-xs uppercase tracking-widest text-ink/40 hover:text-ink font-mono transition-colors"
      >
        ↺ Begin Again With Another Soul
      </button>
    </div>
  )
}
