export type ClaimStatus = 'Verified' | 'Questionable' | 'Debunked';

export interface Claim {
  id: string;
  text: string;
  category: 'Nutrition' | 'Medicine' | 'Mental Health';
  status: ClaimStatus;
  confidence: number;
  sources: string[];
  lastVerified: Date;
}