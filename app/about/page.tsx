import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function AboutPage() {
  return (
    <div className="min-h-screen font-cormorant bg-forest text-cream">
      <NavBar />

      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[50vh] pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Nature"
            fill
            className="object-cover object-center opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/70 to-forest" />
        </div>
        <div className="relative z-10 text-center px-5">
          <p className="text-cream/35 text-xs tracking-[0.35em] uppercase mb-4">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-light text-cream tracking-wide" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
            About KramLill
          </h1>
          <div className="flex items-center justify-center gap-3 mt-5 text-cream/30">
            <span className="block h-px w-16 bg-cream/20" />
            <span className="text-gold">✦</span>
            <span className="block h-px w-16 bg-cream/20" />
          </div>
        </div>
      </section>

      {/* Story content */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-2xl font-light italic text-cream/80 leading-relaxed mb-10">
          {/* ✏️ EDIT: Your opening quote or tagline */}
          &ldquo;Every flower preserved is a moment held forever.&rdquo;
        </p>

        <div className="space-y-7 text-cream/65 text-lg leading-relaxed text-left">
          {/* ✏️ EDIT: Replace with your own story */}
          <p>
            KramLill was born from a deep love of nature and a desire to carry its beauty with us
            always. Each piece starts with a walk through fields and forests — gathering petals,
            leaves, and tiny blooms that would otherwise be forgotten.
          </p>
          <p>
            We press, dry, and hand-set every element into clear resin, creating jewellery that is
            as individual as the flowers themselves. No two pieces are ever identical, because no
            two moments in nature ever are.
          </p>
          <p>
            Our studio is small, our hands are careful, and our passion is genuine. We believe that
            wearing a piece of nature reminds us to slow down, notice, and appreciate the world
            blooming around us.
          </p>
        </div>

        {/* Values */}
        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: "✿", title: "Handmade", text: "Every piece shaped by hand, never mass-produced." },
            { icon: "🌿", title: "Natural", text: "Real flowers and botanical elements, ethically gathered." },
            { icon: "✦", title: "Unique", text: "No two pieces are the same — yours is one of a kind." },
          ].map((v) => (
            <div key={v.title} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center text-xl text-cream/70">
                {v.icon}
              </div>
              <h3 className="text-cream text-lg tracking-wide">{v.title}</h3>
              <p className="text-cream/45 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link
            href="/"
            className="flower-btn inline-block border border-cream/30 text-cream hover:bg-cream hover:text-forest px-10 py-3 tracking-[0.2em] uppercase text-sm transition-all duration-300 mx-6"
          >
            View Collection
          </Link>
          <Link
            href="/contact"
            className="flower-btn inline-block border border-gold/45 text-gold hover:bg-gold hover:text-forest px-10 py-3 tracking-[0.2em] uppercase text-sm transition-all duration-300 mx-6"
          >
            Get in Touch
          </Link>
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
