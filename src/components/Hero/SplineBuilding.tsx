import { useState, useCallback } from 'react';
import DataCard, { DataCardData } from './DataCard';

// Data card content for each hotspot - German FM Services
const HOTSPOT_DATA: Record<string, DataCardData> = {
  roof: {
    id: 'roof',
    title: 'Technische Gebäudeverwaltung',
    metrics: [
      { label: 'Wartungen', value: '98%', status: 'positive' },
      { label: 'Reaktionszeit', value: '<2h', status: 'neutral' },
      { label: 'Prüfungen', value: 'Aktuell', status: 'positive' },
    ],
  },
  windows: {
    id: 'windows',
    title: 'Reinigung & Hygiene',
    metrics: [
      { label: 'Qualitätsindex', value: '97%', status: 'positive' },
      { label: 'Reinigungszyklen', value: 'Planmäß.', status: 'neutral' },
      { label: 'Beschwerden', value: '0', status: 'positive' },
    ],
  },
  parking: {
    id: 'parking',
    title: 'Arealpflege & Winterdienst',
    metrics: [
      { label: 'Verkehrssicher', value: '100%', status: 'positive' },
      { label: 'Grünpflege', value: 'Optimal', status: 'positive' },
      { label: 'Einsätze/Woche', value: '12', status: 'neutral' },
    ],
  },
};

const HOTSPOT_POSITIONS = {
  roof: { x: '50%', y: '10%', cardX: 260, cardY: 20 },
  windows: { x: '55%', y: '45%', cardX: 290, cardY: 160 },
  parking: { x: '50%', y: '85%', cardX: 20, cardY: 340 },
};

// ==============================================
// SKETCHFAB MODEL CONFIGURATION
// Using: Atlanta Corporate Office Building
// Model ID: d96380fb001345cca9a9be121f3e43d5
// 3K+ likes, 122K+ views - professional glass facade
// ==============================================
const SKETCHFAB_MODEL_ID = 'd96380fb001345cca9a9be121f3e43d5';

// Interactive overlay hotspots
function Hotspots({ activeHotspot, onHotspotClick }: {
  activeHotspot: string | null;
  onHotspotClick: (id: string) => void;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Roof hotspot */}
      <button
        className={`absolute pointer-events-auto cursor-pointer transition-all duration-300 ${activeHotspot === 'roof' ? 'scale-125' : 'hover:scale-110'
          }`}
        style={{ left: '50%', top: '18%', transform: 'translate(-50%, -50%)' }}
        onClick={() => onHotspotClick('roof')}
        aria-label="Technische Gebäudeverwaltung"
      >
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${activeHotspot === 'roof'
            ? 'bg-cyan-500/60 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)]'
            : 'bg-blue-500/40 border-blue-400/70 hover:bg-blue-500/60 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
          }`}>
          <div className={`w-2.5 h-2.5 rounded-full ${activeHotspot === 'roof' ? 'bg-white' : 'bg-cyan-400 animate-pulse'}`} />
        </div>
      </button>

      {/* Windows hotspot */}
      <button
        className={`absolute pointer-events-auto cursor-pointer transition-all duration-300 ${activeHotspot === 'windows' ? 'scale-125' : 'hover:scale-110'
          }`}
        style={{ left: '58%', top: '48%', transform: 'translate(-50%, -50%)' }}
        onClick={() => onHotspotClick('windows')}
        aria-label="Reinigung & Hygiene"
      >
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${activeHotspot === 'windows'
            ? 'bg-cyan-500/60 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)]'
            : 'bg-blue-500/40 border-blue-400/70 hover:bg-blue-500/60 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
          }`}>
          <div className={`w-2.5 h-2.5 rounded-full ${activeHotspot === 'windows' ? 'bg-white' : 'bg-cyan-400 animate-pulse'}`} />
        </div>
      </button>

      {/* Parking hotspot */}
      <button
        className={`absolute pointer-events-auto cursor-pointer transition-all duration-300 ${activeHotspot === 'parking' ? 'scale-125' : 'hover:scale-110'
          }`}
        style={{ left: '42%', top: '78%', transform: 'translate(-50%, -50%)' }}
        onClick={() => onHotspotClick('parking')}
        aria-label="Arealpflege & Winterdienst"
      >
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${activeHotspot === 'parking'
            ? 'bg-emerald-500/60 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.9)]'
            : 'bg-emerald-500/40 border-emerald-400/70 hover:bg-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
          }`}>
          <div className={`w-2.5 h-2.5 rounded-full ${activeHotspot === 'parking' ? 'bg-white' : 'bg-emerald-400 animate-pulse'}`} />
        </div>
      </button>
    </div>
  );
}

export function SplineBuilding() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleHotspotClick = useCallback((id: string) => {
    setActiveHotspot(prev => prev === id ? null : id);
  }, []);

  const getCardPosition = () => {
    if (!activeHotspot) return { x: 0, y: 0 };
    const pos = HOTSPOT_POSITIONS[activeHotspot as keyof typeof HOTSPOT_POSITIONS];
    return { x: pos?.cardX || 0, y: pos?.cardY || 0 };
  };

  // Build Sketchfab embed URL with customization
  const sketchfabUrl = `https://sketchfab.com/models/${SKETCHFAB_MODEL_ID}/embed?autostart=1&preload=1&ui_theme=dark&transparent=1&ui_infos=0&ui_controls=1&ui_stop=0&ui_inspector=0&ui_watermark=0&ui_watermark_link=0&ui_hint=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&dnt=1`;

  return (
    <div className="spline-container relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-30">
          <div className="text-center">
            <div className="w-16 h-16 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-cyan-400 text-sm font-medium">Premium 3D Model wird geladen...</p>
            <p className="text-gray-500 text-xs mt-2">Hochauflösende Ansicht</p>
          </div>
        </div>
      )}

      {/* Sketchfab Embed - Professional 3D Building Model */}
      <div className="absolute inset-0 z-10">
        <iframe
          title="Premium Office Building 3D Model - Falke FM"
          className="w-full h-full"
          style={{ border: 'none' }}
          src={sketchfabUrl}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Dark gradient overlay for brand integration */}
      <div
        className="absolute inset-0 pointer-events-none z-15"
        style={{
          background: `
            linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 25%),
            linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, transparent 20%),
            linear-gradient(to right, rgba(5,5,5,0.4) 0%, transparent 15%),
            linear-gradient(to left, rgba(5,5,5,0.4) 0%, transparent 15%)
          `
        }}
      />

      {/* Interactive Hotspots */}
      <Hotspots activeHotspot={activeHotspot} onHotspotClick={handleHotspotClick} />

      {/* Data Card */}
      <DataCard
        data={activeHotspot ? HOTSPOT_DATA[activeHotspot] : null}
        position={getCardPosition()}
        isVisible={!!activeHotspot}
      />

      {/* HUD Overlay - Top Left */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-400/90 space-y-1 pointer-events-none z-20 bg-slate-950/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="font-semibold">INTERACTIVE 3D</span>
        </div>
        <div className="text-gray-400">Modell: PREMIUM OFFICE</div>
        <div className="text-gray-400">Qualität: HIGH-FIDELITY</div>
      </div>

      {/* HUD Overlay - Top Right */}
      <div className="absolute top-4 right-4 font-mono text-[10px] text-cyan-400/90 text-right space-y-1 pointer-events-none z-20 bg-slate-950/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/20">
        <div>{new Date().toLocaleDateString('de-DE')}</div>
        <div>{new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</div>
        <div className="flex items-center justify-end gap-2">
          <span className="text-emerald-400">LIVE</span>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-10 h-10 border-l-2 border-t-2 border-cyan-500/70 pointer-events-none z-20 rounded-tl-sm" />
      <div className="absolute top-3 right-3 w-10 h-10 border-r-2 border-t-2 border-cyan-500/70 pointer-events-none z-20 rounded-tr-sm" />
      <div className="absolute bottom-3 left-3 w-10 h-10 border-l-2 border-b-2 border-cyan-500/70 pointer-events-none z-20 rounded-bl-sm" />
      <div className="absolute bottom-3 right-3 w-10 h-10 border-r-2 border-b-2 border-cyan-500/70 pointer-events-none z-20 rounded-br-sm" />

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 text-gray-300 text-xs bg-slate-950/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-cyan-500/30 pointer-events-none z-20 shadow-lg">
        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <span>Ziehen zum Drehen • Scrollen zum Zoomen • Punkte klicken für Details</span>
      </div>
    </div>
  );
}

export default SplineBuilding;
