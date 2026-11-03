import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NetworkNode {
  id: string;
  label: string;
  position: [number, number, number];
  role: string;
}

const NODES: NetworkNode[] = [
  { id: 'node-ai', label: 'Cognitive Engine', position: [-4.2, 2.0, -1.5], role: 'AI Agent Swarm' },
  { id: 'node-bc', label: 'Ledger Consensus', position: [4.2, 1.8, -1.0], role: 'ZK Proof Validator' },
  { id: 'node-infra', label: 'Cloud Fabric', position: [-3.5, -2.2, 1.0], role: 'Multi-Region Mesh' },
  { id: 'node-data', label: 'Data Bus', position: [3.8, -2.0, 1.2], role: '2.4M msg/s Stream' },
  { id: 'node-edge', label: 'Edge Gateway', position: [0, 3.5, 1.0], role: 'Zero-Trust Proxy' },
  { id: 'node-audit', label: 'Security Crypt', position: [0, -3.4, -2.0], role: 'TSS Key Vault' }
];

interface Connection {
  from: NetworkNode;
  to: NetworkNode;
  points: [THREE.Vector3, THREE.Vector3];
  lineObject: THREE.Line;
}

export function InterconnectedNetwork({ onSelectNode }: { onSelectNode?: (node: NetworkNode) => void }) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const pulsesRef = useRef<THREE.Group>(null);

  // Generate inter-node connections and memoize lines
  const connections = useMemo(() => {
    const conns: { from: NetworkNode; to: NetworkNode; points: [THREE.Vector3, THREE.Vector3]; line: THREE.Line }[] = [];
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        const from = NODES[i];
        const to = NODES[j];
        const p1 = new THREE.Vector3(...from.position);
        const p2 = new THREE.Vector3(...to.position);
        const geom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
        const mat = new THREE.LineBasicMaterial({
          color: new THREE.Color('#0369a1'),
          transparent: true,
          opacity: 0.28
        });
        const line = new THREE.Line(geom, mat);
        conns.push({ from, to, points: [p1, p2], line });
      }
    }
    return conns;
  }, []);

  // Update line colors based on hover
  useFrame(() => {
    connections.forEach((conn) => {
      const isHighlighted = activeNode === conn.from.id || activeNode === conn.to.id;
      const mat = conn.line.material as THREE.LineBasicMaterial;
      mat.color.set(isHighlighted ? '#38bdf8' : '#0369a1');
      mat.opacity = isHighlighted ? 0.9 : 0.28;
    });
  });

  // Moving data packets along connections
  useFrame((state) => {
    if (pulsesRef.current) {
      const t = state.clock.getElapsedTime();
      pulsesRef.current.children.forEach((child, idx) => {
        const conn = connections[idx % connections.length];
        const progress = (t * 0.4 + idx * 0.15) % 1.0;
        const p1 = conn.points[0];
        const p2 = conn.points[1];
        child.position.lerpVectors(p1, p2, progress);
      });
    }
  });

  return (
    <group>
      {/* Network Lines */}
      {connections.map((conn, idx) => (
        <primitive key={idx} object={conn.line} />
      ))}

      {/* Network Nodes */}
      {NODES.map((node) => {
        const isActive = activeNode === node.id;
        return (
          <group
            key={node.id}
            position={node.position}
            onPointerOver={(e) => {
              e.stopPropagation();
              setActiveNode(node.id);
            }}
            onPointerOut={() => setActiveNode(null)}
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectNode) onSelectNode(node);
            }}
          >
            {/* Outer halo */}
            <mesh>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial
                color={isActive ? '#38bdf8' : '#0284c7'}
                transparent
                opacity={isActive ? 0.45 : 0.18}
                wireframe
              />
            </mesh>

            {/* Inner glowing core */}
            <mesh scale={isActive ? 1.3 : 1.0}>
              <sphereGeometry args={[0.16, 24, 24]} />
              <meshStandardMaterial
                color={isActive ? '#38bdf8' : '#0284c7'}
                emissive={isActive ? '#00e5ff' : '#0077ff'}
                emissiveIntensity={isActive ? 3.0 : 1.5}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
        );
      })}

      {/* Animated Data Packet Pulses traveling along lines */}
      <group ref={pulsesRef}>
        {connections.slice(0, 10).map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
