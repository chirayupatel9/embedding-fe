export interface ApiResponse {
  itemsPath: string;  // Path to metadata.json
  spritePath: string; // Path to sprite_sheet.png
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
  image_id: string;
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
  image_id: string;
  originalItem: EmbeddingItem;
}
export interface ImageDetails {
  image_id: string;
  document_details: any;
}