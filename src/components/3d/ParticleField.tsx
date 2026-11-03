import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  interactive?: boolean;
}

export function ParticleField({ count = 1800, interactive = true }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, initialPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#0284c7'); // Azure
    const color2 = new THREE.Color('#38bdf8'); // Cyan
    const color3 = new THREE.Color('#2563eb'); // Deep blue

    for (let i = 0; i < count; i++) {
      // Cylindrical / spherical volume distribution
      const r = THREE.MathUtils.randFloat(2.5, 12);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const y = THREE.MathUtils.randFloatSpread(10);

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;

      // Color variation
      const mixRatio = Math.random();
      const chosenColor = mixRatio < 0.4 ? color2 : mixRatio < 0.8 ? color1 : color3;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, initPos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    // Subtle drift and pointer disturbance
    const pointerX = interactive ? state.pointer.x * 2.0 : 0;
    const pointerY = interactive ? state.pointer.y * 2.0 : 0;

    for (let i = 0; i < count; i += 4) {
      const idx = i * 3;
      // Gentle floating sine wave
      array[idx + 1] = initialPositions[idx + 1] + Math.sin(t * 0.8 + initialPositions[idx]) * 0.35;
      
      // Horizontal drift
      array[idx] = initialPositions[idx] + Math.cos(t * 0.4 + initialPositions[idx + 2]) * 0.2;

      // Pointer influence
      if (interactive) {
        const dx = array[idx] - pointerX;
        const dy = array[idx + 1] - pointerY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 4.0 && distSq > 0.01) {
          const force = (4.0 - distSq) * 0.015;
          array[idx] += dx * force;
          array[idx + 1] += dy * force;
        }
      }
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

