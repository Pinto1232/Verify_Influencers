// api/claims.ts
import axios from 'axios';

// Define the type for a Claim (adjust according to your API response)
export interface Claim {
  id: string;
  text: string;
  status: 'Verified' | 'Questionable' | 'Debunked';
  category: string;
  date: string; // or timestamp: number;
  // Add other fields as needed
}

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'https://your-api-endpoint.com/api', // Replace with your actual API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchClaims = async (influencerId: string): Promise<Claim[]> => {
  try {
    const response = await apiClient.get(`/claims/${influencerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching claims:', error);
    throw new Error('Failed to fetch claims');
  }
};