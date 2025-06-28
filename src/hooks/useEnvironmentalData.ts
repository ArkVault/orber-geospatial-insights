import { useState, useCallback } from 'react';
import { PixelData, EnvironmentalParameter } from '../types';
import { ENVIRONMENTAL_PARAMETERS } from '../constants/environmentalParameters';

export const useEnvironmentalData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pixelData, setPixelData] = useState<PixelData | null>(null);

  const getQualityLevel = (value: number, parameter: EnvironmentalParameter): PixelData['quality'] => {
    const { qualityThresholds } = parameter;
    
    if (value <= qualityThresholds.excellent) return 'excellent';
    if (value <= qualityThresholds.good) return 'good';
    if (value <= qualityThresholds.medium) return 'medium';
    if (value <= qualityThresholds.poor) return 'poor';
    return 'critical';
  };

  const fetchPixelData = useCallback(async (
    lat: number,
    lng: number,
    parameterId: string,
    date?: string
  ): Promise<PixelData | null> => {
    setLoading(true);
    setError(null);

    try {
      const parameter = ENVIRONMENTAL_PARAMETERS.find(p => p.id === parameterId);
      if (!parameter) {
        throw new Error('Parameter not found');
      }

      // Simulate API call - in production, this would call WMS GetFeatureInfo
      const simulatedValue = Math.random() * parameter.qualityThresholds.poor * 1.5;
      
      const data: PixelData = {
        parameter: parameter.name,
        value: simulatedValue,
        quality: getQualityLevel(simulatedValue, parameter),
        coordinates: [lat, lng],
        timestamp: date || new Date().toISOString(),
      };

      setPixelData(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch pixel data';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearPixelData = useCallback(() => {
    setPixelData(null);
    setError(null);
  }, []);

  return {
    loading,
    error,
    pixelData,
    fetchPixelData,
    clearPixelData,
  };
};