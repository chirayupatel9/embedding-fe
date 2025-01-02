import { EmbeddingItem, Point } from '../types/embedding';

export const transformEmbeddingsData = (items: EmbeddingItem[]): Point[] => {
  return items.map((item, index) => ({
    id: index,
    x: item.embedding[0],
    y: item.embedding[1],
    category: item.category,
    spriteX: item.spriteX,
    spriteY: item.spriteY,
    originalItem: item
  }));
};