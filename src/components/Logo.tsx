import Link from "next/link";

interface LogoProps {
  variant: "header" | "footer";
}

export function Logo({ variant }: LogoProps) {
  const gradientId = `logo-gradient-${variant}`;
  const width = variant === "header" ? 30 : 34;
  const height = variant === "header" ? 13 : 15;

  return (
    <Link className={`logo logo-${variant}`} href="/" aria-label="Saiko Labs — Accueil">
      <svg width={width} height={height} viewBox="0 0 100 40" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3B6EF5" />
            <stop offset="1" stopColor="#9B4DFF" />
          </linearGradient>
        </defs>
        <path
          d="M10,38 Q50,-6 90,38"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
      <span>
        SAIKO <em>LABS</em>
      </span>
    </Link>
  );
}
