import { Suspense, useState, useCallback, lazy, useEffect, useRef, memo } from 'react';
import DataCard, { DataCardData } from './DataCard';

// Lazy load the Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));

// ==============================================
// SPLINE SCENE CONFIGURATION
// ==============================================
const SPLINE_URL: string = ''; // Add your Spline URL here
// ==============================================

// Data card content for each hotspot
const HOTSPOT_DATA: Record<string, DataCardData> = {
  roof: {
    id: 'roof',
    title: 'Roof Systems',
    metrics: [
      { label: 'Load', value: '78%', status: 'neutral' },
      { label: 'Anomalies', value: '2', status: 'warning' },
      { label: 'Last Audit', value: '14d', status: 'default' },
    ],
  },
  windows: {
    id: 'windows',
    title: 'Facade & Glazing',
    metrics: [
      { label: 'Thermal Loss', value: '-12%', status: 'positive' },
      { label: 'Alerts', value: '1', status: 'warning' },
      { label: 'Inspection', value: 'Q1', status: 'default' },
    ],
  },
  parking: {
    id: 'parking',
    title: 'Parking & Access',
    metrics: [
      { label: 'Occupancy', value: '64%', status: 'neutral' },
      { label: 'Cameras', value: 'Online', status: 'positive' },
      { label: 'Incidents', value: '0', status: 'positive' },
    ],
  },
};

const HOTSPOT_POSITIONS = {
  roof: { x: '50%', y: '12%', cardX: 260, cardY: 20 },
  windows: { x: '60%', y: '45%', cardX: 290, cardY: 160 },
  parking: { x: '40%', y: '82%', cardX: 20, cardY: 340 },
};

// Impressive 3D Building with smooth rotation
const Building3D = memo(function Building3D({ 
  activeHotspot, 
  onHotspotHover, 
  onHotspotClick 
}: {
  activeHotspot: string | null;
  onHotspotHover: (id: string | null) => void;
  onHotspotClick: (id: string) => void;
}) {
  const [rotation, setRotation] = useState({ x: 12, y: -20 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const autoRotate = useRef<number | null>(null);

  // Auto-rotate when not interacting
  useEffect(() => {
    const animate = () => {
      if (!isDragging.current) {
        setRotation(prev => ({
          ...prev,
          y: prev.y + 0.15,
        }));
      }
      autoRotate.current = requestAnimationFrame(animate);
    };
    autoRotate.current = requestAnimationFrame(animate);
    return () => {
      if (autoRotate.current) cancelAnimationFrame(autoRotate.current);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastPos.current.x;
    const deltaY = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    
    setRotation(prev => ({
      x: Math.max(-40, Math.min(40, prev.x - deltaY * 0.4)),
      y: prev.y + deltaX * 0.4,
    }));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px', cursor: isDragging.current ? 'grabbing' : 'grab' }}
    >
      {/* Ambient glow */}
      <div 
        className="absolute w-64 h-64 rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* 3D Building */}
      <div
        className="relative"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ROOF - Premium glass look */}
        <div
          className={`absolute cursor-pointer ${
            activeHotspot === 'roof' 
              ? 'bg-gradient-to-br from-blue-400/60 to-cyan-400/40' 
              : 'bg-gradient-to-br from-slate-600/70 to-slate-700/60'
          }`}
          style={{
            width: '160px',
            height: '80px',
            top: '-40px',
            left: '0px',
            transform: 'rotateX(90deg) translateZ(0px)',
            border: activeHotspot === 'roof' ? '2px solid rgba(96,165,250,0.8)' : '1px solid rgba(148,163,184,0.3)',
            boxShadow: activeHotspot === 'roof' ? '0 0 30px rgba(59,130,246,0.5)' : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => onHotspotHover('roof')}
          onMouseLeave={() => onHotspotHover(null)}
          onClick={() => onHotspotClick('roof')}
        >
          {/* Roof details */}
          <div className="absolute inset-2 border border-white/10 rounded-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-cyan-500/30 rounded-full" />
        </div>

        {/* FRONT FACE - Windows */}
        <div
          className={`absolute cursor-pointer backdrop-blur-sm ${
            activeHotspot === 'windows' 
              ? 'bg-gradient-to-b from-blue-900/70 to-slate-900/80' 
              : 'bg-gradient-to-b from-slate-800/90 to-slate-900/95'
          }`}
          style={{
            width: '160px',
            height: '240px',
            transform: 'translateZ(40px)',
            border: activeHotspot === 'windows' ? '1px solid rgba(96,165,250,0.6)' : '1px solid rgba(100,116,139,0.4)',
            boxShadow: activeHotspot === 'windows' 
              ? 'inset 0 0 40px rgba(59,130,246,0.2), 0 0 20px rgba(59,130,246,0.3)' 
              : 'inset 0 0 30px rgba(0,0,0,0.5)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => onHotspotHover('windows')}
          onMouseLeave={() => onHotspotHover(null)}
          onClick={() => onHotspotClick('windows')}
        >
          {/* Window grid */}
          <div className="grid grid-cols-4 gap-1.5 p-3 h-full">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`rounded-sm transition-all duration-300 ${
                  activeHotspot === 'windows' 
                    ? 'bg-gradient-to-b from-cyan-400/70 to-blue-500/50 shadow-lg shadow-cyan-500/20' 
                    : 'bg-gradient-to-b from-blue-500/30 to-blue-600/20'
                }`}
                style={{
                  animationDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
          
          {/* Vertical glass lines */}
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* RIGHT FACE */}
        <div
          className="absolute bg-gradient-to-b from-slate-700/80 to-slate-800/90"
          style={{
            width: '80px',
            height: '240px',
            transform: 'rotateY(90deg) translateZ(80px)',
            border: '1px solid rgba(100,116,139,0.3)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4)',
          }}
        >
          <div className="grid grid-cols-2 gap-1.5 p-2 h-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-blue-500/15 rounded-sm" />
            ))}
          </div>
        </div>

        {/* LEFT FACE */}
        <div
          className="absolute bg-gradient-to-b from-slate-800/85 to-slate-900/95"
          style={{
            width: '80px',
            height: '240px',
            transform: 'rotateY(-90deg) translateZ(0px)',
            left: '0px',
            border: '1px solid rgba(100,116,139,0.25)',
            boxShadow: 'inset 0 0 25px rgba(0,0,0,0.5)',
          }}
        >
          <div className="grid grid-cols-2 gap-1.5 p-2 h-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-blue-500/10 rounded-sm" />
            ))}
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute bg-slate-950/95"
          style={{
            width: '160px',
            height: '240px',
            transform: 'translateZ(-40px)',
            border: '1px solid rgba(51,65,85,0.3)',
          }}
        />

        {/* PARKING / BASE */}
        <div
          className={`absolute cursor-pointer ${
            activeHotspot === 'parking' 
              ? 'bg-gradient-to-br from-blue-600/50 to-slate-800/60' 
              : 'bg-gradient-to-br from-slate-800/80 to-slate-900/90'
          }`}
          style={{
            width: '200px',
            height: '100px',
            top: '240px',
            left: '-20px',
            transform: 'rotateX(90deg) translateZ(-100px)',
            border: activeHotspot === 'parking' ? '1px solid rgba(96,165,250,0.5)' : '1px solid rgba(100,116,139,0.3)',
            boxShadow: activeHotspot === 'parking' ? '0 0 25px rgba(59,130,246,0.4)' : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => onHotspotHover('parking')}
          onMouseLeave={() => onHotspotHover(null)}
          onClick={() => onHotspotClick('parking')}
        >
          {/* Parking grid lines */}
          <div className="absolute inset-3 flex justify-between">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`w-px h-full ${activeHotspot === 'parking' ? 'bg-cyan-400/50' : 'bg-slate-600/40'}`}
              />
            ))}
          </div>
          {/* Cars */}
          <div className="absolute bottom-3 left-4 right-4 flex justify-around">
            {[true, true, false, true, false].map((occupied, i) => (
              <div
                key={i}
                className={`w-5 h-2.5 rounded-sm transition-colors duration-300 ${
                  occupied 
                    ? activeHotspot === 'parking' ? 'bg-emerald-400/80 shadow-lg shadow-emerald-500/30' : 'bg-slate-500/60'
                    : 'border border-dashed border-slate-600/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Floor glow/reflection */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '220px',
            height: '120px',
            top: '260px',
            left: '-30px',
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, transparent 70%)',
            transform: 'rotateX(90deg) translateZ(-120px)',
            filter: 'blur(10px)',
          }}
        />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-500 text-xs">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
        <span>Drag to rotate • Click areas for details</span>
      </div>
    </div>
  );
});

// Hotspot component for Spline scenes
function Hotspot({ id, position, onHover, onClick, isActive }: {
  id: string;
  position: { x: string; y: string };
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  isActive: boolean;
}) {
  return (
    <div
      className="absolute cursor-pointer"
      style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(id)}
    >
      <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
        isActive ? 'bg-blue-500/50 border-blue-400 scale-125' : 'bg-blue-500/20 border-blue-500/50'
      }`} />
    </div>
  );
}

// Loading component
function SplineLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading 3D Model...</p>
      </div>
    </div>
  );
}

export function SplineBuilding() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [splineError, setSplineError] = useState(false);
  const [useSpline, setUseSpline] = useState(false);

  useEffect(() => {
    setUseSpline(!!SPLINE_URL && SPLINE_URL.length > 0);
  }, []);

  const handleHotspotHover = useCallback((id: string | null) => {
    setActiveHotspot(id);
  }, []);

  const handleHotspotClick = useCallback((id: string) => {
    setActiveHotspot(prev => prev === id ? null : id);
  }, []);

  const getCardPosition = () => {
    if (!activeHotspot) return { x: 0, y: 0 };
    const pos = HOTSPOT_POSITIONS[activeHotspot as keyof typeof HOTSPOT_POSITIONS];
    return { x: pos?.cardX || 0, y: pos?.cardY || 0 };
  };

  return (
    <div className="spline-container">
      {useSpline && !splineError ? (
        <Suspense fallback={<SplineLoader />}>
          <Spline
            scene={SPLINE_URL}
            onError={() => setSplineError(true)}
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute inset-0 pointer-events-none">
            {Object.entries(HOTSPOT_POSITIONS).map(([id, position]) => (
              <div key={id} className="pointer-events-auto">
                <Hotspot
                  id={id}
                  position={position}
                  onHover={handleHotspotHover}
                  onClick={handleHotspotClick}
                  isActive={activeHotspot === id}
                />
              </div>
            ))}
          </div>
        </Suspense>
      ) : (
        <Building3D
          activeHotspot={activeHotspot}
          onHotspotHover={handleHotspotHover}
          onHotspotClick={handleHotspotClick}
        />
      )}

      {/* Data Card */}
      <DataCard
        data={activeHotspot ? HOTSPOT_DATA[activeHotspot] : null}
        position={getCardPosition()}
        isVisible={!!activeHotspot}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-white/10" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-white/10" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-white/10" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-white/10" />
    </div>
  );
}

export default SplineBuilding;
