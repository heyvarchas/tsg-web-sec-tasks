const WIKI_API = 'https://en.wikipedia.org/w/api.php'
const WIKI_REST = 'https://en.wikipedia.org/api/rest_v1'
const WIKI_PAGEVIEWS = 'https://wikimedia.org/api/rest_v1/metrics/pageviews'

const params = (obj) =>
  new URLSearchParams({ ...obj, origin: '*', format: 'json' }).toString()

// ─── 1. Core page metadata ────────────────────────────────────────────────────
export async function fetchPageInfo(title) {
  const url = `${WIKI_API}?${params({
    action: 'query',
    titles: title,
    prop: 'info|revisions',
    inprop: 'protection',
    rvprop: 'ids|timestamp|user',
    rvlimit: 1,
    rvdir: 'newer',
  })}`

  const res = await fetch(url)
  const data = await res.json()
  const page = Object.values(data.query.pages)[0]

  if (page.missing !== undefined) throw new Error('Page not found')

  const firstRevision = page.revisions?.[0]

  return {
    pageId: page.pageid,
    title: page.title,
    length: page.length,
    lastEdited: page.touched,
    currentRevisionId: page.lastrevid,
    protection: page.protection ?? [],
    dateCreated: firstRevision?.timestamp ?? null,
  }
}

// ─── 2. Latest editor ─────────────────────────────────────────────────────────
export async function fetchLastEditor(title) {
  const url = `${WIKI_API}?${params({
    action: 'query',
    titles: title,
    prop: 'revisions',
    rvprop: 'user',
    rvlimit: 1,
  })}`

  const res = await fetch(url)
  const data = await res.json()
  const page = Object.values(data.query.pages)[0]

  return page.revisions?.[0]?.user ?? 'Unknown'
}

// ─── 3. Intro summary + thumbnail ─────────────────────────────────────────────
export async function fetchSummary(title) {
  const encoded = encodeURIComponent(title.replace(/ /g, '_'))
  const res = await fetch(`${WIKI_REST}/page/summary/${encoded}`)
  const data = await res.json()

  return {
    extract: data.extract ?? '',
    thumbnail: data.thumbnail?.source ?? null,
    thumbnailWidth: data.thumbnail?.width ?? null,
    thumbnailHeight: data.thumbnail?.height ?? null,
  }
}

// ─── 4. Linked pages ──────────────────────────────────────────────────────────
export async function fetchLinkedPages(title) {
  const url = `${WIKI_API}?${params({
    action: 'query',
    titles: title,
    prop: 'links',
    pllimit: 100,
    plnamespace: 0,
  })}`

  const res = await fetch(url)
  const data = await res.json()
  const page = Object.values(data.query.pages)[0]

  return (page.links ?? []).map((l) => l.title)
}

// ─── 5. Backlinks ─────────────────────────────────────────────────────────────
export async function fetchBacklinks(title) {
  const url = `${WIKI_API}?${params({
    action: 'query',
    list: 'backlinks',
    bltitle: title,
    bllimit: 100,
    blnamespace: 0,
  })}`

  const res = await fetch(url)
  const data = await res.json()

  return (data.query.backlinks ?? []).map((b) => b.title)
}

// ─── 6. Pageviews — past 30 days ─────────────────────────────────────────────
export async function fetchPageViews(title) {
  const encoded = encodeURIComponent(title.replace(/ /g, '_'))

  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - 30)

  const fmt = (d) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}00`

  const url = `${WIKI_PAGEVIEWS}/per-article/en.wikipedia/all-access/all-agents/${encoded}/daily/${fmt(start)}/${fmt(end)}`

  const res = await fetch(url)
  const data = await res.json()
  const items = data.items ?? []

  const daily = items.map((item) => ({
    date: `${item.timestamp.slice(0, 4)}-${item.timestamp.slice(4, 6)}-${item.timestamp.slice(6, 8)}`,
    views: item.views,
  }))

  const total = daily.reduce((sum, d) => sum + d.views, 0)
  const average = daily.length ? Math.round(total / daily.length) : 0

  return { daily, total, average }
}

// ─── 7. Unique editors ────────────────────────────────────────────────────────
export async function fetchUniqueEditors(title) {
  const url = `${WIKI_API}?${params({
    action: 'query',
    titles: title,
    prop: 'contributors',
    pclimit: 500,
  })}`

  const res = await fetch(url)
  const data = await res.json()
  const page = Object.values(data.query.pages)[0]

  return page.contributors?.length ?? 0
}

// ─── 8. Language count ────────────────────────────────────────────────────────
export async function fetchLanguageCount(title) {
  const url = `${WIKI_API}?${params({
    action: 'query',
    titles: title,
    prop: 'langlinks',
    lllimit: 500,
  })}`

  const res = await fetch(url)
  const data = await res.json()
  const page = Object.values(data.query.pages)[0]

  return (page.langlinks?.length ?? 0) + 1 // +1 for English itself
}