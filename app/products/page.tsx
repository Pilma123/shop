import Image from "next/image";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import NatureCard from "@/components/NatureCard";
import NavBar from "@/components/NavBar";
import SearchFilter from "@/components/SearchFilter";
import Link from "next/link";

type PageProps = {
  searchParams: { q?: string; category?: string };
};

async function getProducts(q?: string, category?: string) {
  return prisma.product.findMany({
    where: {
      isAvailable: true,
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { description: { contains: q } },
              { category: { contains: q } },
            ],
          }
        : {}),
      ...(category ? { category } : {}),
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

async function getCategories() {
  const rows = await prisma.product.findMany({
    where: { isAvailable: true },
    select: { category: true },
    distinct: ["category"],
  });
  return rows.map((r) => r.category).filter(Boolean);
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const [products, categories] = await Promise.all([
    getProducts(searchParams.q, searchParams.category),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen font-cormorant bg-forest text-cream">
      <NavBar />

      {/* Hero banner */}
      <section className="relative flex items-center justify-center h-56 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
            alt="Forest"
            fill
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest/60" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-cream/35 text-xs tracking-[0.35em] uppercase mb-3">KramLill</p>
          <h1 className="text-4xl md:text-5xl font-light text-cream tracking-wide" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
            The Collection
          </h1>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-5 py-12">
        {/* Filter bar */}
        <div className="mb-10 [&_input]:bg-transparent [&_input]:border-cream/20 [&_input]:text-cream [&_input]:placeholder-cream/30 [&_input:focus]:border-gold/50 [&_select]:bg-forest [&_select]:border-cream/20 [&_select]:text-cream">
          <Suspense>
            <SearchFilter categories={categories} />
          </Suspense>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 text-cream/30">
            <div className="text-5xl mb-5">✿</div>
            <p className="text-2xl font-light mb-2">Nothing found</p>
            <p className="text-sm tracking-wide mb-6">Try a different search or category.</p>
            <Link href="/products" className="text-gold/70 hover:text-gold text-sm tracking-widest uppercase underline">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <NatureCard key={p.id} product={p} size="md" />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-cream/10 py-8 text-center mt-16">
        <p className="text-cream/25 text-xs tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} KramLill · Handmade with Nature
        </p>
      </footer>
    </div>
  );
}
