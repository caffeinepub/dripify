import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TShirtMockProps {
  designTexture: THREE.Texture | null;
}

export default function TShirtMock({ designTexture }: TShirtMockProps) {
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
        <boxGeometry args={[2, 2.5, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Design area */}
      <mesh position={[0, 0.2, 0.16]}>
        <planeGeometry args={[1.4, 1.4]} />
        <meshStandardMaterial
          map={designTexture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Left sleeve */}
      <mesh position={[-1.3, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.8, 0.6, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Right sleeve */}
      <mesh position={[1.3, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.8, 0.6, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Collar */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.6, 0.15, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
