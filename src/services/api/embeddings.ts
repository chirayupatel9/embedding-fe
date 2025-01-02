import axios from 'axios';
import { ApiResponse, Metadata } from '../../types/embedding';
import { API_CONFIG, IS_DEVELOPMENT } from './config';
import { mockMetadata } from '../../utils/mockData';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchEmbeddingsData = async (): Promise<Metadata> => {
  if (IS_DEVELOPMENT) {
    return Promise.resolve(mockMetadata);
  }

  try {
    // First, fetch the API response with paths
    const { data: apiResponse } = await api.get<ApiResponse>(API_CONFIG.ENDPOINTS.EMBEDDINGS);
    
    if (!apiResponse?.itemsPath || !apiResponse?.spritePath) {
      throw new Error('Invalid API response: missing required paths');
    }

    // Then fetch the metadata using the provided path
    const { data: metadata } = await api.get<Metadata>(apiResponse.itemsPath);
    
    if (!metadata?.items || !metadata?.sprite_sheet) {
      throw new Error('Invalid metadata format');
    }

    // Combine the metadata with the sprite path
    return {
      ...metadata,
      sprite_sheet: {
        ...metadata.sprite_sheet,
        url: apiResponse.spritePath
      }
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - please try again');
      }
      if (error.response) {
        throw new Error(`Server error: ${error.response.status}`);
      }
      if (error.request) {
        throw new Error('No response from server - please check your connection');
      }
    }
    throw error instanceof Error ? error : new Error('Failed to fetch embeddings data');
  }
};