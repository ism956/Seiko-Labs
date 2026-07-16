import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parlez-nous de votre projet web, IA, automatisation ou SaaS. Saiko Labs vous répond avec un premier retour concret.",
};

const contactDetails = [
  { label: "Téléphone", value: "07 67 92 07 53", href: "tel:+33767920753" },
  { label: "Email", value: "hello@saikolabs.fr", href: "mailto:hello@saikolabs.fr" },
  { label: "Web", value: "saikolabs.com" },
] as const;

export default function ContactPage() {
  return (
    <section className="contact-section">
      <div className="grid-background" />
      <div className="contact-layout">
        <div className="contact-intro">
          <span className="eyebrow intro-animate intro-delay-1">/ contact</span>
          <h1 className="shine-heading intro-animate intro-delay-2">Parlons de votre projet.</h1>
          <p className="intro-animate intro-delay-3">
            Décrivez-nous votre besoin, on revient vers vous rapidement avec un premier retour concret.
          </p>
          <div className="contact-details intro-animate intro-delay-4">
            {contactDetails.map((detail) => (
              <div key={detail.label} className="contact-detail">
                <div className="contact-detail-icon"><span /></div>
                <div>
                  <span>{detail.label}</span>
                  {"href" in detail ? <a href={detail.href}>{detail.value}</a> : <strong>{detail.value}</strong>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="contact-card intro-animate intro-delay-4">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
