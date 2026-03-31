'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ProductGallery({ photos, name, placeholderClass }) {
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // Reset state when navigating to a different product
  useEffect(() => {
    setActive(0)
    setLoaded(false)
  }, [photos])

  if (!photos || photos.length === 0) {
    return <div className={`${placeholderClass} w-full aspect-square`} />
  }

  return (
    <div className="space-y-3">
      {/* Main image — natural dimensions, no letterboxing */}
      <div className="w-full bg-earth-100 relative min-h-[200px]">
        {!loaded && (
          <div className="absolute inset-0 bg-earth-100 animate-pulse" />
        )}
        <Image
          key={photos[active]}
          src={photos[active]}
          alt={name}
          width={0}
          height={0}
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ width: '100%', height: 'auto', opacity: loaded ? 1 : 0, transition: 'opacity 0.2s' }}
          priority
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Thumbnails — only shown when there are multiple photos */}
      {photos.length > 1 && (
        <div className="flex gap-2">
          {photos.map((url, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setLoaded(false) }}
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
                unoptimized
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
