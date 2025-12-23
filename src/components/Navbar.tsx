import { memo, useState, useEffect } from 'react';

export const Navbar = memo(function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/5'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center group">
                        <img
                            src="/Falke_Blau-frei.png"
                            alt="Falke FM"
                            className="h-8 sm:h-10 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                    </a>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="#leistungen"
                            className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200"
                        >
                            Leistungen
                        </a>
                        <a
                            href="#ueber-uns"
                            className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200"
                        >
                            Über uns
                        </a>
                        <a
                            href="#kontakt"
                            className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200"
                        >
                            Kontakt
                        </a>
                    </div>

                    {/* CTA Button */}
                    <a
                        href="#kontakt"
                        className="relative inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 
                       text-sm font-medium text-white bg-accent-primary rounded-lg
                       overflow-hidden transition-all duration-300 ease-out
                       hover:shadow-glow-md hover:-translate-y-0.5"
                    >
                        <span className="relative z-10">Angebot anfordern</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 hover:opacity-100 transition-opacity" />
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Menü öffnen"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
});

export default Navbar;
