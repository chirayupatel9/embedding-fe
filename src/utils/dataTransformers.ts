import { EmbeddingItem, Point } from '../types/embedding';

export const transformEmbeddingsData = (items: EmbeddingItem[]): Point[] => {
  if (!items || !Array.isArray(items)) {
    console.error('Invalid items data:', items);
    return [];
  }

 

  const transformedPoints = items.map((item, index) => {
    // Validate embedding data
    if (!item.embedding || !Array.isArray(item.embedding)) {
      console.error('Missing or invalid embedding:', item);
      return null;
    }

    const [x, y] = item.embedding;
    
    // Validate coordinates
    if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
      console.error('Invalid coordinates:', { x, y, item });
      return null;
    }

    return {
      id: index,
      x,
      y,
      category: item.category || 'unknown',
      spriteX: item.spriteX ?? 0,
      spriteY: item.spriteY ?? 0,
      embedding: item.embedding,
      originalItem: item
    };
  }).filter((point): point is Point => point !== null);

  return transformedPoints;
};