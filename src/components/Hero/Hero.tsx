import { memo } from 'react';
import MagneticButton from './MagneticButton';
import SplineBuilding from './SplineBuilding';

// Trust badges data - German
const TRUST_BADGES = [
  { icon: 'shield', label: 'ISO-zertifiziert' },
  { icon: 'uptime', label: '24/7 Erreichbarkeit' },
  { icon: 'chart', label: 'Haftungssicherheit' },
];

// Icon components
function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function UptimeIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ChartIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  );
}

function ArrowRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

function SparkleIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

const BadgeIcon = memo(({ type, className }: { type: string; className: string }) => {
  switch (type) {
    case 'shield':
      return <ShieldIcon className={className} />;
    case 'uptime':
      return <UptimeIcon className={className} />;
    case 'chart':
      return <ChartIcon className={className} />;
    default:
      return null;
  }
});

export const Hero = memo(function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-dark-950">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="grid-background" />

      {/* Simple glow - no animation */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />

      {/* Noise Texture */}
      <div className="noise-overlay" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-screen grid-cols-1 items-center gap-8 py-20 lg:grid-cols-2 lg:gap-12 pt-28 lg:pt-20">

          {/* Left Column - Content */}
          <div className="flex flex-col justify-center lg:pr-8">
            {/* Eyebrow */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                Professionelles Facility Management
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block">Operative Exzellenz</span>
              <span className="block text-gradient-blue mt-1">für Ihre Immobilien.</span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-xl text-lg text-gray-400 leading-relaxed sm:text-xl">
              Datengetriebenes Infrastrukturelles Facility Management für höchste Ansprüche.
              Wir liefern Präzision, Zuverlässigkeit und Transparenz – wie ein Finanzinstrument für Ihre Gebäude.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
              <MagneticButton variant="primary">
                <span className="flex items-center gap-2">
                  Angebot anfordern
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </MagneticButton>

              <MagneticButton variant="secondary">
                <span className="flex items-center gap-2">
                  <SparkleIcon className="w-4 h-4" />
                  Leistungen entdecken
                </span>
              </MagneticButton>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-gray-800/50">
              <div className="flex flex-wrap gap-3">
                {TRUST_BADGES.map((badge) => (
                  <span key={badge.label} className="trust-badge">
                    <BadgeIcon type={badge.icon} className="trust-badge-icon" />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 3D */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
            <div className="absolute inset-0 glass-panel rounded-2xl overflow-hidden">
              <SplineBuilding />
            </div>

            {/* Decorative */}
            <div className="absolute -inset-px rounded-2xl border border-white/5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-gray-700 flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-600 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
});

export default Hero;
