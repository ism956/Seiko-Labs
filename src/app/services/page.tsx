import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ShineHeading } from "@/components/ShineHeading";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description: "Sites web premium, référencement naturel, intelligence artificielle, automatisations et plateformes SaaS.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="/ services — ce que l'on fait"
        title="Quatre expertises, une seule équipe d'ingénieurs."
        description="Pas d'agence-usine, pas de sous-traitance en cascade : chaque projet est conçu et codé en interne, de bout en bout."
      />
      <div className="services-list">
        {services.map((service, index) => (
          <section key={service.tag} className={`service-row${index % 2 === 1 ? " is-reversed" : ""}`}>
            <div className="service-layout">
              <Reveal className="service-copy">
                <span className="eyebrow">{service.tag}</span>
                <ShineHeading>{service.title}</ShineHeading>
                <p>{service.description}</p>
                <ul>
                  {service.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </Reveal>
              <Reveal className={`service-visual visual-${index}`} delay={0.1}>
                <div className="visual-square" />
                <div className="visual-ring" />
              </Reveal>
            </div>
          </section>
        ))}
      </div>
      <CtaBanner compact title="Un projet en tête ? Parlons technique." />
    </>
  );
}
