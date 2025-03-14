export interface ApiResponse {
  spritePath: string;
  itemsPath: {
    items: EmbeddingItem[];
  };
}

export interface EmbeddingItem {
  image_id: string;
  embedding: number[];
  label: number;
  category: string;
  spriteX: number;
  spriteY: number;
}

export interface SpriteSheetMeta {
  width: number;
  height: number;
  sprite_width: number;
  sprite_height: number;
}

export interface Point {
  id: number;
  x: number;
  y: number;
  category: string;
  spriteX: number;
  spriteY: number;
  image_id: string;
  originalItem: EmbeddingItem;
}