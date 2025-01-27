import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#101827', 
    },
    secondary: {
      main: '#3B82F6', 
    },
    text: {
      primary: '#F9FAFB', 
        secondary: '#9CA3AF',
      },
      divider: '#1F2937', 
    },
    typography: {
      fontFamily: 'Inter, sans-serif', 
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #1F2937',
        },
      },
    },
  },
});

export default theme;