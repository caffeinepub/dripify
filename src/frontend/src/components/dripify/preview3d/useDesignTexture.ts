import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { TextLayerState } from '../../../state/dripify/designState';

export function useDesignTexture(textLayers: TextLayerState[]): THREE.Texture | null {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
      canvasRef.current.width = 512;
      canvasRef.current.height = 512;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw text layers
    textLayers.forEach((layer) => {
      ctx.save();
      
      // Scale positions to texture size
      const x = (layer.position.x / 600) * canvas.width;
      const y = (layer.position.y / 400) * canvas.height;
      
      ctx.translate(x, y);
      ctx.rotate((layer.rotation * Math.PI) / 180);

      // Apply shadow
      if (layer.shadow.blurRadius > 0) {
        ctx.shadowColor = `rgb(${layer.shadow.color.red}, ${layer.shadow.color.green}, ${layer.shadow.color.blue})`;
        ctx.shadowBlur = layer.shadow.blurRadius;
        ctx.shadowOffsetX = layer.shadow.offsetX;
        ctx.shadowOffsetY = layer.shadow.offsetY;
      }

      // Set font
      let fontStyle = '';
      if (layer.isItalic) fontStyle += 'italic ';
      if (layer.isBold) fontStyle += 'bold ';
      ctx.font = `${fontStyle}${layer.fontSize}px ${layer.fontFamily}`;
      ctx.fillStyle = `rgb(${layer.color.red}, ${layer.color.green}, ${layer.color.blue})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw text
      ctx.fillText(layer.text, 0, 0);

      ctx.restore();
    });

    // Create or update texture
    const newTexture = new THREE.CanvasTexture(canvas);
    newTexture.needsUpdate = true;
    setTexture(newTexture);

    return () => {
      newTexture.dispose();
    };
  }, [textLayers]);

  return texture;
}
