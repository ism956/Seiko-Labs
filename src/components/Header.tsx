"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useTheme } from "@/components/ThemeProvider";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <Logo variant="header" />
      <nav className="desktop-nav" aria-label="Navigation principale">
        {navigation.map((item) => (
          <Link key={item.href} className={pathname === item.href ? "active" : ""} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Activer le thème ${theme === "dark" ? "clair" : "sombre"}`}
        >
          <span className="theme-thumb">{theme === "dark" ? "☾" : "☀"}</span>
        </button>
        <Link className="primary-button header-cta" href="/contact">
          Démarrer un projet
        </Link>
      </div>
    </header>
  );
}
