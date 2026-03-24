'use client'

import { useState } from 'react'

export default function CustomOrderForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    pieceType: '',
    budget: '',
    notes: '',
  })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.pieceType || !form.budget) return
    setStatus('loading')

    try {
      const res = await fetch('/api/custom-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-6">
        <p className="text-xs tracking-widest uppercase text-earth-500 mb-3">Request received</p>
        <h3 className="text-2xl font-light tracking-wide text-earth-900 mb-4">
          I'll be in touch soon.
        </h3>
        <p className="text-earth-600 font-light leading-relaxed max-w-md mx-auto">
          I read every custom order request myself. Give me a couple days and I'll reach out to
          talk through what you're envisioning — no commitment until we both love the idea.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-widest uppercase text-earth-600 mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="First & last name"
            className="w-full border border-earth-300 bg-earth-50 text-earth-900 placeholder-earth-400 px-4 py-3 text-sm font-light tracking-wide outline-none focus:border-earth-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-earth-600 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full border border-earth-300 bg-earth-50 text-earth-900 placeholder-earth-400 px-4 py-3 text-sm font-light tracking-wide outline-none focus:border-earth-600 transition-colors"
          />
        </div>
      </div>

      {/* Piece type */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-earth-600 mb-2">
          What type of piece?
        </label>
        <div className="relative">
          <select
            name="pieceType"
            value={form.pieceType}
            onChange={handleChange}
            required
            className="w-full border border-earth-300 bg-earth-50 text-earth-900 px-4 py-3 text-sm font-light tracking-wide outline-none focus:border-earth-600 transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled>Select a piece type</option>
            <option value="Earrings">Earrings</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Hat">Hat</option>
            <option value="Medallion">Medallion</option>
            <option value="Other">Other — I like a challenge! (describe below)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <svg className="w-4 h-4 text-earth-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-earth-600 mb-2">
          Approximate Budget
        </label>
        <p className="text-xs text-earth-500 font-light mb-2 leading-relaxed">
          Price varies based on size, complexity, and cost of materials. I do my best to
          maximize your value within your budget.
        </p>
        <div className="relative">
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
            className="w-full border border-earth-300 bg-earth-50 text-earth-900 px-4 py-3 text-sm font-light tracking-wide outline-none focus:border-earth-600 transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled>Select a budget range</option>
            <option value="$50–$100">$50–$100</option>
            <option value="$100–$300">$100–$300</option>
            <option value="$300–$500">$300–$500</option>
            <option value="$500–$1,000">$500–$1,000</option>
            <option value="$1,000+">$1,000+</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <svg className="w-4 h-4 text-earth-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-earth-600 mb-2">
          Tell Me More
        </label>
        <p className="text-xs text-earth-500 font-light mb-2 leading-relaxed">
          Is this a gift? A special occasion? Colors, themes, or anything else that would help me
          craft something you'll love — share it here.
        </p>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={5}
          placeholder="e.g. It's for my mom's 60th birthday. She loves turquoise and the Southwest. She's been collecting beadwork her whole life and this would mean the world to her..."
          className="w-full border border-earth-300 bg-earth-50 text-earth-900 placeholder-earth-400 px-4 py-3 text-sm font-light tracking-wide leading-relaxed outline-none focus:border-earth-600 transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-clay text-xs tracking-wide">
          Something went wrong — please try again or email me directly at brooks@lalalucindas.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full md:w-auto px-10 py-3 disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending...' : 'Send My Request'}
      </button>
    </form>
  )
}
