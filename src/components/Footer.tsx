"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

const footerNavigation = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const pathname = usePathname();
  const navigation = footerNavigation.filter((item) => item.href !== pathname);

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Logo variant="footer" />
          <p>Innover. Automatiser. Scaler.</p>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <span className="eyebrow">Navigation</span>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
          <address className="footer-column">
            <span className="eyebrow">Contact</span>
            <a href="tel:+33767920753">07 67 92 07 53</a>
            <a href="mailto:hello@saikolabs.fr">hello@saikolabs.fr</a>
            <span>saikolabs.com</span>
          </address>
        </div>
      </div>
      <div className="footer-bottom">© 2026 Saiko Labs. Tous droits réservés.</div>
    </footer>
  );
}
