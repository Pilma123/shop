import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import NavBar from "@/components/NavBar";
import NatureCard from "@/components/NatureCard";
import { DesktopVine, MobileVine, HeroBotanicalDecor } from "@/components/VineDecoration";

// ── Fetch products from database ──
async function getProducts() {
  return prisma.product.findMany({
    where: { isAvailable: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export default async function HomePage() {
  const allProducts = await getProducts();
  const hero = allProducts.slice(0, 3);
  const collection = allProducts.slice(3);

  return (
    <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", background: "var(--forest-950)" }}>
      <NavBar />

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

        {/* ── Background: dark botanical photo ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {/*
            ✏️ Replace with your own professional botanical background photo.
            The ideal photo: dark lush garden, ivy on dark background, moss, green leaves.
          */}
          <Image
            src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1920&q=85"
            alt="Botanical background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark vignette overlay — makes it feel like the reference */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(4,14,6,0.72) 0%, rgba(8,20,10,0.45) 40%, rgba(4,14,6,0.68) 100%)"
          }} />
          {/* Edge darkening */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(4,12,6,0.65) 100%)"
          }} />
        </div>

        {/* ── Botanical SVG decorations: peony, bird, flowers, vines ── */}
        <HeroBotanicalDecor />

        {/* ══════════════════════════════════
            DESKTOP HERO — 3 cards, staggered
        ══════════════════════════════════ */}
        <div className="hidden md:flex" style={{
          position: "relative",
          zIndex: 4,
          minHeight: "100vh",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: "2.5rem",
          paddingBottom: "60px",
          paddingTop: "80px",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}>
          {/* Card 1 — left, tallest/highest position */}
          {hero[0] && (
            <div style={{
              marginBottom: "120px",
              animation: "fadeIn 0.8s ease-out 0.1s both",
              filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.7))",
            }}>
              <NatureCard product={hero[0]} imgHeight={245} width={220} />
            </div>
          )}

          {/* Card 2 — center, slightly lower */}
          {hero[1] && (
            <div style={{
              marginBottom: "60px",
              animation: "fadeIn 0.8s ease-out 0.3s both",
              filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.7))",
            }}>
              <NatureCard product={hero[1]} imgHeight={260} width={225} />
            </div>
          )}

          {/* Card 3 — right, high position */}
          {hero[2] && (
            <div style={{
              marginBottom: "90px",
              animation: "fadeIn 0.8s ease-out 0.5s both",
              filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.7))",
            }}>
              <NatureCard product={hero[2]} imgHeight={235} width={215} />
            </div>
          )}

          {allProducts.length === 0 && (
            <p style={{ color: "rgba(238,228,206,0.5)", fontSize: "1.3rem", fontStyle: "italic", paddingBottom: "200px" }}>
              Add products from the admin to see them here.
            </p>
          )}
        </div>

        {/* ══════════════════════════════════
            MOBILE HERO
        ══════════════════════════════════ */}
        <div className="flex flex-col md:hidden" style={{
          position: "relative",
          zIndex: 4,
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "100px",
          paddingBottom: "32px",
          gap: "16px",
          padding: "100px 20px 32px",
        }}>
          {/* Large hero card */}
          {hero[0] && (
            <div style={{
              animation: "fadeIn 0.7s ease-out 0.1s both",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.7))",
            }}>
              <NatureCard product={hero[0]} imgHeight={230} width={260} />
            </div>
          )}

          {/* Two smaller cards side by side */}
          {(hero[1] || hero[2]) && (
            <div style={{ display: "flex", gap: "14px" }}>
              {hero[1] && (
                <div style={{ animation: "fadeIn 0.7s ease-out 0.3s both", filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.6))" }}>
                  <NatureCard product={hero[1]} imgHeight={175} width={168} />
                </div>
              )}
              {hero[2] && (
                <div style={{ animation: "fadeIn 0.7s ease-out 0.5s both", filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.6))" }}>
                  <NatureCard product={hero[2]} imgHeight={175} width={168} />
                </div>
              )}
            </div>
          )}

          {/* "Handmade with Nature" badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "rgba(7,19,11,0.75)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(238,228,206,0.18)",
            borderRadius: "16px",
            padding: "14px 20px",
            maxWidth: "300px",
            marginTop: "8px",
          }}>
            <div style={{
              width: "40px", height: "40px", flexShrink: 0,
              borderRadius: "50%",
              border: "1px solid rgba(238,228,206,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--cream)", fontSize: "1.1rem",
            }}>✿</div>
            <div>
              <p style={{ color: "var(--cream)", fontSize: "1rem", fontWeight: 500, lineHeight: 1.2 }}>
                Handmade with Nature
              </p>
              <p style={{ color: "rgba(238,228,206,0.55)", fontSize: "0.82rem", lineHeight: 1.4, marginTop: "3px" }}>
                Each piece is crafted with real flowers and natural elements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SHOP THE COLLECTION
      ═══════════════════════════════════════════════════════ */}
      {collection.length > 0 && (
        <section style={{
          position: "relative",
          background: "linear-gradient(180deg, var(--forest-950) 0%, #0d1f0e 30%, var(--forest-900) 100%)",
          overflow: "hidden",
          paddingTop: "80px",
          paddingBottom: "100px",
        }}>
          {/* Subtle background texture */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1920&q=60"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              style={{ opacity: 0.18 }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, var(--forest-950) 0%, transparent 20%, transparent 80%, var(--forest-950) 100%)"
            }} />
          </div>

          {/* ── Section heading ── */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginBottom: "60px", padding: "0 20px" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "16px", marginBottom: "12px",
              color: "rgba(238,228,206,0.3)", fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase"
            }}>
              <span style={{ display: "block", height: "1px", width: "48px", background: "currentColor" }} />
              Shop the Collection
              <span style={{ display: "block", height: "1px", width: "48px", background: "currentColor" }} />
            </div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--cream)",
              letterSpacing: "0.04em",
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
              marginBottom: "14px",
            }}>
              More Pieces, Inspired by Nature
            </h2>
            <p style={{ color: "rgba(238,228,206,0.5)", fontSize: "1rem", maxWidth: "420px", margin: "0 auto", lineHeight: 1.7 }}>
              Handmade with real flowers and natural elements,<br />
              each piece is unique, just like the moment it holds.
            </p>
          </div>

          {/* ════════════════════════════
              DESKTOP: S-vine scattered layout
          ════════════════════════════ */}
          <div className="hidden md:block" style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1000px",
            margin: "0 auto",
            height: "620px",
            padding: "0 40px",
          }}>
            {/* Vine SVG sits between cards */}
            <DesktopVine />

            {/* Cards absolutely positioned to match S-vine path */}
            {collection[0] && (
              <div style={{ position: "absolute", left: "5%", top: "20px", zIndex: 2 }}>
                <NatureCard product={collection[0]} imgHeight={210} width={200} />
              </div>
            )}
            {collection[1] && (
              <div style={{ position: "absolute", right: "5%", top: "10px", zIndex: 2 }}>
                <NatureCard product={collection[1]} imgHeight={210} width={200} />
              </div>
            )}
            {collection[2] && (
              <div style={{ position: "absolute", left: "50%", top: "160px", transform: "translateX(-50%)", zIndex: 2 }}>
                <NatureCard product={collection[2]} imgHeight={210} width={200} />
              </div>
            )}
            {collection[3] && (
              <div style={{ position: "absolute", left: "5%", bottom: "30px", zIndex: 2 }}>
                <NatureCard product={collection[3]} imgHeight={210} width={200} />
              </div>
            )}
            {collection[4] && (
              <div style={{ position: "absolute", right: "5%", bottom: "20px", zIndex: 2 }}>
                <NatureCard product={collection[4]} imgHeight={210} width={200} />
              </div>
            )}
            {/* Extra cards below if more than 5 */}
            {collection.slice(5).map((p, i) => (
              <div key={p.id} style={{
                position: "absolute",
                left: `${20 + (i % 3) * 35}%`,
                top: `${640 + Math.floor(i / 3) * 320}px`,
                zIndex: 2,
              }}>
                <NatureCard product={p} imgHeight={210} width={200} />
              </div>
            ))}
          </div>

          {/* ════════════════════════════
              MOBILE: vertical vine stagger
          ════════════════════════════ */}
          <div className="flex md:hidden flex-col" style={{
            position: "relative",
            zIndex: 2,
            alignItems: "center",
            gap: "32px",
            padding: "0 20px",
            minHeight: `${collection.length * 300}px`,
          }}>
            <MobileVine />
            {collection.map((p, i) => (
              <div key={p.id} style={{
                position: "relative",
                zIndex: 2,
                alignSelf: i % 2 === 0 ? "flex-start" : "flex-end",
                marginLeft: i % 2 === 0 ? "8px" : "0",
                marginRight: i % 2 === 0 ? "0" : "8px",
                filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.6))",
              }}>
                <NatureCard product={p} imgHeight={190} width={210} />
              </div>
            ))}
          </div>

          {/* ── Bottom badge ── */}
          <div style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            marginTop: "80px",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              borderRadius: "50px",
              border: "1px solid rgba(238,228,206,0.18)",
              background: "rgba(7,19,11,0.6)",
              backdropFilter: "blur(6px)",
              padding: "12px 28px",
            }}>
              <div style={{
                width: "32px", height: "32px",
                borderRadius: "50%",
                border: "1px solid rgba(238,228,206,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(238,228,206,0.65)", fontSize: "0.9rem",
              }}>✿</div>
              <p style={{ color: "rgba(238,228,206,0.6)", fontSize: "0.88rem", letterSpacing: "0.04em" }}>
                Every piece is handcrafted with care and a deep love for nature.
              </p>
              <span style={{ color: "rgba(238,228,206,0.25)", fontSize: "0.7rem" }}>✦</span>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        padding: "100px 20px",
        textAlign: "center",
        borderTop: "1px solid rgba(238,228,206,0.08)",
        background: "var(--forest-950)",
      }}>
        <p style={{ color: "rgba(238,228,206,0.3)", fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "20px" }}>
          Order today
        </p>
        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 300,
          color: "var(--cream)",
          marginBottom: "16px",
          lineHeight: 1.3,
        }}>
          Find a piece that speaks to you
        </h2>
        <p style={{ color: "rgba(238,228,206,0.5)", fontSize: "1.1rem", maxWidth: "340px", margin: "0 auto 48px", lineHeight: 1.7 }}>
          Reach us on Instagram or by phone — we respond quickly and personally.
        </p>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          <a
            href="https://instagram.com/kramlill"
            target="_blank"
            rel="noopener noreferrer"
            className="flower-btn"
            style={{
              display: "inline-block",
              border: "1px solid rgba(238,228,206,0.3)",
              color: "var(--cream)",
              padding: "14px 48px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              textDecoration: "none",
              margin: "0 24px",
            }}
          >
            Instagram
          </a>
          <Link
            href="/contact"
            className="flower-btn"
            style={{
              display: "inline-block",
              border: "1px solid rgba(201,168,76,0.5)",
              color: "var(--gold)",
              padding: "14px 48px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              textDecoration: "none",
              margin: "0 24px",
            }}
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(238,228,206,0.08)",
        padding: "32px 20px",
        textAlign: "center",
        color: "rgba(238,228,206,0.22)",
        fontSize: "0.7rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
      }}>
        © {new Date().getFullYear()} KramLill · Handmade with Nature
      </footer>
    </div>
  );
}
