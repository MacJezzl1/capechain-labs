'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import type { Group } from 'three'

function Core() {
  const group = useRef<Group>(null)
  const pointer = useThree((state) => state.pointer)
  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x += (pointer.y * 0.15 - group.current.rotation.x) * 0.03
    group.current.rotation.z += (pointer.x * -0.12 - group.current.rotation.z) * 0.03
  })
  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh>
          <torusKnotGeometry args={[1.22, 0.28, 180, 24, 2, 3]} />
          <MeshTransmissionMaterial
            backside
            thickness={0.3}
            chromaticAberration={0.08}
            anisotropy={0.4}
            distortion={0.18}
            distortionScale={0.3}
            temporalDistortion={0.08}
            roughness={0.18}
            color="#7fb7ff"
          />
        </mesh>
        <mesh scale={0.56}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#08090c"
            metalness={0.9}
            roughness={0.2}
            emissive="#1646bd"
            emissiveIntensity={0.45}
          />
        </mesh>
      </Float>
    </group>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 4, 4]} intensity={40} color="#00d9ff" />
        <pointLight position={[-4, -2, 3]} intensity={30} color="#805bff" />
        <Suspense fallback={null}>
          <Core />
          <Sparkles count={90} scale={7} size={1.4} speed={0.25} color="#8eeeff" />
        </Suspense>
      </Canvas>
    </div>
  )
}
