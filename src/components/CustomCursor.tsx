"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      setHovering(Boolean(target?.closest("a, button, input, select, textarea")));
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX - 4}px, ${event.clientY - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={`cursor-ring${hovering ? " is-hovering" : ""}`} />
      <div ref={dotRef} className={`cursor-dot${hovering ? " is-hovering" : ""}`} />
    </>
  );
}
