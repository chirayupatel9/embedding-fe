export interface ApiResponse {
  itemsPath: EmbeddingItem[];  // The actual data array
  spritePath: SpriteSheetMeta; // Sprite sheet metadata
}

export interface SpriteSheetMeta {
  columns: number;
  rows: number;
  width: number;
  height: number;
  sprite_width: number;
  sprite_height: number;
  url?: string;
}

export interface EmbeddingItem {
  embedding: number[];
  label: number;
  category: string;
  spriteX: number;
  spriteY: number;
}

export interface Metadata {
  items: EmbeddingItem[];
  sprite_sheet: SpriteSheetMeta;
}

export interface Point {
  id: number;
  x: number;
  y: number;
  category: string;
  spriteX: number;
  spriteY: number;
  embedding: number[];
  originalItem: EmbeddingItem;
}

export interface ImageDetails {
  image_id: string;
  document_details: any;
  image_url?: string;
}