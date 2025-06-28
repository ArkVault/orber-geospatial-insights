import React from 'react';
import { X, Activity, Satellite } from 'lucide-react';

interface SensorsInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SensorsInfoModal: React.FC<SensorsInfoModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal flex items-center justify-center pointer-events-auto">
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl w-[500px] p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Activity className="h-6 w-6 text-white" />
            <h3 className="text-xl font-semibold text-white">Sentinel-2 Sensor Specifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-xl transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <Satellite className="h-8 w-8 text-orange-400" />
            <div>
              <div className="text-lg font-semibold text-white">Copernicus Sentinel-2</div>
              <div className="text-sm text-white/70">Multi-Spectral Instrument (MSI)</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="text-sm font-semibold text-white mb-2">Spatial Resolution</div>
              <div className="text-lg text-orange-400">10-60m</div>
              <div className="text-xs text-white/70">Depending on spectral band</div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="text-sm font-semibold text-white mb-2">Temporal Resolution</div>
              <div className="text-lg text-orange-400">5 days</div>
              <div className="text-xs text-white/70">Revisit cycle</div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="text-sm font-semibold text-white mb-2">Spectral Bands</div>
              <div className="text-lg text-orange-400">13 bands</div>
              <div className="text-xs text-white/70">443-2190 nm range</div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="text-sm font-semibold text-white mb-2">Swath Width</div>
              <div className="text-lg text-orange-400">290 km</div>
              <div className="text-xs text-white/70">Ground coverage</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/80 leading-relaxed mb-3">
              <strong className="text-white">Key Capabilities:</strong>
            </div>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• High-resolution optical imaging for land monitoring</li>
              <li>• Multi-spectral analysis for vegetation and water quality assessment</li>
              <li>• Atmospheric correction for accurate surface reflectance</li>
              <li>• Global coverage with systematic acquisition plan</li>
              <li>• Free and open data policy through Copernicus program</li>
            </ul>
          </div>

          <div className="text-xs text-white/50 italic">
            <strong>Reference:</strong> ESA (2021). Sentinel-2 User Handbook. European Space Agency.
          </div>
        </div>
      </div>
    </div>
  );
};