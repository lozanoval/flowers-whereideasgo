"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  color: string;
  blur: number;
}

const COLORS = [
  "rgba(123, 159, 212, 0.55)",
  "rgba(168, 196, 232, 0.45)",
  "rgba(196, 202, 192, 0.4)",
  "rgba(214, 229, 245, 0.6)",
  "rgba(248, 245, 239, 0.7)",
  "rgba(58, 90, 138, 0.2)",
];

export default function BokehParticles({ count = 24 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => {
      const size = 6 + Math.random() * 28;
      return {
        id: i,
        x: 8 + Math.random() * 84,
        y: 10 + Math.random() * 75,
        size,
        delay: Math.random() * 10,
        duration: 6 + Math.random() * 9,
        drift: -50 + Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        blur: size * 0.55,
      };
    });
    setParticles(generated);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              filter: `blur(${p.blur}px)`,
              animation: `bokeh-float ${p.duration}s ${p.delay}s ease-in-out infinite`,
              "--bokeh-drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
