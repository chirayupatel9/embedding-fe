const API_BASE_URL = 'http://localhost:8001'; // Update this with your actual API URL

export async function getImageDetails(imageId: string): Promise<ImageDetails> {
  const response = await fetch(`${API_BASE_URL}/get-image-details/${imageId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch image details');
  }
  
  return response.json();
}