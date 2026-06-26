"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavBar from "@/components/NavBar";

// ✏️ EDIT: Your contact details
const INSTAGRAM = "https://instagram.com/kramlill";
const INSTAGRAM_HANDLE = "@kramlill";
const PHONE = "+372 5555 5555";
const EMAIL = "hello@kramlill.com";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // ✏️ Wire this up to an email service (Resend, Formspree, etc.) for production.
    // For now it shows a confirmation message.
    setSent(true);
  }

  return (
    <div className="min-h-screen font-cormorant bg-forest text-cream">
      <NavBar />

      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[40vh] pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1490750967868-88df5691cc22?w=1920&q=80"
            alt="Flowers"
            fill
            className="object-cover object-center opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 to-forest" />
        </div>
        <div className="relative z-10 text-center px-5">
          <p className="text-cream/35 text-xs tracking-[0.35em] uppercase mb-4">Say Hello</p>
          <h1 className="text-5xl md:text-6xl font-light text-cream tracking-wide" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
            Contact Us
          </h1>
          <div className="flex items-center justify-center gap-3 mt-5 text-cream/30">
            <span className="block h-px w-16 bg-cream/20" />
            <span className="text-gold">✦</span>
            <span className="block h-px w-16 bg-cream/20" />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
        {/* Contact details */}
        <div>
          <h2 className="text-2xl font-light text-cream mb-8 tracking-wide">Reach Us Directly</h2>
          <div className="space-y-8">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-5"
            >
              <div className="w-11 h-11 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 group-hover:border-gold/50 group-hover:text-gold transition-all flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div>
                <p className="text-cream/40 text-xs tracking-widest uppercase mb-1">Instagram</p>
                <p className="text-cream text-lg group-hover:text-gold transition-colors">{INSTAGRAM_HANDLE}</p>
                <p className="text-cream/40 text-sm">DM us to order or ask questions</p>
              </div>
            </a>

            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="group flex items-start gap-5">
              <div className="w-11 h-11 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 group-hover:border-gold/50 group-hover:text-gold transition-all flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                </svg>
              </div>
              <div>
                <p className="text-cream/40 text-xs tracking-widest uppercase mb-1">Phone</p>
                <p className="text-cream text-lg group-hover:text-gold transition-colors">{PHONE}</p>
                <p className="text-cream/40 text-sm">We&apos;re happy to chat</p>
              </div>
            </a>

            <a href={`mailto:${EMAIL}`} className="group flex items-start gap-5">
              <div className="w-11 h-11 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 group-hover:border-gold/50 group-hover:text-gold transition-all flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-cream/40 text-xs tracking-widest uppercase mb-1">Email</p>
                <p className="text-cream text-lg group-hover:text-gold transition-colors">{EMAIL}</p>
              </div>
            </a>
          </div>

          <div className="mt-12 border-t border-cream/10 pt-8">
            <Link
              href="/"
              className="flower-btn inline-block border border-cream/30 text-cream/70 hover:text-cream hover:border-cream px-8 py-3 tracking-[0.15em] uppercase text-sm transition-all duration-300 mx-6"
            >
              Back to Shop
            </Link>
          </div>
        </div>

        {/* Message form */}
        <div>
          <h2 className="text-2xl font-light text-cream mb-8 tracking-wide">Send a Message</h2>
          {sent ? (
            <div className="border border-gold/30 bg-gold/10 rounded-lg px-6 py-8 text-center">
              <div className="text-4xl mb-3">✿</div>
              <p className="text-cream text-xl mb-2">Thank you!</p>
              <p className="text-cream/55">We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-cream/40 text-xs tracking-[0.2em] uppercase mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border border-cream/20 rounded px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-gold/50 transition-colors text-base"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-cream/40 text-xs tracking-[0.2em] uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border border-cream/20 rounded px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-gold/50 transition-colors text-base"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-cream/40 text-xs tracking-[0.2em] uppercase mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border border-cream/20 rounded px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-gold/50 transition-colors text-base resize-none"
                  placeholder="I'd love to order..."
                />
              </div>
              <button
                type="submit"
                className="flower-btn self-start border border-gold/50 text-gold hover:bg-gold hover:text-forest px-10 py-3 tracking-[0.2em] uppercase text-sm transition-all duration-300 mx-6 mt-2"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-cream/10 py-8 text-center">
        <p className="text-cream/25 text-xs tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} KramLill · Handmade with Nature
        </p>
      </footer>
    </div>
  );
}
