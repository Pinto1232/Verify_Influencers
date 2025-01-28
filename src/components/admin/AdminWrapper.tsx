import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

const AdminWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#1F2937', 
        minHeight: '100vh',
        marginTop: '0px',
        p: 3,
        borderLeft: '1px solid #374151' 
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        {/* Main content area */}
        <Box sx={{ 
          backgroundColor: '#111827', 
          borderRadius: 2,
          border: '1px solid #374151',
          mt: 6, 
          p: 3
        }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default AdminWrapper;