import type { TextLayerState } from '../../../state/dripify/designState';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface LayersPanelProps {
  textLayers: TextLayerState[];
  activeLayerId: string | null;
  onAddLayer: () => void;
  onSelectLayer: (id: string) => void;
  onDeleteLayer: (id: string) => void;
  onReorderLayer: (id: string, direction: 'up' | 'down') => void;
}

export default function LayersPanel({
  textLayers,
  activeLayerId,
  onAddLayer,
  onSelectLayer,
  onDeleteLayer,
  onReorderLayer,
}: LayersPanelProps) {
  return (
    <Card className="p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Layers</h3>
        <Button size="sm" onClick={onAddLayer}>
          <Plus className="w-4 h-4 mr-1" />
          Add Layer
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {textLayers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No layers yet. Add one to get started!
            </p>
          ) : (
            textLayers.map((layer, index) => (
              <div
                key={layer.id}
                className={`p-3 rounded border cursor-pointer transition-colors ${
                  layer.id === activeLayerId
                    ? 'border-lime-400 bg-lime-400/10'
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => onSelectLayer(layer.id)}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{layer.text || 'Empty Text'}</p>
                    <p className="text-xs text-muted-foreground">
                      {layer.fontFamily} • {layer.fontSize}px
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReorderLayer(layer.id, 'up');
                      }}
                      disabled={index === textLayers.length - 1}
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReorderLayer(layer.id, 'down');
                      }}
                      disabled={index === 0}
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteLayer(layer.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
