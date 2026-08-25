export default function SectionHeading({ kicker, title, sub, align = 'center' }) {
  const alignment = align === 'left' ? 'text-left' : 'text-center mx-auto'
  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="kicker">{kicker}</p>
      <h2 className="font-display mt-3 text-3xl font-extrabold text-navy-900 md:text-4xl">
        {title}
      </h2>
      <span className="mt-4 block h-1 w-16 bg-gold-500" />
      {sub && <p className="mt-4 leading-relaxed text-slate-500">{sub}</p>}
    </div>
  )
}
