import { Grid, Paper, Chip, Typography, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchClaims } from '@/api/claims'; // Now this import will work

// Use the Claim type from the API file
import type { Claim } from '@/api/claims';

// Type-safe status colors
const statusColors = {
  Verified: 'success',
  Questionable: 'warning',
  Debunked: 'error'
} as const;

type StatusType = keyof typeof statusColors;

interface ClaimsGridProps {
  influencerId: string;
}

export default function ClaimsGrid({ influencerId }: ClaimsGridProps) {
  const theme = useTheme();
  const { data, isLoading } = useQuery({
    queryKey: ['claims', influencerId],
    queryFn: () => fetchClaims(influencerId)
  });

  if (isLoading) return <div>Loading claims...</div>;

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {data?.map((claim: Claim) => {
        const status = claim.status as StatusType;
        const color = statusColors[status];

        return (
          <Grid item xs={12} md={6} lg={4} key={claim.id}>
            <Paper 
              sx={{ 
                p: 2,
                borderLeft: `4px solid ${theme.palette[color].main}`
              }}
            >
              <Chip
                label={status}
                color={color}
                size="small"
                sx={{ mb: 1 }}
              />
              <Typography variant="body1" gutterBottom>
                {claim.text}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {claim.category} • {new Date(claim.date).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>
        )}
      )}
    </Grid>
  );
}