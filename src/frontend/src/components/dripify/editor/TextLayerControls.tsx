import type { TextLayerState } from '../../../state/dripify/designState';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline } from 'lucide-react';
import FontPicker from './FontPicker';

interface TextLayerControlsProps {
  layer: TextLayerState;
  onUpdateLayer: (updates: Partial<TextLayerState>) => void;
}

export default function TextLayerControls({ layer, onUpdateLayer }: TextLayerControlsProps) {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    onUpdateLayer({ color: { red: r, green: g, blue: b } });
  };

  const colorHex = `#${layer.color.red.toString(16).padStart(2, '0')}${layer.color.green.toString(16).padStart(2, '0')}${layer.color.blue.toString(16).padStart(2, '0')}`;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-sm font-medium">Text Properties</h3>

      <div className="space-y-2">
        <Label htmlFor="text">Text</Label>
        <Input
          id="text"
          value={layer.text}
          onChange={(e) => onUpdateLayer({ text: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Font</Label>
        <FontPicker
          selectedFont={layer.fontFamily}
          onFontChange={(fontFamily) => onUpdateLayer({ fontFamily })}
        />
      </div>

      <div className="space-y-2">
        <Label>Font Size: {layer.fontSize}px</Label>
        <Slider
          value={[layer.fontSize]}
          onValueChange={([fontSize]) => onUpdateLayer({ fontSize })}
          min={12}
          max={120}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label>Rotation: {layer.rotation}°</Label>
        <Slider
          value={[layer.rotation]}
          onValueChange={([rotation]) => onUpdateLayer({ rotation })}
          min={-180}
          max={180}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <div className="flex gap-2">
          <Input
            id="color"
            type="color"
            value={colorHex}
            onChange={handleColorChange}
            className="w-20 h-10 p-1 cursor-pointer"
          />
          <Input value={colorHex} readOnly className="flex-1" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Text Style</Label>
        <div className="flex gap-2">
          <Button
            variant={layer.isBold ? 'default' : 'outline'}
            size="icon"
            onClick={() => onUpdateLayer({ isBold: !layer.isBold })}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant={layer.isItalic ? 'default' : 'outline'}
            size="icon"
            onClick={() => onUpdateLayer({ isItalic: !layer.isItalic })}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant={layer.isUnderline ? 'default' : 'outline'}
            size="icon"
            onClick={() => onUpdateLayer({ isUnderline: !layer.isUnderline })}
          >
            <Underline className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
