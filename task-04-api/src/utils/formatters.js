// ─── Date formatting ──────────────────────────────────────────────────────────
export function formatDate(isoString) {
  if (!isoString) return 'N/A'
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(isoString) {
  if (!isoString) return 'N/A'
  return new Date(isoString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ─── Number formatting ────────────────────────────────────────────────────────
export function formatNumber(num) {
  if (num === null || num === undefined) return 'N/A'
  return new Intl.NumberFormat('en-US').format(num)
}

export function formatCompact(num) {
  if (num === null || num === undefined) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num)
}

// ─── Byte formatting ──────────────────────────────────────────────────────────
export function formatBytes(bytes) {
  if (!bytes) return 'N/A'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

// ─── Protection status ────────────────────────────────────────────────────────
export function formatProtection(protection) {
  if (!protection || protection.length === 0) return 'None'

  return protection
    .map((p) => {
      const level = p.level === 'autoconfirmed' ? 'Semi-protected' : 'Fully protected'
      const type = p.type === 'edit' ? 'Edit' : 'Move'
      return `${type}: ${level}`
    })
    .join(' · ')
}

// ─── Chart date label ─────────────────────────────────────────────────────────
export function formatChartDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}