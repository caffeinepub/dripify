import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HoodieMockProps {
  designTexture: THREE.Texture | null;
}

export default function HoodieMock({ designTexture }: HoodieMockProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 2.8, 0.4]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Design area */}
      <mesh position={[0, 0.3, 0.21]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial
          map={designTexture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hood */}
      <mesh position={[0, 1.6, -0.1]}>
        <boxGeometry args={[1.2, 0.8, 0.8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Left sleeve */}
      <mesh position={[-1.4, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.9, 0.7, 0.4]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Right sleeve */}
      <mesh position={[1.4, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.9, 0.7, 0.4]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Pocket */}
      <mesh position={[0, -0.5, 0.21]}>
        <boxGeometry args={[1.2, 0.6, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Drawstrings */}
      <mesh position={[-0.2, 1.4, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.2, 1.4, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
