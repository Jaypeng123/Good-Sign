import { useEffect, useRef } from 'react'

// Slow-drifting dust/star particles rendered on a canvas — cheap enough to run
// continuously behind every scene without competing with GSAP/Framer Motion for the main thread.
export default function AmbientBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []
    let w = 0
    let h = 0

    function init() {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio
      const count = Math.floor((w * h) / 26000)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        speed: Math.random() * 0.12 + 0.02,
        drift: (Math.random() - 0.5) * 0.06,
        alpha: Math.random() * 0.35 + 0.1,
        sparkle: Math.random() < 0.16,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    function drawStar(x, y, r) {
      ctx.beginPath()
      ctx.moveTo(x, y - r)
      ctx.lineTo(x + r * 0.28, y - r * 0.28)
      ctx.lineTo(x + r, y)
      ctx.lineTo(x + r * 0.28, y + r * 0.28)
      ctx.lineTo(x, y + r)
      ctx.lineTo(x - r * 0.28, y + r * 0.28)
      ctx.lineTo(x - r, y)
      ctx.lineTo(x - r * 0.28, y - r * 0.28)
      ctx.closePath()
      ctx.fill()
    }

    let t = 0
    function tick() {
      t += 0.02
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        p.y -= p.speed
        p.x += p.drift
        if (p.y < -5) {
          p.y = h + 5
          p.x = Math.random() * w
        }
        if (p.x < -5) p.x = w + 5
        if (p.x > w + 5) p.x = -5

        if (p.sparkle) {
          const twinkle = (Math.sin(t * 2 + p.phase) + 1) / 2
          ctx.fillStyle = '#c9a876'
          ctx.globalAlpha = p.alpha * (0.3 + twinkle * 0.7)
          drawStar(p.x, p.y, p.r * 2.6)
        } else {
          ctx.fillStyle = '#2C2A29'
          ctx.globalAlpha = p.alpha
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }

    init()
    tick()
    window.addEventListener('resize', init)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
