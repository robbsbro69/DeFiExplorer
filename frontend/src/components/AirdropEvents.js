import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { FlightTakeoff, Launch, Event } from '@mui/icons-material';

const API_URL = process.env.REACT_APP_API_URL || '';

export default function AirdropEvents() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/airdropevents`);
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        p: 3,
        background: '#111111',
        borderRadius: 2,
        border: '1px solid #333333'
      }}>
        <Box>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              color: '#ffffff',
              mb: 1,
              letterSpacing: '-0.02em'
            }}
          >
            Airdrop Events
          </Typography>
          <Typography 
            variant="body1" 
            color="#cccccc"
            sx={{ fontSize: '1.1rem' }}
          >
            Discover the latest airdrop campaigns and token distribution events
          </Typography>
        </Box>
        
        <Chip 
          label={`${events.length} event${events.length !== 1 ? 's' : ''}`}
          size="medium"
          icon={<FlightTakeoff />}
          sx={{ 
            background: '#333333',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '1rem'
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 400 
        }}>
          <CircularProgress size={60} sx={{ color: '#ffffff' }} />
        </Box>
      ) : events.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          background: '#111111',
          borderRadius: 2,
          border: '1px solid #333333'
        }}>
          <FlightTakeoff sx={{ fontSize: 64, color: '#cccccc', mb: 2 }} />
          <Typography variant="h6" color="#cccccc" sx={{ fontWeight: 600, mb: 1 }}>
            No airdrop events available
          </Typography>
          <Typography variant="body2" color="#cccccc">
            Check back later for new airdrop campaigns!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {events.map(event => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={event._id}>
              <Card sx={{ 
                height: '100%',
                display: 'flex', 
                flexDirection: 'column', 
                borderRadius: 3,
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 32px 64px rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  '& .card-glow': {
                    opacity: 1
                  }
                }
              }}>
                <Box className="card-glow" sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out',
                  pointerEvents: 'none'
                }} />
                
                {event.banner ? (
                  <CardMedia
                    component="img"
                    image={event.banner}
                    alt={event.title}
                    sx={{ 
                      width: '100%',
                      height: { xs: 120, sm: 140, md: 160 },
                      objectFit: 'cover',
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                    }}
                  />
                ) : (
                  <Box sx={{
                    width: '100%',
                    height: { xs: 120, sm: 140, md: 160 },
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16
                  }}>
                    <Event sx={{ fontSize: 36, color: 'white' }} />
                  </Box>
                )}
                
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', pb: 1, px: 2, py: 1.5 }}>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'text.primary',
                      mb: 0.5,
                      fontSize: '1rem',
                      lineHeight: 1.3
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 1,
                      lineHeight: 1.5,
                      fontSize: '0.8rem',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {event.description}
                  </Typography>
                  
                  {(event.startDate || event.endDate) && (
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 0.5,
                      mb: 1
                    }}>
                      {event.startDate && (
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            gap: 0.5,
                            fontSize: '0.7rem'
                          }}
                        >
                          <Event sx={{ fontSize: 12 }} />
                          Start: {new Date(event.startDate).toLocaleDateString()}
                        </Typography>
                      )}
                      {event.endDate && (
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            gap: 0.5,
                            fontSize: '0.7rem'
                          }}
                        >
                          <Event sx={{ fontSize: 12 }} />
                          End: {new Date(event.endDate).toLocaleDateString()}
                        </Typography>
                      )}
                    </Box>
                  )}
                </CardContent>
                
                <CardActions sx={{ p: 0 }}>
                  {event.url ? (
                    <Button
                      size="medium"
                      color="primary"
                      component="a"
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontWeight: 700,
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                        minHeight: 44,
                        fontSize: '0.9rem',
                        letterSpacing: '0.025em',
                        width: '100%',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.4)'
                        }
                      }}
                      fullWidth
                      onClick={e => e.stopPropagation()}
                    >
                      VIEW EVENT
                    </Button>
                  ) : (
                    <Button
                      size="medium"
                      disabled
                      sx={{
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                        minHeight: 44,
                        width: '100%',
                        background: 'rgba(148, 163, 184, 0.1)',
                        color: 'text.secondary'
                      }}
                      fullWidth
                    >
                      COMING SOON
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
} 