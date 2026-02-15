import { GarmentType } from '../../backend';

export interface TextLayerState {
  id: string;
  text: string;
  position: { x: number; y: number };
  fontSize: number;
  color: { red: number; green: number; blue: number };
  rotation: number;
  fontFamily: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  textSpacing: number;
  shadow: {
    offsetX: number;
    offsetY: number;
    blurRadius: number;
    color: { red: number; green: number; blue: number };
  };
}

export interface DesignState {
  garmentType: GarmentType;
  textLayers: TextLayerState[];
  activeLayerId: string | null;
}

let layerCounter = 0;

export function createTextLayer(): TextLayerState {
  layerCounter++;
  return {
    id: `layer-${Date.now()}-${layerCounter}`,
    text: 'New Text',
    position: { x: 150, y: 150 },
    fontSize: 48,
    color: { red: 255, green: 255, blue: 255 },
    rotation: 0,
    fontFamily: 'Inter',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    textSpacing: 0,
    shadow: {
      offsetX: 0,
      offsetY: 0,
      blurRadius: 0,
      color: { red: 0, green: 0, blue: 0 },
    },
  };
}

export function updateTextLayer(
  layer: TextLayerState,
  updates: Partial<TextLayerState>
): TextLayerState {
  return { ...layer, ...updates };
}

export function deleteTextLayer(layers: TextLayerState[], id: string): TextLayerState[] {
  return layers.filter((layer) => layer.id !== id);
}

export function reorderTextLayer(
  layers: TextLayerState[],
  id: string,
  direction: 'up' | 'down'
): TextLayerState[] {
  const index = layers.findIndex((layer) => layer.id === id);
  if (index === -1) return layers;

  const newLayers = [...layers];
  if (direction === 'up' && index < layers.length - 1) {
    [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
  } else if (direction === 'down' && index > 0) {
    [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
  }
  return newLayers;
}
