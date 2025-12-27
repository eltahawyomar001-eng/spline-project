14:21:00.221 Running build in Washington, D.C., USA (East) – iad1
14:21:00.222 Build machine configuration: 4 cores, 8 GB
14:21:00.324 Cloning github.com/eltahawyomar001-eng/spline-project (Branch: main, Commit: 509afbb)
14:21:00.612 Cloning completed: 287.000ms
14:21:00.815 Restored build cache from previous deployment (8J1Tz2CvXN6Uo5jFBw21RHCuwean)
14:21:01.127 Running "vercel build"
14:21:01.555 Vercel CLI 50.1.3
14:21:02.084 Installing dependencies...
14:21:04.313 npm warn deprecated three-mesh-bvh@0.7.8: Deprecated due to three.js version incompatibility. Please use v0.8.0, instead.
14:21:06.004 
14:21:06.004 added 76 packages in 4s
14:21:06.004 
14:21:06.005 31 packages are looking for funding
14:21:06.005   run `npm fund` for details
14:21:06.049 Running "npm run build"
14:21:06.145 
14:21:06.146 > infrastructure-hero@1.0.0 build
14:21:06.146 > tsc && vite build
14:21:06.146 
14:21:08.488 src/App.tsx(5,10): error TS6133: 'CleaningIcon' is declared but its value is never read.
14:21:08.488 src/App.tsx(13,10): error TS6133: 'SnowflakeIcon' is declared but its value is never read.
14:21:08.488 src/App.tsx(22,10): error TS6133: 'WrenchIcon' is declared but its value is never read.
14:21:08.489 src/components/Hero/SplineBuilding.tsx(1,43): error TS6133: 'useEffect' is declared but its value is never read.
14:21:08.489 src/components/Hero/SplineBuilding.tsx(1,62): error TS6133: 'memo' is declared but its value is never read.
14:21:08.489 src/components/Hero/SplineBuilding.tsx(2,28): error TS6133: 'useThree' is declared but its value is never read.
14:21:08.489 src/components/Hero/SplineBuilding.tsx(3,45): error TS6133: 'MeshTransmissionMaterial' is declared but its value is never read.
14:21:08.489 src/components/Hero/SplineBuilding.tsx(3,71): error TS6133: 'Text' is declared but its value is never read.
14:21:08.517 Error: Command "npm run build" exited with 2