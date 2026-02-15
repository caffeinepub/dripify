export interface FontInfo {
  name: string;
  fontFamily: string;
  category: 'modern' | 'vintage' | 'urban';
  available: boolean;
}

export const fontRegistry: FontInfo[] = [
  // Modern fonts
  { name: 'Inter', fontFamily: 'Inter, sans-serif', category: 'modern', available: true },
  { name: 'Roboto', fontFamily: 'Roboto, sans-serif', category: 'modern', available: true },
  { name: 'Montserrat', fontFamily: 'Montserrat, sans-serif', category: 'modern', available: true },
  { name: 'Poppins', fontFamily: 'Poppins, sans-serif', category: 'modern', available: true },
  { name: 'Raleway', fontFamily: 'Raleway, sans-serif', category: 'modern', available: true },
  { name: 'Open Sans', fontFamily: '"Open Sans", sans-serif', category: 'modern', available: true },
  { name: 'Lato', fontFamily: 'Lato, sans-serif', category: 'modern', available: true },
  { name: 'Nunito', fontFamily: 'Nunito, sans-serif', category: 'modern', available: true },
  { name: 'Work Sans', fontFamily: '"Work Sans", sans-serif', category: 'modern', available: true },
  { name: 'Manrope', fontFamily: 'Manrope, sans-serif', category: 'modern', available: true },

  // Vintage fonts
  { name: 'Playfair Display', fontFamily: '"Playfair Display", serif', category: 'vintage', available: true },
  { name: 'Merriweather', fontFamily: 'Merriweather, serif', category: 'vintage', available: true },
  { name: 'Libre Baskerville', fontFamily: '"Libre Baskerville", serif', category: 'vintage', available: true },
  { name: 'Crimson Text', fontFamily: '"Crimson Text", serif', category: 'vintage', available: true },
  { name: 'Cormorant', fontFamily: 'Cormorant, serif', category: 'vintage', available: true },
  { name: 'Spectral', fontFamily: 'Spectral, serif', category: 'vintage', available: true },
  { name: 'Lora', fontFamily: 'Lora, serif', category: 'vintage', available: true },
  { name: 'EB Garamond', fontFamily: '"EB Garamond", serif', category: 'vintage', available: true },
  { name: 'Cinzel', fontFamily: 'Cinzel, serif', category: 'vintage', available: true },
  { name: 'Abril Fatface', fontFamily: '"Abril Fatface", serif', category: 'vintage', available: true },

  // Urban fonts
  { name: 'Bebas Neue', fontFamily: '"Bebas Neue", sans-serif', category: 'urban', available: true },
  { name: 'Oswald', fontFamily: 'Oswald, sans-serif', category: 'urban', available: true },
  { name: 'Anton', fontFamily: 'Anton, sans-serif', category: 'urban', available: true },
  { name: 'Russo One', fontFamily: '"Russo One", sans-serif', category: 'urban', available: true },
  { name: 'Righteous', fontFamily: 'Righteous, sans-serif', category: 'urban', available: true },
  { name: 'Permanent Marker', fontFamily: '"Permanent Marker", cursive', category: 'urban', available: true },
  { name: 'Bangers', fontFamily: 'Bangers, cursive', category: 'urban', available: true },
  { name: 'Alfa Slab One', fontFamily: '"Alfa Slab One", serif', category: 'urban', available: true },
  { name: 'Black Ops One', fontFamily: '"Black Ops One", sans-serif', category: 'urban', available: true },
  { name: 'Bungee', fontFamily: 'Bungee, sans-serif', category: 'urban', available: true },
  { name: 'Fugaz One', fontFamily: '"Fugaz One", sans-serif', category: 'urban', available: true },
  { name: 'Rubik Mono One', fontFamily: '"Rubik Mono One", monospace', category: 'urban', available: true },
];
