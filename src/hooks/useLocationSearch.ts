import { useState, useCallback } from 'react';
import { SearchResult } from '../types';
import { SEARCH_CONFIG } from '../constants/mapConfig';

export const useLocationSearch = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchLocation = useCallback(async (query: string): Promise<SearchResult[]> => {
    if (!query.trim()) {
      setResults([]);
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const url = new URL(SEARCH_CONFIG.nominatimUrl);
      url.searchParams.set('q', query);
      url.searchParams.set('format', SEARCH_CONFIG.format);
      url.searchParams.set('limit', SEARCH_CONFIG.limit.toString());
      url.searchParams.set('addressdetails', '1');

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      setResults(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    loading,
    results,
    error,
    searchLocation,
    clearResults,
  };
};