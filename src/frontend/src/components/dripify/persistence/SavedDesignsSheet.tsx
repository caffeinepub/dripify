import { useState } from 'react';
import { useListMyDesigns, useDeleteDesign, useRenameDesign } from '../../../hooks/useDesigns';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FolderOpen, Trash2, Edit2, Download } from 'lucide-react';
import { toast } from 'sonner';
import type { Design } from '../../../backend';
import type { DesignState } from '../../../state/dripify/designState';

interface SavedDesignsSheetProps {
  onLoadDesign: (state: DesignState) => void;
}

export default function SavedDesignsSheet({ onLoadDesign }: SavedDesignsSheetProps) {
  const [open, setOpen] = useState(false);
  const [renameDialog, setRenameDialog] = useState<{ open: boolean; design: Design | null }>({
    open: false,
    design: null,
  });
  const [newName, setNewName] = useState('');

  const { data: designs = [], isLoading } = useListMyDesigns();
  const deleteDesign = useDeleteDesign();
  const renameDesign = useRenameDesign();

  const handleLoad = (design: Design) => {
    const state: DesignState = {
      garmentType: design.garmentType,
      textLayers: design.textLayers.map((layer) => ({
        id: `layer-${Date.now()}-${Math.random()}`,
        text: layer.text,
        position: layer.position,
        fontSize: Number(layer.fontSize),
        color: layer.color,
        rotation: layer.rotation,
        fontFamily: layer.fontFamily,
        isBold: layer.isBold,
        isItalic: layer.isItalic,
        isUnderline: layer.isUnderline,
        textSpacing: Number(layer.textSpacing),
        shadow: layer.shadow,
      })),
      activeLayerId: null,
    };
    onLoadDesign(state);
    setOpen(false);
    toast.success(`Loaded "${design.name}"`);
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteDesign.mutateAsync(id);
      toast.success(`Deleted "${name}"`);
    } catch (error) {
      toast.error('Failed to delete design');
      console.error(error);
    }
  };

  const handleRename = async () => {
    if (!renameDialog.design || !newName.trim()) return;

    try {
      await renameDesign.mutateAsync({
        id: renameDialog.design.id,
        newName: newName.trim(),
      });
      toast.success('Design renamed successfully');
      setRenameDialog({ open: false, design: null });
      setNewName('');
    } catch (error) {
      toast.error('Failed to rename design');
      console.error(error);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">
            <FolderOpen className="w-4 h-4 mr-2" />
            My Designs
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>My Designs</SheetTitle>
            <SheetDescription>
              Load, rename, or delete your saved designs.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-12rem)] mt-6">
            {isLoading ? (
              <p className="text-sm text-muted-foreground text-center py-8">Loading...</p>
            ) : designs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No saved designs yet. Create and save your first design!
              </p>
            ) : (
              <div className="space-y-3">
                {designs.map((design) => (
                  <div key={design.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div>
                      <h4 className="font-medium">{design.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {design.textLayers.length} layer{design.textLayers.length !== 1 ? 's' : ''} •{' '}
                        {new Date(Number(design.createdAt) / 1000000).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleLoad(design)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Load
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setRenameDialog({ open: true, design });
                          setNewName(design.name);
                        }}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(design.id, design.name)}
                        disabled={deleteDesign.isPending}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Dialog open={renameDialog.open} onOpenChange={(open) => setRenameDialog({ open, design: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Design</DialogTitle>
            <DialogDescription>
              Enter a new name for "{renameDialog.design?.name}".
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New design name"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialog({ open: false, design: null })}>
              Cancel
            </Button>
            <Button onClick={handleRename} disabled={renameDesign.isPending}>
              {renameDesign.isPending ? 'Renaming...' : 'Rename'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
