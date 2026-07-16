import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Découvrez les formats de projets web, IA, automatisation et SaaS conçus par Saiko Labs.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="/ réalisations"
        title="Le type de projets qu'on adore construire."
        description="Nos études de cas arrivent bientôt. En attendant, voici les formats de projets sur lesquels nous intervenons le plus."
      />
      <section className="projects-section">
        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.title} className="project-card" delay={(index % 3) * 0.08}>
              <div className="project-thumb saiko-stripe"><span>visuel à venir</span></div>
              <div className="project-copy">
                <span className="eyebrow">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBanner compact title="Votre projet pourrait être le prochain." />
    </>
  );
}
