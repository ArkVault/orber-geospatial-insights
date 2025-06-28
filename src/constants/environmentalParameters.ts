import { EnvironmentalParameter } from '../types';

export const ENVIRONMENTAL_PARAMETERS: EnvironmentalParameter[] = [
  {
    id: 'natural-color',
    name: 'Natural Color',
    unit: 'RGB',
    description: 'True-color satellite imagery showing natural surface features, vegetation, water bodies, and land use patterns.',
    wmsLayer: 'SENTINEL-2-L2A',
    wmsUrl: 'https://sh.dataspace.copernicus.eu/ogc/wms/fd8fbb51-cfdf-460d-9839-6dc55ee39ffa',
    qualityThresholds: {
      excellent: 255,
      good: 200,
      medium: 150,
      poor: 100,
    },
    colorScale: {
      colors: ['#000000', '#FFFFFF'],
      values: [0, 255],
    },
    scientificReference: 'ESA (2021). Sentinel-2 User Handbook. European Space Agency.',
  },
  {
    id: 'chlorophyll-a',
    name: 'Chlorophyll-a',
    unit: 'mg/m³',
    description: 'Measure of algal biomass and water quality indicator. High levels indicate eutrophication and potential algal blooms.',
    wmsLayer: 'CHLA',
    wmsUrl: 'https://sh.dataspace.copernicus.eu/ogc/wms/fd8fbb51-cfdf-460d-9839-6dc55ee39ffa',
    qualityThresholds: {
      excellent: 2.5,
      good: 5.0,
      medium: 7.5,
      poor: 10.0,
    },
    colorScale: {
      colors: ['#22c55e', '#84cc16', '#eab308', '#f97316', '#dc2626'],
      values: [0, 2.5, 5.0, 7.5, 10.0],
    },
    scientificReference: 'IOCCG (2014). Phytoplankton Functional Types from Space. International Ocean-Colour Coordinating Group.',
  },
  {
    id: 'dissolved-oxygen',
    name: 'Dissolved Oxygen',
    unit: 'mg/L',
    description: 'Critical for aquatic life survival. Low levels indicate pollution or eutrophication, affecting fish and ecosystem health.',
    wmsLayer: 'DISSOLVED-OXYGEN',
    wmsUrl: 'https://sh.dataspace.copernicus.eu/ogc/wms/fd8fbb51-cfdf-460d-9839-6dc55ee39ffa',
    qualityThresholds: {
      excellent: 8.0,
      good: 6.0,
      medium: 4.0,
      poor: 2.0,
    },
    colorScale: {
      colors: ['#dc2626', '#f97316', '#eab308', '#84cc16', '#22c55e'],
      values: [0, 2, 4, 6, 8],
    },
    scientificReference: 'EPA (2012). Water Quality Standards for Dissolved Oxygen. US Environmental Protection Agency.',
  },
  {
    id: 'total-suspended-solids',
    name: 'Total Suspended Solids',
    unit: 'mg/L',
    description: 'Particles suspended in water affecting clarity and light penetration. High levels indicate erosion or pollution.',
    wmsLayer: 'TSS-2025',
    wmsUrl: 'https://sh.dataspace.copernicus.eu/ogc/wms/fd8fbb51-cfdf-460d-9839-6dc55ee39ffa',
    qualityThresholds: {
      excellent: 30,
      good: 50,
      medium: 70,
      poor: 100,
    },
    colorScale: {
      colors: ['#fef08a', '#eab308', '#f97316', '#ea580c', '#c2410c'],
      values: [0, 25, 50, 75, 100],
    },
    scientificReference: 'Ritchie, J. C., et al. (2003). "Remote sensing techniques to assess water quality." Photogrammetric Engineering & Remote Sensing, 69(6), 695-704.',
  },
  {
    id: 'turbidity',
    name: 'Turbidity',
    unit: 'NTU',
    description: 'Measure of water clarity. High turbidity reduces light penetration, affecting aquatic photosynthesis and visibility.',
    wmsLayer: 'TURBIDITY',
    wmsUrl: 'https://sh.dataspace.copernicus.eu/ogc/wms/fd8fbb51-cfdf-460d-9839-6dc55ee39ffa',
    qualityThresholds: {
      excellent: 15,
      good: 25,
      medium: 35,
      poor: 50,
    },
    colorScale: {
      colors: ['#ea580c', '#f97316', '#eab308', '#8b5cf6', '#581c87'],
      values: [0, 12.5, 25, 37.5, 50],
    },
    scientificReference: 'ISO 7027-1:2016. Water quality - Determination of turbidity. International Organization for Standardization.',
  },
  {
    id: 'forest-fire',
    name: 'Forest Fire Detection',
    unit: 'Confidence %',
    description: 'Active fire detection and burned area mapping using thermal infrared data. Critical for wildfire monitoring.',
    wmsLayer: 'INCENDIOS-FORESTALES',
    wmsUrl: 'https://sh.dataspace.copernicus.eu/ogc/wms/fd8fbb51-cfdf-460d-9839-6dc55ee39ffa',
    qualityThresholds: {
      excellent: 90,
      good: 70,
      medium: 50,
      poor: 30,
    },
    colorScale: {
      colors: ['#22c55e', '#eab308', '#dc2626'],
      values: [0, 50, 100],
    },
    scientificReference: 'Justice, C.O. et al. (2002). The MODIS fire products. Remote Sensing of Environment, 83(1-2), 244-262.',
  },
];

export const WMS_BASE_URL = 'https://sh.dataspace.copernicus.eu/ogc/wms/fd8fbb51-cfdf-460d-9839-6dc55ee39ffa';
export const COPERNICUS_WMS_URL = 'https://sh.dataspace.copernicus.eu/ogc/wms/fd8fbb51-cfdf-460d-9839-6dc55ee39ffa';