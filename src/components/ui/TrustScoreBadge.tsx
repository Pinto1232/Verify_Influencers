// components/ui/TrustScoreBadge.tsx
import { Chip } from '@mui/material';

interface TrustScoreBadgeProps {
  score: number;
}

export default function TrustScoreBadge({ score }: TrustScoreBadgeProps) {
  return (
    <Chip
      label={score}
      color={score > 75 ? 'success' : score > 50 ? 'warning' : 'error'}
      variant="outlined"
    />
  );
}