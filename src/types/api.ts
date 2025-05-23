export interface ApiResponse {
  spritePath: string;
  itemsPath: {
    items: EmbeddingItem[];
  };
}

export interface EmbeddingItem {
  embedding: number[];
  label: number;
  category: string;
  spriteX: number;
  spriteY: number;
  image_id: number;
}

export interface SpriteSheetMeta {
  width: number;
  height: number;
  sprite_width: number;
  sprite_height: number;
}

export interface Point {
  image_id: number;
  x: number;
  y: number;
  category: string;
  spriteX: number;
  spriteY: number;
  originalItem: EmbeddingItem;
}