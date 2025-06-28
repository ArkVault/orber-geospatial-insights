import React, { useState } from 'react';
import { Plus, Minus, Home, Edit3, Trash2, Square } from 'lucide-react';
import { EnvironmentalParameter } from '../../types';
import { useMap } from 'react-leaflet';

interface MapControlsProps {
  baseLayer: 'cartoDB' | 'satellite' | 'openStreetMap';
  onBaseLayerChange: (layer: 'cartoDB' | 'satellite' | 'openStreetMap') => void;
  parameter: EnvironmentalParameter;
  onLocationSelect: (lat: number, lng: number) => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  baseLayer,
  onBaseLayerChange,
  parameter,
  onLocationSelect,
}) => {
  const map = useMap();
  const [drawingMode, setDrawingMode] = useState<'none' | 'polygon' | 'rectangle'>('none');

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleResetView = () => {
    // Reset to Lago de Chapala, Mexico
    map.setView([20.2967, -103.2441], 11);
  };

  const handleDrawPolygon = () => {
    setDrawingMode(drawingMode === 'polygon' ? 'none' : 'polygon');
    // In a real implementation, this would trigger the drawing tool
    console.log('Toggle polygon drawing');
  };

  const handleDrawRectangle = () => {
    setDrawingMode(drawingMode === 'rectangle' ? 'none' : 'rectangle');
    // In a real implementation, this would trigger the drawing tool
    console.log('Toggle rectangle drawing');
  };

  const handleClearDrawings = () => {
    setDrawingMode('none');
    // In a real implementation, this would clear all drawings
    console.log('Clear all drawings');
  };

  return (
    <>
      {/* Zoom Controls - Bottom Right */}
      <div className="absolute bottom-6 right-6 z-map-controls flex flex-col space-y-2 pointer-events-auto">
        <button
          onClick={handleZoomIn}
          className="p-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-black/30 transition-colors"
          title="Zoom in"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-black/30 transition-colors"
          title="Zoom out"
        >
          <Minus className="h-5 w-5" />
        </button>
        <button
          onClick={handleResetView}
          className="p-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-black/30 transition-colors"
          title="Reset view"
        >
          <Home className="h-5 w-5" />
        </button>
      </div>

      {/* Drawing Tools - Bottom Right (to the left of zoom controls) */}
      <div className="absolute bottom-6 right-20 z-map-controls flex flex-col space-y-2 pointer-events-auto">
        <button
          onClick={handleDrawPolygon}
          className={`p-3 backdrop-blur-md border border-white/10 rounded-xl text-white transition-colors ${
            drawingMode === 'polygon' 
              ? 'bg-orange-500/30 border-orange-400/50' 
              : 'bg-black/20 hover:bg-black/30'
          }`}
          title="Draw polygon"
        >
          <Edit3 className="h-5 w-5" />
        </button>
        <button
          onClick={handleDrawRectangle}
          className={`p-3 backdrop-blur-md border border-white/10 rounded-xl text-white transition-colors ${
            drawingMode === 'rectangle' 
              ? 'bg-orange-500/30 border-orange-400/50' 
              : 'bg-black/20 hover:bg-black/30'
          }`}
          title="Draw rectangle"
        >
          <Square className="h-5 w-5" />
        </button>
        <button
          onClick={handleClearDrawings}
          className="p-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-black/30 transition-colors"
          title="Clear drawings"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};