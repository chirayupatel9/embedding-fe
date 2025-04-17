import axios from 'axios';
import { ApiResponse, Metadata } from '../types/embedding';
import { API_CONFIG } from './api/config';


export const fetchEmbeddingsData = async (): Promise<Metadata> => {


  try {
    const { data: apiResponse } = await axios.get<ApiResponse>(`${API_CONFIG.BASE_URL.ENDPOINTS.EMBEDDINGS}`);
    const { data: metadata } = await axios.get<Metadata>(apiResponse.itemsPath);
    return {
      ...metadata,
      spritePath: apiResponse.spritePath // Add the sprite path from the API response
    };
  } catch (error) {
    console.error('Error fetching embeddings data:', error);
    throw new Error('Failed to fetch embeddings data');
  }
};