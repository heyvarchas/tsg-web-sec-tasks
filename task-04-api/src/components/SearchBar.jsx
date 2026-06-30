{/* I need a couple of icons from lucide react */}
import { Search, X, Loader2 } from 'lucide-react'

{/* Next I indend to create and export the SearchBar component */}
export default function SearchBar({ input, setInput, onSearch, onClear, loading }) {
  {/* Let's check if the user hit the enter key */}
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch()
  }

  {/* jsx part returned by the component */}
  return (
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
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-wiki-gray hover:text-wiki-text"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <button
        onClick={onSearch}
        disabled={loading || !input.trim()}
        className="flex items-center gap-1.5 bg-wiki-blue text-white text-sm px-4 py-2
                   rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors shrink-0"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
        {loading ? 'Fetching…' : 'Search'}
      </button>
    </div>
  )
}