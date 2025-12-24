import { useState, useCallback } from 'react';
import Building3D from './Building3D';
import DataCard, { DataCardData } from './DataCard';

// Data card content for each hotspot
const HOTSPOT_DATA: Record<string, DataCardData> = {
  roof: {
    id: 'roof',
    title: 'Technische Gebäudeverwaltung',
    status: 'OPERATIONAL',
    statusType: 'success',
    metrics: [
      { label: 'System Status', value: 'OK', status: 'positive' },
      { label: 'Wartungsindex', value: '98%', status: 'positive' },
      { label: 'Nächste Prüfung', value: 'Morgen 09:00', status: 'neutral' },
      { label: 'Reaktionszeit', value: '<2h', status: 'positive' },
    ],
  },
  windows: {
    id: 'windows',
    title: 'Reinigung & Hygiene',
    status: 'ALL CLEAR',
    statusType: 'success',
    metrics: [
      { label: 'System Status', value: 'OK', status: 'positive' },
      { label: 'Qualitätsindex', value: '97%', status: 'positive' },
      { label: 'Letzte Reinigung', value: 'Heute 06:00', status: 'neutral' },
      { label: 'Beschwerden', value: '0', status: 'positive' },
    ],
  },
  parking: {
    id: 'parking',
    title: 'Arealpflege & Winterdienst',
    status: 'STANDBY',
    statusType: 'info',
    metrics: [
      { label: 'System Status', value: 'OK', status: 'positive' },
      { label: 'Verkehrssicher', value: '100%', status: 'positive' },
      { label: 'Nächster Einsatz', value: 'Bei Bedarf', status: 'neutral' },
      { label: 'Grünpflege', value: 'Optimal', status: 'positive' },
    ],
  },
};

// Card position based on active view
const CARD_POSITIONS: Record<string, { x: number; y: number }> = {
  roof: { x: 30, y: 80 },
  windows: { x: 30, y: 150 },
  parking: { x: 30, y: 220 },
};

// Scan-line effect overlay
function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-25 opacity-[0.015]"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(255,255,255,0.1) 2px,
          rgba(255,255,255,0.1) 4px
        )`,
      }}
    />
  );
}

// Loading component
function LoadingOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-40 transition-opacity duration-500">
      <div className="text-center max-w-md">
        <div className="mb-8 font-mono text-left bg-slate-900/80 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-gray-500 text-xs ml-2">falke-fm-system</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="animate-pulse">●</span> 3D Gebäude wird geladen...
            </div>
          </div>
        </div>
        <div className="w-64 mx-auto">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SplineBuilding() {
  const [activeView, setActiveView] = useState<string>('default');
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  const handleReady = useCallback(() => {
    setIsModelLoaded(true);
  }, []);

  const getCardPosition = () => {
    if (activeView === 'default' || !CARD_POSITIONS[activeView]) {
      return { x: 0, y: 0 };
    }
    return CARD_POSITIONS[activeView];
  };

  const isHotspotActive = activeView !== 'default';

  return (
    <div className="spline-container relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">

      {/* 3D Building Scene */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isModelLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Building3D
          activeView={activeView}
          onViewChange={handleViewChange}
          onReady={handleReady}
        />
      </div>

      {/* Loading overlay */}
      <LoadingOverlay isVisible={!isModelLoaded} />

      {/* Scan-line effect */}
      <ScanLines />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-15"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, rgba(5,5,16,0.3) 70%, rgba(5,5,16,0.8) 100%)
          `
        }}
      />

      {/* Data Card */}
      <DataCard
        data={isHotspotActive && HOTSPOT_DATA[activeView] ? HOTSPOT_DATA[activeView] : null}
        position={getCardPosition()}
        isVisible={isHotspotActive && !!HOTSPOT_DATA[activeView]}
      />

      {/* HUD Overlay - Top Left */}
      {isModelLoaded && (
        <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-400/90 space-y-1 pointer-events-none z-20 bg-slate-950/70 backdrop-blur-md px-3 py-2 rounded-lg border border-cyan-500/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-semibold tracking-wider">FALKE FM SYSTEM</span>
          </div>
          <div className="text-gray-400">Modell: PREMIUM OFFICE</div>
          <div className="text-gray-400">Modus: INTERACTIVE 3D</div>
        </div>
      )}

      {/* HUD Overlay - Top Right */}
      {isModelLoaded && (
        <div className="absolute top-4 right-4 font-mono text-[10px] text-cyan-400/90 text-right space-y-1 pointer-events-none z-20 bg-slate-950/70 backdrop-blur-md px-3 py-2 rounded-lg border border-cyan-500/30">
          <div>{new Date().toLocaleDateString('de-DE')}</div>
          <div>{new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-emerald-400 font-semibold">● LIVE</span>
          </div>
        </div>
      )}

      {/* View indicator */}
      {isModelLoaded && isHotspotActive && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 font-mono text-xs text-cyan-400 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 z-20">
          <span className="text-gray-400">ANSICHT:</span> {activeView.toUpperCase()}
          <button
            onClick={() => handleViewChange('default')}
            className="ml-3 text-gray-500 hover:text-white transition-colors"
          >
            ✕ ZURÜCK
          </button>
        </div>
      )}

      {/* Corner brackets */}
      {isModelLoaded && (
        <>
          <div className="absolute top-3 left-3 w-12 h-12 border-l-2 border-t-2 border-cyan-500/50 pointer-events-none z-20 rounded-tl" />
          <div className="absolute top-3 right-3 w-12 h-12 border-r-2 border-t-2 border-cyan-500/50 pointer-events-none z-20 rounded-tr" />
          <div className="absolute bottom-3 left-3 w-12 h-12 border-l-2 border-b-2 border-cyan-500/50 pointer-events-none z-20 rounded-bl" />
          <div className="absolute bottom-3 right-3 w-12 h-12 border-r-2 border-b-2 border-cyan-500/50 pointer-events-none z-20 rounded-br" />
        </>
      )}

      {/* Instructions */}
      {isModelLoaded && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 text-gray-300 text-xs bg-slate-950/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-cyan-500/30 pointer-events-none z-20 shadow-lg">
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span>Ziehen zum Drehen • Scrollen zum Zoomen • <span className="text-cyan-400">3D Punkte klicken</span> für Deep Dive</span>
        </div>
      )}
    </div>
  );
}

export default SplineBuilding;
