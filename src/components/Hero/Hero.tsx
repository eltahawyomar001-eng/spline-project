import { memo } from 'react';
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
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/10 rounded-full blur-[80px] sm:blur-[100px] -translate-y-1/2 translate-x-1/4" />

      {/* Noise Texture */}
      <div className="noise-overlay" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid min-h-screen grid-cols-1 items-center gap-6 sm:gap-8 py-16 lg:grid-cols-2 lg:gap-12 pt-24 sm:pt-28 lg:pt-20">

          {/* Left Column - Content */}
          <div className="flex flex-col justify-center lg:pr-8 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="mb-4 sm:mb-6 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] sm:text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                Professionelles Facility Management
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
              <span className="block">Operative Exzellenz</span>
              <span className="block text-gradient-blue mt-1 sm:mt-2">für Ihre Immobilien.</span>
            </h1>

            {/* Subtext */}
            <p className="mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed">
              Datengetriebenes Infrastrukturelles Facility Management für höchste Ansprüche.
              Wir liefern Präzision, Zuverlässigkeit und Transparenz.
            </p>

            {/* CTAs - Clear visual hierarchy */}
            <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center lg:justify-start">
              {/* Primary CTA - Larger and more prominent */}
              <a
                href="#kontakt"
                className="btn-primary px-8 py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Angebot anfordern
                  <ArrowRightIcon className="w-5 h-5" />
                </span>
              </a>

              {/* Secondary CTA - Subtle */}
              <a
                href="#leistungen"
                className="btn-secondary px-6 py-3.5 text-sm sm:text-base w-full sm:w-auto opacity-80 hover:opacity-100"
              >
                <span className="flex items-center justify-center gap-2">
                  <SparkleIcon className="w-4 h-4" />
                  Leistungen entdecken
                </span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800/50">
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                {TRUST_BADGES.map((badge) => (
                  <span key={badge.label} className="trust-badge text-xs sm:text-sm">
                    <BadgeIcon type={badge.icon} className="trust-badge-icon w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 3D Building (desktop) / Static Image (mobile) */}
          <div className="relative h-[350px] sm:h-[400px] lg:h-[600px]">
            {/* Mobile: Static image for performance */}
            <div className="absolute inset-0 glass-panel rounded-2xl overflow-hidden sm:hidden">
              <img
                src="/building-mobile.png"
                alt="3D Building Visualization"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Desktop/Tablet: Full 3D Spline */}
            <div className="absolute inset-0 glass-panel rounded-2xl overflow-hidden hidden sm:block">
              <SplineBuilding />
            </div>

            {/* Decorative */}
            <div className="absolute -inset-px rounded-2xl border border-white/5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />

      {/* Scroll indicator - visible on all devices */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-[10px] uppercase tracking-widest hidden sm:block">Scroll</span>
          <div className="w-5 sm:w-6 h-8 sm:h-10 rounded-full border-2 border-gray-700/50 flex justify-center pt-2">
            <div className="w-1 h-2 bg-gray-600 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;

