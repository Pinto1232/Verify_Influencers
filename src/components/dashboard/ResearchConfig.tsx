import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
  Switch,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Settings, CheckCircle as CheckCircleIcon, Add as AddIcon } from '@mui/icons-material';

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#1F2937',
  border: '1px solid #374151',
  color: '#E5E7EB',
  flex: 1,
  borderRadius: '6px',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'border-color 0.2s',
  '&:hover': {
    borderColor: '#4B5563'
  }
}));

const StartButton = styled(Button)({
  backgroundColor: '#047857',
  '&:hover': {
    backgroundColor: '#065F46'
  },
  textTransform: 'none',
  fontWeight: 600,
  padding: '12px 24px'
});

export default function ResearchConfig() {
  const [researchType, setResearchType] = useState<'specific' | 'discover'>('specific');
  const [timeRange, setTimeRange] = useState('Last Month');
  const [claimLimit, setClaimLimit] = useState(50);
  const [includeRevenue, setIncludeRevenue] = useState(false);
  const [verifyJournals, setVerifyJournals] = useState(true);
  const [selectedJournals, setSelectedJournals] = useState([
    'Nature',
    'Cell',
    'New England Journal of Medicine'
  ]);
  const [notes, setNotes] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [minFollowers, setMinFollowers] = useState(1000);

  const journals = [
    'PubMed Central',
    'Nature',
    'Science',
    'Cell',
    'The Lancet',
    'New England Journal of Medicine',
    'JAMA Network'
  ];

  const handleStartResearch = () => {
    const payload = {
      researchType,
      timeRange,
      claimLimit,
      includeRevenue,
      verifyJournals,
      selectedJournals,
      notes,
      ...(researchType === 'discover' && {
        discoveryParams: {
          keywords,
          minFollowers
        }
      })
    };
    console.log('Starting research with:', payload);
    setSnackbarOpen(true);
  };

  const toggleJournal = (journal: string) => {
    setSelectedJournals(prev => (
      prev.includes(journal) ? prev.filter(j => j !== journal) : [...prev, journal]
    ));
  };

  const selectAllJournals = () => {
    setSelectedJournals(journals);
  };

  const deselectAllJournals = () => {
    setSelectedJournals([]);
  };

  const handleAddNewJournal = () => {
    console.log('Add new journal functionality');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#111827',
        minHeight: '100vh',
        color: '#E5E7EB',
        p: 3
      }}
    >
      <Typography variant="h4" sx={{ color: '#F9FAFB', mb: 2, fontWeight: 600 }}>
        <Settings /> Research Configuration
      </Typography>

      {/* Research Type Toggle */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <SectionPaper
          onClick={() => setResearchType('specific')}
          sx={{ borderColor: researchType === 'specific' ? '#3B82F6' : '#374151' }}
        >
          <Typography variant="h6">Specific Influencer</Typography>
          <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
            Research a known health influencer by name
          </Typography>
        </SectionPaper>

        <SectionPaper
          onClick={() => setResearchType('discover')}
          sx={{ borderColor: researchType === 'discover' ? '#3B82F6' : '#374151' }}
        >
          <Typography variant="h6">Discover New</Typography>
          <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
            Find and analyze new health influencers
          </Typography>
        </SectionPaper>
      </Box>

      {/* Discovery Parameters */}
      {researchType === 'discover' && (
        <Paper sx={{
          p: 2,
          mb: 3,
          backgroundColor: '#1F2937',
          border: '1px solid #374151',
          borderRadius: '8px'
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#F3F4F6' }}>Discovery Parameters</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Target Keywords"
                fullWidth
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                sx={{
                  '& .MuiInputLabel-root': { color: '#9CA3AF' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#4B5563' },
                    '&:hover fieldset': { borderColor: '#6B7280' },
                    '&.Mui-focused fieldset': { borderColor: '#3B82F6' }
                  },
                  '& .MuiInputBase-input': {
                    color: '#F3F4F6',
                    py: 1
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Minimum Follower Count"
                type="number"
                fullWidth
                value={minFollowers}
                onChange={(e) => setMinFollowers(Number(e.target.value))}
                sx={{
                  '& .MuiInputLabel-root': { color: '#9CA3AF' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#4B5563' },
                    '&:hover fieldset': { borderColor: '#6B7280' },
                    '&.Mui-focused fieldset': { borderColor: '#3B82F6' }
                  },
                  '& .MuiInputBase-input': {
                    color: '#F3F4F6',
                    py: 1
                  }
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Left column: Time Range & Claims */}
        <Grid item xs={12} md={6}>
          <Paper sx={{
            p: 2,
            mb: 2,
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px'
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#F3F4F6' }}>Time Range</Typography>
            <Grid container spacing={1.5}>
              {['Last Week', 'Last Month', 'Last Year', 'All Time'].map((range) => (
                <Grid item xs={6} key={range}>
                  <Button
                    fullWidth
                    onClick={() => setTimeRange(range)}
                    variant={timeRange === range ? 'contained' : 'outlined'}
                    sx={{
                      textTransform: 'none',
                      borderRadius: '6px',
                      py: 1,
                      borderColor: '#4B5563',
                      backgroundColor: timeRange === range ? '#3B82F6' : 'transparent',
                      color: timeRange === range ? '#FFFFFF' : '#9CA3AF',
                      '&:hover': {
                        borderColor: '#6B7280',
                        backgroundColor: timeRange === range ? '#2563EB' : '#111827'
                      }
                    }}
                  >
                    {range}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Claims to Analyze */}
          <Paper sx={{
            p: 2,
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px'
          }}>
            <TextField
              label="Claims to Analyze Per Influencer"
              type="number"
              value={claimLimit}
              onChange={(e) => setClaimLimit(+e.target.value)}
              fullWidth
              sx={{
                '& .MuiInputLabel-root': { color: '#9CA3AF' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#4B5563' },
                  '&:hover fieldset': { borderColor: '#6B7280' },
                  '&.Mui-focused fieldset': { borderColor: '#3B82F6' }
                },
                '& .MuiInputBase-input': {
                  color: '#F3F4F6',
                  py: 1
                }
              }}
            />
          </Paper>
        </Grid>

        {/* Right column: Toggles */}
        <Grid item xs={12} md={6}>
          <Paper sx={{
            p: 2,
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px',
            mb: 2
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: '#F3F4F6' }}>Include Revenue Analysis</Typography>
              <Switch
                checked={includeRevenue}
                onChange={(e) => setIncludeRevenue(e.target.checked)}
                color="primary"
                sx={{
                  '& .MuiSwitch-switchBase': { color: '#6B7280' },
                  '& .MuiSwitch-track': { backgroundColor: '#4B5563' }
                }}
              />
            </Box>
          </Paper>

          <Paper sx={{
            p: 2,
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: '#F3F4F6' }}>Verify with Scientific Journals</Typography>
              <Switch
                checked={verifyJournals}
                onChange={(e) => setVerifyJournals(e.target.checked)}
                color="primary"
                sx={{
                  '& .MuiSwitch-switchBase': { color: '#6B7280' },
                  '& .MuiSwitch-track': { backgroundColor: '#4B5563' }
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Scientific Journals Selection */}
      <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>Scientific Journals</Typography>
      <Box sx={{ mb: 2 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Typography
              onClick={selectAllJournals}
              sx={{
                color: '#3B82F6',
                fontSize: '0.875rem',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Select All
            </Typography>
            <Typography sx={{ color: '#94A3B8' }}>|</Typography>
            <Typography
              onClick={deselectAllJournals}
              sx={{
                color: '#3B82F6',
                fontSize: '0.875rem',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Deselect All
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={1.5}>
          {journals.map((journal) => (
            <Grid item xs={6} key={journal}>
              {journal === '+ Add New Journal' ? (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleAddNewJournal}
                  startIcon={<AddIcon fontSize="small" />}
                  sx={{
                    color: '#3B82F6',
                    borderColor: '#E2E8F0',
                    borderRadius: '6px',
                    py: 1.5,
                    textTransform: 'none',
                    '&:hover': { borderColor: '#CBD5E1' }
                  }}
                >
                  Add New Journal
                </Button>
              ) : (
                <Chip
                  label={journal}
                  clickable
                  variant={selectedJournals.includes(journal) ? 'filled' : 'outlined'}
                  onClick={() => toggleJournal(journal)}
                  sx={{
                    width: '100%',
                    borderRadius: '6px',
                    py: 2,
                    borderColor: '#E2E8F0',
                    '&.MuiChip-filled': {
                      backgroundColor: '#EFF6FF',
                      color: '#1E40AF',
                      borderColor: '#3B82F6'
                    }
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Notes */}
      <TextField
        label="Notes for Research Assistant"
        multiline
        rows={3}
        fullWidth
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        sx={{
          backgroundColor: '#1F2937',
          '& .MuiInputLabel-root': { color: '#9CA3AF' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#4B5563' },
            '&:hover fieldset': { borderColor: '#6B7280' },
            '&.Mui-focused fieldset': { borderColor: '#3B82F6' }
          },
          '& .MuiInputBase-input': { color: '#E5E7EB' }
        }}
      />

      {/* Start Research Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <StartButton onClick={handleStartResearch}>+ Start Research</StartButton>
      </Box>

      {/* Snackbar Confirmation */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" icon={<CheckCircleIcon />} sx={{ width: '100%' }}>
          Research configuration saved!
        </Alert>
      </Snackbar>
    </Box>
  );
}