import React from 'react';
import { Eye, Droplets, Wind, Waves, Flame, Layers, ChevronRight } from 'lucide-react';
import { ENVIRONMENTAL_PARAMETERS } from '../../constants/environmentalParameters';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  selectedParameter: string;
  onParameterChange: (parameterId: string) => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const getParameterIcon = (id: string) => {
  const icons = {
    'natural-color': Eye,
    'chlorophyll-a': Droplets,
    'dissolved-oxygen': Wind,
    'total-suspended-solids': Layers,
    'turbidity': Waves,
    'forest-fire': Flame,
  };
  return icons[id as keyof typeof icons] || Eye;
};

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onToggle,
  selectedParameter,
  onParameterChange,
  selectedDate,
  onDateChange,
}) => {
  return (
    <>
      {/* Arrow Toggle Button - Always centered vertically */}
      <button
        onClick={onToggle}
        className="fixed top-1/2 left-6 transform -translate-y-1/2 z-sidebar-toggle p-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-black/30 transition-all duration-300 pointer-events-auto"
        title={isOpen ? "Hide indicators" : "Show indicators"}
      >
        <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Sidebar Panel - Centered vertically when open */}
      <div className={`
        fixed top-1/2 left-6 transform -translate-y-1/2 z-sidebar w-80 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl
        transition-all duration-300 ease-in-out pointer-events-auto
        ${isOpen ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-full opacity-0 scale-95 pointer-events-none'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Indicators</h2>
        </div>

        {/* Scrollable content */}
        <div className="max-h-96 overflow-y-auto p-6 space-y-3">
          {ENVIRONMENTAL_PARAMETERS.map((parameter) => {
            const Icon = getParameterIcon(parameter.id);
            const isSelected = selectedParameter === parameter.id;
            
            return (
              <button
                key={parameter.id}
                onClick={() => onParameterChange(parameter.id)}
                className={`
                  w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center space-x-3
                  ${isSelected 
                    ? 'bg-white/20 text-white border border-white/30' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
                  }
                `}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{parameter.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};