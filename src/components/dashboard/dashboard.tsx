import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: '#1F2937',
  color: '#E5E7EB',
  border: '1px solid #374151',
  '&:hover': {
    borderColor: '#4B5563'
  }
}));

const Dashboard = () => {
  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: 3,
      backgroundColor: '#111827',
      minHeight: '100vh',
      marginTop: '0px'
    }}>
      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom sx={{ color: '#F9FAFB', fontWeight: 600 }}>
              Dashboard Overview
            </Typography>
          </Grid>

          {/* Stats Cards */}
          {[
            ['Total Influencers', '1,234', '+12% from last month'],
            ['Active Campaigns', '56', '+5 new this week'],
            ['Monthly Revenue', '$23,456', '+8.5% from last month'],
            ['Pending Verifications', '23', '5 high priority']
          ].map(([title, value, subtext], index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <DashboardPaper elevation={0}>
                <Typography variant="h6" sx={{ color: '#9CA3AF', fontWeight: 500 }}>{title}</Typography>
                <Typography variant="h4" sx={{ color: '#F9FAFB', fontWeight: 700 }}>{value}</Typography>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>{subtext}</Typography>
              </DashboardPaper>
            </Grid>
          ))}

          {/* Data Table Section */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 2, 
              height: 400,
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              color: '#E5E7EB'
            }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#F9FAFB', fontWeight: 600 }}>
                Recent Campaigns
              </Typography>
              {/* Table or chart would go here */}
            </Paper>
          </Grid>

          {/* Additional Content */}
          {[
            ['Performance Metrics', 300],
            ['Recent Activities', 300]
          ].map(([title, height]) => (
            <Grid item xs={12} md={6} key={title}>
              <Paper sx={{ 
                p: 2, 
                height,
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                color: '#E5E7EB'
              }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#F9FAFB', fontWeight: 600 }}>
                  {title}
                </Typography>
                {/* Content would go here */}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;