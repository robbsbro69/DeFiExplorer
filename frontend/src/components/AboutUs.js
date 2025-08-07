import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Explore, Task, FlightTakeoff, Support, Email, Twitter, Telegram } from '@mui/icons-material';

export default function AboutUs() {
  const contactLinks = [
    { 
      name: 'Email', 
      url: 'mailto:defiexplorer@proton.me', 
      label: 'robbsbro69@proton.me',
      icon: <Email sx={{ fontSize: 20 }} />
    },
    { 
      name: 'Twitter', 
      url: 'https://x.com/robbsbro369', 
      label: '@robbsbro369',
      icon: <Twitter sx={{ fontSize: 20 }} />
    },
    { 
      name: 'Telegram', 
      url: 'https://t.me/robbs12', 
      label: 't.me/robbs12',
      icon: <Telegram sx={{ fontSize: 20 }} />
    }
  ];

  const features = [
    {
      title: 'DeFi Discovery',
      description: 'Explore top DEXs, lending protocols, NFT marketplaces, and bridges for every supported chain.',
      icon: <Explore sx={{ fontSize: 40 }} />
    },
    {
      title: 'Daily Rewards',
      description: 'Complete daily check-ins, swaps, quests, and claim faucets to maximize your DeFi experience.',
      icon: <Task sx={{ fontSize: 40 }} />
    },
    {
      title: 'Airdrop Events',
      description: 'Stay up-to-date with the latest airdrop events and campaigns across multiple platforms.',
      icon: <FlightTakeoff sx={{ fontSize: 40 }} />
    },
    {
      title: 'Community Support',
      description: 'Join our community for updates, tips, and support from fellow DeFi enthusiasts.',
      icon: <Support sx={{ fontSize: 40 }} />
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center',
        mb: 6,
        position: 'relative'
      }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 700,
            color: '#ffffff',
            mb: 3,
            letterSpacing: '-0.02em',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          About DeFi Explorer
        </Typography>
        <Typography 
          variant="h6" 
          color="#cccccc"
          sx={{ 
            maxWidth: 800, 
            mx: 'auto',
            fontSize: '1.25rem',
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          Your comprehensive gateway to the decentralized finance ecosystem. Discover, explore, and maximize your DeFi experience with our curated collection of protocols, tools, and opportunities.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box sx={{ mb: 8 }}>
        <Card sx={{
          background: '#111111',
          backdropFilter: 'blur(20px)',
          border: '1px solid #333333',
          borderRadius: 4,
          p: 4,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              color: '#ffffff',
              mb: 3,
              letterSpacing: '-0.02em'
            }}
          >
            Our Mission
          </Typography>
          <Typography 
            variant="body1" 
            color="#cccccc"
            sx={{ 
              fontSize: '1.1rem',
              lineHeight: 1.7,
              mb: 3
            }}
          >
            We're dedicated to democratizing access to DeFi by providing a comprehensive, user-friendly platform that aggregates the best protocols, tools, and opportunities across multiple blockchains. Our goal is to simplify the DeFi experience while maximizing user rewards and opportunities.
          </Typography>
          <Typography 
            variant="body1" 
            color="#cccccc"
            sx={{ 
              fontSize: '1.1rem',
              lineHeight: 1.7
            }}
          >
            Whether you're a DeFi veteran or just starting your journey, DeFi Explorer provides the tools, insights, and opportunities you need to thrive in the decentralized finance ecosystem.
          </Typography>
        </Card>
      </Box>

      {/* Contact Section */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            color: '#ffffff',
            mb: 4,
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}
        >
          Get In Touch
        </Typography>
        <Card sx={{
          background: '#111111',
          backdropFilter: 'blur(20px)',
          border: '1px solid #333333',
          borderRadius: 4,
          p: 4,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Grid container spacing={4}>
            {contactLinks.map((link, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  p: 2,
                  borderRadius: 2,
                  background: '#333333',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    background: '#444444',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  <Box sx={{ color: 'primary.main' }}>
                    {link.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {link.name}
                    </Typography>
                    <Link 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ 
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Box>
    </Container>
  );
} 