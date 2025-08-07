import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography, Button, Container, useTheme, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Paper, Avatar, Chip, Badge, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Menu as MenuIcon, Explore, Task, FlightTakeoff, Info, AdminPanelSettings, Close, Search, AccountBalance, Star, TrendingUp, Group, EmojiEvents, PlayArrow, Rocket, Lock, SwapHoriz, KeyboardArrowDown, ChevronLeft, ChevronRight } from '@mui/icons-material';
import Explorer from './components/Explorer';
import DailyTask from './components/DailyTask';
import AirdropEvents from './components/AirdropEvents';
import AboutUs from './components/AboutUs';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { 
      main: '#ffffff',
      light: '#ffffff',
      dark: '#e0e0e0'
    },
    secondary: { 
      main: '#ffffff',
      light: '#ffffff',
      dark: '#e0e0e0'
    },
    background: { 
      default: '#000000',
      paper: '#111111'
    },
    text: { 
      primary: '#ffffff',
      secondary: '#cccccc'
    },
    success: { main: '#ffffff' },
    warning: { main: '#ffffff' },
    error: { main: '#ffffff' },
    info: { main: '#ffffff' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
      color: '#ffffff'
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
      color: '#ffffff'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#ffffff'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#ffffff'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      color: '#ffffff'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#ffffff'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#ffffff'
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#cccccc'
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.025em',
      color: '#ffffff'
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#111111',
          border: '1px solid #333333',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
            border: '1px solid #ffffff'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontWeight: 600,
          textTransform: 'none',
          transition: 'all 0.2s ease-in-out',
          color: '#ffffff',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
          }
        },
        contained: {
          background: '#ffffff',
          color: '#000000',
          '&:hover': {
            background: '#e0e0e0',
            color: '#000000'
          }
        },
        outlined: {
          borderColor: '#ffffff',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: '#ffffff'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#000000',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #333333'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#111111',
          color: '#ffffff'
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#ffffff'
        },
        secondary: {
          color: '#cccccc'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#ffffff'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff'
        }
      }
    }
  }
});

const navLinks = [
  { name: 'Explorer', path: '/', icon: <Explore /> },
  { name: 'Daily Task', path: '/daily-task', icon: <Task /> },
  { name: 'Airdrop Events', path: '/airdrop-events', icon: <FlightTakeoff /> },
  { name: 'About Us', path: '/about-us', icon: <Info /> }
];

function LeftSidebar() {
  const location = useLocation();

  return (
    <Box sx={{ 
      width: 280, 
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      height: '100vh',
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 1200
    }}>
      {/* Logo/Title Section */}
      <Box sx={{ p: 3 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 40, height: 40 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: '#ffffff'
              }}
            >
              DeFi Explorer
            </Typography>
          </Box>
        </Link>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, px: 3 }}>
        <List sx={{ p: 0 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <ListItem 
                key={link.name} 
                component={Link} 
                to={link.path}
                sx={{ 
                  mb: 1, 
                  borderRadius: 2,
                  background: isActive ? '#222222' : 'transparent',
                  border: '1px solid transparent !important',
                  transition: 'all 0.2s ease-in-out',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: isActive ? '#222222' : 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid transparent !important'
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#ffffff', minWidth: 40 }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={link.name} 
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: '#ffffff'
                    } 
                  }} 
                />
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 3 }}>
        <Typography variant="caption" color="#cccccc" sx={{ display: 'block', mb: 1 }}>
          DeFi Explorer v1.0
        </Typography>
        <Typography variant="caption" color="#cccccc">
          &copy; {new Date().getFullYear()} All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex',
          background: '#000000',
          position: 'relative'
        }}>
          {/* Left Sidebar */}
          {sidebarOpen && <LeftSidebar />}
          
          {/* Main Content */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: sidebarOpen ? '280px' : 0, transition: 'margin-left 0.3s' }}>
            {/* Sidebar Toggle Button */}
            <Box sx={{ 
              position: 'fixed', 
              top: 20, 
              left: sidebarOpen ? 290 : 20, 
              zIndex: 1000,
              transition: 'left 0.3s ease-in-out'
            }}>
              <IconButton
                onClick={toggleSidebar}
                sx={{
                  background: '#ffffff',
                  color: '#000000',
                  boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    background: '#e0e0e0',
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 16px rgba(255, 255, 255, 0.4)'
                  }
                }}
              >
                {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
              </IconButton>
            </Box>
            <Box sx={{ 
              flex: 1, 
              p: 3,
              background: '#000000'
            }}>
              <Routes>
                <Route path="/" element={<Explorer />} />
                <Route path="/daily-task" element={<DailyTask />} />
                <Route path="/airdrop-events" element={<AirdropEvents />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
