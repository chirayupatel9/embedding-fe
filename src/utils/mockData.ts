import { ApiResponse, Metadata } from '../types/embedding';
const apiUrl = import.meta.env.VITE_API_URL;
const generateMockItems = (count: number) => {
  const items = [];
  const categories = ['tomato', 'metal', 'plastic', 'paper'];
  const spriteSize = 32; // 10x10 grid
  
  for (let i = 0; i < count; i++) {
    items.push({
      embedding: [
        Math.random() * 800, // Scale to canvas width
        Math.random() * 600  // Scale to canvas height
      ],
      label: i,
      category: categories[Math.floor(Math.random() * categories.length)],
      spriteX: i % spriteSize,
      spriteY: Math.floor(i / spriteSize) % spriteSize
    });
  }
  return items;
};

export const mockMetadata: Metadata = {
  items: generateMockItems(10000),
  sprite_sheet: {
    columns: 10,
    rows: 10,
    width: 3200,
    height: 3200,
    sprite_width: 32,
    sprite_height: 32,
    url: `${apiUrl}/output/sprite_sheet.png`
  }
};

export const mockApiResponse: ApiResponse = {
  itemsPath: `${apiUrl}/data/metadata.json`,
  spritePath: `${apiUrl}/output/sprite_sheet.png`
};