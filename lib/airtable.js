const BASE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`

/**
 * Fetch all records from an Airtable table.
 * Handles pagination automatically (Airtable returns max 100 per page).
 * Results are cached and revalidated every 60 seconds (Next.js ISR).
 */
export async function fetchTable(tableName, options = {}) {
  const { filter } = options
  const records = []
  let offset = undefined

  do {
    const params = new URLSearchParams()
    if (filter) params.set('filterByFormula', filter)
    if (offset) params.set('offset', offset)

    const url = `${BASE_URL}/${encodeURIComponent(tableName)}?${params}`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Airtable ${res.status} on table "${tableName}": ${body}`)
    }

    const json = await res.json()
    records.push(...(json.records ?? []))
    offset = json.offset // undefined when no more pages
  } while (offset)

  return records
}
