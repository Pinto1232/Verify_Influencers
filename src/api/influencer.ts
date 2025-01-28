// src/api/influencer.ts
import axios from 'axios';
import type { Influencer } from '@/types/influencer';

export const fetchLeaderboard = async (): Promise<Influencer[]> => {
  if (import.meta.env.MODE === 'development') {
    // Return mock data structure
    return [{
      id: 'dr_oz',
      handle: '@DrOz',
      followers: 2500000,
      trustScore: 72,
      claimsAnalyzed: 45
    }];
  }
  
  return axios.get('/api/influencers')
    .then(response => response.data);
};