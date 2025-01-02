import { useState, useEffect } from 'react';
import { Metadata, Point } from '../types/embedding';
import { fetchEmbeddingsData } from '../services/api/embeddings';
import { transformEmbeddingsData } from '../utils/dataTransformers';

export const useEmbeddingsData = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchEmbeddingsData();
        
        if (!data?.items) {
          throw new Error('Invalid data format: missing items');
        }

        const transformedPoints = transformEmbeddingsData(data.items);

        setMetadata(data);
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
  }, []);

  return { points, isLoading, error, metadata };
};