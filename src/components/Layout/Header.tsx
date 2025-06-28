import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Activity, Search, Bell, User, X } from 'lucide-react';
import { useLocationSearch } from '../../hooks/useLocationSearch';
import { SearchResult } from '../../types';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onSearchToggle: () => void;
  searchOpen: boolean;
  onLocationSelect?: (lat: number, lng: number, name: string) => void;
  onDateToggle: () => void;
  onSensorsToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  onSearchToggle,
  searchOpen,
  onLocationSelect,
  onDateToggle,
  onSensorsToggle
}) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { loading, results, searchLocation, clearResults } = useLocationSearch();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

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
    onLocationSelect?.(lat, lng, result.display_name);
    setQuery('');
    setShowResults(false);
    onSearchToggle();
  };

  const handleSearchClose = () => {
    setQuery('');
    setShowResults(false);
    clearResults();
    onSearchToggle();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-header p-6 pointer-events-none">
      <header className="bg-black/30 backdrop-blur-md border border-white/10 px-6 py-3 flex items-center justify-between rounded-2xl pointer-events-auto">
        {/* Left - Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white/80"></div>
          </div>
          <h1 className="text-lg font-semibold text-white">
            Orber
          </h1>
        </div>
        
        {/* Center - Navigation or Search */}
        {searchOpen ? (
          <div className="flex-1 max-w-md mx-8 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search locations..."
                className="w-full pl-10 pr-10 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm text-sm"
              />
              <button
                onClick={handleSearchClose}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* Search Results Dropdown */}
            {(showResults || loading) && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-black/90 backdrop-blur-md border border-white/20 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                {loading && (
                  <div className="p-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <p className="text-white/70 mt-2 text-sm">Searching...</p>
                  </div>
                )}
                
                {showResults && results.length > 0 && (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result)}
                        className="w-full p-3 text-left hover:bg-white/10 transition-colors flex items-start space-x-3"
                      >
                        <MapPin className="h-4 w-4 text-white/70 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {result.display_name}
                          </p>
                          <p className="text-white/50 text-xs">
                            {result.lat}, {result.lon}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {showResults && results.length === 0 && !loading && query.trim() && (
                  <div className="p-4 text-center">
                    <p className="text-white/70 text-sm">No locations found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <nav className="flex items-center space-x-2">
            <button 
              onClick={onDateToggle}
              className="flex items-center space-x-2 text-white/80 hover:text-white px-4 py-2 rounded-xl hover:bg-white/5 transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Dates</span>
            </button>
            
            <button 
              onClick={onSensorsToggle}
              className="flex items-center space-x-2 text-white/80 hover:text-white px-4 py-2 rounded-xl hover:bg-white/5 transition-all"
            >
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Sensors</span>
            </button>
          </nav>
        )}

        {/* Right - User Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onSearchToggle}
            className={`p-2 transition-colors rounded-xl ${
              searchOpen 
                ? 'text-white bg-white/10' 
                : 'text-white/80 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          
          <button className="p-2 text-white/80 hover:text-white transition-colors rounded-xl hover:bg-white/5">
            <Bell className="h-5 w-5" />
          </button>
          
          <div className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      </header>
    </div>
  );
};