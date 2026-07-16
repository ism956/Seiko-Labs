"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ShineHeading } from "@/components/ShineHeading";

const command = "deploy premium-web · seo · ia · saas";

export function HeroExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(command.slice(0, index));
      if (index >= command.length) window.clearInterval(interval);
    }, 55);
    return () => window.clearInterval(interval);
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const x = event.clientX - window.innerWidth / 2;
    const y = event.clientY - window.innerHeight / 2;
    sectionRef.current.style.setProperty("--pointer-x", `${x}px`);
    sectionRef.current.style.setProperty("--pointer-y", `${y}px`);
  };

  return (
    <section ref={sectionRef} className="home-hero" onPointerMove={handlePointerMove}>
      <div className="grid-background" />
      <div className="hero-blob hero-blob-a" />
      <div className="hero-blob hero-blob-b" />
      <svg className="hero-mark" viewBox="0 0 100 40" aria-hidden="true">
        <defs>
          <linearGradient id="hero-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3B6EF5" />
            <stop offset="1" stopColor="#9B4DFF" />
          </linearGradient>
        </defs>
        <path
          d="M10,38 Q50,-6 90,38"
          fill="none"
          stroke="url(#hero-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
      <div className="terminal-line">
        <span className="terminal-dot" />
        <span>
          <strong>~/saiko&nbsp;$</strong> {typedText}
          <i>▍</i>
        </span>
      </div>
      <ShineHeading as="h1" accentWord="scaler">
        On code la couche technique qui fait scaler votre business.
      </ShineHeading>
      <p>Sites premium, IA, automatisations et SaaS — codés par des ingénieurs.</p>
      <div className="hero-actions">
        <Link className="primary-button hero-primary" href="/contact">
          Démarrer un projet
        </Link>
        <Link className="text-link" href="/realisations">
          Voir nos réalisations ›
        </Link>
      </div>
      <span className="scroll-indicator" aria-hidden="true">↓</span>
    </section>
  );
}
