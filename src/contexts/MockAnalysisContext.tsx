// src/contexts/AnalysisContext.tsx
import { createContext } from 'react';
import type { FilterSettings } from '@/types/analysis';

export const AnalysisContext = createContext<{
  filters: FilterSettings;
  setFilters?: (filters: FilterSettings) => void;
}>({
  filters: {
    journals: [],
    dateRange: [new Date(), new Date()]
  }
});