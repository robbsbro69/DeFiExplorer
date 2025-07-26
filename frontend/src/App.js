import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb'
    },
    secondary: { 
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706'
    },
    background: { 
      default: '#0f172a',
      paper: '#1e293b'
    },
    text: { 
      primary: '#f1f5f9',
      secondary: '#94a3b8'
    },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    error: { main: '#ef4444' },
    info: { main: '#3b82f6' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em'
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '-0.01em'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.025em'
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(99, 102, 241, 0.3)'
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
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }
        },
        contained: {
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
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
  return (
    <Box sx={{ 
      width: 280, 
      height: '100vh',
      background: '#1e293b',
      borderRight: '1px solid rgba(148, 163, 184, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Logo/Title Section */}
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 40, height: 40 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                background: 'linear-gradient(135deg, #3b82f6, #f59e0b)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
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
          {navLinks.map((link) => (
            <ListItem 
              key={link.name} 
              component={Link} 
              to={link.path}
              sx={{ 
                mb: 1, 
                borderRadius: 2,
                background: 'transparent',
                border: '1px solid transparent',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
                {link.icon}
              </ListItemIcon>
              <ListItemText 
                primary={link.name} 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'text.primary'
                  } 
                }} 
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 3, borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          DeFi Explorer v1.0
        </Typography>
        <Typography variant="caption" color="text.secondary">
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
          background: '#0f172a',
          position: 'relative'
        }}>
          {/* Left Sidebar */}
          {sidebarOpen && <LeftSidebar />}
          
          {/* Main Content */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)'
                  }
                }}
              >
                {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
              </IconButton>
            </Box>
            <Box sx={{ 
              flex: 1, 
              p: 3,
              background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'
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
