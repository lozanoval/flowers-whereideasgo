import Image from "next/image";
import BokehParticles from "@/components/BokehParticles";
import FloatingPetals from "@/components/FloatingPetals";
import ScrollReveal from "@/components/ScrollReveal";

const DISPLAY = 'var(--font-cormorant), "Georgia", serif';
const BODY = 'var(--font-josefin), "Helvetica Neue", sans-serif';

const composition = [
  {
    color: "#7B9FD4",
    swatchBg: "radial-gradient(circle at 30% 30%, #A8C4E8, #4A78B0)",
    name: "Blue Hydrangea",
    latin: "Hydrangea macrophylla",
    description:
      "The soul of the arrangement. Soft clusters of periwinkle florets that evoke serene summer skies — voluminous, generous, and quietly extraordinary.",
  },
  {
    color: "#F0EBE3",
    swatchBg: "radial-gradient(circle at 30% 30%, #FFFFFF, #E8DDD0)",
    name: "White Roses",
    latin: "Rosa 'Avalanche'",
    description:
      "Perfect ivory spirals, each bloom a study in restraint. Pure, timeless, impossibly refined — the punctuation that gives the bouquet its voice.",
    border: true,
  },
  {
    color: "#B8C4BB",
    swatchBg: "radial-gradient(circle at 30% 30%, #D4DDD6, #8A9E96)",
    name: "Silver Sage",
    latin: "Senecio cineraria",
    description:
      "Dusty miller whispers in silver across the arrangement — cool, textured, and beautifully understated. The foliage that makes everything else sing.",
  },
];

export default function FlowersPage() {
  return (
    <main
      className="relative overflow-x-hidden"
      style={{ fontFamily: BODY, backgroundColor: "#FAFAF7" }}
    >
      {/* ── Floating petals (fixed, behind everything) ──────────────────── */}
      <FloatingPetals count={20} />

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        {/* Ambient radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            width: "min(800px, 110vw)",
            height: "min(800px, 110vw)",
            top: "50%",
            left: "50%",
            background:
              "radial-gradient(ellipse, rgba(123,159,212,0.13) 0%, rgba(168,196,232,0.06) 45%, transparent 70%)",
            animation: "glow-pulse 11s ease-in-out infinite",
          }}
        />

        {/* Shimmer rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            width: "min(580px, 90vw)",
            height: "min(580px, 90vw)",
            top: "50%",
            left: "50%",
            border: "1px solid rgba(123,159,212,0.18)",
            animation: "shimmer-ring 7s ease-in-out infinite",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            width: "min(700px, 108vw)",
            height: "min(700px, 108vw)",
            top: "50%",
            left: "50%",
            border: "1px solid rgba(123,159,212,0.08)",
            animation: "shimmer-ring 7s 2.5s ease-in-out infinite",
          }}
        />

        {/* Bokeh particles */}
        <BokehParticles count={26} />

        {/* ── FLOWERS wordmark ─────────────────────────────────────────── */}
        <div
          className="pointer-events-none absolute left-0 right-0 flex items-start justify-center"
          style={{ top: "clamp(24px, 7vh, 56px)" }}
          aria-hidden="true"
        >
          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(3.2rem, 10.5vw, 9rem)",
              fontWeight: 300,
              letterSpacing: "0.58em",
              color: "#3A5A8A",
              lineHeight: 1,
              textTransform: "uppercase",
              userSelect: "none",
              paddingLeft: "0.58em", // compensate letter-spacing on last char
              opacity: 0,
              animation: "letter-in 2s 0.3s cubic-bezier(0.21,0.47,0.32,0.98) forwards",
            }}
          >
            Flowers
          </h1>
        </div>

        {/* ── Bouquet (float + breathe stacked wrappers) ───────────────── */}
        <div
          className="relative z-10 will-change-transform"
          style={{ animation: "float-gentle 13s ease-in-out infinite" }}
        >
          <div
            style={{ animation: "breathe-scale 7s ease-in-out infinite" }}
          >
            {/* Soft glow behind image */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(123,159,212,0.18) 0%, transparent 65%)",
                transform: "scale(1.35)",
                filter: "blur(24px)",
              }}
            />

            <Image
              src="/images/bouquet.jpg"
              alt="Bespoke arrangement: blue hydrangeas, white roses, anemones, and silver sage"
              width={540}
              height={540}
              priority
              className="relative z-10 object-contain"
              style={{
                maxWidth: "min(540px, 82vw)",
                height: "auto",
                filter:
                  "drop-shadow(0 28px 64px rgba(123,159,212,0.28)) drop-shadow(0 8px 20px rgba(0,0,0,0.07))",
                opacity: 0,
                animation: "fade-in 2.2s 0.6s ease forwards",
              }}
            />
          </div>
        </div>

        {/* ── Tagline + vertical rule ──────────────────────────────────── */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center gap-4"
          style={{
            bottom: "clamp(48px, 8vh, 80px)",
            opacity: 0,
            animation: "fade-up 1.6s 1.4s ease forwards",
          }}
        >
          <p
            style={{
              fontFamily: BODY,
              fontWeight: 100,
              fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)",
              letterSpacing: "0.48em",
              color: "#7A9490",
              textTransform: "uppercase",
            }}
          >
            bespoke floral arrangements
          </p>
          <div
            aria-hidden="true"
            style={{
              width: "1px",
              height: "36px",
              background:
                "linear-gradient(to bottom, rgba(123,159,212,0.55), transparent)",
            }}
          />
        </div>

        {/* ── Scroll cue ───────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1"
          style={{
            opacity: 0,
            animation: "fade-in 1s 2.4s ease forwards",
          }}
        >
          <div
            style={{
              fontFamily: BODY,
              fontWeight: 100,
              fontSize: "0.55rem",
              letterSpacing: "0.45em",
              color: "#C4CAC0",
              textTransform: "uppercase",
            }}
          >
            scroll
          </div>
          <div
            style={{
              width: "1px",
              height: "20px",
              backgroundColor: "rgba(196,202,192,0.4)",
              animation: "scroll-bounce 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PHILOSOPHY
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="flex flex-col items-center justify-center px-6 py-28 md:py-40"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        <ScrollReveal>
          <div className="max-w-3xl text-center">
            {/* Decorative ornament */}
            <div className="mb-14 flex items-center justify-center gap-5">
              <div
                style={{
                  height: "1px",
                  width: "72px",
                  background:
                    "linear-gradient(to right, transparent, #7B9FD4)",
                }}
              />
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 0L10.3 7.7L18 9L10.3 10.3L9 18L7.7 10.3L0 9L7.7 7.7Z"
                  fill="#7B9FD4"
                  fillOpacity="0.55"
                />
              </svg>
              <div
                style={{
                  height: "1px",
                  width: "72px",
                  background:
                    "linear-gradient(to left, transparent, #7B9FD4)",
                }}
              />
            </div>

            <blockquote
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(1.75rem, 4vw, 3.2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.55,
                color: "#2C2C2C",
                letterSpacing: "-0.015em",
              }}
            >
              &ldquo;Every arrangement is a conversation between nature and
              intention.&rdquo;
            </blockquote>

            <p
              className="mt-8"
              style={{
                fontFamily: BODY,
                fontSize: "0.65rem",
                letterSpacing: "0.38em",
                color: "#C4CAC0",
                fontWeight: 300,
                textTransform: "uppercase",
              }}
            >
              — flowers.whereideasgo.com
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          COMPOSITION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-24 md:px-12" style={{ backgroundColor: "#F0EBE3" }}>
        <ScrollReveal>
          <p
            className="mb-16 text-center"
            style={{
              fontFamily: BODY,
              fontSize: "0.65rem",
              letterSpacing: "0.5em",
              color: "#7A9490",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            The Composition
          </p>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px md:grid-cols-3">
          {composition.map((flower, i) => (
            <ScrollReveal key={flower.name} delay={i * 0.14}>
              <div
                className="flex h-full flex-col p-10 transition-all duration-500 hover:brightness-105"
                style={{
                  borderTop: `2px solid ${flower.color}`,
                  backgroundColor: "rgba(250,250,247,0.65)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {/* Swatch */}
                <div
                  aria-hidden="true"
                  className="mb-8 h-8 w-8 flex-shrink-0 rounded-full"
                  style={{
                    background: flower.swatchBg,
                    border: flower.border
                      ? "1px solid rgba(196,170,140,0.4)"
                      : "none",
                    boxShadow: `0 4px 18px ${flower.color}50`,
                  }}
                />

                <h3
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: "1.65rem",
                    fontWeight: 400,
                    color: "#2C2C2C",
                    lineHeight: 1.2,
                    marginBottom: "5px",
                  }}
                >
                  {flower.name}
                </h3>

                <p
                  style={{
                    fontFamily: BODY,
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    color: "#C4CAC0",
                    fontStyle: "italic",
                    fontWeight: 300,
                    marginBottom: "20px",
                  }}
                >
                  {flower.latin}
                </p>

                <p
                  style={{
                    fontFamily: BODY,
                    fontSize: "0.85rem",
                    lineHeight: 1.9,
                    color: "#4A4A4A",
                    fontWeight: 300,
                  }}
                >
                  {flower.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ANEMONE DETAIL — editorial full-bleed moment
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="flex flex-col items-center justify-center px-6 py-24 text-center"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        <ScrollReveal distance={20}>
          <div className="mx-auto max-w-xl">
            <div className="mb-6 flex justify-center">
              {/* Anemone eye icon — white with dark center */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="24" cy="24" r="22" fill="#F5F0EA" stroke="#C4CAC0" strokeWidth="0.5" />
                <circle cx="24" cy="24" r="9" fill="#2C2C2C" />
                <circle cx="24" cy="24" r="5" fill="#1A1A1A" />
                <circle cx="21" cy="21" r="1.5" fill="white" fillOpacity="0.6" />
              </svg>
            </div>

            <p
              style={{
                fontFamily: BODY,
                fontSize: "0.65rem",
                letterSpacing: "0.45em",
                color: "#B8C4BB",
                textTransform: "uppercase",
                fontWeight: 300,
                marginBottom: "16px",
              }}
            >
              Also present
            </p>

            <h3
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "#2C2C2C",
                lineHeight: 1.3,
              }}
            >
              White Anemone
            </h3>

            <p
              style={{
                fontFamily: BODY,
                fontSize: "0.85rem",
                lineHeight: 1.9,
                color: "#6A6A6A",
                fontWeight: 300,
                marginTop: "20px",
                maxWidth: "420px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Dark indigo centers surrounded by pure white petals. The anemone
              brings drama and contrast — a jewel that catches the eye and
              anchors the composition.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="flex flex-col items-center justify-center px-6 py-36 text-center"
        style={{ backgroundColor: "#3A5A8A" }}
      >
        <ScrollReveal>
          <div>
            {/* Ornament */}
            <div className="mb-12 flex items-center justify-center gap-5">
              <div
                style={{
                  height: "1px",
                  width: "60px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
              />
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(214,229,245,0.7)",
                }}
              />
              <div
                style={{
                  height: "1px",
                  width: "60px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                fontWeight: 300,
                color: "#F8F5EF",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                marginBottom: "40px",
              }}
            >
              Commission an
              <br />
              <em style={{ color: "#A8C4E8", fontWeight: 300 }}>
                Arrangement
              </em>
            </h2>

            <p
              style={{
                fontFamily: BODY,
                fontWeight: 100,
                fontSize: "0.8rem",
                letterSpacing: "0.25em",
                color: "rgba(196,202,192,0.85)",
                marginBottom: "36px",
                textTransform: "uppercase",
              }}
            >
              Each bouquet is made to order
            </p>

            <a
              href="mailto:hello@whereideasgo.com"
              style={{
                display: "inline-block",
                fontFamily: BODY,
                fontSize: "0.72rem",
                fontWeight: 300,
                letterSpacing: "0.42em",
                color: "#D6E5F5",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid rgba(168,196,232,0.45)",
                paddingBottom: "3px",
                transition: "all 0.35s ease",
              }}
            >
              reach out →
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════ */}
      <footer
        className="py-10 text-center"
        style={{ backgroundColor: "#2C3E5A" }}
      >
        <p
          style={{
            fontFamily: BODY,
            fontSize: "0.6rem",
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.25)",
            fontWeight: 100,
            textTransform: "uppercase",
          }}
        >
          flowers.whereideasgo.com &mdash; &copy; 2026 WhereIdeasgo EIRL
        </p>
      </footer>
    </main>
  );
}
