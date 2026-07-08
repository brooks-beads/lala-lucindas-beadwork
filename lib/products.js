import { fetchTable } from './airtable'

// ── Static categories (used for nav and collection pages) ─────────────────
export const categories = [
  { name: 'Necklaces',   slug: 'necklaces',   placeholderClass: 'placeholder-turquoise', image: '/images/category-necklaces.jpg' },
  { name: 'Bracelets',   slug: 'bracelets',   placeholderClass: 'placeholder-earth',     image: '/images/category-bracelets.jpg' },
  { name: 'Earrings',    slug: 'earrings',    placeholderClass: 'placeholder-mesa',      image: '/images/category-earrings.jpg' },
  { name: 'Rings',       slug: 'rings',       placeholderClass: 'placeholder-prairie',   image: '/images/category-rings.jpg' },
  { name: 'Hair Pieces', slug: 'hair-pieces', placeholderClass: 'placeholder-wild' },
  { name: 'Accessories', slug: 'accessories', placeholderClass: 'placeholder-mountain',  image: '/images/category-accessories.jpg' },
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
    'necklaces':   'necklaces',
    'necklace':    'necklaces',
    'bracelets':   'bracelets',
    'bracelet':    'bracelets',
    'earrings':    'earrings',
    'earring':     'earrings',
    'rings':       'rings',
    'ring':        'rings',
    'hair pieces': 'hair-pieces',
    'hair piece':  'hair-pieces',
    'apparel':     'accessories',
    'accessories': 'accessories',
    'accessory':   'accessories',
    'other':       'accessories',
  }
  return map[cat?.toLowerCase()] ?? toSlug(cat)
}

function getPlaceholder(category) {
  const map = {
    'necklaces':   'placeholder-turquoise',
    'necklace':    'placeholder-turquoise',
    'bracelets':   'placeholder-earth',
    'bracelet':    'placeholder-earth',
    'earrings':    'placeholder-mesa',
    'earring':     'placeholder-mesa',
    'rings':       'placeholder-prairie',
    'ring':        'placeholder-prairie',
    'hair pieces': 'placeholder-wild',
    'hair piece':  'placeholder-wild',
    'apparel':     'placeholder-mountain',
    'accessories': 'placeholder-mountain',
    'accessory':   'placeholder-mountain',
    'other':       'placeholder-mountain',
  }
  return map[category?.toLowerCase()] ?? 'placeholder-earth'
}

function isNew(createdTime) {
  if (!createdTime) return false
  return new Date(createdTime) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
}

// Request a resized, auto-compressed, modern-format render from Cloudinary.
// This offloads resizing to Cloudinary (free) instead of Vercel's image
// optimizer, whose free-tier transformation quota we've hit before — see
// the "Fix broken images" commit that added `unoptimized` to product <Image> tags.
function cloudinaryThumb(url, width) {
  if (!url || !url.includes('res.cloudinary.com')) return url
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`)
}

/**
 * Map a raw Airtable record to a clean product object.
 *
 * Airtable field names used:
 *   Name, Description Notes, Price, Category, Status,
 *   Photo, Full Description, SKU, Times Sold
 *
 * Optional field (Checkbox field called "Featured" in Airtable; not
 * currently used by any page — the homepage's "Shop New Arrivals"
 * section is driven by `isNew` instead):
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
    // All photos from Airtable attachment field. `thumbUrl` uses Airtable's
    // pre-generated 512px thumbnail (already free — no transform needed);
    // `url` is the full-resolution original for the main gallery viewer.
    photos:        f['Photo']?.map((a) => ({
      url:      a.url,
      thumbUrl: a.thumbnails?.large?.url ?? a.url,
    })) ?? [],
    // Prefer the permanent Cloudinary URL over the expiring Airtable signed URL.
    // Airtable attachment URLs expire in ~2 hours; Cloudinary URLs are permanent.
    // Both branches are pre-sized at the source (Cloudinary transform param /
    // Airtable thumbnail) so this stays cheap to render `unoptimized`.
    photo:         f['Social Image URL']
      ? cloudinaryThumb(f['Social Image URL'], 800)
      : (f['Photo']?.[0]?.thumbnails?.large?.url ?? f['Photo']?.[0]?.url ?? null),
    // Fallback gradient when no photo uploaded
    placeholderClass: getPlaceholder(category),
    // Add a Checkbox field named "Featured" in Airtable to control this
    featured:      f['Featured'] ?? false,
    isNew:         isNew(record.createdTime),
    createdTime:   record.createdTime,
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
      filter: "AND(NOT({Status} = 'Draft'), NOT({Status} = 'Sold'))",
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
