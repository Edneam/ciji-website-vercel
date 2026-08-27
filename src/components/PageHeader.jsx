export default function PageHeader({ title, crumb, image }) {
  return (
    <section className="relative flex h-80 items-end overflow-hidden bg-navy-900">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        width="1920"
        height="400"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
      <div className="container-x relative pb-12">
        <p className="kicker">
          Home <span className="mx-2 text-slate-400">/</span> {crumb || title}
        </p>
        <h1 className="font-display mt-3 text-4xl font-extrabold text-white md:text-5xl">{title}</h1>
      </div>
    </section>
  )
}
