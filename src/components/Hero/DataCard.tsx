import { motion, AnimatePresence } from 'framer-motion';

export interface DataCardData {
  id: string;
  title: string;
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
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
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
    y: -5,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

const metricVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2,
    },
  }),
};

export function DataCard({ data, position, isVisible }: DataCardProps) {
  if (!data) return null;

  const getStatusClass = (status?: string) => {
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
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="data-card"
          style={{
            left: position.x,
            top: position.y,
          }}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Accent line */}
          <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          
          {/* Title */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h4 className="data-card-title">{data.title}</h4>
          </div>

          {/* Metrics */}
          <div className="space-y-0.5">
            {data.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="data-card-metric"
                variants={metricVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <span className="data-card-label">{metric.label}</span>
                <span className={`data-card-value font-mono ${getStatusClass(metric.status)}`}>
                  {metric.value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom glow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-blue-500/20 blur-xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DataCard;
