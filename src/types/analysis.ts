// src/types/analysis.ts
export type FilterSettings = {
    journals: string[];
    dateRange: [Date, Date];
  };
  
  // src/types/influencer.ts
  export interface Influencer {
    id: string;
    handle: string;
    followers: number;
    trustScore: number;
    claimsAnalyzed: number;
  }