import { Suspense, useState, useCallback, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
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
  roof: { x: '50%', y: '15%', cardX: 260, cardY: 20 },
  windows: { x: '55%', y: '45%', cardX: 290, cardY: 160 },
  parking: { x: '50%', y: '80%', cardX: 20, cardY: 340 },
};

// Glass Window Panel Component
function GlassPanel({ position, size, isLit, isHovered }: {
  position: [number, number, number];
  size: [number, number, number];
  isLit: boolean;
  isHovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color={isHovered ? '#22d3ee' : isLit ? '#fbbf24' : '#1e3a8a'}
        metalness={0.1}
        roughness={0.1}
        transmission={isHovered ? 0.3 : 0.6}
        thickness={0.5}
        envMapIntensity={1}
        emissive={isHovered ? '#22d3ee' : isLit ? '#f59e0b' : '#1e40af'}
        emissiveIntensity={isHovered ? 0.8 : isLit ? 0.5 : 0.1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Main Building Component
function Building({ activeHotspot, onHotspotClick }: {
  activeHotspot: string | null;
  onHotspotClick: (id: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((state) => {
    setTime(state.clock.elapsedTime);
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Generate window lit pattern
  const isWindowLit = (floor: number, col: number) => {
    return Math.sin(time * 0.5 + floor * 2 + col * 3) > 0.3;
  };

  const isRoofActive = activeHotspot === 'roof' || hovered === 'roof';
  const isWindowsActive = activeHotspot === 'windows' || hovered === 'windows';
  const isParkingActive = activeHotspot === 'parking' || hovered === 'parking';

  return (
    <group ref={groupRef}>
      {/* ========== MAIN TOWER ========== */}
      <group position={[0, 0, 0]}>
        {/* Core structure */}
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[2.2, 4.5, 1.5]} />
          <meshPhysicalMaterial
            color="#0f172a"
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={0.5}
          />
        </mesh>

        {/* Glass facade - clickable */}
        <mesh
          position={[0, 2, 0.78]}
          onClick={() => onHotspotClick('windows')}
          onPointerEnter={() => setHovered('windows')}
          onPointerLeave={() => setHovered(null)}
        >
          <boxGeometry args={[2.1, 4.4, 0.05]} />
          <meshPhysicalMaterial
            color={isWindowsActive ? '#3b82f6' : '#1e3a8a'}
            metalness={0.2}
            roughness={0.05}
            transmission={0.4}
            thickness={0.5}
            envMapIntensity={2}
            emissive={isWindowsActive ? '#22d3ee' : '#1e40af'}
            emissiveIntensity={isWindowsActive ? 0.5 : 0.1}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Window grid */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((floor) =>
          [0, 1, 2, 3].map((col) => (
            <GlassPanel
              key={`w-${floor}-${col}`}
              position={[-0.7 + col * 0.47, -0.1 + floor * 0.53, 0.82]}
              size={[0.4, 0.45, 0.02]}
              isLit={isWindowLit(floor, col)}
              isHovered={isWindowsActive}
            />
          ))
        )}

        {/* Side glass panels */}
        <mesh position={[1.13, 2, 0]}>
          <boxGeometry args={[0.05, 4.4, 1.4]} />
          <meshPhysicalMaterial
            color="#1e3a8a"
            metalness={0.3}
            roughness={0.1}
            transmission={0.5}
            thickness={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Floor lines */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <mesh key={`fl-${i}`} position={[0, -0.35 + i * 0.53, 0.79]}>
            <boxGeometry args={[2.15, 0.02, 0.02]} />
            <meshStandardMaterial
              color={isWindowsActive ? '#22d3ee' : '#475569'}
              emissive={isWindowsActive ? '#22d3ee' : '#334155'}
              emissiveIntensity={isWindowsActive ? 1 : 0.3}
            />
          </mesh>
        ))}

        {/* Entrance */}
        <mesh position={[0, -0.15, 0.82]}>
          <boxGeometry args={[0.5, 0.5, 0.05]} />
          <meshPhysicalMaterial
            color="#0f172a"
            emissive="#22d3ee"
            emissiveIntensity={0.5}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* ========== ROOFTOP ========== */}
      <group
        position={[0, 4.3, 0]}
        onClick={() => onHotspotClick('roof')}
        onPointerEnter={() => setHovered('roof')}
        onPointerLeave={() => setHovered(null)}
      >
        {/* Roof surface */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.3, 0.1, 1.6]} />
          <meshPhysicalMaterial
            color={isRoofActive ? '#22d3ee' : '#334155'}
            metalness={0.6}
            roughness={0.3}
            emissive={isRoofActive ? '#22d3ee' : '#1e293b'}
            emissiveIntensity={isRoofActive ? 0.8 : 0.2}
          />
        </mesh>

        {/* Helipad */}
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.25, 0.35, 32]} />
          <meshStandardMaterial
            color={isRoofActive ? '#22d3ee' : '#475569'}
            emissive={isRoofActive ? '#22d3ee' : '#334155'}
            emissiveIntensity={isRoofActive ? 1 : 0.3}
          />
        </mesh>

        {/* HVAC units */}
        <mesh position={[-0.7, 0.15, 0.3]}>
          <boxGeometry args={[0.3, 0.2, 0.25]} />
          <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0.6, 0.12, -0.4]}>
          <boxGeometry args={[0.25, 0.15, 0.2]} />
          <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.4} />
        </mesh>

        {/* Main antenna */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.02, 0.04, 1.2, 8]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={1.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Beacon light */}
        <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
          <mesh position={[0, 1.35, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={3}
            />
          </mesh>
        </Float>

        {/* Antenna crossbars */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.5, 0.02, 0.02]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* ========== SECONDARY TOWER ========== */}
      <group position={[1.8, -0.5, 0.3]}>
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[1.2, 2.8, 1]} />
          <meshPhysicalMaterial
            color="#0f172a"
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        {/* Secondary tower glass */}
        <mesh position={[0, 1.2, 0.53]}>
          <boxGeometry args={[1.1, 2.7, 0.03]} />
          <meshPhysicalMaterial
            color="#1e3a8a"
            metalness={0.2}
            roughness={0.1}
            transmission={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Secondary windows */}
        {[0, 1, 2, 3, 4].map((floor) =>
          [0, 1].map((col) => (
            <GlassPanel
              key={`sw-${floor}-${col}`}
              position={[-0.25 + col * 0.5, -0.1 + floor * 0.52, 0.56]}
              size={[0.4, 0.45, 0.02]}
              isLit={isWindowLit(floor + 3, col + 5)}
              isHovered={false}
            />
          ))
        )}
      </group>

      {/* ========== SKY BRIDGE ========== */}
      <mesh position={[0.9, 2.2, 0.15]}>
        <boxGeometry args={[0.8, 0.25, 0.4]} />
        <meshPhysicalMaterial
          color="#334155"
          metalness={0.5}
          roughness={0.3}
          transmission={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* ========== GROUND / PARKING ========== */}
      <group
        position={[0.5, -0.5, 0]}
        onClick={() => onHotspotClick('parking')}
        onPointerEnter={() => setHovered('parking')}
        onPointerLeave={() => setHovered(null)}
      >
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6, 4]} />
          <meshStandardMaterial
            color={isParkingActive ? '#064e3b' : '#1e293b'}
            emissive={isParkingActive ? '#10b981' : '#0f172a'}
            emissiveIntensity={isParkingActive ? 0.3 : 0.1}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Parking lines */}
        {[-1.5, -0.8, -0.1, 0.6, 1.3, 2].map((x, i) => (
          <mesh key={`pl-${i}`} position={[x, 0.01, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.02, 1.5]} />
            <meshStandardMaterial
              color={isParkingActive ? '#22d3ee' : '#475569'}
              emissive={isParkingActive ? '#22d3ee' : '#334155'}
              emissiveIntensity={isParkingActive ? 1 : 0.2}
            />
          </mesh>
        ))}

        {/* Cars */}
        {[true, true, false, true, true].map((occupied, i) => occupied && (
          <mesh key={`car-${i}`} position={[-1.15 + i * 0.7, 0.08, -0.5]}>
            <boxGeometry args={[0.35, 0.15, 0.6]} />
            <meshStandardMaterial
              color={isParkingActive ? '#10b981' : '#475569'}
              emissive={isParkingActive ? '#10b981' : '#1e293b'}
              emissiveIntensity={isParkingActive ? 0.5 : 0.1}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Landscaping */}
        <mesh position={[2.2, 0.1, 0.8]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial
            color={isParkingActive ? '#22c55e' : '#166534'}
            emissive={isParkingActive ? '#22c55e' : '#14532d'}
            emissiveIntensity={isParkingActive ? 0.5 : 0.2}
          />
        </mesh>
        <mesh position={[-1.8, 0.08, 0.5]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color={isParkingActive ? '#22c55e' : '#166534'}
            emissive={isParkingActive ? '#22c55e' : '#14532d'}
            emissiveIntensity={isParkingActive ? 0.4 : 0.15}
          />
        </mesh>
      </group>
    </group>
  );
}

// Scene Component
function Scene({ activeHotspot, onHotspotClick }: {
  activeHotspot: string | null;
  onHotspotClick: (id: string) => void;
}) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-3, 5, -3]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, 6, 2]} intensity={1} color="#22d3ee" distance={15} />
      <pointLight position={[2, 2, 3]} intensity={0.5} color="#8b5cf6" distance={10} />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Building */}
      <Building activeHotspot={activeHotspot} onHotspotClick={onHotspotClick} />

      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Loading fallback
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-cyan-400 text-sm font-medium">3D-Modell wird geladen...</p>
      </div>
    </div>
  );
}

export function SplineBuilding() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const handleHotspotClick = useCallback((id: string) => {
    setActiveHotspot(prev => prev === id ? null : id);
  }, []);

  const getCardPosition = () => {
    if (!activeHotspot) return { x: 0, y: 0 };
    const pos = HOTSPOT_POSITIONS[activeHotspot as keyof typeof HOTSPOT_POSITIONS];
    return { x: pos?.cardX || 0, y: pos?.cardY || 0 };
  };

  return (
    <div className="spline-container relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [6, 4, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <Scene activeHotspot={activeHotspot} onHotspotClick={handleHotspotClick} />
        </Canvas>

        {/* Data Card */}
        <DataCard
          data={activeHotspot ? HOTSPOT_DATA[activeHotspot] : null}
          position={getCardPosition()}
          isVisible={!!activeHotspot}
        />

        {/* HUD Overlay */}
        <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-400/80 space-y-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>3D ACTIVE</span>
          </div>
          <div>RENDER: WEBGL</div>
        </div>

        <div className="absolute top-4 right-4 font-mono text-[10px] text-cyan-400/80 text-right space-y-1 pointer-events-none">
          <div>{new Date().toLocaleDateString('de-DE')}</div>
          <div className="flex items-center justify-end gap-2">
            <span>LIVE</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-cyan-500/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-cyan-500/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-cyan-500/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-cyan-500/60 pointer-events-none" />

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-400 text-xs bg-slate-950/70 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/20 pointer-events-none">
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span>Drehen & Zoomen • Klicken für Details</span>
        </div>
      </Suspense>
    </div>
  );
}

export default SplineBuilding;
