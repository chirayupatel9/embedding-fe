import axios from 'axios';
import { ApiResponse, Metadata, SpriteSheetMeta } from '../../types/embedding';
import { API_CONFIG } from './config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchEmbeddingsData = async (): Promise<Metadata> => {
  try {
    console.log('Attempting to fetch data from:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMBEDDINGS}`);
    
    // Fetch the API response with paths and data
    const { data: apiResponse } = await api.get<ApiResponse>(API_CONFIG.ENDPOINTS.EMBEDDINGS);
    
    if (!apiResponse?.itemsPath || !apiResponse?.spritePath) {
      throw new Error('Invalid API response: missing required paths');
    }

    // Make the sprite sheet URL absolute - include /api in the path
    const spriteSheetMeta = {
      ...apiResponse.spritePath,
      url: apiResponse.spritePath.url ? `${API_CONFIG.BASE_URL}${apiResponse.spritePath.url}` : undefined
    };

    // The itemsPath is already the data we need, and spritePath contains the sprite sheet metadata
    return {
      items: apiResponse.itemsPath,
      sprite_sheet: spriteSheetMeta as SpriteSheetMeta
    };
  } catch (error) {
    console.error('API Error:', error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error(`Request timeout - please try again. Could not connect to ${API_CONFIG.BASE_URL}`);
      }
      if (error.response) {
        throw new Error(`Server error: ${error.response.status} - ${error.response.data}`);
      }
      if (error.request) {
        throw new Error(`No response from server - please check if the server is running at ${API_CONFIG.BASE_URL}`);
      }
    }
    throw error instanceof Error ? error : new Error('Failed to fetch embeddings data');
  }
};