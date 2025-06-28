import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import { MAP_CONFIG, TILE_LAYERS } from '../../constants/mapConfig';
import { EnvironmentalParameter, PixelData } from '../../types';
import { DataInfoPanel } from './DataInfoPanel';
import { MapControls } from './MapControls';
import { DrawingControls } from './DrawingControls';
import { PixelValueDisplay } from './PixelValueDisplay';

// Fix Leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  selectedParameter: EnvironmentalParameter;
  onPixelClick: (lat: number, lng: number) => void;
  pixelData: PixelData | null;
  onLocationSelect: (lat: number, lng: number) => void;
  onMapClick?: () => void;
  showParameterInfo: boolean;
  onCloseParameterInfo: () => void;
  pixelClickData: {lat: number, lng: number} | null;
  onClosePixelDisplay: () => void;
}

// Component to handle map events
const MapEventHandler: React.FC<{ 
  onPixelClick: (lat: number, lng: number) => void;
  onMapClick?: () => void;
  selectedParameter: EnvironmentalParameter;
}> = ({ onPixelClick, onMapClick, selectedParameter }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      
      // Only trigger pixel click for non-natural-color parameters
      if (selectedParameter.id !== 'natural-color') {
        onPixelClick(lat, lng);
      }
      
      onMapClick?.();
    },
  });
  return null;
};

// Component to handle WMS layer - restored to original working version
const WMSLayer: React.FC<{ parameter: EnvironmentalParameter }> = ({ parameter }) => {
  const map = useMap();
  const layerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    // Remove existing layer
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    // Only add WMS layer for non-natural-color parameters
    if (parameter.id !== 'natural-color') {
      console.log(`Loading WMS layer: ${parameter.wmsLayer} for parameter: ${parameter.name}`);
      
      // Create WMS layer using the original working configuration
      const wmsLayer = L.tileLayer.wms(parameter.wmsUrl, {
        layers: parameter.wmsLayer,
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        attribution: 'Copernicus Sentinel data',
        opacity: 0.8,
        crs: L.CRS.EPSG4326,
        // Use minimal cloud coverage for clearest imagery
        maxcc: 10,
      });

      // Add error and success handling
      wmsLayer.on('tileerror', (error) => {
        console.warn(`WMS tile error for ${parameter.name}:`, error);
      });

      wmsLayer.on('tileload', () => {
        console.log(`WMS tile loaded successfully for ${parameter.name}`);
      });

      layerRef.current = wmsLayer;
      wmsLayer.addTo(map);
      
      // Ensure WMS layer is above base layer but below UI elements
      wmsLayer.setZIndex(10);
    }

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, parameter.id, parameter.name, parameter.wmsLayer, parameter.wmsUrl]);

  return null;
};

// Map reference handler component
const MapRefHandler: React.FC<{ onMapReady: (map: L.Map) => void }> = ({ onMapReady }) => {
  const map = useMap();
  
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  
  return null;
};

export const Map = forwardRef<any, MapProps>(({
  selectedParameter,
  onPixelClick,
  pixelData,
  onLocationSelect,
  onMapClick,
  showParameterInfo,
  onCloseParameterInfo,
  pixelClickData,
  onClosePixelDisplay,
}, ref) => {
  const [baseLayer, setBaseLayer] = useState<'cartoDB' | 'satellite' | 'openStreetMap'>('satellite');
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  useImperativeHandle(ref, () => ({
    setView: (center: [number, number], zoom: number) => {
      if (mapInstance) {
        mapInstance.setView(center, zoom);
      }
    },
    getMap: () => mapInstance,
  }));

  const handleLocationSelect = (lat: number, lng: number) => {
    onLocationSelect(lat, lng);
  };

  const handleMapReady = (map: L.Map) => {
    setMapInstance(map);
    
    // Ensure proper z-index layering
    const mapContainer = map.getContainer();
    if (mapContainer) {
      mapContainer.style.zIndex = '1';
    }
  };

  return (
    <div className="relative flex-1 h-full z-map">
      <MapContainer
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.zoom}
        className="h-full w-full z-map"
        zoomControl={false}
        crs={L.CRS.EPSG3857}
        style={{ zIndex: 1 }}
      >
        <TileLayer
          url={TILE_LAYERS[baseLayer].url}
          attribution={TILE_LAYERS[baseLayer].attribution}
          maxZoom={18}
          zIndex={1}
        />
        
        <WMSLayer parameter={selectedParameter} />
        <MapEventHandler 
          onPixelClick={onPixelClick} 
          onMapClick={onMapClick} 
          selectedParameter={selectedParameter}
        />
        <DrawingControls />
        <MapRefHandler onMapReady={handleMapReady} />
        
        <MapControls
          baseLayer={baseLayer}
          onBaseLayerChange={setBaseLayer}
          parameter={selectedParameter}
          onLocationSelect={handleLocationSelect}
        />
      </MapContainer>

      {showParameterInfo && (
        <DataInfoPanel
          parameter={selectedParameter}
          onClose={onCloseParameterInfo}
        />
      )}

      {pixelClickData && selectedParameter.id !== 'natural-color' && (
        <PixelValueDisplay
          lat={pixelClickData.lat}
          lng={pixelClickData.lng}
          parameter={selectedParameter}
          onClose={onClosePixelDisplay}
        />
      )}
    </div>
  );
});

Map.displayName = 'Map';