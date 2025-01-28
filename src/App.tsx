// src/App.tsx
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate for redirect

import theme from '@/theme';
import { AnalysisProvider } from '@/contexts/AnalysisContext';
import AdminWrapper from '@/components/admin/AdminWrapper';
import Header from '@/components/header/Header';

// Import your pages
import Leaderboard from '@/components/dashboard/Leaderboard';
import InfluencerDetail from '@/components/dashboard/InfluencerDetail';
import ResearchConfig from '@/components/dashboard/ResearchConfig';
import Dashboard from './components/dashboard/dashboard';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AnalysisProvider>
          <CssBaseline />
          <Header /> 

          <Routes>
            {/* Redirect from "/" to "/admin/dashboard" */}
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

            {/* Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminWrapper>
                  <Dashboard />
                </AdminWrapper>
              }
            />

            {/* Leaderboard */}
            <Route
              path="/admin/leaderboard"
              element={
                <AdminWrapper>
                  <Leaderboard />
                </AdminWrapper>
              }
            />

            {/* Influencer Detail */}
            <Route
              path="/admin/influencer/:id"
              element={
                <AdminWrapper>
                  <InfluencerDetail />
                </AdminWrapper>
              }
            />

            {/* Research Config */}
            <Route
              path="/admin/research-config"
              element={
                <AdminWrapper>
                  <ResearchConfig />
                </AdminWrapper>
              }
            />
          </Routes>

          <ReactQueryDevtools initialIsOpen={false} />
        </AnalysisProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
