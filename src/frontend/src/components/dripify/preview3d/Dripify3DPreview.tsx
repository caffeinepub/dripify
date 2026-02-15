import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GarmentType } from '../../../backend';
import type { TextLayerState } from '../../../state/dripify/designState';
import TShirtMock from './garments/TShirtMock';
import HoodieMock from './garments/HoodieMock';
import { Card } from '@/components/ui/card';
import { useDesignTexture } from './useDesignTexture';

interface Dripify3DPreviewProps {
  garmentType: GarmentType;
  textLayers: TextLayerState[];
}

export default function Dripify3DPreview({ garmentType, textLayers }: Dripify3DPreviewProps) {
  const designTexture = useDesignTexture(textLayers);

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium">3D Preview</h3>
      </div>
      <div className="flex-1 bg-gradient-to-br from-muted/50 to-muted">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, 3, -5]} intensity={0.5} />
          
          {garmentType === GarmentType.tShirt && <TShirtMock designTexture={designTexture} />}
          {garmentType === GarmentType.hoodie && <HoodieMock designTexture={designTexture} />}
        </Canvas>
      </div>
    </Card>
  );
}
