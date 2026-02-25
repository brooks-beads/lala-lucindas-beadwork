'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ProductGallery({ photos, name, placeholderClass }) {
  const [active, setActive] = useState(0)

  if (!photos || photos.length === 0) {
    return <div className={`${placeholderClass} w-full aspect-[3/4]`} />
  }

  return (
    <div className="space-y-3">
      {/* Main image — contain so the full piece is always visible */}
      <div className="aspect-[3/4] w-full relative bg-earth-100">
        <Image
          src={photos[active]}
          alt={name}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails — only shown when there are multiple photos */}
      {photos.length > 1 && (
        <div className="flex gap-2">
          {photos.map((url, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square w-16 relative overflow-hidden border transition-colors ${
                i === active
                  ? 'border-earth-700'
                  : 'border-earth-200 hover:border-earth-400'
              }`}
            >
              <Image
                src={url}
                alt={`${name} — photo ${i + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
