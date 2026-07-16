import { ShineHeading } from "@/components/ShineHeading";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  compact?: boolean;
}

export function PageHero({ eyebrow, title, description, compact = false }: PageHeroProps) {
  return (
    <section className={`page-hero${compact ? " page-hero-compact" : ""}`}>
      <div className="grid-background" />
      <div className="page-hero-inner">
        <span className="eyebrow page-hero-eyebrow">{eyebrow}</span>
        <ShineHeading as="h1">{title}</ShineHeading>
        <p>{description}</p>
      </div>
    </section>
  );
}
