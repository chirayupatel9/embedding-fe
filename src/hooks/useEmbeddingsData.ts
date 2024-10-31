import { useState, useEffect } from 'react';
import { EmbeddingItem, Point } from '../types/embedding';

const MOCK_API_DATA = {
  items: [
    {
      embedding: [11.247342109680176, 1.7719507217407227],
      label: 13,
      category: "cucumber",
      sprite_path: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=320&h=320&fit=crop"
    },
    {
      embedding: [8.123, 4.567],
      label: 14,
      category: "ginger",
      sprite_path: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=320&h=320&fit=crop"
    },
    // Add more mock items here
  ]
};

export const useEmbeddingsData = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In production, replace this with actual API call
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        const data = MOCK_API_DATA; // Simulated API response

        // Scale embeddings to fit the visualization space
        const scaledPoints = data.items.map((item: EmbeddingItem, index: number) => {
          // Scale factors can be adjusted based on your needs
          const scaleX = 800;
          const scaleY = 600;
          
          return {
            id: index,
            x: item.embedding[0] * (scaleX / 15), // Adjust scaling factor as needed
            y: item.embedding[1] * (scaleY / 15),
            category: item.category,
            spritePath: item.sprite_path,
            originalItem: item
          };
        });

        setPoints(scaledPoints);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { points, isLoading, error };
};