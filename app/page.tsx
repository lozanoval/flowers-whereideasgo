import FloatingPetals from "@/components/FloatingPetals";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollVideo from "@/components/ScrollVideo";
import type { Chapter } from "@/components/ScrollVideo";

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

const videoChapters: Chapter[] = [
  {
    from: 0.08,
    to: 0.28,
    label: "el origen",
    title: "Nace\nel arreglo.",
    subtitle: "Cada flor elegida con intención.\nCada color, una decisión.",
    align: "left",
    position: "bottom",
  },
  {
    from: 0.32,
    to: 0.52,
    label: "la forma",
    title: "Textura\ny volumen.",
    subtitle: "La arquitectura viva que sostiene\ntodo lo demás.",
    align: "right",
    position: "bottom",
  },
  {
    from: 0.56,
    to: 0.74,
    label: "el detalle",
    title: "Cada\npétalo.",
    subtitle: "Lo que no se ve a primera vista\nes lo que lo hace único.",
    align: "left",
    position: "bottom",
  },
  {
    from: 0.78,
    to: 0.96,
    label: "completo",
    title: "En flor.",
    subtitle: "hecho con intención",
    align: "center",
    position: "center",
  },
];

export default function FlowersPage() {
  return (
    <main
      className="relative"
      style={{ fontFamily: BODY, backgroundColor: "#0A0A08" }}
    >
      {/* Petals — behind everything */}
      <FloatingPetals count={14} />

      {/* ══════════════════════════════════════════════════════════════════
          SCROLL VIDEO — full-page cinematic experience
      ══════════════════════════════════════════════════════════════════ */}
      <ScrollVideo
        src="/flowers/videos/flowersvideo.mp4"
        scrollHeight="500vh"
        chapters={videoChapters}
        reversed={false}
      />

      {/* ══════════════════════════════════════════════════════════════════
          TRANSITION — dark-to-cream fade
      ══════════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          height: "160px",
          background: "linear-gradient(to bottom, #0A0A08, #FAFAF7)",
          pointerEvents: "none",
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          PHILOSOPHY
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="flex flex-col items-center justify-center px-6 py-28 md:py-40"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        <ScrollReveal>
          <div className="max-w-3xl text-center">
            <div className="mb-14 flex items-center justify-center gap-5">
              <div
                style={{
                  height: "1px",
                  width: "72px",
                  background: "linear-gradient(to right, transparent, #7B9FD4)",
                }}
              />
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
                  background: "linear-gradient(to left, transparent, #7B9FD4)",
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
                <div
                  aria-hidden="true"
                  className="mb-8 h-8 w-8 flex-shrink-0 rounded-full"
                  style={{
                    background: flower.swatchBg,
                    border: flower.border ? "1px solid rgba(196,170,140,0.4)" : "none",
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
          ANEMONE DETAIL
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="flex flex-col items-center justify-center px-6 py-24 text-center"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        <ScrollReveal distance={20}>
          <div className="mx-auto max-w-xl">
            <div className="mb-6 flex justify-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
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
            <div className="mb-12 flex items-center justify-center gap-5">
              <div style={{ height: "1px", width: "60px", backgroundColor: "rgba(255,255,255,0.2)" }} />
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "rgba(214,229,245,0.7)" }} />
              <div style={{ height: "1px", width: "60px", backgroundColor: "rgba(255,255,255,0.2)" }} />
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
              <em style={{ color: "#A8C4E8", fontWeight: 300 }}>Arrangement</em>
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
      <footer className="py-10 text-center" style={{ backgroundColor: "#2C3E5A" }}>
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
