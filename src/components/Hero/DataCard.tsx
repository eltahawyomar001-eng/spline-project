import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export interface DataCardData {
  id: string;
  title: string;
  status?: string;
  statusType?: 'success' | 'warning' | 'info' | 'error';
  metrics: {
    label: string;
    value: string;
    status?: 'positive' | 'warning' | 'neutral' | 'default';
  }[];
}

interface DataCardProps {
  data: DataCardData | null;
  position: { x: number; y: number };
  isVisible: boolean;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    filter: 'blur(5px)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

const metricVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 50, startDelay: number = 200) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay]);

  return displayText;
}

// Animated counter for numeric values
function AnimatedValue({ value, status }: { value: string; status?: string }) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timeout);
  }, [value]);

  const getStatusClass = () => {
    switch (status) {
      case 'positive':
        return 'text-emerald-400';
      case 'warning':
        return 'text-amber-400';
      case 'neutral':
        return 'text-blue-400';
      default:
        return 'text-gray-200';
    }
  };

  return (
    <span className={`font-mono font-medium ${getStatusClass()} ${isAnimating ? 'animate-pulse' : ''}`}>
      {value}
    </span>
  );
}

// Status badge component
function StatusBadge({ status, type }: { status: string; type?: string }) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'warning':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'info':
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider border ${getTypeStyles()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {status}
    </div>
  );
}

// Mini sparkline visualization
function MiniSparkline() {
  return (
    <div className="flex items-end gap-0.5 h-3">
      {[40, 65, 45, 80, 55, 90, 70, 85].map((height, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-cyan-500/50 to-cyan-400 rounded-sm"
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export function DataCard({ data, position, isVisible }: DataCardProps) {
  const titleText = useTypewriter(data?.title || '', 40, 100);

  if (!data) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="data-card-enhanced"
          style={{
            left: position.x,
            top: position.y,
          }}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Glowing border effect */}
          <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-cyan-500/30 via-blue-500/10 to-transparent opacity-50" />

          {/* Inner content */}
          <div className="relative bg-slate-950/95 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            {/* Top accent line */}
            <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    {titleText}
                    <span className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5 animate-pulse" />
                  </h4>
                </div>
                {data.status && (
                  <StatusBadge status={data.status} type={data.statusType} />
                )}
              </div>
              <MiniSparkline />
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 mb-3" />

            {/* Metrics */}
            <div className="space-y-2">
              {data.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="flex justify-between items-center py-1"
                  variants={metricVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <span className="text-xs text-gray-500 font-medium">{metric.label}</span>
                  <AnimatedValue value={metric.value} status={metric.status} />
                </motion.div>
              ))}
            </div>

            {/* Bottom stats bar */}
            <div className="mt-4 pt-3 border-t border-gray-800/50">
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                <span>Letzte Aktualisierung: <span className="text-gray-400">Jetzt</span></span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400">SYNC</span>
                </span>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-cyan-500/40 rounded-tl" />
            <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-cyan-500/40 rounded-tr" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-cyan-500/40 rounded-bl" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-cyan-500/40 rounded-br" />
          </div>

          {/* Bottom glow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-cyan-500/20 blur-2xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DataCard;
