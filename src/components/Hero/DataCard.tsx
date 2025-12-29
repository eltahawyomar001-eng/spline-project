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
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.15,
    },
  },
};

const metricVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: 0.03 + i * 0.03,
      duration: 0.15,
    },
  }),
};

// Value display - Bloomberg terminal style
function MetricValue({ value, status }: { value: string; status?: string }) {
  const getColor = () => {
    switch (status) {
      case 'positive':
        return 'text-emerald-400';
      case 'warning':
        return 'text-amber-400';
      case 'neutral':
        return 'text-gray-300';
      default:
        return 'text-white';
    }
  };

  return (
    <span className={`font-mono text-xs ${getColor()}`}>
      {value}
    </span>
  );
}

// Status badge - Bloomberg terminal style
function StatusBadge({ status, type }: { status: string; type?: string }) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'text-emerald-400 border-emerald-500/30';
      case 'warning':
        return 'text-amber-400 border-amber-500/30';
      case 'error':
        return 'text-red-400 border-red-500/30';
      case 'info':
      default:
        return 'text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono tracking-wider border ${getTypeStyles()}`}>
      <span className="w-1 h-1 rounded-full bg-current" />
      {status}
    </div>
  );
}

export function DataCard({ data, position, isVisible }: DataCardProps) {
  const [displayTitle, setDisplayTitle] = useState('');

  // Typewriter for title
  useEffect(() => {
    if (!data?.title) {
      setDisplayTitle('');
      return;
    }
    setDisplayTitle('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < data.title.length) {
        setDisplayTitle(data.title.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [data?.title]);

  if (!data) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="absolute z-50"
          style={{
            left: position.x,
            top: position.y,
            minWidth: 260,
            maxWidth: 300,
          }}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Bloomberg terminal style card */}
          <div className="bg-[#0f0f12]/95 backdrop-blur-sm border border-white/10 p-4">
            {/* Top border accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Header */}
            <div className="mb-3">
              <h4 className="font-mono text-[11px] font-medium text-white tracking-wide mb-1.5">
                {displayTitle}
                <span className="inline-block w-0.5 h-3 bg-white/50 ml-0.5 animate-pulse" />
              </h4>
              {data.status && (
                <StatusBadge status={data.status} type={data.statusType} />
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-3" />

            {/* Metrics table */}
            <div className="space-y-1.5">
              {data.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="flex justify-between items-center py-0.5"
                  variants={metricVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <span className="font-mono text-[10px] text-gray-500">{metric.label}</span>
                  <MetricValue value={metric.value} status={metric.status} />
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-3 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center font-mono text-[9px] text-gray-600">
                <span>AKTUALISIERT: <span className="text-gray-500">LIVE</span></span>
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span className="text-gray-500">SYNC</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DataCard;
