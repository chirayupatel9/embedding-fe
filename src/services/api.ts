import axios from 'axios';
import { ApiResponse, Metadata } from '../types/embedding';
import { mockMetadata } from '../utils/mockData';

const IS_DEVELOPMENT = import.meta.env.DEV;
const API_BASE_URL = 'http://localhost:8000/api';

export const fetchEmbeddingsData = async (): Promise<Metadata> => {
  if (IS_DEVELOPMENT) {
    return Promise.resolve(mockMetadata);
  }

  try {
    const { data: apiResponse } = await axios.get<ApiResponse>(`${API_BASE_URL}/embeddings`);
    
    // Fetch metadata from the provided path
    const { data: metadata } = await axios.get<Metadata>(apiResponse.itemsPath);
    
    return {
      ...metadata,
      sprite_sheet: {
        ...metadata.sprite_sheet,
        url: apiResponse.spritePath // Add the sprite path from the API response
      }
    };
  } catch (error) {
    console.error('Error fetching embeddings data:', error);
    throw new Error('Failed to fetch embeddings data');
  }
};