import { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useUserProfile';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import HeaderBar from './components/dripify/HeaderBar';
import AppLayout from './components/dripify/AppLayout';
import GarmentSelector from './components/dripify/GarmentSelector';
import DesignCanvas2D from './components/dripify/editor/DesignCanvas2D';
import TextLayerControls from './components/dripify/editor/TextLayerControls';
import LayersPanel from './components/dripify/editor/LayersPanel';
import Dripify3DPreview from './components/dripify/preview3d/Dripify3DPreview';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GarmentType } from './backend';
import type { DesignState, TextLayerState } from './state/dripify/designState';
import { createTextLayer, updateTextLayer, deleteTextLayer, reorderTextLayer } from './state/dripify/designState';

function App() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  const [designState, setDesignState] = useState<DesignState>({
    garmentType: GarmentType.tShirt,
    textLayers: [],
    activeLayerId: null,
  });

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleGarmentChange = (garmentType: GarmentType) => {
    setDesignState((prev) => ({ ...prev, garmentType }));
  };

  const handleAddLayer = () => {
    const newLayer = createTextLayer();
    setDesignState((prev) => ({
      ...prev,
      textLayers: [...prev.textLayers, newLayer],
      activeLayerId: newLayer.id,
    }));
  };

  const handleUpdateLayer = (id: string, updates: Partial<TextLayerState>) => {
    setDesignState((prev) => ({
      ...prev,
      textLayers: prev.textLayers.map((layer) =>
        layer.id === id ? updateTextLayer(layer, updates) : layer
      ),
    }));
  };

  const handleDeleteLayer = (id: string) => {
    setDesignState((prev) => {
      const newLayers = prev.textLayers.filter((layer) => layer.id !== id);
      return {
        ...prev,
        textLayers: newLayers,
        activeLayerId: prev.activeLayerId === id ? (newLayers[0]?.id || null) : prev.activeLayerId,
      };
    });
  };

  const handleSelectLayer = (id: string) => {
    setDesignState((prev) => ({ ...prev, activeLayerId: id }));
  };

  const handleReorderLayer = (id: string, direction: 'up' | 'down') => {
    setDesignState((prev) => ({
      ...prev,
      textLayers: reorderTextLayer(prev.textLayers, id, direction),
    }));
  };

  const handleLoadDesign = (loadedState: DesignState) => {
    setDesignState(loadedState);
  };

  const activeLayer = designState.textLayers.find((layer) => layer.id === designState.activeLayerId);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AppLayout>
        <HeaderBar designState={designState} onLoadDesign={handleLoadDesign} />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {!isAuthenticated && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 max-w-md px-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-400 to-amber-400 bg-clip-text text-transparent">
                  Welcome to Dripify
                </h1>
                <p className="text-muted-foreground text-lg">
                  Create stunning clothing designs with 3D previews and custom typography.
                  Login to get started.
                </p>
              </div>
            </div>
          )}

          {isAuthenticated && (
            <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
              {/* Left Panel - Editor */}
              <div className="flex-1 flex flex-col gap-4 min-h-0">
                <GarmentSelector
                  selectedGarment={designState.garmentType}
                  onGarmentChange={handleGarmentChange}
                />

                <Tabs defaultValue="editor" className="flex-1 flex flex-col min-h-0">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="preview">3D Preview</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="editor" className="flex-1 flex flex-col gap-4 min-h-0 mt-4">
                    <div className="flex-1 min-h-0">
                      <DesignCanvas2D
                        textLayers={designState.textLayers}
                        activeLayerId={designState.activeLayerId}
                        onSelectLayer={handleSelectLayer}
                        onUpdateLayer={handleUpdateLayer}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <LayersPanel
                        textLayers={designState.textLayers}
                        activeLayerId={designState.activeLayerId}
                        onAddLayer={handleAddLayer}
                        onSelectLayer={handleSelectLayer}
                        onDeleteLayer={handleDeleteLayer}
                        onReorderLayer={handleReorderLayer}
                      />
                      
                      {activeLayer && (
                        <TextLayerControls
                          layer={activeLayer}
                          onUpdateLayer={(updates) => handleUpdateLayer(activeLayer.id, updates)}
                        />
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="flex-1 min-h-0 mt-4 lg:hidden">
                    <Dripify3DPreview
                      garmentType={designState.garmentType}
                      textLayers={designState.textLayers}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Panel - 3D Preview (Desktop) */}
              <div className="hidden lg:block lg:w-1/2 xl:w-2/5">
                <Dripify3DPreview
                  garmentType={designState.garmentType}
                  textLayers={designState.textLayers}
                />
              </div>
            </div>
          )}
        </main>

        <ProfileSetupDialog open={showProfileSetup} />
        <Toaster />
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
