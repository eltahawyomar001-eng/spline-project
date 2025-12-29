import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SiteLoaderProps {
    onLoadComplete: () => void;
}

// Loading steps - minimal terminal style
const LOADING_STEPS = [
    { id: 'init', label: 'SYSTEM INITIALISIEREN', duration: 400 },
    { id: 'auth', label: 'AUTHENTIFIZIERUNG', duration: 350 },
    { id: 'assets', label: 'ASSETS LADEN', duration: 500 },
    { id: 'model', label: '3D-MODELL LADEN', duration: 600 },
    { id: 'data', label: 'DATEN SYNCHRONISIEREN', duration: 400 },
    { id: 'ready', label: 'BEREIT', duration: 250 },
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

                const progressPerStep = 100 / LOADING_STEPS.length;
                const targetProgress = progressValue + progressPerStep;

                const startProgress = progressValue;
                const steps = 10;
                for (let i = 0; i <= steps; i++) {
                    await new Promise(r => setTimeout(r, step.duration / steps));
                    setProgress(startProgress + (targetProgress - startProgress) * (i / steps));
                }

                progressValue = targetProgress;
                stepIndex++;
            }

            await new Promise(r => setTimeout(r, 150));
            setIsExiting(true);

            await new Promise(r => setTimeout(r, 400));
            onLoadComplete();
        };

        runSequence();
    }, [onLoadComplete]);

    return (
        <AnimatePresence>
            {!isExiting ? (
                <motion.div
                    className="fixed inset-0 z-[100] bg-[#0a0a0c] flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.4, ease: 'easeOut' }
                    }}
                >
                    {/* Subtle grid */}
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                        }}
                    />

                    {/* Loader content */}
                    <div className="relative z-10 w-full max-w-md px-8">
                        {/* Logo */}
                        <motion.div
                            className="text-center mb-10"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                        >
                            <div className="inline-flex flex-col items-center gap-3">
                                <img
                                    src="/Falke_Blau-frei.png"
                                    alt="Falke FM"
                                    className="h-14 w-auto brightness-0 invert opacity-90"
                                />
                                <p className="text-[10px] text-gray-500 font-mono tracking-[0.3em]">INFRASTRUCTURE INTELLIGENCE</p>
                            </div>
                        </motion.div>

                        {/* Terminal box */}
                        <motion.div
                            className="bg-[#0f0f12] border border-white/5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                </div>
                                <span className="text-[10px] font-mono text-gray-600 ml-2">falke-fm-platform</span>
                            </div>

                            {/* Steps */}
                            <div className="p-4 font-mono text-[11px] space-y-1.5">
                                {LOADING_STEPS.map((step, index) => (
                                    <motion.div
                                        key={step.id}
                                        className={`flex items-center gap-2.5 ${index < currentStep
                                                ? 'text-gray-600'
                                                : index === currentStep
                                                    ? 'text-gray-300'
                                                    : 'text-gray-700'
                                            }`}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: index <= currentStep ? 1 : 0.3,
                                        }}
                                        transition={{ delay: 0.05 * index }}
                                    >
                                        <span className="w-4">
                                            {index < currentStep ? (
                                                <span className="text-gray-500">✓</span>
                                            ) : index === currentStep ? (
                                                <span className="animate-pulse">▸</span>
                                            ) : (
                                                <span className="text-gray-700">○</span>
                                            )}
                                        </span>
                                        <span>{step.label}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Progress */}
                            <div className="px-4 pb-4">
                                <div className="h-px bg-white/5 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white/20"
                                        style={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] font-mono">
                                    <span className="text-gray-600">PROGRESS</span>
                                    <span className="text-gray-500">{Math.round(progress)}%</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Footer */}
                        <motion.p
                            className="text-center text-gray-700 text-[10px] mt-5 font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Infrastrukturelles Facility Management
                        </motion.p>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
});

export default SiteLoader;
