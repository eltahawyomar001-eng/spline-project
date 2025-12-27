import { memo, ReactNode } from 'react';

// High-quality SVG logos for each company
const LOGOS: { name: string; logo: ReactNode }[] = [
    {
        name: 'Deutsche Immobilien',
        logo: (
            <svg viewBox="0 0 120 40" className="h-8 w-auto" fill="none">
                <rect x="2" y="8" width="24" height="24" rx="4" fill="url(#di-grad)" />
                <path d="M8 20h12M14 14v12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <text x="32" y="26" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui">Deutsche</text>
                <defs>
                    <linearGradient id="di-grad" x1="2" y1="8" x2="26" y2="32">
                        <stop stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#1E40AF" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        name: 'Metropol Asset',
        logo: (
            <svg viewBox="0 0 130 40" className="h-8 w-auto" fill="none">
                <path d="M4 32V12l10 8 10-16 10 16 10-8v20" stroke="url(#ma-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24" cy="8" r="3" fill="#F59E0B" />
                <text x="50" y="26" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui">Metropol</text>
                <defs>
                    <linearGradient id="ma-grad" x1="4" y1="8" x2="44" y2="32">
                        <stop stopColor="#F59E0B" />
                        <stop offset="1" stopColor="#D97706" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        name: 'Nordic Invest',
        logo: (
            <svg viewBox="0 0 120 40" className="h-8 w-auto" fill="none">
                <path d="M4 28L14 12l10 16L34 12l10 16" stroke="url(#ni-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24" cy="8" r="2" fill="#06B6D4" />
                <text x="50" y="26" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui">Nordic</text>
                <defs>
                    <linearGradient id="ni-grad" x1="4" y1="12" x2="44" y2="28">
                        <stop stopColor="#06B6D4" />
                        <stop offset="1" stopColor="#0891B2" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        name: 'Capital RE',
        logo: (
            <svg viewBox="0 0 110 40" className="h-8 w-auto" fill="none">
                <rect x="4" y="10" width="8" height="22" rx="1" fill="url(#cre-grad1)" />
                <rect x="15" y="6" width="8" height="26" rx="1" fill="url(#cre-grad2)" />
                <rect x="26" y="14" width="8" height="18" rx="1" fill="url(#cre-grad3)" />
                <text x="42" y="26" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui">Capital</text>
                <defs>
                    <linearGradient id="cre-grad1" x1="4" y1="10" x2="12" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#10B981" />
                        <stop offset="1" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="cre-grad2" x1="15" y1="6" x2="23" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#10B981" />
                        <stop offset="1" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="cre-grad3" x1="26" y1="14" x2="34" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#10B981" />
                        <stop offset="1" stopColor="#065F46" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        name: 'Urban Properties',
        logo: (
            <svg viewBox="0 0 110 40" className="h-8 w-auto" fill="none">
                <path d="M6 32V14l10-6 10 6v18" stroke="url(#up-grad)" strokeWidth="2" strokeLinejoin="round" />
                <rect x="12" y="18" width="8" height="14" fill="url(#up-grad2)" />
                <path d="M30 32V20l6-4 6 4v12" stroke="url(#up-grad)" strokeWidth="1.5" strokeLinejoin="round" />
                <text x="48" y="26" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui">Urban</text>
                <defs>
                    <linearGradient id="up-grad" x1="6" y1="8" x2="42" y2="32">
                        <stop stopColor="#8B5CF6" />
                        <stop offset="1" stopColor="#6D28D9" />
                    </linearGradient>
                    <linearGradient id="up-grad2" x1="12" y1="18" x2="20" y2="32">
                        <stop stopColor="#A78BFA" />
                        <stop offset="1" stopColor="#7C3AED" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        name: 'Prime Holdings',
        logo: (
            <svg viewBox="0 0 120 40" className="h-8 w-auto" fill="none">
                <path d="M20 4L4 20l16 16 16-16L20 4z" fill="url(#ph-grad)" />
                <path d="M20 10L10 20l10 10 10-10-10-10z" fill="#111827" />
                <circle cx="20" cy="20" r="4" fill="url(#ph-grad2)" />
                <text x="42" y="26" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui">Prime</text>
                <defs>
                    <linearGradient id="ph-grad" x1="4" y1="4" x2="36" y2="36">
                        <stop stopColor="#EC4899" />
                        <stop offset="1" stopColor="#BE185D" />
                    </linearGradient>
                    <linearGradient id="ph-grad2" x1="16" y1="16" x2="24" y2="24">
                        <stop stopColor="#F472B6" />
                        <stop offset="1" stopColor="#DB2777" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        name: 'Sentinel Fund',
        logo: (
            <svg viewBox="0 0 120 40" className="h-8 w-auto" fill="none">
                <path d="M20 4l-16 8v12c0 8 8 14 16 16 8-2 16-8 16-16V12L20 4z" fill="url(#sf-grad)" />
                <path d="M14 20l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="44" y="26" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui">Sentinel</text>
                <defs>
                    <linearGradient id="sf-grad" x1="4" y1="4" x2="36" y2="36">
                        <stop stopColor="#EF4444" />
                        <stop offset="1" stopColor="#B91C1C" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        name: 'Atlas Immobilien',
        logo: (
            <svg viewBox="0 0 110 40" className="h-8 w-auto" fill="none">
                <circle cx="20" cy="20" r="16" stroke="url(#ai-grad)" strokeWidth="2" />
                <ellipse cx="20" cy="20" rx="16" ry="8" stroke="url(#ai-grad)" strokeWidth="1.5" />
                <ellipse cx="20" cy="20" rx="8" ry="16" stroke="url(#ai-grad)" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="3" fill="url(#ai-grad2)" />
                <text x="42" y="26" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui">Atlas</text>
                <defs>
                    <linearGradient id="ai-grad" x1="4" y1="4" x2="36" y2="36">
                        <stop stopColor="#6366F1" />
                        <stop offset="1" stopColor="#4338CA" />
                    </linearGradient>
                    <linearGradient id="ai-grad2" x1="17" y1="17" x2="23" y2="23">
                        <stop stopColor="#818CF8" />
                        <stop offset="1" stopColor="#4F46E5" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
];

function LogoItem({ name, logo }: { name: string; logo: ReactNode }) {
    return (
        <div
            className="flex-shrink-0 flex items-center justify-center px-10 py-4 group cursor-default"
            title={name}
        >
            <div className="flex items-center transition-all duration-300 group-hover:scale-105 text-gray-500 group-hover:text-gray-400">
                {logo}
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
                    {LOGOS.map((item, index) => (
                        <LogoItem key={`first-${index}`} name={item.name} logo={item.logo} />
                    ))}
                    {/* Second set for seamless loop */}
                    {LOGOS.map((item, index) => (
                        <LogoItem key={`second-${index}`} name={item.name} logo={item.logo} />
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
