"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DISPLAY = 'var(--font-cormorant), "Georgia", serif';
const BODY = 'var(--font-josefin), "Helvetica Neue", sans-serif';

export interface Chapter {
  from: number;
  to: number;
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  position?: "top" | "center" | "bottom";
}

interface CanvasVideoProps {
  frameCount: number;
  framesPath: string;   // e.g. "/flowers/frames/frame_"
  frameExt?: string;    // "webp" | "jpg"
  scrollHeight?: string;
  chapters?: Chapter[];
  reversed?: boolean;
}

export default function CanvasVideo({
  frameCount,
  framesPath,
  frameExt = "webp",
  scrollHeight = "500vh",
  chapters = [],
  reversed = false,
}: CanvasVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // ── Preload frames ────────────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(frameCount);
    let done = 0;

    // Determine first frame to show immediately (covers the hero)
    const heroFrame = reversed ? frameCount - 1 : 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const idx = String(i + 1).padStart(4, "0");
      img.src = `${framesPath}${idx}.${frameExt}`;
      const frameIndex = i;
      img.onload = () => {
        images[frameIndex] = img;
        done++;
        setLoadedCount(done);

        // Paint hero frame as soon as it arrives
        if (frameIndex === heroFrame) {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");
          if (canvas && ctx) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
          }
          setFirstFrameReady(true);
        }
      };
      images[i] = img;
    }
    framesRef.current = images;
  }, [frameCount, framesPath, frameExt, reversed]);

  // ── GSAP ScrollTrigger ────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const state = { frame: reversed ? frameCount - 1 : 0 };

    const tween = gsap.to(state, {
      frame: reversed ? 0 : frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          // Title fade
          if (titleRef.current) {
            titleRef.current.style.opacity = String(
              Math.max(0, 1 - self.progress * 12)
            );
          }

          // Chapters
          chapterRefs.current.forEach((el, i) => {
            if (!el) return;
            const ch = chapters[i];
            const mid = (ch.from + ch.to) / 2;
            const fadeSpan = (ch.to - ch.from) / 2;
            const p = self.progress;
            let opacity = 0;
            if (p >= ch.from && p <= ch.to) {
              opacity = p < mid
                ? (p - ch.from) / fadeSpan
                : (ch.to - p) / fadeSpan;
            }
            el.style.opacity = String(Math.min(1, Math.max(0, opacity)));
          });
        },
      },
      onUpdate: () => {
        const frameIndex = Math.round(state.frame);
        const img = framesRef.current[frameIndex];
        if (img?.complete && ctx) {
          if (canvas.width !== img.naturalWidth) canvas.width = img.naturalWidth;
          if (canvas.height !== img.naturalHeight) canvas.height = img.naturalHeight;
          ctx.drawImage(img, 0, 0);
        }
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [frameCount, chapters, reversed]);

  const loadPercent = Math.round((loadedCount / frameCount) * 100);

  return (
    <div ref={containerRef} style={{ height: scrollHeight, position: "relative" }}>
      {/* ── Sticky viewport ───────────────────────────────────────────── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: firstFrameReady ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* Loading overlay */}
        {!firstFrameReady && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#0A0A08",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${loadPercent}%`,
                  background: "linear-gradient(to right, rgba(123,159,212,0.6), rgba(168,196,232,0.9))",
                  transition: "width 0.2s ease",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: BODY,
                fontSize: "0.55rem",
                letterSpacing: "0.4em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
              }}
            >
              {loadPercent}%
            </span>
          </div>
        )}

        {/* Vignette */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 22%, transparent 70%, rgba(0,0,0,0.52) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Intro title ──────────────────────────────────────────────── */}
        <div
          ref={titleRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "clamp(28px, 6vh, 56px)",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            pointerEvents: "none",
            transition: "opacity 0.1s linear",
          }}
        >
          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(3rem, 9vw, 8rem)",
              fontWeight: 300,
              letterSpacing: "0.55em",
              paddingLeft: "0.55em",
              color: "#F8F5EF",
              lineHeight: 1,
              textTransform: "uppercase",
              textShadow: "0 2px 40px rgba(0,0,0,0.25)",
            }}
          >
            Flowers
          </h1>
          <p
            style={{
              fontFamily: BODY,
              fontSize: "clamp(0.55rem, 1.3vw, 0.7rem)",
              letterSpacing: "0.45em",
              color: "rgba(248,245,239,0.65)",
              textTransform: "uppercase",
              fontWeight: 100,
            }}
          >
            bespoke floral arrangements
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", marginTop: "8px" }}>
            <span style={{ fontFamily: BODY, fontSize: "0.5rem", letterSpacing: "0.4em", color: "rgba(248,245,239,0.4)", textTransform: "uppercase" }}>
              scroll
            </span>
            <div style={{ width: "1px", height: "24px", background: "linear-gradient(to bottom, rgba(248,245,239,0.4), transparent)" }} />
          </div>
        </div>

        {/* ── Chapters ─────────────────────────────────────────────────── */}
        {chapters.map((ch, i) => {
          const alignMap = { left: "flex-start", center: "center", right: "flex-end" };
          const textAlign = ch.align ?? "left";
          const isCenter = textAlign === "center";

          return (
            <div
              key={i}
              ref={(el) => { chapterRefs.current[i] = el; }}
              style={{
                position: "absolute",
                bottom: ch.position === "top" ? "auto" : ch.position === "center" ? "auto" : "clamp(48px, 9vh, 88px)",
                top: ch.position === "top" ? "8vh" : ch.position === "center" ? "50%" : "auto",
                transform: ch.position === "center" ? "translateY(-50%)" : undefined,
                left: textAlign === "right" ? "auto" : "clamp(28px, 7vw, 96px)",
                right: textAlign === "right" ? "clamp(28px, 7vw, 96px)" : "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: alignMap[textAlign] as React.CSSProperties["alignItems"],
                gap: "10px",
                opacity: 0,
                pointerEvents: "none",
                maxWidth: isCenter ? "640px" : "480px",
                textAlign: textAlign,
              }}
            >
              {ch.label && (
                <span style={{ fontFamily: BODY, fontSize: "0.58rem", letterSpacing: "0.45em", color: "rgba(168,196,232,0.85)", textTransform: "uppercase", fontWeight: 300 }}>
                  {ch.label}
                </span>
              )}
              <p style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 5.5vw, 4.5rem)", fontWeight: 300, fontStyle: "italic", color: "#F8F5EF", lineHeight: 1.15, textShadow: "0 2px 32px rgba(0,0,0,0.3)" }}>
                {ch.title}
              </p>
              {ch.subtitle && (
                <p style={{ fontFamily: BODY, fontSize: "clamp(0.65rem, 1.4vw, 0.82rem)", letterSpacing: "0.15em", color: "rgba(214,229,245,0.7)", fontWeight: 300, lineHeight: 1.8 }}>
                  {ch.subtitle}
                </p>
              )}
            </div>
          );
        })}

        {/* ── Progress bar ─────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1.5px", backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            id="canvas-progress-bar"
            style={{ height: "100%", width: "0%", background: "linear-gradient(to right, rgba(123,159,212,0.6), rgba(168,196,232,0.9))", transition: "width 0.05s linear" }}
          />
        </div>
      </div>
    </div>
  );
}
