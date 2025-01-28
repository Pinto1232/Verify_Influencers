// Leaderboard.tsx
import { useState, useEffect } from 'react';
import {
  Box,
  Chip,
  Grid,
  Paper,
  Typography,
  Icon,
  Skeleton,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';
import {
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';

// ------------------------------------------------------------------
// 1. Types & Mock Data
// ------------------------------------------------------------------

interface Influencer {
  id: string;
  rank: number;
  handle: string;
  avatarUrl?: string;
  category: string;
  trustScore: number;
  trend: 'up' | 'down';
  followers: string;
  claimsAnalyzed: number;
}

const mockData: Influencer[] = [
  {
    id: 'peter-1',
    rank: 1,
    handle: 'Dr. Peter Attia',
    avatarUrl: '/avatars/dr-peter.jpg',
    category: 'Medicine',
    trustScore: 94,
    trend: 'up',
    followers: '1.2M+',
    claimsAnalyzed: 203,
  },
  {
    id: 'rhonda-2',
    rank: 2,
    handle: 'Dr. Rhonda Patrick',
    avatarUrl: '/avatars/dr-rhonda.jpg',
    category: 'Nutrition',
    trustScore: 91,
    trend: 'up',
    followers: '980K+',
    claimsAnalyzed: 156,
  },
  {
    id: 'chris-3',
    rank: 3,
    handle: 'Dr. Chris Palmer',
    avatarUrl: '/avatars/dr-chris.jpg',
    category: 'Mental Health',
    trustScore: 90,
    trend: 'up',
    followers: '180K+',
    claimsAnalyzed: 76,
  },
  {
    id: 'huberman-4',
    rank: 4,
    handle: 'Andrew Huberman',
    avatarUrl: '/avatars/andrew.jpg',
    category: 'Neuroscience',
    trustScore: 89,
    trend: 'up',
    followers: '4.2M+',
    claimsAnalyzed: 127,
  },
  {
    id: 'dominic-5',
    rank: 5,
    handle: 'Dr. Dominic D’Agostino',
    avatarUrl: '/avatars/dr-dominic.jpg',
    category: 'Nutrition',
    trustScore: 89,
    trend: 'down',
    followers: '290K+',
    claimsAnalyzed: 112,
  },
  {
    id: 'gabrielle-6',
    rank: 6,
    handle: 'Dr. Gabrielle Lyon',
    avatarUrl: '/avatars/dr-gabrielle.jpg',
    category: 'Medicine',
    trustScore: 88,
    trend: 'up',
    followers: '380K+',
    claimsAnalyzed: 84,
  },
];

const categoryFilters = ['All', 'Nutrition', 'Fitness', 'Medicine', 'Mental Health'];

// ------------------------------------------------------------------
// 2. Utility Components
// ------------------------------------------------------------------

function TrustScoreBadge({ score }: { score: number }) {
  let color = '#4caf50';
  if (score < 90) color = '#ff9800';
  if (score < 80) color = '#f44336';

  return (
    <Box sx={{ color, fontWeight: 700 }}>
      {score}%
    </Box>
  );
}

function TrendArrow({ direction }: { direction: 'up' | 'down' }) {
  return (
    <Box
      component="span"
      sx={{
        fontWeight: 700,
        color: direction === 'up' ? '#4caf50' : '#f44336',
      }}
    >
      {direction === 'up' ? '↑' : '↓'}
    </Box>
  );
}

// ------------------------------------------------------------------
// 3. DataGrid Columns
// ------------------------------------------------------------------

const columns: GridColDef<Influencer>[] = [
  {
    field: 'rank',
    headerName: 'RANK',
    width: 80,
    renderCell: (params) => (
      <Typography sx={{ fontWeight: 500 }}>{`#${params.value}`}</Typography>
    ),
  },
  {
    field: 'handle',
    headerName: 'INFLUENCER',
    flex: 1,
    minWidth: 200,
    renderCell: (params) => {
      const row = params.row;
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {row.avatarUrl && (
            <img
              src={row.avatarUrl}
              alt={row.handle}
              style={{ width: 32, height: 32, borderRadius: '50%' }}
            />
          )}
          <Typography
            component="a"
            href={`/influencer/${row.id}`}
            sx={{
              textDecoration: 'none',
              color: '#F9FAFB',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {row.handle}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: 'category',
    headerName: 'CATEGORY',
    width: 150,
    renderCell: (params) => (
      <Typography sx={{ color: '#9CA3AF', fontWeight: 500 }}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'trustScore',
    headerName: 'TRUST SCORE',
    width: 150,
    renderCell: (params) => <TrustScoreBadge score={params.value as number} />,
  },
  {
    field: 'trend',
    headerName: 'TREND',
    width: 80,
    renderCell: (params) => <TrendArrow direction={params.value as 'up' | 'down'} />,
  },
  {
    field: 'followers',
    headerName: 'FOLLOWERS',
    width: 120,
    renderCell: (params) => (
      <Typography sx={{ fontWeight: 500 }}>{params.value}</Typography>
    ),
  },
  {
    field: 'claimsAnalyzed',
    headerName: 'VERIFIED CLAIMS',
    width: 130,
    renderCell: (params) => (
      <Typography sx={{ fontWeight: 500 }}>{params.value}</Typography>
    ),
  },
];

// ------------------------------------------------------------------
// 4. Main Component
// ------------------------------------------------------------------

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const data = mockData;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredData =
    selectedCategory === 'All'
      ? data
      : data.filter((inf) =>
          inf.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <Box sx={{ p: 3, backgroundColor: '#111827', minHeight: '100vh' }}>
      {/* Page Title + Subtitle */}
      <Typography variant="h4" sx={{ color: '#F9FAFB', fontWeight: 600, mb: 1 }}>
        Influencer Trust Leaderboard
      </Typography>
      <Typography variant="body1" sx={{ color: '#9CA3AF', mb: 3, maxWidth: 600 }}>
        Real-time rankings of health influencers based on scientific accuracy, credibility, 
        and transparency. Updated daily using AI-powered analysis.
      </Typography>

      {/* Top Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} md={4} key={item}>
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={118}
                sx={{ 
                  backgroundColor: '#1F2937',
                  borderRadius: '4px',
                }}
              />
            ) : (
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  color: '#E5E7EB',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {item === 1 && <PeopleIcon sx={{ color: '#10B981' }} />}
                  {item === 2 && <CheckCircleIcon sx={{ color: '#10B981' }} />}
                  {item === 3 && <BarChartIcon sx={{ color: '#10B981' }} />}
                  <Typography variant="body1" sx={{ color: '#9CA3AF' }}>
                    {item === 1 && 'Active Influencers'}
                    {item === 2 && 'Claims Verified'}
                    {item === 3 && 'Average Trust Score'}
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {item === 1 && '1,234'}
                  {item === 2 && '25,431'}
                  {item === 3 && '85.7%'}
                </Typography>
              </Paper>
            )}
          </Grid>
        ))}
      </Grid>

      {/* Filter Chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        {loading ? (
          Array(5).fill(null).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={80}
              height={32}
              sx={{
                borderRadius: '16px',
                backgroundColor: '#1F2937',
              }}
            />
          ))
        ) : (
          categoryFilters.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat)}
              variant={selectedCategory === cat ? 'filled' : 'outlined'}
              sx={{
                color: '#FFFFFF',
                borderColor: '#374151',
                backgroundColor:
                  selectedCategory === cat ? '#374151' : 'transparent',
                '&:hover': {
                  backgroundColor: '#374151',
                },
              }}
            />
          ))
        )}
      </Box>

      {/* Sort Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width={120}
            height={40}
            sx={{
              borderRadius: '4px',
              backgroundColor: '#1F2937',
            }}
          />
        ) : (
          <Paper
            sx={{
              p: 1,
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              color: '#E5E7EB',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                borderColor: '#4B5563',
              },
            }}
          >
            <Icon fontSize="small" sx={{ color: '#9CA3AF' }}>
              import_export
            </Icon>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Highest First
            </Typography>
          </Paper>
        )}
      </Box>

      {/* DataGrid Table */}
      {loading ? (
        <Box
          sx={{
            height: 600,
            width: '100%',
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            p: 2,
          }}
        >
          {/* Column Headers */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mb: 2,
              px: 2,
            }}
          >
            {columns.map((_, index) => (
              <Skeleton
                key={index}
                variant="text"
                width={columns[index].width}
                height={40}
                sx={{ backgroundColor: '#2D3748' }}
              />
            ))}
          </Box>

          {/* Rows */}
          {Array(6)
            .fill(null)
            .map((_, rowIndex) => (
              <Box
                key={rowIndex}
                sx={{
                  display: 'flex',
                  gap: 2,
                  mb: 1,
                  px: 2,
                }}
              >
                {columns.map((col, colIndex) => (
                  <Box key={colIndex} sx={{ width: col.width }}>
                    <Skeleton
                      variant="text"
                      height={60}
                      sx={{
                        backgroundColor:
                          rowIndex % 2 === 0 ? '#2D3748' : '#1F2937',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            ))}
        </Box>
      ) : (
        <Box
          sx={{
            height: 600,
            width: '100%',
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            color: '#E5E7EB',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1F2937',
              borderBottom: '1px solid #374151',
              color: '#9CA3AF',
              fontWeight: 600,
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #374151',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#2D3748',
            },
            '& .MuiTablePagination-toolbar': {
              color: '#E5E7EB',
            },
          }}
        >
          <DataGrid
            rows={filteredData}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              sorting: {
                sortModel: [{ field: 'trustScore', sort: 'desc' }],
              },
            }}
            sx={{
              color: '#E5E7EB',
              border: 'none',
            }}
          />
        </Box>
      )}
    </Box>
  );
}