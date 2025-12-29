import { useState, useCallback, lazy, Suspense } from 'react';
import DataCard, { DataCardData } from './DataCard';

// Lazy load Building3D
const Building3D = lazy(() => import('./Building3D'));

// Data card content - Bloomberg terminal style
const HOTSPOT_DATA: Record<string, DataCardData> = {
  roof: {
    id: 'roof',
    title: 'DACHSYSTEME & TECHNIK',
    status: 'BETRIEBSBEREIT',
    statusType: 'success',
    metrics: [
      { label: 'Systemstatus', value: 'OK', status: 'positive' },
      { label: 'Wartungsindex', value: '98.2%', status: 'positive' },
      { label: 'Letzte Inspektion', value: '15.12.2025', status: 'neutral' },
      { label: 'Nächste Wartung', value: '15.01.2026', status: 'neutral' },
    ],
  },
  windows: {
    id: 'windows',
    title: 'FASSADE & REINIGUNG',
    status: 'ABGESCHLOSSEN',
    statusType: 'success',
    metrics: [
      { label: 'Qualitätsindex', value: '97.4%', status: 'positive' },
      { label: 'Letzte Reinigung', value: '28.12.2025', status: 'neutral' },
      { label: 'Reklamationen', value: '0', status: 'positive' },
      { label: 'Nächster Termin', value: '28.01.2026', status: 'neutral' },
    ],
  },
  parking: {
    id: 'parking',
    title: 'PARKFLÄCHENMANAGEMENT',
    status: 'AKTIV',
    statusType: 'success',
    metrics: [
      { label: 'Kapazität', value: '12 Stellplätze', status: 'neutral' },
      { label: 'Belegung aktuell', value: '5/12 (42%)', status: 'neutral' },
      { label: 'Markierungen', value: 'Intakt', status: 'positive' },
      { label: 'Beleuchtung', value: '100%', status: 'positive' },
    ],
  },
  winterdienst: {
    id: 'winterdienst',
    title: 'WINTERDIENST & VERKEHRSSICHERUNG',
    status: 'EINSATZBEREIT',
    statusType: 'info',
    metrics: [
      { label: 'Räumstatus', value: 'Standby', status: 'positive' },
      { label: 'Streumittelvorrat', value: 'Ausreichend', status: 'positive' },
      { label: 'Letzte Kontrolle', value: '29.12.2025 06:00', status: 'neutral' },
      { label: 'Einsatzbereitschaft', value: '24/7', status: 'positive' },
    ],
  },
  areal: {
    id: 'areal',
    title: 'AREALPFLEGE & GRÜNANLAGEN',
    status: 'IN ORDNUNG',
    statusType: 'success',
    metrics: [
      { label: 'Pflegezustand', value: 'Sehr gut', status: 'positive' },
      { label: 'Letzte Pflege', value: '20.12.2025', status: 'neutral' },
      { label: 'Baumkontrolle', value: 'Aktuell', status: 'positive' },
      { label: 'Nächster Schnitt', value: 'März 2026', status: 'neutral' },
    ],
  },
};

const CARD_POSITIONS: Record<string, { x: number; y: number }> = {
  roof: { x: 24, y: 60 },
  windows: { x: 24, y: 60 },
  parking: { x: 24, y: 60 },
  winterdienst: { x: 24, y: 60 },
  areal: { x: 24, y: 60 },
};

// Loading state - Bloomberg terminal style
function LoadingState({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0c] z-40">
      <div className="text-center">
        <div className="font-mono text-gray-500 text-xs tracking-wider mb-3">
          INITIALISIEREN...
        </div>
        <div className="w-40 h-px bg-white/10 overflow-hidden">
          <div className="h-full w-1/2 bg-white/30 animate-pulse" />
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
    <div className="spline-container relative bg-[#0a0a0c] overflow-hidden">

      {/* 3D Scene */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isModelLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Suspense fallback={null}>
          <Building3D
            activeView={activeView}
            onViewChange={handleViewChange}
            onReady={handleReady}
          />
        </Suspense>
      </div>

      {/* Loading */}
      <LoadingState isVisible={!isModelLoaded} />

      {/* Data Card */}
      <DataCard
        data={isHotspotActive && HOTSPOT_DATA[activeView] ? HOTSPOT_DATA[activeView] : null}
        position={getCardPosition()}
        isVisible={isHotspotActive && !!HOTSPOT_DATA[activeView]}
      />

      {/* Top left HUD - Bloomberg style */}
      {isModelLoaded && (
        <div className="absolute top-3 left-3 font-mono text-[10px] text-gray-500 z-20 bg-black/60 px-3 py-2 border border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
            <span className="tracking-wider">FALKE FM</span>
          </div>
          <div className="text-gray-600 mt-0.5">CAMPUS ÜBERSICHT</div>
        </div>
      )}

      {/* Top right HUD */}
      {isModelLoaded && (
        <div className="absolute top-3 right-3 font-mono text-[10px] text-gray-600 text-right z-20 bg-black/60 px-3 py-2 border border-white/5">
          <div>{new Date().toLocaleDateString('de-DE')}</div>
          <div>{new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            <span className="text-gray-500">LIVE</span>
          </div>
        </div>
      )}

      {/* Active view indicator */}
      {isModelLoaded && isHotspotActive && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-gray-400 bg-black/70 px-4 py-2 border border-white/10 z-20">
          <span className="text-gray-600">ANSICHT:</span>
          <span className="ml-2 text-white">{activeView.toUpperCase()}</span>
          <button
            onClick={() => handleViewChange('default')}
            className="ml-4 text-gray-600 hover:text-white transition-colors"
          >
            [ZURÜCK]
          </button>
        </div>
      )}

      {/* Instructions */}
      {isModelLoaded && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-gray-600 bg-black/50 px-4 py-2 border border-white/5 z-20">
          DREHEN: ZIEHEN · ZOOM: SCROLL · AUSWAHL: MARKIERUNG KLICKEN
        </div>
      )}
    </div>
  );
}

export default SplineBuilding;
