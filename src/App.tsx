import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';



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
  return (
    <div className="bg-dark-950 min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services section */}
      <section id="leistungen" className="relative min-h-screen py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
              Unsere Leistungen
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Infrastrukturelles FM auf <span className="text-gradient-blue">höchstem Niveau</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Wir liefern operative Exzellenz durch datengetriebene Prozesse und höchste Qualitätsstandards –
              für Asset Manager, die Präzision erwarten.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className="group glass-panel p-8 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-blue-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2.5 py-1 text-xs font-medium text-gray-300 bg-gray-800/50 rounded-md border border-gray-700/50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Metric */}
                <div className="pt-4 border-t border-gray-800/50">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-400">{service.metric.value}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{service.metric.label}</span>
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
            <div className="relative h-[400px] glass-panel rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
            Kontakt
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Bereit für operative Exzellenz?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
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
            Oder rufen Sie uns an: <a href="tel:+4930123456789" className="text-blue-400 hover:text-blue-300 transition-colors">+49 30 123 456 789</a>
          </p>
        </div>
      </section>

      {/* Footer with Impressum */}
      <footer className="py-16 px-4 border-t border-gray-800/50 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
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

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Leistungen</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#leistungen" className="text-gray-500 hover:text-white transition-colors">Reinigungsmanagement</a></li>
                <li><a href="#leistungen" className="text-gray-500 hover:text-white transition-colors">Arealpflege</a></li>
                <li><a href="#leistungen" className="text-gray-500 hover:text-white transition-colors">Winterdienst</a></li>
                <li><a href="#leistungen" className="text-gray-500 hover:text-white transition-colors">Objektmanagement</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#impressum" className="text-gray-500 hover:text-white transition-colors">Impressum</a></li>
                <li><a href="#datenschutz" className="text-gray-500 hover:text-white transition-colors">Datenschutz</a></li>
                <li><a href="#agb" className="text-gray-500 hover:text-white transition-colors">AGB</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Falke Facility Management GmbH. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#impressum" className="text-gray-500 hover:text-white transition-colors">Impressum</a>
              <a href="#datenschutz" className="text-gray-500 hover:text-white transition-colors">Datenschutz</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
