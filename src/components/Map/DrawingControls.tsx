import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

export const DrawingControls: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Create custom drawing control with hidden default controls
    const drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#e1e100',
            message: '<strong>Error:</strong> shape edges cannot cross!',
          },
          shapeOptions: {
            color: '#3b82f6',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.2,
          },
        },
        rectangle: {
          shapeOptions: {
            color: '#3b82f6',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.2,
          },
        },
        circle: false,
        marker: false,
        circlemarker: false,
        polyline: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });

    // Hide the default drawing control toolbar
    const controlElement = drawControl.onAdd(map);
    if (controlElement) {
      controlElement.style.display = 'none';
    }

    // Handle drawing events
    map.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      drawnItems.addLayer(layer);
      
      // Calculate area for polygons
      if (layer instanceof L.Polygon) {
        const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        const areaInKm2 = (area / 1000000).toFixed(2);
        
        layer.bindPopup(`
          <div class="text-sm">
            <strong>Selected Area</strong><br>
            Area: ${areaInKm2} km²<br>
            <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
              Export KML
            </button>
          </div>
        `);
      }
    });

    return () => {
      if (controlElement) {
        map.removeControl(drawControl);
      }
      map.removeLayer(drawnItems);
    };
  }, [map]);

  return null;
};