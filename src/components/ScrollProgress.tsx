"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const root = document.documentElement;
      const maximum = root.scrollHeight - root.clientHeight;
      const progress = maximum > 0 ? root.scrollTop / maximum : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
