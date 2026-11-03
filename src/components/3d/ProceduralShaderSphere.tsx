import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    
    // Subtle organic pulsation based on spherical harmonics
    vec3 pos = position;
    float displacement = sin(pos.x * 4.0 + uTime * 2.0) * 
                         cos(pos.y * 4.0 + uTime * 1.5) * 
                         sin(pos.z * 4.0 + uTime * 2.5) * 0.06;
    pos += normal * displacement;
    
    vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorGlow;

  void main() {
    // Fresnel glow factor
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.8);
    
    // Dynamic circuit energy bands
    float wave = sin(vUv.y * 30.0 + uTime * 3.0) * 0.5 + 0.5;
    float wave2 = cos(vUv.x * 20.0 - uTime * 2.0) * 0.5 + 0.5;
    float circuitPulse = smoothstep(0.7, 0.95, wave * wave2);
    
    vec3 baseColor = mix(uColorA, uColorB, sin(vUv.y * 3.1415 + uTime * 0.5) * 0.5 + 0.5);
    vec3 finalColor = mix(baseColor, uColorGlow, fresnel * 0.85);
    finalColor += uColorGlow * circuitPulse * 0.7;

    float alpha = clamp(fresnel * 0.9 + circuitPulse * 0.3 + 0.15, 0.0, 0.95);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface ProceduralShaderSphereProps {
  position?: [number, number, number];
  scale?: number;
  hovered?: boolean;
}

export function ProceduralShaderSphere({ position = [0, 0, 0], scale = 1.2, hovered = false }: ProceduralShaderSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#0044aa') },
      uColorB: { value: new THREE.Color('#00c8ff') },
      uColorGlow: { value: new THREE.Color('#38bdf8') }
    }),
    []
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      meshRef.current.rotation.y += delta * (hovered ? 0.6 : 0.2);
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={hovered ? scale * 1.12 : scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

