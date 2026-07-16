import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { ThemeProvider } from "@/components/ThemeProvider";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["500", "600"],
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saikolabs.com"),
  title: { default: "Saiko Labs — Sites premium, IA, automatisations et SaaS", template: "%s — Saiko Labs" },
  description:
    "Saiko Labs conçoit des sites premium, des solutions IA, des automatisations sur-mesure et des plateformes SaaS évolutives.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Saiko Labs",
    title: "Saiko Labs — Innover. Automatiser. Scaler.",
    description: "La couche technique qui fait scaler votre business.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#080911" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${plexMono.variable} ${spaceGrotesk.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
