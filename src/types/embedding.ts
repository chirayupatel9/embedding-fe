export interface EmbeddingItem {
  embedding: number[];
  label: number;
  category: string;
  spriteX: number;  // X position in sprite sheet
  spriteY: number;  // Y position in sprite sheet
}

export interface Point {
  id: number;
  x: number;
  y: number;
  category: string;
  spriteX: number;
  spriteY: number;
  originalItem: EmbeddingItem;
}