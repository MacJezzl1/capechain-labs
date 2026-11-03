import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { HexagonMonolith } from './HexagonMonolith';
import { InterconnectedNetwork } from './InterconnectedNetwork';
import { ParticleField } from './ParticleField';
import { ProceduralShaderSphere } from './ProceduralShaderSphere';
import { CameraController } from './CameraController';
import type { CameraViewpoint } from './CameraController';
import { StaticFallback } from './StaticFallback';
import { Layers, Eye, Gauge, RefreshCw, Sparkles, Activity } from 'lucide-react';

interface CapeChainCanvasProps {
  initialViewpoint?: CameraViewpoint;
  onObjectInteract?: (name: string) => void;
}

export function CapeChainCanvas({ initialViewpoint = 'hero', onObjectInteract }: CapeChainCanvasProps) {
  const [viewpoint, setViewpoint] = useState<CameraViewpoint>(initialViewpoint);
  const [wireframe, setWireframe] = useState(false);
  const [ecoMode, setEcoMode] = useState(false);
  const [staticMode, setStaticMode] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<string>('CapeChain HyperMesh Core');
  const [fps, setFps] = useState(60);

  // Check user preference for reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setStaticMode(true);
    }
  }, []);

  // Frame rate monitor simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(ecoMode ? 30 : 58 + Math.random() * 4));
    }, 2000);
    return () => clearInterval(interval);
  }, [ecoMode]);

  const handleEntitySelect = (name: string) => {
    setSelectedEntity(name);
    if (onObjectInteract) onObjectInteract(name);
  };

  if (staticMode) {
    return <StaticFallback onToggle3D={() => setStaticMode(false)} />;
  }

  return (
    <div className="relative w-full h-[580px] md:h-[660px] rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-b from-[#030712] via-[#050e1f] to-[#020617] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      {/* Background cyber grid */}
      <div className="absolute inset-0 circuit-grid opacity-20 pointer-events-none" />

      {/* R3F Canvas */}
      <Suspense
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-[#030712]">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
            <p className="font-mono text-xs text-cyan-400 tracking-widest uppercase animate-pulse">
              Compiling 3D Shader Pipelines...
            </p>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 45 }}
          dpr={ecoMode ? 1 : [1, 1.5]}
          gl={{
            antialias: !ecoMode,
            alpha: true,
            powerPreference: 'high-performance'
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Realistic Multi-Point Studio Lighting */}
          <ambientLight intensity={0.4} />
          
          {/* Main Key Light */}
          <directionalLight position={[10, 10, 8]} intensity={1.5} color="#e0f2fe" />
          
          {/* Blue Rim Accent Light */}
          <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#0284c7" />
          
          {/* Cyan Center Glow Light */}
          <pointLight position={[0, 0, 2]} intensity={2.2} distance={10} color="#00e5ff" />
          
          {/* Lower Ambient Fill */}
          <pointLight position={[0, -4, 2]} intensity={0.8} color="#1d4ed8" />

          {/* Camera Controller with smooth cinematic transitions */}
          <CameraController viewpoint={viewpoint} enableMouseParallax={!ecoMode} />

          {/* Signature 3D CapeChain Structures */}
          <HexagonMonolith
            wireframe={wireframe}
            onInteract={(name) => handleEntitySelect(name)}
          />

          {/* Floating Energy Core */}
          <ProceduralShaderSphere position={[0, 0, 0]} scale={0.9} />

          {/* Interconnected Technology Nodes */}
          <InterconnectedNetwork
            onSelectNode={(node) => handleEntitySelect(`${node.label} (${node.role})`)}
          />

          {/* Dynamic Floating Cyber Particle Field */}
          <ParticleField count={ecoMode ? 600 : 1800} interactive={!ecoMode} />
        </Canvas>
      </Suspense>

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none select-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-300 font-semibold tracking-wider uppercase">
              3D Quantum Nexus
            </span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-[11px] text-slate-400">
              {selectedEntity}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-slate-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>{fps} FPS</span>
          </div>
        </div>
      </div>

      {/* Bottom Cinematic Storytelling Controls & Viewpoint Switcher */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Storytelling Camera Angles */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 pointer-events-auto shadow-lg">
          <span className="px-2 text-[10px] font-mono uppercase text-slate-400 hidden sm:inline">
            Storyline:
          </span>
          {(
            [
              { id: 'hero', label: 'Nexus Overview' },
              { id: 'core', label: 'Quantum Core' },
              { id: 'network', label: 'AI Lattice' },
              { id: 'infra', label: 'Cloud Mesh' }
            ] as const
          ).map((vp) => (
            <button
              key={vp.id}
              onClick={() => setViewpoint(vp.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                viewpoint === vp.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {vp.label}
            </button>
          ))}
        </div>

        {/* Viewport Modes: Wireframe, Eco Mode, Fallback */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setWireframe(!wireframe)}
            title="Toggle Topological Wireframe"
            className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
              wireframe
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Topology</span>
          </button>

          <button
            onClick={() => setEcoMode(!ecoMode)}
            title="Toggle Performance / Eco Mode"
            className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
              ecoMode
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{ecoMode ? 'Eco: ON' : 'High Perf'}</span>
          </button>

          <button
            onClick={() => setStaticMode(true)}
            title="Switch to Static Fallback"
            className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">2D Mode</span>
          </button>
        </div>
      </div>

      {/* Decorative Corner Telemetry Coordinates */}
      <div className="absolute bottom-2 right-4 text-[9px] font-mono text-cyan-500/40 pointer-events-none hidden lg:block">
        CAM_ROT: [X: 0.12, Y: 0.45] // RENDER_ENG: THREE.JS_R187
      </div>
    </div>
  );
}
