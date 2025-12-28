import { memo, useState, useEffect } from 'react';

export const Navbar = memo(function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking a link
    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen
                ? 'bg-dark-950/95 backdrop-blur-xl border-b border-white/5'
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

                    {/* Navigation Links - Desktop */}
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

                    {/* CTA Button - Desktop */}
                    <a
                        href="#kontakt"
                        className="hidden md:inline-flex relative items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 
                       text-sm font-medium text-white bg-accent-primary rounded-lg
                       overflow-hidden transition-all duration-300 ease-out
                       hover:shadow-glow-md hover:-translate-y-0.5"
                    >
                        <span className="relative z-10">Angebot anfordern</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 hover:opacity-100 transition-opacity" />
                    </a>

                    {/* Mobile Menu Button - iOS compatible */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            setMobileMenuOpen(!mobileMenuOpen);
                        }}
                        className="md:hidden p-3 text-gray-400 hover:text-white transition-colors cursor-pointer touch-manipulation"
                        aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
                        aria-expanded={mobileMenuOpen}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Panel - Enhanced glassmorphism */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="py-4 space-y-1 border-t border-white/10 bg-dark-950/60 backdrop-blur-xl -mx-4 px-4 sm:-mx-6 sm:px-6">
                        <a
                            href="#leistungen"
                            onClick={handleLinkClick}
                            className="flex items-center px-4 py-3 min-h-[48px] text-gray-200 hover:text-white hover:bg-white/10 rounded-xl text-base font-medium transition-all duration-200"
                        >
                            Leistungen
                        </a>
                        <a
                            href="#ueber-uns"
                            onClick={handleLinkClick}
                            className="flex items-center px-4 py-3 min-h-[48px] text-gray-200 hover:text-white hover:bg-white/10 rounded-xl text-base font-medium transition-all duration-200"
                        >
                            Über uns
                        </a>
                        <a
                            href="#kontakt"
                            onClick={handleLinkClick}
                            className="flex items-center px-4 py-3 min-h-[48px] text-gray-200 hover:text-white hover:bg-white/10 rounded-xl text-base font-medium transition-all duration-200"
                        >
                            Kontakt
                        </a>
                        {/* CTA Button - Mobile */}
                        <a
                            href="#kontakt"
                            onClick={handleLinkClick}
                            className="flex items-center justify-center mx-4 mt-4 min-h-[52px] text-sm font-semibold text-white bg-accent-primary rounded-xl transition-all duration-300 hover:shadow-glow-md active:scale-[0.98]"
                        >
                            Angebot anfordern
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
});

export default Navbar;
