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
    <Box sx={{ mt: 4, ml: 12, mr: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }} color="text.primary">
        Airdrop Events & Campaigns
      </Typography>
      {loading ? <CircularProgress /> : (
        <Grid container spacing={2}>
          {events.length === 0 ? (
            <Typography color="text.secondary" sx={{ ml: 2 }}>No airdrop events found.</Typography>
          ) : events.map(event => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card sx={{ 
                borderRadius: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                overflow: 'hidden',
                background: '#23283a',
                boxShadow: '0 4px 24px 0 rgba(30,136,229,0.10)'
              }}>
                {event.banner && (
                  <CardMedia
                    component="img"
                    image={event.banner}
                    alt={event.title}
                    sx={{ 
                      width: '100%',
                      height: { xs: 140, sm: 160, md: 180 },
                      objectFit: 'contain',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      bgcolor: '#1a1e2a'
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', px: 2, py: 2 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700 }} color="text.primary">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {event.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {event.startDate ? `Start: ${event.startDate.slice(0, 10)}` : ''} {event.endDate ? `End: ${event.endDate.slice(0, 10)}` : ''}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 0 }}>
                  {event.url && (
                    <Button
                      size="large"
                      color="primary"
                      component="a"
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontWeight: 700,
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                        minHeight: 48,
                        fontSize: '1.05rem',
                        letterSpacing: '0.04em',
                        width: '100%',
                        boxShadow: '0 2px 8px 0 rgba(30,136,229,0.10)'
                      }}
                      fullWidth
                      onClick={e => e.stopPropagation()}
                    >
                      VIEW EVENT
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
} 