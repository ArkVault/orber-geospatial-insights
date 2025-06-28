import React from 'react';

interface ParameterLoaderProps {
  isVisible: boolean;
}

export const ParameterLoader: React.FC<ParameterLoaderProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-loader flex items-center justify-center pointer-events-auto">
      <div className="warp-loader">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="core-glow"></div>
      </div>
    </div>
  );
};