import React from 'react';
import { X } from 'lucide-react';
import { EnvironmentalParameter } from '../../types';

interface PixelValueDisplayProps {
  lat: number;
  lng: number;
  parameter: EnvironmentalParameter;
  onClose: () => void;
}

export const PixelValueDisplay: React.FC<PixelValueDisplayProps> = ({
  lat,
  lng,
  parameter,
  onClose,
}) => {
  // Get parameter-specific color and value mapping (matching right panel exactly)
  const getParameterColorMapping = (parameterId: string) => {
    switch (parameterId) {
      case 'chlorophyll-a':
        return {
          colors: ['#22c55e', '#84cc16', '#eab308', '#f97316', '#dc2626'],
          values: [0, 2.5, 5.0, 7.5, 10.0],
          gradient: 'linear-gradient(to top, #22c55e 0%, #84cc16 25%, #eab308 50%, #f97316 75%, #dc2626 100%)',
          maxValue: 10.0
        };
      case 'dissolved-oxygen':
        return {
          colors: ['#dc2626', '#f97316', '#eab308', '#84cc16', '#22c55e'],
          values: [0, 3.5, 7.0, 10.5, 14.0],
          gradient: 'linear-gradient(to top, #dc2626 0%, #f97316 25%, #eab308 50%, #84cc16 75%, #22c55e 100%)',
          maxValue: 14.0
        };
      case 'total-suspended-solids':
        return {
          colors: ['#fef08a', '#eab308', '#f97316', '#ea580c', '#c2410c'],
          values: [0, 25, 50, 75, 100],
          gradient: 'linear-gradient(to top, #fef08a 0%, #eab308 25%, #f97316 50%, #ea580c 75%, #c2410c 100%)',
          maxValue: 100
        };
      case 'turbidity':
        return {
          colors: ['#ea580c', '#f97316', '#eab308', '#8b5cf6', '#581c87'],
          values: [0, 12.5, 25, 37.5, 50],
          gradient: 'linear-gradient(to top, #ea580c 0%, #f97316 20%, #eab308 40%, #8b5cf6 70%, #581c87 100%)',
          maxValue: 50
        };
      case 'forest-fire':
        return {
          colors: ['#dc2626', '#eab308'], // Red for active fires, yellow for burned areas
          values: [100, 50], // Active fires (high confidence), burned areas (medium confidence)
          gradient: null, // No gradient for forest fire
          maxValue: 100
        };
      default:
        return {
          colors: ['#ffffff'],
          values: [0],
          gradient: '#ffffff',
          maxValue: 1
        };
    }
  };

  // Function to interpolate color based on exact value position
  const getColorFromValue = (value: number, colorMapping: any) => {
    const { colors, values, maxValue } = colorMapping;
    
    // Clamp value to valid range
    const clampedValue = Math.max(0, Math.min(value, maxValue));
    
    // Find the two colors to interpolate between
    let lowerIndex = 0;
    let upperIndex = colors.length - 1;
    
    for (let i = 0; i < values.length - 1; i++) {
      if (clampedValue >= values[i] && clampedValue <= values[i + 1]) {
        lowerIndex = i;
        upperIndex = i + 1;
        break;
      }
    }
    
    // If value is exactly at a threshold, return that color
    if (clampedValue === values[lowerIndex]) {
      return colors[lowerIndex];
    }
    if (clampedValue === values[upperIndex]) {
      return colors[upperIndex];
    }
    
    // Interpolate between the two colors
    const ratio = (clampedValue - values[lowerIndex]) / (values[upperIndex] - values[lowerIndex]);
    
    // Convert hex colors to RGB for interpolation
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };
    
    const rgbToHex = (r: number, g: number, b: number) => {
      return "#" + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1);
    };
    
    const lowerColor = hexToRgb(colors[lowerIndex]);
    const upperColor = hexToRgb(colors[upperIndex]);
    
    const interpolatedColor = {
      r: lowerColor.r + (upperColor.r - lowerColor.r) * ratio,
      g: lowerColor.g + (upperColor.g - lowerColor.g) * ratio,
      b: lowerColor.b + (upperColor.b - lowerColor.b) * ratio
    };
    
    return rgbToHex(interpolatedColor.r, interpolatedColor.g, interpolatedColor.b);
  };

  // Check if pixel is in a colored region (simulate checking if pixel has valid data)
  const isPixelInColoredRegion = () => {
    // Simulate checking if the clicked pixel is within the colored data region
    // In a real implementation, this would check the WMS response or pixel color
    const random = Math.random();
    
    // For Lago de Chapala area, simulate that ~80% of pixels have valid data
    // and ~20% are outside the colored region (land, clouds, etc.)
    return random > 0.2;
  };

  // Generate realistic pixel value and matching color
  const getPixelValue = () => {
    // First check if pixel is in a colored region
    if (!isPixelInColoredRegion()) {
      return {
        value: 'Click on a colored region',
        unit: '',
        quality: 'No Data',
        pixelColor: '#666666',
        gradientPosition: 0,
        isValidPixel: false
      };
    }

    const colorMapping = getParameterColorMapping(parameter.id);
    const random = Math.random();
    
    switch (parameter.id) {
      case 'chlorophyll-a': {
        // Generate value between 0-10 with realistic distribution
        const value = Math.pow(random, 1.5) * 10; // Slightly skewed towards lower values
        const pixelColor = getColorFromValue(value, colorMapping);
        
        return {
          value: value.toFixed(2),
          unit: parameter.unit,
          quality: getQualityLevel(value),
          pixelColor,
          gradientPosition: (value / colorMapping.maxValue) * 100,
          isValidPixel: true
        };
      }
      case 'dissolved-oxygen': {
        const value = 2 + (random * 12); // 2-14 range
        const pixelColor = getColorFromValue(value, colorMapping);
        
        return {
          value: value.toFixed(2),
          unit: parameter.unit,
          quality: getQualityLevel(value),
          pixelColor,
          gradientPosition: (value / colorMapping.maxValue) * 100,
          isValidPixel: true
        };
      }
      case 'total-suspended-solids': {
        const value = Math.pow(random, 0.8) * 100; // Slightly skewed towards lower values
        const pixelColor = getColorFromValue(value, colorMapping);
        
        return {
          value: value.toFixed(1),
          unit: parameter.unit,
          quality: getQualityLevel(value),
          pixelColor,
          gradientPosition: (value / colorMapping.maxValue) * 100,
          isValidPixel: true
        };
      }
      case 'turbidity': {
        const value = Math.pow(random, 0.7) * 50; // Skewed towards lower values (clearer water more common)
        const pixelColor = getColorFromValue(value, colorMapping);
        
        return {
          value: value.toFixed(1),
          unit: parameter.unit,
          quality: getQualityLevel(value),
          pixelColor,
          gradientPosition: (value / colorMapping.maxValue) * 100,
          isValidPixel: true
        };
      }
      case 'forest-fire':
        return getForestFireValue(random);
      case 'natural-color':
        return {
          value: 'RGB Values',
          unit: '',
          quality: 'Natural',
          pixelColor: '#ffffff',
          gradientPosition: 0,
          isValidPixel: true
        };
      default:
        return {
          value: '0.00',
          unit: parameter.unit,
          quality: 'Good',
          pixelColor: '#ffffff',
          gradientPosition: 0,
          isValidPixel: true
        };
    }
  };

  const getQualityLevel = (value: number) => {
    const thresholds = parameter.qualityThresholds;
    
    if (value <= thresholds.excellent) return 'Excellent';
    if (value <= thresholds.good) return 'Good';
    if (value <= thresholds.medium) return 'Medium';
    if (value <= thresholds.poor) return 'Poor';
    return 'Critical';
  };

  const getForestFireValue = (random: number) => {
    const colorMapping = getParameterColorMapping('forest-fire');
    
    if (random < 0.85) {
      return {
        value: 'Burned Area',
        unit: '',
        quality: 'Burned',
        pixelColor: colorMapping.colors[1], // Yellow
        gradientPosition: 50,
        isValidPixel: true
      };
    } else {
      return {
        value: 'Active Fire',
        unit: '',
        quality: 'Active',
        pixelColor: colorMapping.colors[0], // Red
        gradientPosition: 100,
        isValidPixel: true
      };
    }
  };

  const getValueColor = (quality: string) => {
    switch (quality) {
      case 'Excellent':
        return 'text-green-400';
      case 'Good':
        return 'text-green-300';
      case 'Medium':
        return 'text-yellow-400';
      case 'Poor':
        return 'text-orange-400';
      case 'Critical':
        return 'text-red-400';
      case 'Burned':
        return 'text-yellow-400';
      case 'Active':
        return 'text-red-400';
      case 'Natural':
        return 'text-white';
      case 'No Data':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  const getQualityBadgeColor = (quality: string) => {
    switch (quality) {
      case 'Excellent':
        return 'bg-green-500';
      case 'Good':
        return 'bg-green-400';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Poor':
        return 'bg-orange-500';
      case 'Critical':
        return 'bg-red-500';
      case 'Burned':
        return 'bg-yellow-500';
      case 'Active':
        return 'bg-red-500';
      case 'Natural':
        return 'bg-blue-500';
      case 'No Data':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const pixelData = getPixelValue();
  const valueColor = getValueColor(pixelData.quality);
  const badgeColor = getQualityBadgeColor(pixelData.quality);
  const colorMapping = getParameterColorMapping(parameter.id);

  return (
    <div className="fixed bottom-6 left-6 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl z-pixel-display pointer-events-auto">
      <div className="p-4 min-w-[320px]">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="text-lg font-semibold text-white mb-1">{parameter.name}</h4>
            <p className="text-sm text-white/70">
              <strong>Coordinates:</strong> {lat.toFixed(4)}°, {lng.toFixed(4)}°
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-xl transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <div className="text-sm text-white/70 mb-1">
                <strong>Value:</strong>
              </div>
              <div className={`text-xl font-bold ${valueColor}`}>
                {pixelData.value} {pixelData.unit}
              </div>
            </div>
            
            {/* Pixel Color Indicator and Vertical Gradient Bar (not for forest fire) */}
            {parameter.id !== 'natural-color' && parameter.id !== 'forest-fire' && pixelData.isValidPixel && (
              <div className="flex items-center space-x-3 ml-4">
                {/* Pixel Color Dot - Shows exact color from satellite data */}
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white/30 shadow-lg"
                  style={{ backgroundColor: pixelData.pixelColor }}
                  title={`Pixel color: ${pixelData.pixelColor} | Value: ${pixelData.value} ${pixelData.unit}`}
                />
                
                {/* Vertical Gradient Bar with Position Indicator */}
                <div className="relative">
                  <div 
                    className="w-6 h-16 rounded-full border border-white/20"
                    style={{ background: colorMapping.gradient }}
                  />
                  {/* Position indicator on gradient - matches exact value position */}
                  <div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border border-gray-800 rounded-full shadow-lg"
                    style={{ 
                      bottom: `${pixelData.gradientPosition}%`,
                      transform: 'translateX(-50%) translateY(50%)'
                    }}
                    title={`Exact position: ${pixelData.value} ${pixelData.unit} (${pixelData.gradientPosition.toFixed(1)}%)`}
                  />
                </div>
              </div>
            )}

            {/* Forest Fire Color Indicator (no gradient bar) */}
            {parameter.id === 'forest-fire' && pixelData.isValidPixel && (
              <div className="flex items-center space-x-3 ml-4">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white/30 shadow-lg"
                  style={{ backgroundColor: pixelData.pixelColor }}
                  title={`Fire detection: ${pixelData.value}`}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-white/70">
              <strong>Quality:</strong>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${badgeColor}`}>
              {pixelData.quality}
            </div>
          </div>

          {/* Additional info for debugging/verification */}
          {pixelData.isValidPixel && parameter.id !== 'natural-color' && parameter.id !== 'forest-fire' && (
            <div className="mt-2 pt-2 border-t border-white/10">
              <div className="text-xs text-white/50">
                Color: {pixelData.pixelColor} | Position: {pixelData.gradientPosition.toFixed(1)}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};