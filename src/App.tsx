import React, { useState, useRef } from 'react';
import { Header, Sidebar, Map, DateRangePicker, DateInfoModal, SensorsInfoModal, ParameterLoader, Badge } from './components';
import { useEnvironmentalData } from './hooks/useEnvironmentalData';
import { ENVIRONMENTAL_PARAMETERS } from './constants/environmentalParameters';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Open by default
  const [searchOpen, setSearchOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [dateInfoOpen, setDateInfoOpen] = useState(false);
  const [sensorsInfoOpen, setSensorsInfoOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(ENVIRONMENTAL_PARAMETERS[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showParameterInfo, setShowParameterInfo] = useState(true); // Show Natural Color info by default
  const [pixelClickData, setPixelClickData] = useState<{lat: number, lng: number} | null>(null);
  const [isLoadingParameter, setIsLoadingParameter] = useState(false);
  const mapRef = useRef<any>(null);
  
  const { pixelData, fetchPixelData, clearPixelData } = useEnvironmentalData();

  const currentParameter = ENVIRONMENTAL_PARAMETERS.find(p => p.id === selectedParameter)!;

  const handlePixelClick = async (lat: number, lng: number) => {
    await fetchPixelData(lat, lng, selectedParameter, selectedDate.toISOString());
    setPixelClickData({ lat, lng });
  };

  const handleLocationSelect = (lat: number, lng: number, name: string) => {
    // Center map on selected location
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 12);
    }
    console.log(`Selected location: ${name} at ${lat}, ${lng}`);
  };

  const handleMapLocationSelect = (lat: number, lng: number) => {
    console.log(`Map location: ${lat}, ${lng}`);
  };

  const handleMapClick = () => {
    // Only close overlays, not the parameter info panel
    if (sidebarOpen) setSidebarOpen(false);
    if (searchOpen) setSearchOpen(false);
    if (datePickerOpen) setDatePickerOpen(false);
    // Don't close showParameterInfo or pixelClickData on map click
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
    // Close other overlays
    if (searchOpen) setSearchOpen(false);
    if (datePickerOpen) setDatePickerOpen(false);
    if (showParameterInfo) setShowParameterInfo(false);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    // Close other overlays
    if (sidebarOpen) setSidebarOpen(false);
    if (datePickerOpen) setDatePickerOpen(false);
    if (showParameterInfo) setShowParameterInfo(false);
  };

  const handleDateToggle = () => {
    setDatePickerOpen(!datePickerOpen);
    // Close other overlays
    if (sidebarOpen) setSidebarOpen(false);
    if (searchOpen) setSearchOpen(false);
    if (showParameterInfo) setShowParameterInfo(false);
  };

  const handleDateInfoToggle = () => {
    setDateInfoOpen(!dateInfoOpen);
  };

  const handleSensorsInfoToggle = () => {
    setSensorsInfoOpen(!sensorsInfoOpen);
  };

  const handleParameterChange = (id: string) => {
    // Show loader
    setIsLoadingParameter(true);
    setShowParameterInfo(false);
    
    // Set loader to run for exactly 2 seconds
    setTimeout(() => {
      setSelectedParameter(id);
      clearPixelData();
      setShowParameterInfo(true);
      setPixelClickData(null);
      setIsLoadingParameter(false);
    }, 2000); // Exactly 2 seconds
  };

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onSearchToggle={handleSearchToggle}
        searchOpen={searchOpen}
        onLocationSelect={handleLocationSelect}
        onDateToggle={handleDateInfoToggle}
        onSensorsToggle={handleSensorsInfoToggle}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={handleSidebarToggle}
          selectedParameter={selectedParameter}
          onParameterChange={handleParameterChange}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        
        <main className="flex-1 overflow-hidden relative">
          {datePickerOpen && (
            <DateRangePicker
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setDatePickerOpen(false);
              }}
            />
          )}
          
          <Map
            ref={mapRef}
            selectedParameter={currentParameter}
            onPixelClick={handlePixelClick}
            pixelData={pixelData}
            onLocationSelect={handleMapLocationSelect}
            onMapClick={handleMapClick}
            showParameterInfo={showParameterInfo}
            onCloseParameterInfo={() => setShowParameterInfo(false)}
            pixelClickData={pixelClickData}
            onClosePixelDisplay={() => setPixelClickData(null)}
          />
        </main>
      </div>

      {/* Modals */}
      <DateInfoModal
        isOpen={dateInfoOpen}
        onClose={() => setDateInfoOpen(false)}
        selectedDate={selectedDate}
      />

      <SensorsInfoModal
        isOpen={sensorsInfoOpen}
        onClose={() => setSensorsInfoOpen(false)}
      />

      {/* Parameter Loading Animation - New Warp Loader */}
      <ParameterLoader isVisible={isLoadingParameter} />

      {/* Badge */}
      <Badge />
    </div>
  );
}

export default App;