import React from 'react';
import { X } from 'lucide-react';
import { EnvironmentalParameter } from '../../types';

interface DataInfoPanelProps {
  parameter: EnvironmentalParameter;
  onClose: () => void;
}

const GradientBar: React.FC<{ parameter: EnvironmentalParameter }> = ({ parameter }) => {
  const getGradientConfig = (id: string) => {
    switch (id) {
      case 'chlorophyll-a':
        return {
          gradient: 'linear-gradient(to top, #22c55e 0%, #84cc16 25%, #eab308 50%, #f97316 75%, #dc2626 100%)',
          min: 0,
          max: 10,
          middle: 5,
          unit: 'mg/m³'
        };
      case 'dissolved-oxygen':
        return {
          gradient: 'linear-gradient(to top, #dc2626 0%, #f97316 25%, #eab308 50%, #84cc16 75%, #22c55e 100%)',
          min: 0,
          max: 14,
          middle: 7,
          unit: 'mg/L'
        };
      case 'total-suspended-solids':
        return {
          gradient: 'linear-gradient(to top, #fef08a 0%, #eab308 25%, #f97316 50%, #ea580c 75%, #c2410c 100%)',
          min: 0,
          max: 100,
          middle: 50,
          unit: 'mg/L'
        };
      case 'turbidity':
        return {
          gradient: 'linear-gradient(to top, #ea580c 0%, #f97316 20%, #eab308 40%, #8b5cf6 70%, #581c87 100%)',
          min: 0,
          max: 50,
          middle: 25,
          unit: 'NTU'
        };
      case 'forest-fire':
        return null; // No gradient bar for forest fire
      default:
        return null;
    }
  };

  const config = getGradientConfig(parameter.id);
  
  if (!config) return null;

  return (
    <div className="flex items-start space-x-6 mb-6">
      {/* Gradient Bar */}
      <div className="flex items-center space-x-3">
        <div className="flex flex-col items-end space-y-2 text-sm text-white font-medium">
          <span>{config.max}</span>
          {config.middle !== null && (
            <span style={{ marginTop: '60px' }}>{config.middle}</span>
          )}
          <span style={{ marginTop: config.middle !== null ? '60px' : '120px' }}>{config.min}</span>
        </div>
        
        <div 
          className="w-8 h-32 rounded-full border border-white/20"
          style={{ background: config.gradient }}
        />
        
        {/* Show unit only once at the middle position */}
        <div className="flex flex-col items-start justify-center h-32">
          <span className="text-sm text-white/70">{config.unit}</span>
        </div>
      </div>
    </div>
  );
};

const ForestFireLegend: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-red-500 rounded-full border border-white/20"></div>
        <span className="text-white font-medium">Active Fires</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-yellow-500 rounded-full border border-white/20"></div>
        <span className="text-white font-medium">Burned Areas</span>
      </div>
    </div>
  );
};

const getParameterDescription = (id: string): { text: string; reference: string } => {
  switch (id) {
    case 'chlorophyll-a':
      return {
        text: "Chlorophyll-a is the primary photosynthetic pigment found in all plants and algae. High concentrations in water bodies indicate algal blooms, which can affect water quality and ecosystem health. Regular monitoring helps identify potential eutrophication issues and assess the overall health of aquatic ecosystems.",
        reference: "Gitelson, A. A., et al. (2008). \"A simple semi-analytical model for remote estimation of chlorophyll-a in turbid waters.\" Remote Sensing of Environment, 112(9), 3582-3593."
      };
    case 'dissolved-oxygen':
      return {
        text: "Dissolved oxygen (DO) is essential for aquatic life and ecosystem health. Low DO levels can stress or kill fish and other organisms. Levels are affected by temperature, atmospheric pressure, biological activity, and water movement. Healthy water bodies typically maintain DO levels between 6-10 mg/L.",
        reference: "Diaz, R. J., & Rosenberg, R. (2008). \"Spreading dead zones and consequences for marine ecosystems.\" Science, 321(5891), 926-929."
      };
    case 'total-suspended-solids':
      return {
        text: "Total Suspended Solids (TSS) measures particles suspended in water, including sediment, algae, and organic matter. High TSS levels can reduce water clarity, affect aquatic life, and indicate pollution or erosion. Values range from 0 mg/L (clear water) to 100+ mg/L (highly turbid water). The gradient shows progression from clear yellow (minimum) through orange tones to dark orange (maximum).",
        reference: "Ritchie, J. C., et al. (2003). \"Remote sensing techniques to assess water quality.\" Photogrammetric Engineering & Remote Sensing, 69(6), 695-704."
      };
    case 'turbidity':
      return {
        text: "Turbidity measures water clarity and how much light can penetrate through water. It's affected by suspended particles like clay, silt, organic matter, and microorganisms. High turbidity can harm aquatic life by reducing light penetration, increasing water temperature, and decreasing dissolved oxygen levels. Values range from 0 NTU (crystal clear) to 50+ NTU (very turbid). The gradient progresses from dark orange (minimum clarity) through yellow and light purple to dark purple (maximum turbidity).",
        reference: "Kirk, J. T. O. (1994). \"Light and photosynthesis in aquatic ecosystems.\" Cambridge University Press, 3rd Edition."
      };
    case 'forest-fire':
      return {
        text: "Satellite-based monitoring of forest fires using thermal infrared detection. Red indicators show currently active fires with high thermal signatures, while yellow areas represent recently burned zones where vegetation has been consumed. This binary classification system is crucial for emergency response, evacuation planning, and forest management strategies.",
        reference: "Giglio, L., et al. (2016). \"Active fire detection and characterization with the MODIS sensor.\" Remote Sensing of Environment, 178, 31-41."
      };
    case 'natural-color':
      return {
        text: "Natural satellite imagery showing Earth as it appears to the human eye. This view helps identify surface features, vegetation patterns, and water bodies in their true colors using cloud-free imagery for optimal visibility.",
        reference: "ESA (2021). Sentinel-2 User Handbook. European Space Agency."
      };
    default:
      return {
        text: "Environmental parameter monitoring using satellite data.",
        reference: "Remote sensing data analysis."
      };
  }
};

export const DataInfoPanel: React.FC<DataInfoPanelProps> = ({
  parameter,
  onClose,
}) => {
  const description = getParameterDescription(parameter.id);
  const showGradientBar = parameter.id !== 'natural-color' && parameter.id !== 'forest-fire';
  const showForestFireLegend = parameter.id === 'forest-fire';

  return (
    <div className="fixed top-1/2 right-6 transform -translate-y-1/2 w-80 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl z-data-panel pointer-events-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">{parameter.name}</h3>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-xl transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="space-y-4">
          {/* Gradient Bar (for parameters with gradients) */}
          {showGradientBar && (
            <div className="flex justify-center">
              <GradientBar parameter={parameter} />
            </div>
          )}
          
          {/* Forest Fire Legend (for forest fire detection) */}
          {showForestFireLegend && (
            <div className="flex justify-center">
              <ForestFireLegend />
            </div>
          )}
          
          {/* Text Content */}
          <div className="space-y-4">
            <div className="text-sm text-white/80 leading-relaxed">
              {description.text}
            </div>

            <div className="text-xs text-white/50 italic bg-white/5 rounded-xl p-4 border border-white/10">
              <strong>Reference:</strong> {description.reference}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};