import { Hero } from './components/Hero';
// Removed Lenis - causes scroll performance issues

function App() {
  return (
    <div className="bg-dark-950 min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Demo section */}
      <section className="relative min-h-screen py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Unified Infrastructure Intelligence
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A single platform to monitor, analyze, and optimize your entire commercial portfolio.
            </p>
          </div>

          {/* Feature cards - no animations for performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Real-time Monitoring',
                description: 'Live data streams from every sensor, meter, and system across your portfolio.',
                icon: '📊',
              },
              {
                title: 'Predictive Analytics',
                description: 'AI-powered insights that anticipate issues before they impact operations.',
                icon: '🔮',
              },
              {
                title: 'Portfolio Reporting',
                description: 'Investor-ready reports generated automatically with full audit trails.',
                icon: '📈',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glass-panel p-6 hover:bg-white/[0.04] transition-colors duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Simple background */}
        <div className="absolute inset-0 -z-10 grid-background opacity-20" />
      </section>

      {/* Second section */}
      <section className="relative min-h-screen py-32 px-4 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6">
                Enterprise Ready
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Built for the demands of institutional asset management
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                From data centers to retail centers, our platform handles the complexity 
                of diverse property types while maintaining the security and compliance 
                standards your stakeholders require.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '500+', label: 'Properties' },
                  { value: '12M', label: 'Sq. Ft. Managed' },
                  { value: '99.99%', label: 'Uptime SLA' },
                ].map((stat) => (
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
            
            {/* Simple visualization */}
            <div className="relative h-[400px] glass-panel rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium mb-2">Security First</h4>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto">
                    SOC 2 Type II certified with end-to-end encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            © 2024 Infrastructure Intelligence Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
