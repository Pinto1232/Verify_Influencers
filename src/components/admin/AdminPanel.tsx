// components/admin/AdminPanel.tsx
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Container 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import JournalMatrix from '../config/JournalMatrix';



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

        {/* Example back-button */}
        <Button 
          variant="text" 
          sx={{ 
            color: '#3B82F6',
            mb: 4,
            '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)' }
          }}
        >
          ← Back to Taskforce: 
          <Typography component="span" sx={{ color: '#fff', ml: 1 }}>
            Research Tasks
          </Typography>
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

            {/* ... Your original code in here ... */}
          </SectionPaper>

          {/* Time Range */}
          <SectionPaper>
            <Typography variant="h6" sx={{ color: '#F9FAFB', mb: 3 }}>
              Time Range
            </Typography>

            {/* ... Your original code in here ... */}
          </SectionPaper>
        </Box>

        {/* 
          2) Embed JournalMatrix Anywhere You Want:
          For example, place it in its own box below the two SectionPapers
        */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ color: '#F9FAFB', mb: 2 }}>
            Journals Selected
          </Typography>
          <JournalMatrix />
        </Box>
      </Container>
    </Box>
  );
};

export default AdminPanel;
