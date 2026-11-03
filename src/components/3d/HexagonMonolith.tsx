import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HexagonMonolithProps {
  onInteract?: (objectName: string) => void;
  wireframe?: boolean;
}

export function HexagonMonolith({ onInteract, wireframe = false }: HexagonMonolithProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerHexRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pulseRingsRef = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Generate hexagonal vertices for extruded metallic chain segments
  const hexSegments = [0, 1, 2, 3, 4, 5].map((i) => {
    const angle = (i * Math.PI) / 3;
    const nextAngle = ((i + 1) * Math.PI) / 3;
    const r = 2.4;
    return {
      start: [Math.cos(angle) * r, Math.sin(angle) * r, 0] as [number, number, number],
      end: [Math.cos(nextAngle) * r, Math.sin(nextAngle) * r, 0] as [number, number, number],
      angle
    };
  });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle levitation float
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
      
      // Dynamic responsiveness to pointer
      const targetRotX = (state.pointer.y * Math.PI * 0.15);
      const targetRotY = (state.pointer.x * Math.PI * 0.2) + (t * 0.25);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }

    if (outerHexRef.current) {
      outerHexRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * (hovered ? 1.4 : 0.6);
      coreRef.current.rotation.y += delta * (hovered ? 1.8 : 0.8);
      const coreScale = 1.0 + Math.sin(t * 3.0) * 0.08 + (clicked ? 0.3 : 0);
      coreRef.current.scale.set(coreScale, coreScale, coreScale);
    }

    if (pulseRingsRef.current) {
      pulseRingsRef.current.rotation.z -= delta * 0.4;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
    if (onInteract) {
      onInteract('CapeChain Nexus Core');
    }
  };

  return (
    <group ref={groupRef}>
      {/* Central Quantum Prism Core (Faceted Icosahedron / Octahedron with metallic emissive shader) */}
      <mesh
        ref={coreRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <octahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial
          color={hovered ? '#00e5ff' : '#0077ff'}
          emissive={hovered ? '#00bfff' : '#0033aa'}
          emissiveIntensity={hovered ? 1.8 : 0.9}
          metalness={0.92}
          roughness={0.12}
          wireframe={wireframe}
        />
      </mesh>

      {/* Outer Hexagonal Metallic Interconnected Struts */}
      <group ref={outerHexRef}>
        {hexSegments.map((seg, idx) => {
          // Midpoint of segment
          const midX = (seg.start[0] + seg.end[0]) / 2;
          const midY = (seg.start[1] + seg.end[1]) / 2;
          const length = 2.4; // Hexagon edge length with radius 2.4 = 2.4
          const rotZ = seg.angle + Math.PI / 6;

          return (
            <group key={idx} position={[midX, midY, 0]} rotation={[0, 0, rotZ]}>
              {/* Metallic strut */}
              <mesh>
                <boxGeometry args={[length * 0.92, 0.22, 0.35]} />
                <meshStandardMaterial
                  color={hovered ? '#cbd5e1' : '#64748b'}
                  metalness={0.95}
                  roughness={0.18}
                  wireframe={wireframe}
                />
              </mesh>

              {/* Glowing circuit conduit embedded in strut */}
              <mesh position={[0, 0, 0.19]}>
                <boxGeometry args={[length * 0.8, 0.05, 0.04]} />
                <meshStandardMaterial
                  color="#38bdf8"
                  emissive="#00e5ff"
                  emissiveIntensity={hovered ? 3.0 : 1.6}
                  toneMapped={false}
                />
              </mesh>

              {/* Corner junction node sphere */}
              <mesh position={[length * 0.46, 0, 0]}>
                <sphereGeometry args={[0.22, 24, 24]} />
                <meshStandardMaterial
                  color="#00d2ff"
                  emissive="#0099ff"
                  emissiveIntensity={hovered ? 2.5 : 1.2}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Orbiting Concentric Precision Tech Rings */}
      <group ref={pulseRingsRef}>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[3.2, 0.03, 16, 80]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[3.7, 0.02, 16, 90]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#2563eb"
            emissiveIntensity={0.8}
            metalness={0.95}
            roughness={0.15}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>

      {/* Floating Satellites / Data Cubes orbiting the monolith */}
      {[0, 1, 2, 3].map((i) => {
        const offset = (i * Math.PI) / 2;
        return <OrbitingDataCube key={i} phase={offset} radius={3.4 + i * 0.3} speed={0.4 + i * 0.1} />;
      })}
    </group>
  );
}

function OrbitingDataCube({ phase, radius, speed }: { phase: number; radius: number; speed: number }) {
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (cubeRef.current) {
      const t = state.clock.getElapsedTime() * speed + phase;
      cubeRef.current.position.x = Math.cos(t) * radius;
      cubeRef.current.position.z = Math.sin(t) * radius;
      cubeRef.current.position.y = Math.sin(t * 2) * 0.6;
      cubeRef.current.rotation.x = t * 2;
      cubeRef.current.rotation.y = t * 1.5;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial
        color="#38bdf8"
        emissive="#0284c7"
        emissiveIntensity={2.0}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

