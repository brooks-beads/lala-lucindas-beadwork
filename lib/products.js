import { fetchTable } from './airtable'

// ── Static categories (used for nav and collection pages) ─────────────────
export const categories = [
  { name: 'Necklaces',   slug: 'necklaces',   placeholderClass: 'placeholder-turquoise' },
  { name: 'Bracelets',   slug: 'bracelets',   placeholderClass: 'placeholder-earth' },
  { name: 'Earrings',    slug: 'earrings',    placeholderClass: 'placeholder-mesa' },
  { name: 'Rings',       slug: 'rings',       placeholderClass: 'placeholder-prairie' },
  { name: 'Hair Pieces', slug: 'hair-pieces', placeholderClass: 'placeholder-wild' },
  { name: 'Wall Art',    slug: 'wall-art',    placeholderClass: 'placeholder-mountain' },
]

// ── Helpers ───────────────────────────────────────────────────────────────

function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function categoryToSlug(cat) {
  const map = {
    'Necklaces':   'necklaces',
    'Bracelets':   'bracelets',
    'Earrings':    'earrings',
    'Rings':       'rings',
    'Hair Pieces': 'hair-pieces',
    'Wall Art':    'wall-art',
  }
  return map[cat] ?? toSlug(cat)
}

function getPlaceholder(category) {
  const map = {
    'Necklaces':   'placeholder-turquoise',
    'Bracelets':   'placeholder-earth',
    'Earrings':    'placeholder-mesa',
    'Rings':       'placeholder-prairie',
    'Hair Pieces': 'placeholder-wild',
    'Wall Art':    'placeholder-mountain',
  }
  return map[category] ?? 'placeholder-earth'
}

function isNew(createdTime) {
  if (!createdTime) return false
  return new Date(createdTime) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
}

/**
 * Map a raw Airtable record to a clean product object.
 *
 * Airtable field names used:
 *   Name, Description Notes, Price, Category, Status,
 *   Photo, Full Description, SKU, Times Sold
 *
 * Optional field (add a Checkbox field called "Featured" in Airtable
 * to control which products appear in the featured section):
 *   Featured
 */
function mapRecord(record) {
  const f = record.fields
  const name = f['Name'] ?? 'Untitled'

  // Category can be a single-select (string) or multi-select (array)
  const category = Array.isArray(f['Category'])
    ? f['Category'][0]
    : (f['Category'] ?? '')

  // Status single-select: Active | Sold Out | Draft | Archived
  const status = f['Status'] ?? 'Active'

  return {
    id:            record.id,
    slug:          f['SKU'] ? toSlug(f['SKU']) : toSlug(name),
    name,
    tagline:       f['Description Notes'] ?? '',
    description:   f['Full Description'] ?? '',
    price:         f['Price'] ?? 0,
    category,
    categorySlug:  categoryToSlug(category),
    status,
    inStock:       status !== 'Sold Out' && status !== 'Archived',
    // Real photo from Airtable attachment field
    photo:         f['Photo']?.[0]?.url ?? null,
    // Fallback gradient when no photo uploaded
    placeholderClass: getPlaceholder(category),
    // Add a Checkbox field named "Featured" in Airtable to control this
    featured:      f['Featured'] ?? false,
    isNew:         isNew(record.createdTime),
    sku:           f['SKU'] ?? null,
    timesSold:     f['Times Sold'] ?? 0,
  }
}

// ── Public async API ──────────────────────────────────────────────────────

/**
 * Fetch all non-draft products from Airtable.
 * Falls back to [] if Airtable is unreachable.
 */
export async function getProducts() {
  try {
    const records = await fetchTable('Products', {
      filter: "NOT({Status} = 'Draft')",
    })
    return records.map(mapRecord)
  } catch (err) {
    console.error('[Airtable] Failed to fetch products:', err.message)
    return []
  }
}

export async function getProductBySlug(slug) {
  const all = await getProducts()
  return all.find((p) => p.slug === slug) ?? null
}

/**
 * Returns products marked Featured in Airtable.
 * If no products have Featured checked, returns the 6 most recent instead.
 */
export async function getFeaturedProducts() {
  const all = await getProducts()
  const featured = all.filter((p) => p.featured)
  return featured.length > 0 ? featured : all.slice(0, 6)
}

export async function getProductsByCategory(categorySlug) {
  const all = await getProducts()
  return all.filter((p) => p.categorySlug === categorySlug)
}
