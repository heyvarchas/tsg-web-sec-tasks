{/* directly jump to the main component of the code, to be imported */}
export default function SummarySection({ data }) {
  {/* this entirely is the jsx part to be returned */}
  return (
    <div className="card flex gap-5">
      {data.thumbnail && (
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-32 h-32 object-cover rounded-md border border-wiki-border shrink-0"
        />
      )}
      <div className="flex flex-col gap-2">
        <p className="section-title">Summary</p>
        <h1 className="text-2xl font-bold text-wiki-text leading-tight">{data.title}</h1>
        <p className="text-sm text-wiki-gray leading-relaxed line-clamp-5">{data.extract}</p>
        <a
          href={`https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-wiki-blue hover:underline mt-auto"
        >
          Read full article on Wikipedia →
        </a>
      </div>
    </div>
  )
}