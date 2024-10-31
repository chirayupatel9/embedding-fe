export interface EmbeddingItem {
  embedding: number[];
  label: number;
  category: string;
  sprite_path: string;
}

export interface Point {
  id: number;
  x: number;
  y: number;
  category: string;
  spritePath: string;
  originalItem: EmbeddingItem;
}