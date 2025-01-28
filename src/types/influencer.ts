// src/types/influencer.ts
export interface Influencer {
    id: string;
    handle: string;
    followers: number;
    trustScore: number;
    claimsAnalyzed: number;
  }