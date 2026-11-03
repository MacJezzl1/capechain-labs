import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export type CameraViewpoint = 'hero' | 'core' | 'network' | 'infra';

interface CameraControllerProps {
  viewpoint: CameraViewpoint;
  enableMouseParallax?: boolean;
}

const VIEWPOINT_CONFIGS: Record<CameraViewpoint, { position: [number, number, number]; lookAt: [number, number, number] }> = {
  hero: {
    position: [0, 0, 8.2],
    lookAt: [0, 0, 0]
  },
  core: {
    position: [0, 0.2, 4.2],
    lookAt: [0, 0, 0]
  },
  network: {
    position: [-3.2, 1.8, 5.2],
    lookAt: [-1.5, 0.8, 0]
  },
  infra: {
    position: [3.4, -1.8, 5.0],
    lookAt: [1.2, -0.6, 0]
  }
};

export function CameraController({ viewpoint, enableMouseParallax = true }: CameraControllerProps) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const config = VIEWPOINT_CONFIGS[viewpoint];
    const targetPos = new THREE.Vector3(...config.position);
    const targetLook = new THREE.Vector3(...config.lookAt);

    // Subtle mouse parallax
    if (enableMouseParallax) {
      targetPos.x += state.pointer.x * 0.8;
      targetPos.y += state.pointer.y * 0.5;
    }

    // Smooth cinematic damping
    const lerpSpeed = 3.0 * delta;
    camera.position.lerp(targetPos, Math.min(lerpSpeed, 0.1));
    currentLookAt.current.lerp(targetLook, Math.min(lerpSpeed, 0.1));
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

