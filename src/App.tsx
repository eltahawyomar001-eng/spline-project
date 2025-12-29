import { useState, useCallback } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { LogoWall } from './components/LogoWall';
import { SiteLoader } from './components/SiteLoader';
import { LegalModal, ImpressumContent, DatenschutzContent, AGBContent } from './components/LegalModal';



function SparkleIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 16l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
      <path d="M19 14l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L17 16l1.5-.5.5-1.5z" />
    </svg>
  );
}

function LeafIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function BuildingIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  );
}

// Service data
const SERVICES = [
  {
    title: 'Hygiene- & Reinigungsmanagement',
    description: 'Professionelle Innenreinigung, Glasreinigung und Unterhaltsreinigung nach höchsten Hygienestandards. Unsere datengestützten Protokolle garantieren konsistente Qualität.',
    icon: SparkleIcon,
    features: ['Innenreinigung', 'Glasreinigung', 'Unterhaltsreinigung'],
    metric: { value: '97%', label: 'Qualitätsindex' },
  },
  {
    title: 'Arealpflege & Verkehrssicherheit',
    description: 'Winterdienst, Grünanlagenpflege und Außenanlagenbetreuung mit dokumentierter Haftungssicherheit. Ihre Verkehrssicherungspflicht ist bei uns in besten Händen.',
    icon: LeafIcon,
    features: ['Winterdienst', 'Grünanlagen', 'Verkehrssicherheit'],
    metric: { value: '24/7', label: 'Bereitschaft' },
  },
  {
    title: 'Technisches Objektmanagement',
    description: 'Hausmeisterservice, Müllmanagement und regelmäßige Vor-Ort-Kontrollen. Wir sind Ihre verlässlichen Augen und Hände vor Ort.',
    icon: BuildingIcon,
    features: ['Hausmeisterservice', 'Müllentsorgung', 'Vor-Ort-Kontrolle'],
    metric: { value: '<2h', label: 'Reaktionszeit' },
  },
];

// Stats
const STATS = [
  { value: '500+', label: 'Betreute Objekte' },
  { value: '15M+', label: 'qm Fläche' },
  { value: '24/7', label: 'Erreichbarkeit' },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<'impressum' | 'datenschutz' | 'agb' | null>(null);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const openModal = useCallback((modal: 'impressum' | 'datenschutz' | 'agb') => {
    setActiveModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);


  return (
    <>
      {/* Premium Site Loader */}
      {isLoading && <SiteLoader onLoadComplete={handleLoadComplete} />}

      <div className={`bg-dark-950 min-h-screen ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* Logo Wall - Trust Section */}
        <LogoWall />

        {/* Services section */}
        <section id="leistungen" className="relative min-h-screen py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wider text-gray-400 uppercase bg-white/5 rounded border border-white/10 mb-6">
                Unsere Leistungen
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Infrastrukturelles FM auf <span className="text-gray-400">höchstem Niveau</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Wir liefern operative Exzellenz durch datengetriebene Prozesse und höchste Qualitätsstandards –
                für Asset Manager, die Präzision erwarten.
              </p>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, index) => (
                <div
                  key={service.title}
                  className="group relative bg-[#0f0f12] border border-white/5 p-8 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-1 text-[10px] font-medium text-gray-400 bg-white/5 rounded border border-white/5"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Metric */}
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white">{service.metric.value}</span>
                      <span className="text-[10px] text-gray-600 uppercase tracking-wider">{service.metric.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simple background */}
          <div className="absolute inset-0 -z-10 grid-background opacity-20" />
        </section>

        {/* Trust/Data section */}
        <section id="ueber-uns" className="relative py-32 px-4 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6">
                  Warum Falke FM
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Präzision trifft Verlässlichkeit
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Wir verstehen Facility Management als Finanzinstrument für Ihre Immobilie.
                  Transparente Daten, messbare Ergebnisse und dokumentierte Prozesse –
                  so überzeugen Sie Ihre Stakeholder.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust visualization */}
              <div className="relative h-[400px] bg-[#0f0f12] border border-white/5 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold text-xl mb-3">Zertifizierte Qualität</h4>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
                      DIN-konforme Prozesse und dokumentierte Leistungsnachweise für Ihre Compliance-Anforderungen.
                    </p>

                    {/* Certifications */}
                    <div className="flex justify-center gap-4">
                      <div className="px-3 py-1.5 text-xs font-medium text-gray-400 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        ISO 9001
                      </div>
                      <div className="px-3 py-1.5 text-xs font-medium text-gray-400 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        ISO 14001
                      </div>
                      <div className="px-3 py-1.5 text-xs font-medium text-gray-400 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        DIN 77200
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative grid */}
                <div className="absolute inset-0 grid-background opacity-30" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="kontakt" className="relative py-32 px-4 border-t border-gray-800/50">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wider text-gray-400 uppercase bg-white/5 rounded border border-white/10 mb-6">
              Kontakt
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Bereit für operative Exzellenz?
            </h2>
            <p className="text-gray-500 text-lg mb-10">
              Lassen Sie uns gemeinsam besprechen, wie wir Ihr Facility Management auf das nächste Level heben können.
            </p>

            <a
              href="mailto:info@falke-fm.de"
              className="inline-flex items-center justify-center px-8 py-4 
                       text-lg font-medium text-white bg-accent-primary rounded-xl
                       overflow-hidden transition-all duration-300 ease-out
                       hover:shadow-glow-lg hover:-translate-y-1 group"
            >
              <span className="relative z-10 flex items-center gap-3">
                Jetzt Angebot anfordern
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <p className="mt-6 text-gray-500 text-sm">
              Oder rufen Sie uns an: <a href="tel:+4930123456789" className="text-gray-300 hover:text-white transition-colors">+49 30 123 456 789</a>
            </p>
          </div>
        </section>

        {/* Footer - Improved for mobile */}
        <footer className="py-12 sm:py-16 px-4 border-t border-gray-800/50 bg-dark-950">
          <div className="max-w-7xl mx-auto">
            {/* Mobile: Stacked layout, Desktop: Grid */}
            <div className="flex flex-col space-y-10 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-12 sm:space-y-0 mb-12">
              {/* Logo & Description */}
              <div className="sm:col-span-2">
                <img
                  src="/Falke_Blau-frei.png"
                  alt="Falke FM"
                  className="h-10 w-auto brightness-0 invert opacity-80 mb-4"
                />
                <p className="text-gray-500 text-sm max-w-md leading-relaxed">
                  Falke Facility Management – Ihr Partner für professionelles infrastrukturelles
                  Gebäudemanagement. Präzision, Zuverlässigkeit und Transparenz für Ihre Immobilien.
                </p>
              </div>

              {/* Links - touch-friendly */}
              <div>
                <h4 className="text-white font-semibold mb-4">Leistungen</h4>
                <ul className="space-y-1">
                  <li><a href="#leistungen" className="block py-2 text-sm text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center">Reinigungsmanagement</a></li>
                  <li><a href="#leistungen" className="block py-2 text-sm text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center">Arealpflege</a></li>
                  <li><a href="#leistungen" className="block py-2 text-sm text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center">Winterdienst</a></li>
                  <li><a href="#leistungen" className="block py-2 text-sm text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center">Objektmanagement</a></li>
                </ul>
              </div>

              {/* Legal - using buttons for modals */}
              <div>
                <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => openModal('impressum')}
                      className="block py-2 text-sm text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center w-full text-left"
                    >
                      Impressum
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openModal('datenschutz')}
                      className="block py-2 text-sm text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center w-full text-left"
                    >
                      Datenschutz
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openModal('agb')}
                      className="block py-2 text-sm text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center w-full text-left"
                    >
                      AGB
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm text-center sm:text-left">
                © {new Date().getFullYear()} Falke Facility Management GmbH. Alle Rechte vorbehalten.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <button onClick={() => openModal('impressum')} className="text-gray-500 hover:text-white transition-colors py-2 min-h-[44px] flex items-center">Impressum</button>
                <button onClick={() => openModal('datenschutz')} className="text-gray-500 hover:text-white transition-colors py-2 min-h-[44px] flex items-center">Datenschutz</button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Legal Modals */}
      <LegalModal isOpen={activeModal === 'impressum'} onClose={closeModal} title="Impressum">
        <ImpressumContent />
      </LegalModal>
      <LegalModal isOpen={activeModal === 'datenschutz'} onClose={closeModal} title="Datenschutzerklärung">
        <DatenschutzContent />
      </LegalModal>
      <LegalModal isOpen={activeModal === 'agb'} onClose={closeModal} title="Allgemeine Geschäftsbedingungen">
        <AGBContent />
      </LegalModal>
    </>
  );
}

export default App;


