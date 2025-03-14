const API_BASE_URL = 'http://localhost:8000/api'; // Update this with your actual API URL

export async function getImageDetails(imageId: string): Promise<ImageDetails> {
  console.log('imageId', imageId);
  const response = await fetch(`${API_BASE_URL}/fetch-image/${imageId}`);
  console.log('response', response);
  if (!response.ok) {
    throw new Error('Failed to fetch image details');
  }
  
  return response.json();
}