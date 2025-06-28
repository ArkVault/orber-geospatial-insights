import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useLocationSearch } from '../../hooks/useLocationSearch';
import { SearchResult } from '../../types';

interface LocationSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (lat: number, lng: number, name: string) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
}) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { loading, results, searchLocation, clearResults } = useLocationSearch();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      await searchLocation(searchQuery);
      setShowResults(true);
    } else {
      setShowResults(false);
      clearResults();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    onLocationSelect(lat, lng, result.display_name);
    setQuery('');
    setShowResults(false);
    onClose();
  };

  const handleClose = () => {
    setQuery('');
    setShowResults(false);
    clearResults();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-search w-96 pointer-events-auto">
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search locations..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
            />
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-white/70 hover:text-white rounded-xl transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading && (
          <div className="text-center py-6">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <p className="text-white/70 mt-2">Searching...</p>
          </div>
        )}

        {showResults && results.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => handleResultClick(result)}
                className="w-full p-3 text-left hover:bg-white/10 rounded-xl transition-colors flex items-start space-x-3"
              >
                <MapPin className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {result.display_name}
                  </p>
                  <p className="text-white/50 text-sm">
                    {result.lat}, {result.lon}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {showResults && results.length === 0 && !loading && query.trim() && (
          <div className="text-center py-6">
            <p className="text-white/70">No locations found</p>
          </div>
        )}
      </div>
    </div>
  );
};