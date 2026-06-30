{/* Need a couple of things from the recharts library to create the page views chart */}
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatChartDate, formatCompact, formatNumber } from '../utils/formatters'

{/* How about I create a new CustomTooltip component */}
function CustomTooltip({ active, payload, label }) {
  {/* Check if the tooltip should be shown */}
  if (!active || !payload?.length) return null
  {/* Return the tooltip jsx */}
  return (
    <div className="bg-white border border-wiki-border rounded shadow-md px-3 py-2 text-xs">
      <p className="text-wiki-gray mb-1">{formatChartDate(label)}</p>
      <p className="font-semibold text-wiki-text">{formatNumber(payload[0].value)} views</p>
    </div>
  )
}

{/* Now I'll create and export the main chart component */}
export default function PageViewsChart({ pageViews }) {
  return (
    <div className="card">
      <p className="section-title">Pageviews — Last 30 Days</p>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={pageViews.daily} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3366cc" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3366cc" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#a2a9b1" strokeOpacity={0.3} />
          <XAxis
            dataKey="date"
            tickFormatter={formatChartDate}
            tick={{ fontSize: 10, fill: '#54595d' }}
            interval={6}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={formatCompact}
            tick={{ fontSize: 10, fill: '#54595d' }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#3366cc"
            strokeWidth={2}
            fill="url(#viewsGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#3366cc' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}