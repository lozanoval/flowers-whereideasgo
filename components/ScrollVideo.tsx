"use client";

import { useEffect, useRef } from "react";

const DISPLAY = 'var(--font-cormorant), "Georgia", serif';
const BODY = 'var(--font-josefin), "Helvetica Neue", sans-serif';

export interface Chapter {
  from: number;   // 0–1 scroll progress where this chapter starts fading in
  to: number;     // 0–1 scroll progress where this chapter finishes fading out
  label?: string; // small uppercase label
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  position?: "top" | "center" | "bottom";
}

interface ScrollVideoProps {
  src: string;
  scrollHeight?: string;
  chapters?: Chapter[];
  reversed?: boolean;
}

export default function ScrollVideo({
  src,
  scrollHeight = "500vh",
  chapters = [],
  reversed = false,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.pause();

    function getProgress(): number {
      if (!container) return 0;
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      return Math.min(1, Math.max(0, -rect.top / scrollable));
    }

    function onLoaded() {
      if (video && isFinite(video.duration)) {
        video.currentTime = reversed ? video.duration : 0;
      }
    }

    if (video.readyState >= 1) {
      onLoaded();
    } else {
      video.addEventListener("loadedmetadata", onLoaded, { once: true });
    }

    function scrub() {
      const progress = getProgress();

      // Drive video
      if (video && video.duration && isFinite(video.duration)) {
        video.currentTime = reversed
          ? (1 - progress) * video.duration
          : progress * video.duration;
      }

      // Fade title out quickly on first scroll
      if (titleRef.current) {
        const opacity = Math.max(0, 1 - progress * 12);
        titleRef.current.style.opacity = String(opacity);
      }

      // Drive chapters
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const ch = chapters[i];
        const mid = (ch.from + ch.to) / 2;
        const fadeSpan = (ch.to - ch.from) / 2;
        let opacity = 0;
        if (progress >= ch.from && progress <= ch.to) {
          if (progress < mid) {
            opacity = (progress - ch.from) / fadeSpan;
          } else {
            opacity = (ch.to - progress) / fadeSpan;
          }
        }
        el.style.opacity = String(Math.min(1, Math.max(0, opacity)));
      });

      // Progress bar
      const bar = container.querySelector<HTMLDivElement>("[data-progress-bar]");
      if (bar) bar.style.width = `${getProgress() * 100}%`;
    }

    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        scrub();
        rafRef.current = null;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    scrub();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [chapters, reversed]);

  return (
    <div ref={containerRef} style={{ height: scrollHeight, position: "relative" }}>
      {/* ── Sticky viewport ─────────────────────────────────────── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

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

        {/* ── Intro title (fades out on first scroll) ─────────── */}
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
          {/* Scroll hint */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", marginTop: "8px" }}>
            <span style={{ fontFamily: BODY, fontSize: "0.5rem", letterSpacing: "0.4em", color: "rgba(248,245,239,0.4)", textTransform: "uppercase" }}>
              scroll
            </span>
            <div style={{ width: "1px", height: "24px", background: "linear-gradient(to bottom, rgba(248,245,239,0.4), transparent)" }} />
          </div>
        </div>

        {/* ── Chapters ──────────────────────────────────────────── */}
        {chapters.map((ch, i) => {
          const alignMap = { left: "flex-start", center: "center", right: "flex-end" };
          const posMap = { top: "8vh", center: "50%", bottom: "auto" };
          const textAlign = ch.align ?? "left";
          const isCenter = textAlign === "center";

          return (
            <div
              key={i}
              ref={(el) => { chapterRefs.current[i] = el; }}
              style={{
                position: "absolute",
                bottom: ch.position === "top" ? "auto" : ch.position === "center" ? "auto" : "clamp(48px, 9vh, 88px)",
                top: ch.position === "top" ? posMap.top : ch.position === "center" ? "50%" : "auto",
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
                <span
                  style={{
                    fontFamily: BODY,
                    fontSize: "0.58rem",
                    letterSpacing: "0.45em",
                    color: "rgba(168,196,232,0.85)",
                    textTransform: "uppercase",
                    fontWeight: 300,
                  }}
                >
                  {ch.label}
                </span>
              )}
              <p
                style={{
                  fontFamily: DISPLAY,
                  fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#F8F5EF",
                  lineHeight: 1.15,
                  textShadow: "0 2px 32px rgba(0,0,0,0.3)",
                }}
              >
                {ch.title}
              </p>
              {ch.subtitle && (
                <p
                  style={{
                    fontFamily: BODY,
                    fontSize: "clamp(0.65rem, 1.4vw, 0.82rem)",
                    letterSpacing: "0.15em",
                    color: "rgba(214,229,245,0.7)",
                    fontWeight: 300,
                    lineHeight: 1.8,
                  }}
                >
                  {ch.subtitle}
                </p>
              )}
            </div>
          );
        })}

        {/* ── Progress bar ──────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1.5px",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div
            data-progress-bar
            style={{
              height: "100%",
              width: "0%",
              background: "linear-gradient(to right, rgba(123,159,212,0.6), rgba(168,196,232,0.9))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
