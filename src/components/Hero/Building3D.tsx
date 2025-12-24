import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Environment,
    MeshReflectorMaterial,
    Float,
    Stars,
    Html,
    OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';

// ==============================================
// CAMERA POSITIONS FOR INTERACTIVE NAVIGATION
// ==============================================
const CAMERA_VIEWS = {
    default: {
        position: new THREE.Vector3(25, 18, 30),
        target: new THREE.Vector3(0, 8, 0),
    },
    roof: {
        position: new THREE.Vector3(8, 25, 12),
        target: new THREE.Vector3(0, 16, 0),
    },
    windows: {
        position: new THREE.Vector3(18, 10, 8),
        target: new THREE.Vector3(0, 8, 0),
    },
    parking: {
        position: new THREE.Vector3(15, 4, 18),
        target: new THREE.Vector3(0, 1, 0),
    },
};

// ==============================================
// ANIMATED CAMERA CONTROLLER
// ==============================================
function CameraController({
    targetView,
    onTransitionComplete
}: {
    targetView: keyof typeof CAMERA_VIEWS;
    onTransitionComplete?: () => void;
}) {
    const { camera } = useThree();
    const targetPosition = useRef(CAMERA_VIEWS.default.position.clone());
    const targetLookAt = useRef(CAMERA_VIEWS.default.target.clone());
    const currentLookAt = useRef(CAMERA_VIEWS.default.target.clone());
    const isAnimating = useRef(false);
    const progress = useRef(0);

    useEffect(() => {
        const view = CAMERA_VIEWS[targetView];
        targetPosition.current.copy(view.position);
        targetLookAt.current.copy(view.target);
        isAnimating.current = true;
        progress.current = 0;
    }, [targetView]);

    useFrame((_, delta) => {
        if (isAnimating.current) {
            progress.current += delta * 0.8; // Animation speed
            const t = Math.min(progress.current, 1);
            const eased = 1 - Math.pow(1 - t, 3); // Ease out cubic

            // Interpolate position
            camera.position.lerp(targetPosition.current, eased * 0.05);

            // Interpolate look-at target
            currentLookAt.current.lerp(targetLookAt.current, eased * 0.05);
            camera.lookAt(currentLookAt.current);

            // Check if animation is complete
            if (camera.position.distanceTo(targetPosition.current) < 0.1) {
                isAnimating.current = false;
                onTransitionComplete?.();
            }
        }
    });

    return null;
}

// ==============================================
// GLASS BUILDING COMPONENT
// ==============================================
function GlassBuilding() {
    const buildingRef = useRef<THREE.Group>(null);

    // Slight floating animation
    useFrame((state) => {
        if (buildingRef.current) {
            buildingRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <group ref={buildingRef}>
            {/* Main building structure */}
            <group position={[0, 8, 0]}>
                {/* Core building - glass tower */}
                <mesh position={[0, 0, 0]} castShadow receiveShadow>
                    <boxGeometry args={[8, 16, 6]} />
                    <meshPhysicalMaterial
                        color="#1a2a3a"
                        metalness={0.9}
                        roughness={0.05}
                        transmission={0.6}
                        thickness={0.5}
                        envMapIntensity={2}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </mesh>

                {/* Glass panels overlay - creates realistic window grid with interior lighting */}
                {Array.from({ length: 8 }).map((_, floorIndex) => {
                    // Create a lighting pattern - more lights on lower floors, random pattern
                    const isEveningOccupied = (windowIndex: number) => {
                        // Create a pseudo-random but consistent pattern
                        const seed = floorIndex * 10 + windowIndex;
                        return (seed * 7 + 3) % 5 !== 0; // ~80% of windows lit
                    };

                    const getWindowColor = (windowIndex: number) => {
                        // Single consistent warm white - like real office lighting
                        if (!isEveningOccupied(windowIndex)) return { color: '#0a1520', emissive: '#000000', intensity: 0 };
                        return { color: '#1a1812', emissive: '#fff8e8', intensity: 0.6 }; // Warm white
                    };

                    return (
                        <group key={floorIndex} position={[0, -6 + floorIndex * 2, 0]}>
                            {/* Front windows */}
                            {Array.from({ length: 4 }).map((_, i) => {
                                const windowStyle = getWindowColor(i);
                                return (
                                    <mesh key={`front-${i}`} position={[-3 + i * 2, 0, 3.01]} castShadow>
                                        <planeGeometry args={[1.6, 1.6]} />
                                        <meshStandardMaterial
                                            color={windowStyle.color}
                                            emissive={windowStyle.emissive}
                                            emissiveIntensity={windowStyle.intensity}
                                            metalness={0.3}
                                            roughness={0.1}
                                            side={THREE.DoubleSide}
                                        />
                                    </mesh>
                                );
                            })}
                            {/* Back windows */}
                            {Array.from({ length: 4 }).map((_, i) => {
                                const windowStyle = getWindowColor(i + 4);
                                return (
                                    <mesh key={`back-${i}`} position={[-3 + i * 2, 0, -3.01]} rotation={[0, Math.PI, 0]} castShadow>
                                        <planeGeometry args={[1.6, 1.6]} />
                                        <meshStandardMaterial
                                            color={windowStyle.color}
                                            emissive={windowStyle.emissive}
                                            emissiveIntensity={windowStyle.intensity}
                                            metalness={0.3}
                                            roughness={0.1}
                                            side={THREE.DoubleSide}
                                        />
                                    </mesh>
                                );
                            })}
                            {/* Side windows */}
                            {Array.from({ length: 3 }).map((_, i) => {
                                const windowStyle = getWindowColor(i + 8);
                                return (
                                    <mesh key={`side-${i}`} position={[4.01, 0, -2 + i * 2]} rotation={[0, Math.PI / 2, 0]} castShadow>
                                        <planeGeometry args={[1.6, 1.6]} />
                                        <meshStandardMaterial
                                            color={windowStyle.color}
                                            emissive={windowStyle.emissive}
                                            emissiveIntensity={windowStyle.intensity}
                                            metalness={0.3}
                                            roughness={0.1}
                                            side={THREE.DoubleSide}
                                        />
                                    </mesh>
                                );
                            })}
                            {/* Left side windows */}
                            {Array.from({ length: 3 }).map((_, i) => {
                                const windowStyle = getWindowColor(i + 11);
                                return (
                                    <mesh key={`left-${i}`} position={[-4.01, 0, -2 + i * 2]} rotation={[0, -Math.PI / 2, 0]} castShadow>
                                        <planeGeometry args={[1.6, 1.6]} />
                                        <meshStandardMaterial
                                            color={windowStyle.color}
                                            emissive={windowStyle.emissive}
                                            emissiveIntensity={windowStyle.intensity}
                                            metalness={0.3}
                                            roughness={0.1}
                                            side={THREE.DoubleSide}
                                        />
                                    </mesh>
                                );
                            })}
                        </group>
                    );
                })}

                {/* Metal frame accents */}
                {/* Horizontal beams */}
                {Array.from({ length: 9 }).map((_, i) => (
                    <mesh key={`beam-${i}`} position={[0, -7 + i * 2, 3.05]}>
                        <boxGeometry args={[8.2, 0.15, 0.1]} />
                        <meshStandardMaterial color="#2a3a4a" metalness={0.95} roughness={0.2} />
                    </mesh>
                ))}
                {/* Vertical pillars */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <mesh key={`pillar-${i}`} position={[-4 + i * 2, 0, 3.05]}>
                        <boxGeometry args={[0.15, 16.2, 0.1]} />
                        <meshStandardMaterial color="#2a3a4a" metalness={0.95} roughness={0.2} />
                    </mesh>
                ))}

                {/* Roof structure */}
                <mesh position={[0, 8.2, 0]} castShadow>
                    <boxGeometry args={[8.5, 0.4, 6.5]} />
                    <meshStandardMaterial color="#1a2530" metalness={0.9} roughness={0.3} />
                </mesh>

                {/* Roof equipment */}
                <mesh position={[-2, 8.8, 1]} castShadow>
                    <boxGeometry args={[1.5, 1, 1.2]} />
                    <meshStandardMaterial color="#2a3a4a" metalness={0.8} roughness={0.4} />
                </mesh>
                <mesh position={[2, 8.6, -1]} castShadow>
                    <cylinderGeometry args={[0.4, 0.4, 0.8, 16]} />
                    <meshStandardMaterial color="#3a4a5a" metalness={0.9} roughness={0.3} />
                </mesh>

                {/* Antenna */}
                <mesh position={[0, 10, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
                    <meshStandardMaterial color="#4a5a6a" metalness={0.95} roughness={0.2} />
                </mesh>
                <mesh position={[0, 11.5, 0]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={2} />
                </mesh>
            </group>

            {/* Base/Entrance level */}
            <mesh position={[0, 0.25, 0]} receiveShadow>
                <boxGeometry args={[10, 0.5, 8]} />
                <meshStandardMaterial color="#1a1a2a" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Entrance canopy */}
            <mesh position={[0, 1.5, 4.5]} castShadow>
                <boxGeometry args={[4, 0.15, 2]} />
                <meshPhysicalMaterial
                    color="#2a3a4a"
                    metalness={0.9}
                    roughness={0.1}
                    transmission={0.3}
                />
            </mesh>

            {/* Entrance pillars */}
            <mesh position={[-1.5, 0.75, 4.5]}>
                <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
                <meshStandardMaterial color="#3a4a5a" metalness={0.95} roughness={0.2} />
            </mesh>
            <mesh position={[1.5, 0.75, 4.5]}>
                <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
                <meshStandardMaterial color="#3a4a5a" metalness={0.95} roughness={0.2} />
            </mesh>
        </group>
    );
}

// ==============================================
// 3D HOTSPOT MARKER
// ==============================================
function Hotspot3D({
    position,
    label,
    isActive,
    onClick,
    color = '#22d3ee'
}: {
    position: [number, number, number];
    label: string;
    isActive: boolean;
    onClick: () => void;
    color?: string;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.scale.setScalar(isActive ? 1.3 : 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime;
            ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.2);
        }
    });

    return (
        <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
            <group position={position}>
                {/* Main sphere */}
                <mesh ref={meshRef} onClick={onClick}>
                    <sphereGeometry args={[0.3, 16, 16]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={isActive ? 2 : 1}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Outer ring */}
                <mesh ref={ringRef}>
                    <ringGeometry args={[0.5, 0.6, 32]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.5}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Pulsing outer ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.7, 0.75, 32]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.2}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Label */}
                <Html
                    position={[0, 0.8, 0]}
                    center
                    style={{
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    <div
                        className="px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap"
                        style={{
                            background: 'rgba(5,10,20,0.9)',
                            border: `1px solid ${color}`,
                            color: color,
                            boxShadow: `0 0 10px ${color}40`,
                        }}
                    >
                        {label}
                    </div>
                </Html>
            </group>
        </Float>
    );
}

// ==============================================
// GROUND PLANE
// ==============================================
function Ground() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050510"
                metalness={0.5}
                mirror={0.5}
            />
        </mesh>
    );
}

// ==============================================
// GRID HELPER
// ==============================================
function GridFloor() {
    return (
        <gridHelper
            args={[100, 50, '#0a3040', '#051520']}
            position={[0, 0.01, 0]}
        />
    );
}

// ==============================================
// SCENE LIGHTING
// ==============================================
function Lighting() {
    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight
                position={[10, 20, 10]}
                intensity={1}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={50}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
            />
            <pointLight position={[-10, 10, -10]} intensity={0.5} color="#22d3ee" />
            <pointLight position={[10, 5, 10]} intensity={0.3} color="#3b82f6" />
            {/* Accent lights on building */}
            <spotLight
                position={[0, 0, 10]}
                angle={0.3}
                penumbra={0.5}
                intensity={0.5}
                color="#22d3ee"
            />
        </>
    );
}

// ==============================================
// MAIN SCENE CONTENT
// ==============================================
function SceneContent({
    activeView,
    onHotspotClick,
    onCameraReady
}: {
    activeView: keyof typeof CAMERA_VIEWS;
    onHotspotClick: (id: string) => void;
    onCameraReady: () => void;
}) {
    return (
        <>
            <CameraController
                targetView={activeView}
                onTransitionComplete={onCameraReady}
            />

            <Lighting />

            {/* Environment for reflections */}
            <Environment preset="city" />

            {/* Stars background */}
            <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />

            {/* Ground */}
            <Ground />
            <GridFloor />

            {/* Building */}
            <GlassBuilding />

            {/* 3D Hotspots */}
            <Hotspot3D
                position={[0, 18, 0]}
                label="ROOF SYSTEMS"
                isActive={activeView === 'roof'}
                onClick={() => onHotspotClick('roof')}
                color="#22d3ee"
            />
            <Hotspot3D
                position={[5, 10, 3]}
                label="FACADE / WINDOWS"
                isActive={activeView === 'windows'}
                onClick={() => onHotspotClick('windows')}
                color="#3b82f6"
            />
            <Hotspot3D
                position={[6, 1.5, 6]}
                label="ENTRANCE / PARKING"
                isActive={activeView === 'parking'}
                onClick={() => onHotspotClick('parking')}
                color="#10b981"
            />

            {/* Orbit controls for manual navigation */}
            <OrbitControls
                enablePan={false}
                minDistance={10}
                maxDistance={50}
                minPolarAngle={0.2}
                maxPolarAngle={Math.PI / 2 - 0.1}
            />
        </>
    );
}

// ==============================================
// MAIN EXPORT COMPONENT
// ==============================================
export interface Building3DProps {
    activeView: string;
    onViewChange: (view: string) => void;
    onReady: () => void;
}

export function Building3D({ activeView, onViewChange, onReady }: Building3DProps) {
    const [isReady, setIsReady] = useState(false);

    const handleHotspotClick = (id: string) => {
        if (activeView === id) {
            onViewChange('default');
        } else {
            onViewChange(id);
        }
    };

    const handleCameraReady = () => {
        if (!isReady) {
            setIsReady(true);
            onReady();
        }
    };

    // Initial ready after mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
            onReady();
        }, 1500);
        return () => clearTimeout(timer);
    }, [onReady]);

    return (
        <Canvas
            shadows
            camera={{
                position: [25, 18, 30],
                fov: 45,
                near: 0.1,
                far: 200
            }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
            }}
            style={{ background: 'transparent' }}
        >
            <color attach="background" args={['#050510']} />
            <fog attach="fog" args={['#050510', 30, 100]} />

            <SceneContent
                activeView={activeView as keyof typeof CAMERA_VIEWS}
                onHotspotClick={handleHotspotClick}
                onCameraReady={handleCameraReady}
            />
        </Canvas>
    );
}

export default Building3D;
