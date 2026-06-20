function PageList({ title, items }) {
  return (
    <div className="card flex-1">
      <p className="section-title">{title} <span className="text-wiki-blue">({items.length})</span></p>
      <div className="scrollable-list scrollbar-thin">
        {items.length === 0 ? (
          <p className="text-xs text-wiki-gray py-4 text-center">None found</p>
        ) : (
          items.map((item, i) => (
            <a
              key={i}
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(item)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="scrollable-list-item block"
            >
              {item}
            </a>
          ))
        )}
      </div>
    </div>
  )
}

export default function LinkedPagesList({ linkedPages, backlinks }) {
  return (
    <div className="flex gap-3">
      <PageList title="Pages Linked"  items={linkedPages} />
      <PageList title="Backlinks"     items={backlinks}   />
    </div>
  )
}