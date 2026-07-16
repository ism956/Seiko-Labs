import Link from "next/link";

interface CtaBannerProps {
  title: string;
  compact?: boolean;
}

export function CtaBanner({ title, compact = false }: CtaBannerProps) {
  return (
    <section className={`cta-banner${compact ? " cta-banner-compact" : ""}`}>
      <h2 className="shine-heading shine-heading-light">{title}</h2>
      <Link className="white-button" href="/contact">
        Démarrer un projet
      </Link>
    </section>
  );
}
