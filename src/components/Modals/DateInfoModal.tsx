import React from 'react';
import { X, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface DateInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
}

export const DateInfoModal: React.FC<DateInfoModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal flex items-center justify-center pointer-events-auto">
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl w-96 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-white" />
            <h3 className="text-xl font-semibold text-white">Image Analysis Date</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-xl transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
            <div className="text-lg font-semibold text-white mb-2">
              Current Analysis Date
            </div>
            <div className="text-2xl font-bold text-orange-400">
              {format(selectedDate, 'MMMM dd, yyyy')}
            </div>
            <div className="text-sm text-white/70 mt-1">
              {format(selectedDate, 'EEEE, HH:mm')} UTC
            </div>
          </div>

          <div className="text-sm text-white/80 leading-relaxed">
            This date represents when the satellite imagery was captured and processed. 
            Environmental data shown on the map corresponds to conditions observed on this specific date.
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/70">
              <strong className="text-white/90">Data Source:</strong> Copernicus Sentinel-2 satellite imagery
            </div>
            <div className="text-sm text-white/70 mt-2">
              <strong className="text-white/90">Temporal Resolution:</strong> 5-day revisit cycle
            </div>
            <div className="text-sm text-white/70 mt-2">
              <strong className="text-white/90">Processing Level:</strong> Level-2A (atmospherically corrected)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};