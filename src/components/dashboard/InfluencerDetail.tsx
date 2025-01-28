// src/components/dashboard/InfluencerDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Paper, Breadcrumbs } from '@mui/material';

interface Claim {
  id: number;
  text: string;
  status: 'verified' | 'questionable' | 'debunked';
  confidence: number;
}

const mockClaims: Claim[] = [
  { id: 1, text: 'Claim about diet X', status: 'verified', confidence: 0.95 },
  { id: 2, text: 'Claim about supplement Y', status: 'debunked', confidence: 0.2 },
  // ...
];

export default function InfluencerDetail() {
  const { id } = useParams(); // e.g. "peter"

  return (
    <Box sx={{ p: 3, backgroundColor: '#111827', minHeight: '100vh', color: '#E5E7EB' }}>
      {/* NEW: Breadcrumbs at the top */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Typography
          component={Link}
          to="/admin/dashboard"
          sx={{
            color: '#9CA3AF',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Admin
        </Typography>
        <Typography
          component={Link}
          to="/admin/leaderboard"
          sx={{
            color: '#9CA3AF',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Leaderboard
        </Typography>
        <Typography sx={{ color: '#F9FAFB' }}>
          {id}
        </Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        Influencer Detail: {id}
      </Typography>
      <Typography variant="body1" sx={{ color: '#9CA3AF', mb: 3 }}>
        Claims & verification statuses for influencer "{id}".
      </Typography>

      {mockClaims.map((claim) => (
        <Paper
          key={claim.id}
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {claim.text}
          </Typography>
          <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
            Status: {claim.status} | Confidence: {(claim.confidence * 100).toFixed(0)}%
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
