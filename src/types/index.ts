export interface EnvironmentalParameter {
  id: string;
  name: string;
  unit: string;
  description: string;
  wmsLayer: string;
  wmsUrl: string;
  qualityThresholds: {
    excellent: number;
    good: number;
    medium: number;
    poor: number;
  };
  colorScale: {
    colors: string[];
    values: number[];
  };
  scientificReference: string;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface PixelData {
  parameter: string;
  value: number;
  quality: 'excellent' | 'good' | 'medium' | 'poor' | 'critical';
  coordinates: [number, number];
  timestamp: string;
}

export interface DrawnArea {
  id: string;
  name: string;
  coordinates: number[][];
  area: number;
  createdAt: string;
}

export interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
  boundingbox: string[];
}

export interface WMSLayer {
  url: string;
  layers: string;
  format: string;
  transparent: boolean;
  version: string;
  attribution: string;
}