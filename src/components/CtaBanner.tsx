import Link from "next/link";
import { ShineHeading } from "@/components/ShineHeading";

interface CtaBannerProps {
  title: string;
  compact?: boolean;
}

export function CtaBanner({ title, compact = false }: CtaBannerProps) {
  return (
    <section className={`cta-banner${compact ? " cta-banner-compact" : ""}`}>
      <ShineHeading className="shine-heading-light">{title}</ShineHeading>
      <Link className="white-button" href="/contact">
        Démarrer un projet
      </Link>
    </section>
  );
}
