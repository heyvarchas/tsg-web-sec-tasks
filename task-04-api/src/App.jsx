import { useState } from 'react'
import { Search, X, BookOpen, Loader2 } from 'lucide-react'
import { useWikipediaData } from './hooks/useWikipediaData'

export default function App() {
  const [input, setInput] = useState('')
  const { data, loading, error, search, reset } = useWikipediaData()

  const handleSearch = () => {
    if (input.trim()) search(input.trim())
  }

  const handleClear = () => {
    setInput('')
    reset()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="min-h-screen bg-wiki-lightgray">

      {/* ── Top bar ── */}
      <header className="bg-white border-b border-wiki-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <BookOpen size={22} className="text-wiki-blue shrink-0" />
          <span className="font-semibold text-wiki-text text-lg tracking-tight">
            Wiki<span className="text-wiki-blue">Dash</span>
          </span>

          {/* Search input */}
          <div className="flex-1 flex items-center gap-2 ml-4">
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Search a Wikipedia page — e.g. "Albert Einstein"'
                className="w-full border border-wiki-border rounded-md px-3 py-2 pr-8 text-sm
                           focus:outline-none focus:ring-2 focus:ring-wiki-blue focus:border-transparent
                           bg-wiki-lightgray placeholder:text-wiki-gray"
              />
              {input && (
                <button
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-wiki-gray hover:text-wiki-text"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !input.trim()}
              className="flex items-center gap-1.5 bg-wiki-blue text-white text-sm px-4 py-2
                         rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors shrink-0"
            >
              {loading
                ? <Loader2 size={14} className="animate-spin" />
                : <Search size={14} />
              }
              {loading ? 'Fetching…' : 'Search'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-6xl mx-auto px-4 py-6">

        {/* Empty state */}
        {!data && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <BookOpen size={48} className="text-wiki-border mb-4" />
            <h2 className="text-xl font-semibold text-wiki-text mb-2">
              Search any Wikipedia page
            </h2>
            <p className="text-wiki-gray text-sm max-w-sm">
              Enter a page title above to load a full statistics dashboard —
              views, editors, metadata, links, and more.
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mt-8 max-w-md mx-auto card border-red-200 bg-red-50 text-red-700 text-sm">
            <p className="font-semibold mb-1">Could not load page</p>
            <p>{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 size={32} className="animate-spin text-wiki-blue" />
            <p className="text-wiki-gray text-sm">Fetching Wikipedia data…</p>
          </div>
        )}

        {/* Dashboard — placeholder slots for Day 2 components */}
        {data && !loading && (
          <div className="space-y-6">

            {/* Row 1 — header + thumbnail */}
            <div className="card">
              <p className="section-title">Page</p>
              <h1 className="text-2xl font-bold text-wiki-text">{data.title}</h1>
              <p className="text-xs font-mono text-wiki-gray mt-1">ID: {data.pageId}</p>
            </div>

            {/* Row 2 — stats grid placeholder */}
            <div className="card">
              <p className="section-title">Metadata</p>
              <pre className="text-xs text-wiki-gray overflow-auto">
                {JSON.stringify(
                  {
                    length: data.length,
                    lastEdited: data.lastEdited,
                    currentRevisionId: data.currentRevisionId,
                    protection: data.protection,
                    dateCreated: data.dateCreated,
                    lastEditor: data.lastEditor,
                    uniqueEditors: data.uniqueEditors,
                    languageCount: data.languageCount,
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            {/* Row 3 — pageviews placeholder */}
            <div className="card">
              <p className="section-title">Pageviews (raw)</p>
              <p className="text-sm text-wiki-gray">
                Total: {data.pageViews.total} · Avg: {data.pageViews.average}/day ·
                Days: {data.pageViews.daily.length}
              </p>
            </div>

          </div>
        )}
      </main>
    </div>
  )
}