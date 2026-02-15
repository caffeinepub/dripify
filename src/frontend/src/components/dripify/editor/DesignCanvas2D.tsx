import { useRef, useEffect, useState } from 'react';
import type { TextLayerState } from '../../../state/dripify/designState';
import { Card } from '@/components/ui/card';

interface DesignCanvas2DProps {
  textLayers: TextLayerState[];
  activeLayerId: string | null;
  onSelectLayer: (id: string) => void;
  onUpdateLayer: (id: string, updates: Partial<TextLayerState>) => void;
}

export default function DesignCanvas2D({
  textLayers,
  activeLayerId,
  onSelectLayer,
  onUpdateLayer,
}: DesignCanvas2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw text layers
    textLayers.forEach((layer) => {
      ctx.save();
      ctx.translate(layer.position.x, layer.position.y);
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

      // Draw selection box if active
      if (layer.id === activeLayerId) {
        const metrics = ctx.measureText(layer.text);
        const width = metrics.width;
        const height = layer.fontSize;
        
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#a3e635';
        ctx.lineWidth = 2;
        ctx.strokeRect(-width / 2 - 5, -height / 2 - 5, width + 10, height + 10);
      }

      ctx.restore();
    });
  }, [textLayers, activeLayerId]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on a layer
    for (let i = textLayers.length - 1; i >= 0; i--) {
      const layer = textLayers[i];
      const dx = x - layer.position.x;
      const dy = y - layer.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < layer.fontSize) {
        onSelectLayer(layer.id);
        setIsDragging(true);
        setDragStart({ x: dx, y: dy });
        return;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !activeLayerId) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    onUpdateLayer(activeLayerId, {
      position: { x: x - dragStart.x, y: y - dragStart.y },
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Card className="p-4 h-full flex flex-col">
      <h3 className="text-sm font-medium mb-3">Design Canvas</h3>
      <div ref={containerRef} className="flex-1 flex items-center justify-center bg-muted rounded overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="max-w-full max-h-full cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </Card>
  );
}
