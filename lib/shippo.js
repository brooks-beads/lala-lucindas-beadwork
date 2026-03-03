const SHIPPO_API = 'https://api.goshippo.com'

const FROM_ADDRESS = {
  name:    process.env.SHIPPO_FROM_NAME   || "Lala Lucinda's Beadwork",
  street1: process.env.SHIPPO_FROM_STREET,
  city:    process.env.SHIPPO_FROM_CITY,
  state:   process.env.SHIPPO_FROM_STATE,
  zip:     process.env.SHIPPO_FROM_ZIP,
  country: 'US',
  email:   process.env.SHIPPO_FROM_EMAIL,
}

const DEFAULT_PARCEL = {
  length: '6',
  width:  '4',
  height: '2',
  distance_unit: 'in',
  weight: '6',
  mass_unit: 'oz',
}

async function shippoPost(path, body) {
  const res = await fetch(`${SHIPPO_API}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `ShippoToken ${process.env.SHIPPO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Shippo ${res.status} on ${path}: ${text}`)
  }
  return res.json()
}

/**
 * Creates and purchases a shipping label via Shippo.
 *
 * @param {object} options
 * @param {object} options.toAddress  — { name, street1, city, state, zip, country, email }
 * @param {string} options.serviceLevel — 'standard' | 'priority'
 * @returns {{ trackingNumber, trackingUrl, labelUrl, carrier }}
 */
export async function createShippingLabel({ toAddress, serviceLevel }) {
  // 1. Create shipment and get rates
  const shipment = await shippoPost('/shipments/', {
    address_from: FROM_ADDRESS,
    address_to:   toAddress,
    parcels:      [DEFAULT_PARCEL],
    async:        false,
  })

  if (!shipment.rates || shipment.rates.length === 0) {
    throw new Error('Shippo returned no rates for this shipment')
  }

  // 2. Pick rate — priority = USPS Priority Mail, standard = cheapest available
  let rate
  if (serviceLevel === 'priority') {
    rate = shipment.rates.find((r) =>
      r.servicelevel?.token?.toLowerCase().includes('priority')
    ) || shipment.rates[0]
  } else {
    rate = shipment.rates
      .filter((r) => parseFloat(r.amount) > 0)
      .sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount))[0]
      || shipment.rates[0]
  }

  // 3. Purchase label
  const transaction = await shippoPost('/transactions/', {
    rate:            rate.object_id,
    label_file_type: 'PDF',
    async:           false,
  })

  if (transaction.status !== 'SUCCESS') {
    throw new Error(`Shippo label purchase failed: ${JSON.stringify(transaction.messages)}`)
  }

  return {
    trackingNumber: transaction.tracking_number,
    trackingUrl:    transaction.tracking_url_provider,
    labelUrl:       transaction.label_url,
    carrier:        rate.provider,
    service:        rate.servicelevel?.name,
  }
}
