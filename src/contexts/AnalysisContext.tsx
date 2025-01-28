import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';

// 1. Export the Filters interface
export interface Filters {
  journals: string[];
  // ...
}

interface AnalysisData {
  name: string;
  // ...
}

interface AnalysisContextProps {
  analysisData: AnalysisData | null;
  setAnalysisData: (data: AnalysisData) => void;
  filters: Filters;
  // 2. Use the dispatch signature here
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  loading: boolean;
  error: string | null;
  refreshAnalysis: () => Promise<void>;
}

const AnalysisContext = createContext<AnalysisContextProps>({
  analysisData: null,
  setAnalysisData: () => {},
  filters: { journals: [] },
  setFilters: () => {},
  loading: false,
  error: null,
  refreshAnalysis: async () => {},
});

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [filters, setFilters] = useState<Filters>({ journals: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      // ...
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analysis');
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      analysisData,
      setAnalysisData,
      filters,
      setFilters,
      loading,
      error,
      refreshAnalysis,
    }),
    [analysisData, filters, loading, error]
  );

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
}

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
