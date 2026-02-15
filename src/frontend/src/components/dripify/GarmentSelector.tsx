import { GarmentType } from '../../backend';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GarmentSelectorProps {
  selectedGarment: GarmentType;
  onGarmentChange: (garment: GarmentType) => void;
}

const garments = [
  { type: GarmentType.tShirt, label: 'T-Shirt', thumbPosition: 'left' },
  { type: GarmentType.hoodie, label: 'Hoodie', thumbPosition: 'right' },
];

export default function GarmentSelector({ selectedGarment, onGarmentChange }: GarmentSelectorProps) {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-3">Select Garment</h3>
      <div className="grid grid-cols-2 gap-3">
        {garments.map((garment) => (
          <Button
            key={garment.type}
            variant={selectedGarment === garment.type ? 'default' : 'outline'}
            className="h-auto flex flex-col items-center gap-2 p-3"
            onClick={() => onGarmentChange(garment.type)}
          >
            <div className="w-full h-20 bg-muted rounded overflow-hidden relative">
              <img
                src="/assets/generated/garment-thumbs.dim_1024x512.png"
                alt={garment.label}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: garment.thumbPosition === 'left' ? 'left center' : 'right center',
                }}
              />
            </div>
            <span className="text-sm font-medium">{garment.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
