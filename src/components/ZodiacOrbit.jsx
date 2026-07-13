// Decorative celestial wheel, fixed top-right, one slow rotation per 40s.
export default function ZodiacOrbit() {
  const ticks = Array.from({ length: 12 })

  return (
    <div
      className="pointer-events-none fixed -top-28 -right-28 w-72 h-72 sm:w-96 sm:h-96 opacity-[0.14]"
      style={{ zIndex: 0 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_40s_linear_infinite]">
        <circle cx="50" cy="50" r="47" fill="none" stroke="#2C2A29" strokeWidth="0.4" strokeDasharray="1 4" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#2C2A29" strokeWidth="0.3" />
        {ticks.map((_, i) => {
          const a = (i * 30 * Math.PI) / 180
          const x1 = 50 + 35 * Math.cos(a)
          const y1 = 50 + 35 * Math.sin(a)
          const x2 = 50 + 47 * Math.cos(a)
          const y2 = 50 + 47 * Math.sin(a)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2C2A29" strokeWidth="0.3" />
        })}
        <circle cx="50" cy="50" r="2" fill="#1D4ED8" />
      </svg>
    </div>
  )
}
