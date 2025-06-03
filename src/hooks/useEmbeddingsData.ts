import { useState, useEffect } from 'react';
import { Metadata, Point } from '../types/embedding';
import { fetchEmbeddingsData } from '../services/api/embeddings';
import { transformEmbeddingsData } from '../utils/dataTransformers';
import { API_CONFIG } from '../services/api/config';

export const useEmbeddingsData = (
  projectionType: string = API_CONFIG.PROJECTION_TYPE,
  modelType: string = API_CONFIG.DEFAULT_MODEL
) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const fetchdata = await fetchEmbeddingsData(projectionType, modelType);
        const transformedPoints = fetchdata.items //transformEmbeddingsData(fetchdata.items);

        setMetadata(fetchdata);
        setPoints(transformedPoints);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setPoints([]);
        setMetadata(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [projectionType, modelType]);

  return { points, isLoading, error, metadata };
};