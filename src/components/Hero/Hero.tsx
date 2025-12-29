import { memo, lazy, Suspense } from 'react';

// Dynamic import for 3D building
const SplineBuilding = lazy(() => import('./SplineBuilding'));

// Trust badges data
const TRUST_BADGES = [
  { icon: 'shield', label: 'ISO-zertifiziert' },
  { icon: 'uptime', label: '24/7 Erreichbarkeit' },
  { icon: 'chart', label: 'Haftungssicherheit' },
];

// Icons
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
  // 3D loads on ALL devices including mobile
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-dark-950">
      {/* Dark luxury background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0c] via-[#0f0f12] to-[#0a0a0c]" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                    `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid min-h-screen grid-cols-1 items-center gap-6 sm:gap-8 py-16 lg:grid-cols-2 lg:gap-12 pt-24 sm:pt-28 lg:pt-20">

          {/* Left Column - Content */}
          <div className="flex flex-col justify-center lg:pr-8 text-center lg:text-left">
            {/* Eyebrow - Bloomberg style muted */}
            <div className="mb-4 sm:mb-6 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] sm:text-xs font-semibold tracking-wider text-gray-400 uppercase bg-white/5 rounded border border-white/10">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                Professionelles Facility Management
              </span>
            </div>

            {/* Headline - clean white */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
              <span className="block">Operative Exzellenz</span>
              <span className="block text-gray-400 mt-1 sm:mt-2">für Ihre Immobilien.</span>
            </h1>

            {/* Subtext */}
            <p className="mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg lg:text-xl text-gray-500 leading-relaxed">
              Datengetriebenes Infrastrukturelles Facility Management für höchste Ansprüche.
              Wir liefern Präzision, Zuverlässigkeit und Transparenz.
            </p>

            {/* CTAs - Dark luxury style */}
            <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center lg:justify-start">
              {/* Primary CTA */}
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-white bg-white/10 rounded-lg border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Angebot anfordern
                  <ArrowRightIcon className="w-5 h-5" />
                </span>
              </a>

              {/* Secondary CTA */}
              <a
                href="#leistungen"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-medium text-gray-400 hover:text-white transition-colors w-full sm:w-auto"
              >
                Leistungen entdecken
              </a>
            </div>

            {/* Trust Badges - muted */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5">
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                {TRUST_BADGES.map((badge) => (
                  <span key={badge.label} className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm text-gray-500 bg-white/3 rounded border border-white/5">
                    <BadgeIcon type={badge.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 3D Building */}
          <div className="relative h-[350px] sm:h-[400px] lg:h-[600px]">
            <Suspense fallback={
              <div className="absolute inset-0 rounded-xl overflow-hidden flex items-center justify-center bg-[#0f0f12] border border-white/5">
                <div className="text-gray-600 text-sm font-mono">INITIALISIERE...</div>
              </div>
            }>
              <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/5">
                <SplineBuilding />
              </div>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#0a0a0c] to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <span className="text-[10px] uppercase tracking-widest hidden sm:block font-mono">Scroll</span>
          <div className="w-5 sm:w-6 h-8 sm:h-10 rounded-full border border-white/10 flex justify-center pt-2">
            <div className="w-1 h-2 bg-gray-600 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
