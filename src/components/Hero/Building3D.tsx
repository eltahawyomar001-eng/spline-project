import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Environment,
    Html,
    OrbitControls,
    ContactShadows,
    useTexture,
    useGLTF,
    Preload,
    Center,
} from '@react-three/drei';
import * as THREE from 'three';

// ==============================================
// PRELOAD ALL GLB MODELS
// ==============================================
useGLTF.preload('/models/office.glb');
useGLTF.preload('/models/tesla.glb');
useGLTF.preload('/models/grass-converted.glb');
useGLTF.preload('/models/oak_trees.glb');

// ==============================================
// TEXTURE PATHS
// ==============================================
const TEXTURES = {
    asphalt: {
        diffuse: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/asphalt_02/asphalt_02_diff_1k.jpg',
        normal: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/asphalt_02/asphalt_02_nor_gl_1k.jpg',
        roughness: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/asphalt_02/asphalt_02_rough_1k.jpg',
    },
    concretePavers: {
        diffuse: '/textures/concrete_pavers_diff.jpg',
        normal: '/textures/concrete_pavers_nor.jpg',
        roughness: '/textures/concrete_pavers_rough.jpg',
    },
    roadLines: {
        color: '/textures/roadlines_color.jpg',
        normal: '/textures/roadlines_normal.jpg',
        roughness: '/textures/roadlines_roughness.jpg',
        opacity: '/textures/roadlines_opacity.jpg',
    },
    grass: {
        diffuse: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/grass_path_2/grass_path_2_diff_1k.jpg',
        normal: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/grass_path_2/grass_path_2_nor_gl_1k.jpg',
    },
};

// ==============================================
// CAMERA VIEWS
// ==============================================
const CAMERA_VIEWS = {
    default: { position: new THREE.Vector3(45, 30, 50), target: new THREE.Vector3(10, 5, 10) },
    roof: { position: new THREE.Vector3(18, 42, 22), target: new THREE.Vector3(0, 20, 0) },
    windows: { position: new THREE.Vector3(30, 18, 22), target: new THREE.Vector3(0, 12, 0) },
    parking: { position: new THREE.Vector3(55, 22, 50), target: new THREE.Vector3(30, 0, 28) },
    winterdienst: { position: new THREE.Vector3(25, 18, 45), target: new THREE.Vector3(0, 0, 22) },
    areal: { position: new THREE.Vector3(-35, 22, 30), target: new THREE.Vector3(-20, 0, 8) },
};

// ==============================================
// CAMERA CONTROLLER
// ==============================================
function CameraController({ targetView, onTransitionComplete }: {
    targetView: keyof typeof CAMERA_VIEWS;
    onTransitionComplete?: () => void;
}) {
    const { camera } = useThree();
    const target = useRef({ pos: CAMERA_VIEWS.default.position.clone(), look: CAMERA_VIEWS.default.target.clone() });
    const current = useRef({ look: CAMERA_VIEWS.default.target.clone() });
    const animating = useRef(false);

    useEffect(() => {
        const view = CAMERA_VIEWS[targetView];
        target.current.pos.copy(view.position);
        target.current.look.copy(view.target);
        animating.current = true;
    }, [targetView]);

    useFrame(() => {
        if (animating.current) {
            camera.position.lerp(target.current.pos, 0.04);
            current.current.look.lerp(target.current.look, 0.04);
            camera.lookAt(current.current.look);
            if (camera.position.distanceTo(target.current.pos) < 0.2) {
                animating.current = false;
                onTransitionComplete?.();
            }
        }
    });

    return null;
}

// ==============================================
// OFFICE BUILDING (Sketchfab model)
// ==============================================
function OfficeBuilding({ highlighted: _highlighted }: { highlighted: string | null }) {
    const { scene } = useGLTF('/models/office.glb');

    const clonedScene = useMemo(() => {
        const cloned = scene.clone();
        cloned.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    const mat = child.material as THREE.MeshStandardMaterial;
                    mat.envMapIntensity = 1.8;
                    mat.needsUpdate = true;
                }
            }
        });
        return cloned;
    }, [scene]);

    return (
        <Center position={[0, 0, 0]}>
            {/* Office model bbox is ~0.36 units, need ~100x scale for realism */}
            <primitive object={clonedScene} scale={[100, 100, 100]} />
        </Center>
    );
}

// ==============================================
// TESLA MODEL 3 (Sketchfab model - multiple instances)
// ==============================================
function TeslaCar({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
    const { scene } = useGLTF('/models/tesla.glb');

    const clonedScene = useMemo(() => {
        const cloned = scene.clone();
        cloned.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    const mat = child.material as THREE.MeshStandardMaterial;
                    mat.envMapIntensity = 2.5;
                    mat.needsUpdate = true;
                }
            }
        });
        return cloned;
    }, [scene]);

    return (
        <group position={[position[0], position[1] + 1.2, position[2]]} rotation={[0, rotation, 0]}>
            {/* Tesla Model 3 - scale and Y offset to sit on ground */}
            <primitive object={clonedScene} scale={[1.8, 1.8, 1.8]} position={[0, 0, 0]} />
        </group>
    );
}

// ==============================================
// GRASS CHUNKS (Polyhaven model)
// ==============================================
function GrassChunks({ position }: { position: [number, number, number] }) {
    const { scene } = useGLTF('/models/grass-converted.glb');

    const clonedScene = useMemo(() => {
        const cloned = scene.clone();
        cloned.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        return cloned;
    }, [scene]);

    return (
        <group position={position}>
            {/* Grass model bbox is ~3.7 units, scale 5x for good coverage */}
            <primitive object={clonedScene} scale={[5, 5, 5]} />
        </group>
    );
}

// ==============================================
// OAK TREES (Sketchfab GLB model)
// ==============================================
function OakTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    const { scene } = useGLTF('/models/oak_trees.glb');

    const clonedScene = useMemo(() => {
        const cloned = scene.clone();
        cloned.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        return cloned;
    }, [scene]);

    // Oak tree bbox is ~2 units tall, scale 8x for realistic ~16m tree
    const s = 8 * scale;

    return (
        <group position={position}>
            <primitive object={clonedScene} scale={[s, s, s]} />
        </group>
    );
}

// ==============================================
// PBR GROUND
// ==============================================
function Ground() {
    const textures = useTexture({
        map: TEXTURES.asphalt.diffuse,
        normalMap: TEXTURES.asphalt.normal,
        roughnessMap: TEXTURES.asphalt.roughness,
    });

    useMemo(() => {
        Object.values(textures).forEach((t) => {
            if (t) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(20, 20); }
        });
    }, [textures]);

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial 
                {...textures} 
                color="#181818" 
                roughness={0.9} 
                metalness={0.02} 
                envMapIntensity={0.15}
                polygonOffset
                polygonOffsetFactor={1}
                polygonOffsetUnits={1}
            />
        </mesh>
    );
}

// ==============================================
// PARKING LOT - SIMPLE RECTANGLE, side-front of building
// ==============================================
function ParkingLot({ highlighted }: { highlighted: boolean }) {
    const asphaltTexture = useTexture('/textures/asphalt_03_diff.jpg');
    
    useMemo(() => {
        asphaltTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping;
        asphaltTexture.repeat.set(3, 2);
    }, [asphaltTexture]);
    
    return (
        <group position={[30, 0, 26]}>
            {/* Parking surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]} receiveShadow>
                <planeGeometry args={[35, 22]} />
                <meshStandardMaterial
                    map={asphaltTexture}
                    color={highlighted ? '#3a3a3a' : '#2a2a2a'}
                    roughness={0.9}
                    metalness={0.02}
                    polygonOffset
                    polygonOffsetFactor={-1}
                    polygonOffsetUnits={-1}
                />
            </mesh>

            {/* Parking spot lines - perpendicular to building */}
            {[-12, -4, 4, 12].map((x, i) => (
                <mesh key={`line-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.09, -5]} receiveShadow>
                    <planeGeometry args={[0.15, 5]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.5} />
                </mesh>
            ))}
            {[-12, -4, 4, 12].map((x, i) => (
                <mesh key={`line2-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.09, 5]} receiveShadow>
                    <planeGeometry args={[0.15, 5]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.5} />
                </mesh>
            ))}

            {/* Center driving lane line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.09, 0]} receiveShadow>
                <planeGeometry args={[30, 0.1]} />
                <meshStandardMaterial color="#ffcc00" roughness={0.5} />
            </mesh>

            {/* Curbs */}
            <mesh position={[-17.5, 0.15, 0]} castShadow>
                <boxGeometry args={[0.5, 0.3, 22]} />
                <meshStandardMaterial color="#505050" roughness={0.8} />
            </mesh>
            <mesh position={[17.5, 0.15, 0]} castShadow>
                <boxGeometry args={[0.5, 0.3, 22]} />
                <meshStandardMaterial color="#505050" roughness={0.8} />
            </mesh>
        </group>
    );
}

// ==============================================
// GREEN AREAS (Arealpflege)
// ==============================================
function GreenAreas({ highlighted }: { highlighted: boolean }) {
    const grassTextures = useTexture({
        map: TEXTURES.grass.diffuse,
        normalMap: TEXTURES.grass.normal,
    });

    useMemo(() => {
        Object.values(grassTextures).forEach((t) => {
            if (t) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(5, 6); }
        });
    }, [grassTextures]);

    return (
        <group>
            {/* Main green zone */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-20, 0.04, 8]} receiveShadow>
                <planeGeometry args={[22, 30]} />
                <meshStandardMaterial
                    {...grassTextures}
                    color={highlighted ? '#2a4030' : '#1d2d22'}
                    roughness={0.95}
                    metalness={0}
                    envMapIntensity={0.08}
                    polygonOffset
                    polygonOffsetFactor={-2}
                    polygonOffsetUnits={-2}
                />
            </mesh>
            {/* Front green zone */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -18]} receiveShadow>
                <planeGeometry args={[50, 18]} />
                <meshStandardMaterial
                    {...grassTextures}
                    color={highlighted ? '#2a4030' : '#1d2d22'}
                    roughness={0.95}
                    metalness={0}
                    envMapIntensity={0.08}
                    polygonOffset
                    polygonOffsetFactor={-2}
                    polygonOffsetUnits={-2}
                />
            </mesh>

            {/* Grass chunk models */}
            <GrassChunks position={[-18, 0, 5]} />
            <GrassChunks position={[-22, 0, 15]} />
            <GrassChunks position={[15, 0, -20]} />

            {/* Trees around green areas */}
            <OakTree position={[-25, 0, 0]} scale={1.2} />
            <OakTree position={[-28, 0, 10]} scale={1.0} />
            <OakTree position={[-24, 0, 18]} scale={1.1} />
            <OakTree position={[-18, 0, -5]} scale={0.9} />
            <OakTree position={[20, 0, -22]} scale={1.0} />
            <OakTree position={[-10, 0, -20]} scale={1.1} />
            <OakTree position={[35, 0, -15]} scale={0.8} />
        </group>
    );
}

// ==============================================
// HOTSPOT MARKER
// ==============================================
function Marker({ position, label, active, onClick }: {
    position: [number, number, number];
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((s) => { if (ref.current) ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 1.6) * 0.15; });

    return (
        <group position={[position[0], 0, position[2]]}>
            <mesh ref={ref} position={[0, position[1], 0]} onClick={onClick}>
                <sphereGeometry args={[0.45, 18, 18]} />
                <meshStandardMaterial
                    color={active ? '#ffffff' : '#505050'}
                    roughness={0.22}
                    metalness={0.6}
                    emissive={active ? '#555555' : '#181818'}
                    emissiveIntensity={0.45}
                />
            </mesh>
            <mesh position={[0, position[1] - 0.7, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 1.2, 8]} />
                <meshStandardMaterial color="#303030" roughness={0.5} />
            </mesh>
            <Html position={[0, position[1] + 1.1, 0]} center style={{ pointerEvents: 'none', userSelect: 'none' }}>
                <div style={{
                    padding: '8px 18px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    whiteSpace: 'nowrap',
                    background: 'rgba(5, 5, 8, 0.97)',
                    border: '1px solid rgba(55, 55, 60, 0.8)',
                    color: active ? '#ffffff' : '#686868',
                    fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace',
                }}>
                    {label}
                </div>
            </Html>
        </group>
    );
}

// ==============================================
// LIGHTING - Much brighter for realistic outdoor scene
// ==============================================
function Lights() {
    return (
        <>
            {/* Strong ambient for daylight feel */}
            <ambientLight intensity={1.2} color="#ffffff" />

            {/* Main sun light - very bright */}
            <directionalLight
                position={[50, 80, 40]}
                intensity={6}
                castShadow
                shadow-mapSize={[4096, 4096]}
                shadow-camera-far={200}
                shadow-camera-left={-80}
                shadow-camera-right={80}
                shadow-camera-top={80}
                shadow-camera-bottom={-80}
                shadow-bias={-0.0001}
                color="#fffaf0"
            />

            {/* Fill light from opposite side */}
            <directionalLight position={[-40, 50, -40]} intensity={2} color="#d0e8ff" />

            {/* Sky/ground light */}
            <hemisphereLight args={['#87CEEB', '#3d5c3d', 1.5]} />
        </>
    );
}

// ==============================================
// SCENE
// ==============================================
function Scene({ activeView, onHotspotClick, onReady }: {
    activeView: keyof typeof CAMERA_VIEWS;
    onHotspotClick: (id: string) => void;
    onReady: () => void;
}) {
    return (
        <>
            <CameraController targetView={activeView} onTransitionComplete={onReady} />
            <Lights />
            {/* Use user's kloofendal HDRI for realistic overcast lighting with visible sky */}
            <Environment files="/textures/kloofendal_overcast_1k.hdr" background={true} />
            <Ground />
            <ContactShadows position={[0, 0.02, 0]} opacity={0.55} scale={120} blur={3} far={35} />

            {/* REAL GLB MODELS */}
            <OfficeBuilding highlighted={activeView} />

            {/* Tesla cars in parking - simple grid layout, NO angle */}
            {/* Row 1 - back row */}
            <TeslaCar position={[20, 0, 20]} rotation={0} />
            <TeslaCar position={[30, 0, 20]} rotation={0} />
            <TeslaCar position={[40, 0, 20]} rotation={0} />
            {/* Row 2 - front row, facing opposite */}
            <TeslaCar position={[20, 0, 33]} rotation={Math.PI} />
            <TeslaCar position={[30, 0, 33]} rotation={Math.PI} />
            <TeslaCar position={[40, 0, 33]} rotation={Math.PI} />

            {/* Campus elements */}
            <ParkingLot highlighted={activeView === 'parking'} />
            <GreenAreas highlighted={activeView === 'areal'} />

            {/* Hotspots */}
            <Marker position={[0, 26, 0]} label="ROOF" active={activeView === 'roof'} onClick={() => onHotspotClick('roof')} />
            <Marker position={[12, 14, 6]} label="FACADE" active={activeView === 'windows'} onClick={() => onHotspotClick('windows')} />
            <Marker position={[30, 4, 26]} label="PARKING" active={activeView === 'parking'} onClick={() => onHotspotClick('parking')} />
            <Marker position={[0, 3, 22]} label="WINTERDIENST" active={activeView === 'winterdienst'} onClick={() => onHotspotClick('winterdienst')} />
            <Marker position={[-18, 6, 10]} label="AREALPFLEGE" active={activeView === 'areal'} onClick={() => onHotspotClick('areal')} />

            <OrbitControls enablePan={false} minDistance={25} maxDistance={80} minPolarAngle={0.2} maxPolarAngle={Math.PI / 2 - 0.08} enableDamping dampingFactor={0.05} />
            <Preload all />
        </>
    );
}

// ==============================================
// EXPORT
// ==============================================
export interface Building3DProps {
    activeView: string;
    onViewChange: (view: string) => void;
    onReady: () => void;
}

export function Building3D({ activeView, onViewChange, onReady }: Building3DProps) {
    const [ready, setReady] = useState(false);

    const handleClick = (id: string) => onViewChange(activeView === id ? 'default' : id);
    const handleReady = () => { if (!ready) { setReady(true); onReady(); } };

    useEffect(() => {
        const t = setTimeout(() => { setReady(true); onReady(); }, 3500);
        return () => clearTimeout(t);
    }, [onReady]);

    return (
        <Canvas
            shadows
            camera={{ position: [50, 32, 50], fov: 42, near: 0.5, far: 700 }}
            gl={{
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance',
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.8,
            }}
            dpr={[1, 1.5]}
        >
            <color attach="background" args={['#1a1a2e']} />
            <fog attach="fog" args={['#1a1a2e', 100, 250]} />
            <Suspense fallback={null}>
                <Scene activeView={activeView as keyof typeof CAMERA_VIEWS} onHotspotClick={handleClick} onReady={handleReady} />
            </Suspense>
        </Canvas>
    );
}

export default Building3D;
