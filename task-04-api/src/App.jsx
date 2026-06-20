import { useState } from 'react'
import { BookOpen, Loader2 } from 'lucide-react'
import { useWikipediaData } from './hooks/useWikipediaData'
import SearchBar from './components/SearchBar'
import StatsGrid from './components/StatsGrid'
import SummarySection from './components/SummarySection'
import PageViewsChart from './components/PageViewsChart'
import LinkedPagesList from './components/LinkedPagesList'

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

  return (
    <div className="min-h-screen bg-wiki-lightgray">

      {/* ── Top bar ── */}
      <header className="bg-white border-b border-wiki-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <BookOpen size={22} className="text-wiki-blue shrink-0" />
          <span className="font-semibold text-wiki-text text-lg tracking-tight">
            Wiki<span className="text-wiki-blue">Dash</span>
          </span>
          <SearchBar
            input={input}
            setInput={setInput}
            onSearch={handleSearch}
            onClear={handleClear}
            loading={loading}
          />
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

        {/* Dashboard */}
        {data && !loading && (
          <div className="space-y-4">
            <SummarySection data={data} />
            <StatsGrid data={data} />
            <PageViewsChart pageViews={data.pageViews} />
            <LinkedPagesList linkedPages={data.linkedPages} backlinks={data.backlinks} />
          </div>
        )}

      </main>
    </div>
  )
}