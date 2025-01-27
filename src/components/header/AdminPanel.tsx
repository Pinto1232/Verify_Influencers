// components/admin/AdminPanel.tsx
import { Box, Grid, Paper, Typography, Button, FormControlLabel, Checkbox, TextField, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#1F2937',
  border: '1px solid #374151',
  color: '#E5E7EB',
  flex: 1,
  borderRadius: 0,
  '&:first-of-type': {
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    borderRight: 'none'
  },
  '&:last-of-type': {
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    borderLeft: 'none'
  }
}));

const AdminPanel = () => {
  return (
    <Box sx={{ 
      backgroundColor: '#111827',
      minHeight: '100vh',
     
      p: 3
    }}>
      <Container maxWidth="xl">
        <Button 
          variant="text" 
          sx={{ 
            color: '#3B82F6',
            mb: 4,
            '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)' }
          }}
        >
          ← Back to Taskforce: <Typography sx={{ color: '#ffff'}}> Research Tasks </Typography>
        </Button>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          border: '1px solid #374151',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          {/* Research Configuration */}
          <SectionPaper>
            <Typography variant="h6" sx={{ color: '#F9FAFB', mb: 2 }}>
              Research Configuration
            </Typography>
            
            <Box>
              {/* Specific Influencer Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ color: '#9CA3AF', mb: 1 }}>
                  • Specific Influencer
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', mb: 2 }}>
                  Research a known health influencer by name
                </Typography>
              </Box>

              {/* Discover New Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ color: '#9CA3AF', mb: 2 }}>
                  • Discover New
                </Typography>
                
                <TextField
                  fullWidth
                  type="number"
                  label="Products to Find Per Influencer"
                  defaultValue="10"
                  sx={{ mb: 2 }}
                  InputProps={{ sx: { color: '#E5E7EB' } }}
                  helperText="Set to 0 to skip product research"
                />

                <FormControlLabel
                  control={<Checkbox sx={{ color: '#4B5563' }} />}
                  label="Include Revenue Analysis"
                  sx={{ color: '#9CA3AF', display: 'block', mb: 1 }}
                />

                <FormControlLabel
                  control={<Checkbox sx={{ color: '#4B5563' }} />}
                  label="Verify with Scientific Journals"
                  sx={{ color: '#9CA3AF', display: 'block', mb: 2 }}
                />

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Button size="small" sx={{ color: '#3B82F6' }}>Select All</Button>
                    <Button size="small" sx={{ color: '#3B82F6' }}>Deselect All</Button>
                  </Box>
                  
                  {['Nature', 'Cell', 'New England Journal of Medicine'].map((journal) => (
                    <FormControlLabel
                      key={journal}
                      control={<Checkbox sx={{ color: '#4B5563' }} />}
                      label={journal}
                      sx={{ color: '#6B7280', display: 'block' }}
                    />
                  ))}
                </Box>

                <Button 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: '#3B82F6',
                    '&:hover': { backgroundColor: '#2563EB' }
                  }}
                >
                  + Start Research
                </Button>
              </Box>
            </Box>
          </SectionPaper>

          {/* Time Range */}
          <SectionPaper>
            <Typography variant="h6" sx={{ color: '#F9FAFB', mb: 3 }}>
              Time Range
            </Typography>
            
            <Grid container spacing={1} sx={{ mb: 3 }}>
              {['Last Week', 'Last Month', 'Last Year', 'All Time'].map((label) => (
                <Grid item xs={6} key={label}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{
                      color: '#9CA3AF',
                      borderColor: '#374151',
                      '&:hover': { borderColor: '#4B5563' }
                    }}
                  >
                    {label}
                  </Button>
                </Grid>
              ))}
            </Grid>

            <TextField
              fullWidth
              label="Influencer Name"
              placeholder="Q. Enter influencer name"
              sx={{ mb: 3 }}
              InputProps={{ sx: { color: '#E5E7EB' } }}
            />

            <TextField
              fullWidth
              type="number"
              label="Claims to Analyze Per Influencer"
              defaultValue="50"
              sx={{ mb: 1 }}
              InputProps={{ sx: { color: '#E5E7EB' } }}
            />
            <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', mb: 3 }}>
              Recommended: 50-100 claims for comprehensive analysis
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#9CA3AF', mb: 2 }}>
              Scientific Journals
            </Typography>
            <Grid container spacing={1} sx={{ mb: 3 }}>
              {['PubMed Central', 'Science', 'The Lancet', 'JAMA Network'].map((journal) => (
                <Grid item xs={12} key={journal}>
                  <FormControlLabel
                    control={<Checkbox sx={{ color: '#4B5563' }} />}
                    label={journal}
                    sx={{ color: '#6B7280' }}
                  />
                </Grid>
              ))}
            </Grid>

            <Button
              variant="outlined"
              sx={{
                color: '#3B82F6',
                borderColor: '#374151',
                mb: 3
              }}
            >
              + Add New Journal
            </Button>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes for Research Assistant"
              placeholder="Add any specific instructions or focus areas..."
              InputProps={{ sx: { color: '#E5E7EB' } }}
            />
          </SectionPaper>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminPanel;