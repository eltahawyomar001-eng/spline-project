import { memo, useEffect } from 'react';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const LegalModal = memo(function LegalModal({
    isOpen,
    onClose,
    title,
    children
}: LegalModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-dark-950/90 backdrop-blur-md"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl 
                   bg-dark-900/95 border border-white/10 shadow-2xl
                   animate-modal-in"
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 
                        border-b border-white/5 bg-dark-900/95 backdrop-blur-sm">
                    <h2 id="modal-title" className="text-xl font-bold text-white">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 
                       transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Schließen"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
                    <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
});

// Impressum Content
export const ImpressumContent = memo(function ImpressumContent() {
    return (
        <>
            <div>
                <h3 className="text-white font-semibold mb-2">Angaben gemäß § 5 TMG</h3>
                <p>Falke Facility Management GmbH<br />
                    Musterstraße 123<br />
                    10115 Berlin</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">Vertreten durch</h3>
                <p>Geschäftsführer: Max Mustermann</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">Kontakt</h3>
                <p>Telefon: +49 30 123 456 789<br />
                    E-Mail: info@falke-fm.de</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">Registereintrag</h3>
                <p>Eintragung im Handelsregister<br />
                    Registergericht: Amtsgericht Berlin-Charlottenburg<br />
                    Registernummer: HRB 123456</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">Umsatzsteuer-ID</h3>
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
                    DE 123 456 789</p>
            </div>
        </>
    );
});

// Datenschutz Content
export const DatenschutzContent = memo(function DatenschutzContent() {
    return (
        <>
            <div>
                <h3 className="text-white font-semibold mb-2">1. Datenschutz auf einen Blick</h3>
                <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">2. Verantwortliche Stelle</h3>
                <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                    Falke Facility Management GmbH<br />
                    Musterstraße 123<br />
                    10115 Berlin<br /><br />
                    Telefon: +49 30 123 456 789<br />
                    E-Mail: datenschutz@falke-fm.de</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">3. Datenerfassung auf dieser Website</h3>
                <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">4. Ihre Rechte</h3>
                <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.</p>
            </div>
        </>
    );
});

// AGB Content
export const AGBContent = memo(function AGBContent() {
    return (
        <>
            <div>
                <h3 className="text-white font-semibold mb-2">§ 1 Geltungsbereich</h3>
                <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der Falke Facility Management GmbH und ihren Kunden über Facility-Management-Dienstleistungen.</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">§ 2 Leistungsumfang</h3>
                <p>Der Umfang der zu erbringenden Leistungen ergibt sich aus dem jeweiligen Angebot bzw. dem Vertrag. Änderungen des Leistungsumfangs bedürfen der Schriftform.</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">§ 3 Vergütung</h3>
                <p>Die Vergütung richtet sich nach dem jeweiligen Vertrag. Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer.</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">§ 4 Haftung</h3>
                <p>Die Haftung für leichte Fahrlässigkeit wird ausgeschlossen, soweit keine wesentlichen Vertragspflichten, Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit betroffen sind.</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">§ 5 Schlussbestimmungen</h3>
                <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Berlin, soweit gesetzlich zulässig.</p>
            </div>
        </>
    );
});

export default LegalModal;
