"use client";

import { useState } from "react";
import { expertiseCards } from "@/lib/site-data";

interface Tilt {
  x: number;
  y: number;
}

export function ExpertiseGrid() {
  const [tilts, setTilts] = useState<Array<Tilt | null>>(() => expertiseCards.map(() => null));

  const updateTilt = (index: number, event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilts((current) => current.map((tilt, currentIndex) => (currentIndex === index ? { x, y } : tilt)));
  };

  const resetTilt = (index: number) => {
    setTilts((current) => current.map((tilt, currentIndex) => (currentIndex === index ? null : tilt)));
  };

  return (
    <div className="expertise-grid">
      {expertiseCards.map((card, index) => {
        const tilt = tilts[index];
        const transform = tilt
          ? `perspective(600px) rotateX(${tilt.y * -8}deg) rotateY(${tilt.x * 8}deg) translateY(-4px)`
          : "perspective(600px) rotateX(0deg) rotateY(0deg)";
        return (
          <article
            key={card.title}
            className="expertise-card"
            style={{ transform }}
            onPointerMove={(event) => updateTilt(index, event)}
            onPointerLeave={() => resetTilt(index)}
          >
            <div className="expertise-icon"><span /></div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        );
      })}
    </div>
  );
}
