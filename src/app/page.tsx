import { CtaBanner } from "@/components/CtaBanner";
import { ExpertiseGrid } from "@/components/ExpertiseGrid";
import { HeroExperience } from "@/components/HeroExperience";
import { Reveal } from "@/components/Reveal";
import { ShineHeading } from "@/components/ShineHeading";
import { processSteps } from "@/lib/site-data";

const marqueeItems = [
  "Sites web premium",
  "Intelligence Artificielle",
  "Automatisations sur-mesure",
  "Solutions SaaS",
  "Sites web premium",
  "Intelligence Artificielle",
  "Automatisations sur-mesure",
  "Solutions SaaS",
];

export default function HomePage() {
  return (
    <>
      <HeroExperience />
      <div className="marquee" aria-label="Expertises Saiko Labs">
        <div className="marquee-track">
          {marqueeItems.map((item, index) => (
            <span key={`${item}-${index}`}>{item}<i>✦</i></span>
          ))}
        </div>
      </div>

      <section className="content-section expertise-section">
        <Reveal>
          <span className="eyebrow">/01 — expertises</span>
          <ShineHeading className="section-title">Quatre leviers pour un business qui tourne tout seul.</ShineHeading>
        </Reveal>
        <ExpertiseGrid />
      </section>

      <section className="process-section">
        <div className="process-inner">
          <Reveal>
            <span className="eyebrow">/02 — méthode</span>
            <ShineHeading className="section-title shine-heading-light">
              De l&apos;idée à la mise en production, sans zone grise.
            </ShineHeading>
          </Reveal>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} className="process-step" delay={index * 0.12}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section founders-section">
        <Reveal>
          <span className="eyebrow">/03 — équipe</span>
          <ShineHeading className="section-title">Le duo derrière Saiko Labs.</ShineHeading>
        </Reveal>
        <div className="founders-grid">
          <Reveal className="founder-card">
            <div className="founder-avatar" />
            <h3>El Mawaguiry Mahmoud</h3>
            <p>Founder &amp; Digital Engineer</p>
          </Reveal>
          <Reveal className="founder-card" delay={0.15}>
            <div className="founder-avatar" />
            <h3>Ismael Ghazi</h3>
            <p>Founder &amp; Digital Engineer</p>
          </Reveal>
        </div>
      </section>

      <CtaBanner title="Prêt à passer à la vitesse supérieure ?" />
    </>
  );
}
