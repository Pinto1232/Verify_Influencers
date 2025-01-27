// components/header/Header.tsx
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ExitToApp as SignOutIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = ['Leaderboard', 'Products', 'Monetization', 'About', 'Contact', 'Admin'];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        bgcolor: '#101827',
        height: '100%',
        color: '#9CA3AF'
      }}
    >
      <Typography variant="h6" sx={{ p: 2, fontWeight: 600, color: '#F9FAFB' }}>
        VerifyInfluencers
      </Typography>
      <Divider sx={{ borderColor: '#1F2937' }} />
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item}
            component={Link}
            to={item === 'Admin' ? '/admin' : '/'}
            onClick={handleDrawerToggle}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.04)'
              }
            }}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="static"
        sx={{ 
          backgroundColor: '#101827',
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
          height: '64px'
        }}>
          {isMobile ? (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%',
              justifyContent: 'space-between'
            }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: '#9CA3AF' }}
              >
                <MenuIcon />
              </IconButton>
              
              <Typography
                variant="h6"
                sx={{ 
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: '#F9FAFB',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              >
                VerifyInfluencers
              </Typography>

              <Button
                variant="outlined"
                startIcon={<SignOutIcon />}
                sx={{
                  color: '#F9FAFB',
                  borderColor: '#374151',
                  borderRadius: '6px',
                  textTransform: 'none',
                  px: 1.5,
                  py: 0.5,
                  '&:hover': {
                    borderColor: '#4B5563',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)'
                  }
                }}
              >
                Sign Out
              </Button>
            </Box>
          ) : (
            <>
              <Typography 
                variant="h6" 
                component={Link}
                to="/"
                sx={{ 
                  fontWeight: 600,
                  fontSize: '1.25rem',
                  color: '#F9FAFB',
                  textDecoration: 'none'
                }}
              >
                VerifyInfluencers
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Box 
                  component="nav" 
                  display="flex" 
                  gap={2}
                  sx={{ 
                    '& > *:not(:last-child)': {
                      borderRight: `1px solid ${theme.palette.divider}`,
                      pr: 2
                    }
                  }}
                >
                  {navItems.map((item) => (
                    <Typography
                      key={item}
                      variant="body1"
                      component={Link}
                      to={item === 'Admin' ? '/admin' : '/'}
                      sx={{
                        color: '#9CA3AF',
                        fontWeight: 500,
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#FFFFFF'
                        }
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<SignOutIcon />}
                  sx={{
                    color: '#F9FAFB',
                    borderColor: '#374151',
                    borderRadius: '6px',
                    textTransform: 'none',
                    px: 2,
                    py: 1,
                    '&:hover': {
                      borderColor: '#4B5563',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }
                  }}
                >
                  Sign Out
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#101827',
            borderRight: '1px solid #1F2937'
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Header;