import { useState } from 'react';
import { useSaveDesign } from '../../../hooks/useDesigns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import type { DesignState } from '../../../state/dripify/designState';
import type { TextLayer } from '../../../backend';

interface SaveDesignButtonProps {
  designState: DesignState;
}

export default function SaveDesignButton({ designState }: SaveDesignButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const saveDesign = useSaveDesign();

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter a design name');
      return;
    }

    if (designState.textLayers.length === 0) {
      toast.error('Add at least one text layer to save');
      return;
    }

    try {
      const textLayers: TextLayer[] = designState.textLayers.map((layer) => ({
        text: layer.text,
        position: { x: layer.position.x, y: layer.position.y },
        fontSize: BigInt(layer.fontSize),
        color: layer.color,
        rotation: layer.rotation,
        fontFamily: layer.fontFamily,
        isBold: layer.isBold,
        isItalic: layer.isItalic,
        isUnderline: layer.isUnderline,
        textSpacing: BigInt(layer.textSpacing),
        shadow: layer.shadow,
      }));

      await saveDesign.mutateAsync({
        id: `design-${Date.now()}`,
        name: name.trim(),
        garmentType: designState.garmentType,
        textLayers,
      });

      toast.success('Design saved successfully!');
      setOpen(false);
      setName('');
    } catch (error) {
      toast.error('Failed to save design');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Design
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Design</DialogTitle>
          <DialogDescription>
            Give your design a name to save it to your collection.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="design-name">Design Name</Label>
          <Input
            id="design-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Awesome Design"
            className="mt-2"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saveDesign.isPending}>
            {saveDesign.isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
