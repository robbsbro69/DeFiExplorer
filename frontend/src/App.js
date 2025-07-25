import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Explorer from './components/Explorer';
import DailyTask from './components/DailyTask';
import AirdropEvents from './components/AirdropEvents';
import AboutUs from './components/AboutUs';
import Avatar from '@mui/material/Avatar';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e88e5',
    },
    background: {
      default: '#181c24',
      paper: '#23283a',
    },
    secondary: {
      main: '#ffb300',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const navLinks = [
  { label: 'Explorer', path: '/' },
  { label: 'Daily Task', path: '/dailytask' },
  { label: 'Airdrop Events', path: '/airdrops' },
  { label: 'About Us', path: '/about' },
];

function Admin() {
  const [loggedIn, setLoggedIn] = React.useState(!!localStorage.getItem('adminToken'));
  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }
  return <AdminDashboard />;
}

function ResponsiveAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        background: 'linear-gradient(90deg, #1e88e5 0%, #23283a 100%)',
        boxShadow: '0 4px 24px 0 rgba(30,136,229,0.10)',
      }}
    >
      <Toolbar>
        <Avatar
          src="/logo.png"
          alt="DeFi Explorer"
          sx={{ width: 40, height: 40, mr: 2, bgcolor: 'white' }}
        />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 800,
            letterSpacing: '0.08em',
            fontSize: { xs: '1.1rem', md: '1.4rem' },
          }}
        >
          DeFi Explorer
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
              aria-label="menu"
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box sx={{ width: 220 }} role="presentation" onClick={() => setDrawerOpen(false)}>
                <List>
                  {navLinks.map((item) => (
                    <ListItem key={item.path} disablePadding>
                      <ListItemButton
                        component={Link}
                        to={item.path}
                        selected={location.pathname === item.path}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          navLinks.map((item) => (
            <Button
              key={item.path}
              color={location.pathname === item.path ? 'secondary' : 'inherit'}
              component={Link}
              to={item.path}
              sx={{ fontWeight: 600, mx: 1, borderRadius: 2, fontSize: '1.05rem', letterSpacing: '0.03em' }}
            >
              {item.label}
            </Button>
          ))
        )}
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: theme.palette.background.default }}>
          <ResponsiveAppBar />
          <Box sx={{ flex: 1, p: { xs: 1, md: 3 } }}>
            <Routes>
              <Route path="/" element={<Explorer />} />
              <Route path="/dailytask" element={<DailyTask />} />
              <Route path="/airdrops" element={<AirdropEvents />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Box>
          <Box sx={{ position: 'fixed', left: 0, bottom: 0, width: '100%', textAlign: 'center', zIndex: 1300, background: '#23283a', pointerEvents: 'none' }}>
            <span style={{ color: '#b0b8c1', fontSize: '0.98rem', fontWeight: 500, letterSpacing: '0.04em', padding: '2px 0', display: 'inline-block', width: '100%', pointerEvents: 'auto' }}>
              &copy; {new Date().getFullYear()} DeFi Explorer. All rights reserved.
            </span>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
