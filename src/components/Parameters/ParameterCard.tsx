import React from 'react';
import { EnvironmentalParameter } from '../../types';
import { Info } from 'lucide-react';

interface ParameterCardProps {
  parameter: EnvironmentalParameter;
  isSelected: boolean;
  onClick: () => void;
}

export const ParameterCard: React.FC<ParameterCardProps> = ({
  parameter,
  isSelected,
  onClick,
}) => {
  const getQualityColor = (level: keyof typeof parameter.qualityThresholds) => {
    const colors = {
      excellent: 'bg-environmental-excellent',
      good: 'bg-environmental-good',
      medium: 'bg-environmental-medium',
      poor: 'bg-environmental-poor',
    };
    return colors[level];
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-lg border cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-primary-500 bg-primary-900/20 shadow-lg' 
          : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700'
        }
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-medium text-white">{parameter.name}</h4>
          <p className="text-sm text-gray-400">{parameter.unit}</p>
        </div>
        <div className="group relative">
          <Info className="h-4 w-4 text-gray-400 hover:text-white cursor-help" />
          <div className="absolute right-0 top-6 w-64 p-3 bg-gray-900 border border-gray-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
            <p className="text-xs text-gray-300 mb-2">{parameter.description}</p>
            <p className="text-xs text-gray-400">{parameter.scientificReference}</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-3 line-clamp-2">
        {parameter.description}
      </p>

      {/* Quality Indicators */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex space-x-1">
          {Object.entries(parameter.qualityThresholds).map(([level, value]) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-full ${getQualityColor(level as keyof typeof parameter.qualityThresholds)}`}
              title={`${level}: ${value} ${parameter.unit}`}
            />
          ))}
        </div>
        <span className="text-gray-500">
          0-{parameter.qualityThresholds.poor} {parameter.unit}
        </span>
      </div>
    </div>
  );
};