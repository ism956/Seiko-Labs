"use client";

import { Fragment, useEffect, useRef } from "react";

const RADIUS = 130;
const EASE = 0.22;

type RGB = [number, number, number];

function parseColor(value: string): RGB | null {
  const raw = value.trim();
  const hex = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)?.[1];

  if (hex) {
    const full = hex.length === 3 ? [...hex].map((c) => c + c).join("") : hex;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as RGB;
  }

  const rgb = raw.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  return rgb ? [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])] : null;
}

const mix = (from: RGB, to: RGB, amount: number): RGB =>
  [0, 1, 2].map((i) => Math.round(from[i] + (to[i] - from[i]) * amount)) as RGB;

const sampleGradient = (stops: readonly [RGB, RGB, RGB], position: number): RGB =>
  position < 0.5 ? mix(stops[0], stops[1], position * 2) : mix(stops[1], stops[2], position * 2 - 1);

interface ShineHeadingProps {
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Mot rendu avec le dégradé permanent de la marque, exclu de l'effet de proximité. */
  accentWord?: string;
  children: string;
}

export function ShineHeading({ as: Tag = "h2", className, accentWord, children }: ShineHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = ref.current;
    if (!heading || !window.matchMedia("(pointer: fine)").matches) return;

    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const letters = Array.from(heading.querySelectorAll<HTMLElement>("[data-shine-letter]"));
    const count = letters.length;
    if (count === 0) return;

    const centers = new Float32Array(count * 2);
    const targetColors: RGB[] = new Array(count);
    const current = new Float32Array(count);
    const target = new Float32Array(count);
    let base: RGB = [255, 255, 255];
    let frame: number | null = null;

    const prepare = () => {
      const styles = getComputedStyle(heading);
      base = parseColor(styles.getPropertyValue("--sweep-base")) ?? base;
      const stops = [
        parseColor(styles.getPropertyValue("--sweep-from")) ?? base,
        parseColor(styles.getPropertyValue("--sweep-mid")) ?? base,
        parseColor(styles.getPropertyValue("--sweep-to")) ?? base,
      ] as const;

      const bounds = heading.getBoundingClientRect();
      letters.forEach((letter, i) => {
        const rect = letter.getBoundingClientRect();
        centers[i * 2] = rect.left - bounds.left + rect.width / 2;
        centers[i * 2 + 1] = rect.top - bounds.top + rect.height / 2;
        targetColors[i] = sampleGradient(stops, bounds.width > 0 ? centers[i * 2] / bounds.width : 0);
      });
    };

    const paint = (i: number) => {
      const amount = current[i];
      letters[i].style.color = amount < 0.004 ? "" : `rgb(${mix(base, targetColors[i], amount).join(" ")})`;
    };

    const tick = () => {
      frame = null;
      let animating = false;

      for (let i = 0; i < count; i += 1) {
        const delta = target[i] - current[i];
        if (delta === 0) continue;

        if (Math.abs(delta) < 0.004) {
          current[i] = target[i];
        } else {
          current[i] += delta * (instant ? 1 : EASE);
          animating = true;
        }
        paint(i);
      }

      if (animating) frame = window.requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(tick);
    };

    const handleMove = (event: PointerEvent) => {
      const bounds = heading.getBoundingClientRect();
      const pointerX = event.clientX - bounds.left;
      const pointerY = event.clientY - bounds.top;

      for (let i = 0; i < count; i += 1) {
        const distance = Math.hypot(centers[i * 2] - pointerX, centers[i * 2 + 1] - pointerY);
        const closeness = Math.max(0, 1 - distance / RADIUS);
        target[i] = closeness * closeness * (3 - 2 * closeness);
      }

      schedule();
    };

    const handleLeave = () => {
      target.fill(0);
      schedule();
    };

    heading.addEventListener("pointerenter", prepare);
    heading.addEventListener("pointermove", handleMove, { passive: true });
    heading.addEventListener("pointerleave", handleLeave);

    return () => {
      heading.removeEventListener("pointerenter", prepare);
      heading.removeEventListener("pointermove", handleMove);
      heading.removeEventListener("pointerleave", handleLeave);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [children]);

  const words = children.split(" ");

  return (
    <Tag ref={ref} className={["shine-heading", className].filter(Boolean).join(" ")} aria-label={children}>
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          {wordIndex > 0 && " "}
          {word === accentWord ? (
            <span aria-hidden="true" className="shine-word shine-accent">
              {word}
            </span>
          ) : (
            <span aria-hidden="true" className="shine-word">
              {Array.from(word).map((letter, letterIndex) => (
                <span key={letterIndex} data-shine-letter>
                  {letter}
                </span>
              ))}
            </span>
          )}
        </Fragment>
      ))}
    </Tag>
  );
}
