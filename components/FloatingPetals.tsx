"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  spin: number;
  shape: "round" | "leaf" | "oval";
  color: string;
  opacity: number;
}

const PETAL_COLORS = [
  "rgba(123, 159, 212, 0.35)",
  "rgba(196, 202, 192, 0.4)",
  "rgba(248, 245, 239, 0.6)",
  "rgba(168, 196, 232, 0.3)",
  "rgba(58, 90, 138, 0.15)",
  "rgba(214, 229, 245, 0.45)",
];

const SHAPES: Petal["shape"][] = ["round", "leaf", "oval"];

function getBorderRadius(shape: Petal["shape"]) {
  switch (shape) {
    case "round":
      return "50%";
    case "leaf":
      return "50% 0 50% 0";
    case "oval":
      return "50% 50% 50% 50% / 30% 30% 70% 70%";
  }
}

export default function FloatingPetals({ count = 18 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 6 + Math.random() * 16,
      delay: Math.random() * 20,
      duration: 14 + Math.random() * 18,
      drift: -60 + Math.random() * 120,
      spin: 300 + Math.random() * 500,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      opacity: 0.4 + Math.random() * 0.4,
    }));
    setPetals(generated);
  }, [count]);

  if (petals.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={
            {
              left: `${p.x}%`,
              top: 0,
              width: `${p.size}px`,
              height: `${p.size * (p.shape === "oval" ? 1.6 : 1)}px`,
              backgroundColor: p.color,
              borderRadius: getBorderRadius(p.shape),
              filter: "blur(0.5px)",
              animation: `petal-fall ${p.duration}s ${p.delay}s linear infinite`,
              "--petal-drift": `${p.drift}px`,
              "--petal-spin": `${p.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
