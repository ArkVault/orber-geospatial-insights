export const MAP_CONFIG = {
  center: [20.2967, -103.2441] as [number, number], // Lago de Chapala, Mexico
  zoom: 11, // Zoom level to show the full lake
  minZoom: 2,
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors',
};

export const TILE_LAYERS = {
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
  cartoDB: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© OpenStreetMap contributors © CARTO',
  },
  openStreetMap: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
  },
};

export const SEARCH_CONFIG = {
  nominatimUrl: 'https://nominatim.openstreetmap.org/search',
  limit: 5,
  format: 'json',
};