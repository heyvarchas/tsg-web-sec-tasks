{/* Need a couple of functions from the formatters file */}
import { formatDate, formatDateTime, formatBytes, formatNumber, formatProtection } from '../utils/formatters'

{/* I'll need a reusable piece of code for the card component */}
function StatCard({ label, value, mono = false }) {
  return (
    <div className="card flex flex-col gap-1">
      <p className="stat-label uppercase tracking-widest text-xs">{label}</p>
      <p className={`stat-value text-lg break-all ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  )
}

{/* Here;s again the main component of this file of code */}
export default function StatsGrid({ data }) {
  const protection = formatProtection(data.protection)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <StatCard label="Page ID"            value={data.pageId}                          mono />
      <StatCard label="Page Length"        value={formatBytes(data.length)}             />
      <StatCard label="Last Edited"        value={formatDateTime(data.lastEdited)}      />
      <StatCard label="Date Created"       value={formatDate(data.dateCreated)}         />
      <StatCard label="Revision ID"        value={data.currentRevisionId}               mono />
      <StatCard label="Protection"         value={protection}                           />
      <StatCard label="Unique Editors"     value={formatNumber(data.uniqueEditors)}     />
      <StatCard label="Last Editor"        value={data.lastEditor}                      />
      <StatCard label="Languages"          value={formatNumber(data.languageCount)}     />
      <StatCard label="Total Views (30d)"  value={formatNumber(data.pageViews.total)}  />
      <StatCard label="Avg Daily Views"    value={formatNumber(data.pageViews.average)} />
      <StatCard label="Backlinks"          value={formatNumber(data.backlinks.length)}  />
    </div>
  )
}