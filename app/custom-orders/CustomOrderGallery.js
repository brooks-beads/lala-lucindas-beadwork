'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function CustomOrderGallery({ items }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className="aspect-square relative overflow-hidden group cursor-zoom-in focus:outline-none"
          >
            <Image
              src={item.photo}
              alt={item.name}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-midnight/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              {item.name && (
                <p className="text-cream text-xs tracking-wide font-light">{item.name}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-midnight/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-cream/70 hover:text-gold transition-colors text-xs tracking-widest uppercase flex items-center gap-2"
            >
              Close
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
              <Image
                src={selected.photo}
                alt={selected.name}
                fill
                unoptimized
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            {/* Name */}
            {selected.name && (
              <div className="mt-4 text-center">
                <p className="text-xs tracking-widest uppercase text-gold font-light">Custom Order</p>
                <p className="font-lora text-cream text-lg font-normal mt-1">{selected.name}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
