import { memo } from 'react';

// Placeholder logos - using text/icons since we don't have actual logo files
// In production, these would be real client logo images
const LOGOS = [
    { name: 'Deutsche Immobilien', abbr: 'DI' },
    { name: 'Metropol Asset', abbr: 'MA' },
    { name: 'Nordic Invest', abbr: 'NI' },
    { name: 'Capital Real Estate', abbr: 'CRE' },
    { name: 'Urban Properties', abbr: 'UP' },
    { name: 'Prime Holdings', abbr: 'PH' },
    { name: 'Sentinel Fund', abbr: 'SF' },
    { name: 'Atlas Immobilien', abbr: 'AI' },
];

function LogoPlaceholder({ name, abbr }: { name: string; abbr: string }) {
    return (
        <div
            className="flex-shrink-0 flex items-center justify-center px-8 py-4 group cursor-default"
            title={name}
        >
            <div className="flex items-center gap-3 transition-all duration-300 group-hover:scale-105">
                {/* Logo icon placeholder */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 flex items-center justify-center group-hover:border-gray-600 transition-colors">
                    <span className="text-sm font-bold text-gray-500 group-hover:text-gray-400 transition-colors">
                        {abbr}
                    </span>
                </div>
                {/* Company name */}
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-500 transition-colors whitespace-nowrap">
                    {name}
                </span>
            </div>
        </div>
    );
}

export const LogoWall = memo(function LogoWall() {
    return (
        <section className="relative py-16 px-4 overflow-hidden bg-dark-950 border-t border-gray-800/30">
            {/* Section header */}
            <div className="max-w-7xl mx-auto text-center mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    Vertraut von führenden Asset Managern
                </span>
            </div>

            {/* Logo marquee container */}
            <div className="relative">
                {/* Gradient masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />

                {/* Scrolling logos - doubled for seamless loop */}
                <div className="flex animate-marquee">
                    {/* First set */}
                    {LOGOS.map((logo, index) => (
                        <LogoPlaceholder key={`first-${index}`} name={logo.name} abbr={logo.abbr} />
                    ))}
                    {/* Second set for seamless loop */}
                    {LOGOS.map((logo, index) => (
                        <LogoPlaceholder key={`second-${index}`} name={logo.name} abbr={logo.abbr} />
                    ))}
                </div>
            </div>

            {/* Trust indicators */}
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800/30">
                <div className="flex flex-wrap justify-center gap-8 text-center">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="M9 12l2 2 4-4" />
                        </svg>
                        <span className="text-sm text-gray-500">ISO-zertifiziert</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span className="text-sm text-gray-500">DSGVO-konform</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span className="text-sm text-gray-500">24/7 Support</span>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default LogoWall;
