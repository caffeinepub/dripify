import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ChevronDown } from 'lucide-react';
import { fontRegistry } from '../../../fonts/fontRegistry';

interface FontPickerProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
}

export default function FontPicker({ selectedFont, onFontChange }: FontPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'modern' | 'vintage' | 'urban'>('all');

  const filteredFonts = useMemo(() => {
    let fonts = fontRegistry;
    
    if (category !== 'all') {
      fonts = fonts.filter((font) => font.category === category);
    }
    
    if (search) {
      fonts = fonts.filter((font) =>
        font.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return fonts;
  }, [category, search]);

  const selectedFontData = fontRegistry.find((f) => f.fontFamily === selectedFont);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span style={{ fontFamily: selectedFont }}>
            {selectedFontData?.name || selectedFont}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Tabs value={category} onValueChange={(v) => setCategory(v as any)}>
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="modern">Modern</TabsTrigger>
            <TabsTrigger value="vintage">Vintage</TabsTrigger>
            <TabsTrigger value="urban">Urban</TabsTrigger>
          </TabsList>
          <TabsContent value={category} className="mt-0">
            <Command>
              <CommandInput
                placeholder="Search fonts..."
                value={search}
                onValueChange={setSearch}
              />
              <CommandList>
                <CommandEmpty>No fonts found.</CommandEmpty>
                <CommandGroup>
                  {filteredFonts.map((font) => (
                    <CommandItem
                      key={font.fontFamily}
                      value={font.name}
                      onSelect={() => {
                        onFontChange(font.fontFamily);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          selectedFont === font.fontFamily ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      <span style={{ fontFamily: font.fontFamily }}>{font.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
