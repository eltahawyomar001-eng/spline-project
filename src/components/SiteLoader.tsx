import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SiteLoaderProps {
    onLoadComplete: () => void;
}

// Loading steps for the premium boot sequence
const LOADING_STEPS = [
    { id: 'init', label: 'System initialisieren...', duration: 500 },
    { id: 'auth', label: 'Authentifizierung...', duration: 400 },
    { id: 'assets', label: 'Assets laden...', duration: 600 },
    { id: 'model', label: '3D-Modell vorbereiten...', duration: 700 },
    { id: 'data', label: 'Gebäudedaten synchronisieren...', duration: 500 },
    { id: 'ready', label: 'Bereit', duration: 300 },
];

export const SiteLoader = memo(function SiteLoader({ onLoadComplete }: SiteLoaderProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        let stepIndex = 0;
        let progressValue = 0;

        const runSequence = async () => {
            for (const step of LOADING_STEPS) {
                setCurrentStep(stepIndex);

                // Animate progress during this step
                const progressPerStep = 100 / LOADING_STEPS.length;
                const targetProgress = progressValue + progressPerStep;

                // Smooth progress animation
                const startProgress = progressValue;
                const steps = 10;
                for (let i = 0; i <= steps; i++) {
                    await new Promise(r => setTimeout(r, step.duration / steps));
                    setProgress(startProgress + (targetProgress - startProgress) * (i / steps));
                }

                progressValue = targetProgress;
                stepIndex++;
            }

            // Final delay before exit animation
            await new Promise(r => setTimeout(r, 200));
            setIsExiting(true);

            // Wait for exit animation
            await new Promise(r => setTimeout(r, 600));
            onLoadComplete();
        };

        runSequence();
    }, [onLoadComplete]);

    return (
        <AnimatePresence>
            {!isExiting ? (
                <motion.div
                    className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.5, ease: 'easeOut' }
                    }}
                >
                    {/* Background grid */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
              `,
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Central loader */}
                    <div className="relative z-10 w-full max-w-lg px-8">
                        {/* Logo - Using actual Falke logo */}
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="inline-flex flex-col items-center gap-4 mb-4">
                                <img
                                    src="/Falke_Blau-frei.png"
                                    alt="Falke FM"
                                    className="h-16 w-auto brightness-0 invert"
                                />
                                <p className="text-xs text-cyan-400 font-mono tracking-wider">INFRASTRUCTURE INTELLIGENCE</p>
                            </div>
                        </motion.div>

                        {/* Terminal-style loading box */}
                        <motion.div
                            className="bg-slate-900/80 border border-cyan-500/30 rounded-xl overflow-hidden backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {/* Terminal header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50 bg-slate-800/50">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs font-mono text-gray-500 ml-2">falke-fm-platform</span>
                            </div>

                            {/* Loading steps */}
                            <div className="p-4 font-mono text-sm space-y-2">
                                {LOADING_STEPS.map((step, index) => (
                                    <motion.div
                                        key={step.id}
                                        className={`flex items-center gap-3 ${index < currentStep
                                            ? 'text-gray-500'
                                            : index === currentStep
                                                ? 'text-cyan-400'
                                                : 'text-gray-700'
                                            }`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{
                                            opacity: index <= currentStep ? 1 : 0.3,
                                            x: 0
                                        }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <span className="w-5 text-center">
                                            {index < currentStep ? (
                                                <span className="text-emerald-400">✓</span>
                                            ) : index === currentStep ? (
                                                <span className="animate-pulse">●</span>
                                            ) : (
                                                <span className="text-gray-700">○</span>
                                            )}
                                        </span>
                                        <span>{step.label}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Progress bar */}
                            <div className="px-4 pb-4">
                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400"
                                        style={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-xs font-mono">
                                    <span className="text-gray-500">Fortschritt</span>
                                    <span className="text-cyan-400">{Math.round(progress)}%</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom text */}
                        <motion.p
                            className="text-center text-gray-600 text-xs mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Infrastrukturelles Facility Management der nächsten Generation
                        </motion.p>
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-cyan-500/30 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-cyan-500/30 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-cyan-500/30 rounded-br-lg" />

                    {/* Ambient glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
});

export default SiteLoader;
