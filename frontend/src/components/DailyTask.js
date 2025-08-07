import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { CheckCircle, SwapHoriz, EmojiEvents, WaterDrop } from '@mui/icons-material';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL || '';

const taskTabs = [
  { label: 'Check-ins', value: 'checkin', icon: <CheckCircle /> },
  { label: 'Daily Swaps', value: 'swap', icon: <SwapHoriz /> },
  { label: 'Quests', value: 'quest', icon: <EmojiEvents /> },
  { label: 'Faucets', value: 'faucet', icon: <WaterDrop /> },
];

function TaskSection({ tasks, type }) {
  // Faucet section dropdown state (only for faucet type)
  const faucetSections = Array.from(new Set(tasks.filter(t => t.type === 'faucet').map(t => (t.sectionId?.name || 'Other Faucets'))));
  const [selectedFaucetSection, setSelectedFaucetSection] = useState(faucetSections[0] || '');
  const filteredFaucets = tasks.filter(t => t.type === 'faucet' && (t.sectionId?.name || 'Other Faucets') === selectedFaucetSection);

  if (!tasks || tasks.length === 0) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 300,
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
          No tasks found for this category.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Check back later for new opportunities!
        </Typography>
      </Box>
    );
  }
  
  // For faucets, group by section
  if (type === 'faucet') {
    return (
      <Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
          borderRadius: 3,
          p: 3,
          border: '1px solid rgba(59, 130, 246, 0.2)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <FormControl size="small" sx={{ minWidth: 180, zIndex: 2 }}>
            <InputLabel id="faucet-section-label">Faucet Section</InputLabel>
            <Select
              labelId="faucet-section-label"
              value={selectedFaucetSection}
              label="Faucet Section"
              onChange={e => setSelectedFaucetSection(e.target.value)}
            >
              {faucetSections.map(section => (
                <MenuItem key={section} value={section}>{section}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={3}>
          {filteredFaucets.map(task => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
              <Card sx={{ 
                width: 220,
                height: 220,
                mx: 'auto',
                borderRadius: 2,
                p: 2,
                background: 'linear-gradient(135deg, rgba(30,41,59,0.85) 0%, rgba(51,65,85,0.85) 100%)',
                boxShadow: '0 8px 32px 0 rgba(30,136,229,0.13)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(59,130,246,0.10)',
                transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                '&:hover': {
                  boxShadow: '0 16px 48px 0 rgba(59,130,246,0.18)',
                  border: '1.5px solid #3b82f6',
                }
              }}>
                <Box className="card-glow" sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out',
                  pointerEvents: 'none'
                }} />
                
                <Box sx={{ 
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 1,
                  mb: 1,
                  height: 110,
                  background: 'rgba(30,41,59,0.92)',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {task.logo ? (
                    <CardMedia
                      component="img"
                      image={task.logo}
                      alt={task.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'contain',
                        borderRadius: '50%',
                        border: '2.5px solid #3b82f6',
                        boxShadow: '0 4px 16px 0 rgba(59,130,246,0.18)',
                        background: 'rgba(255,255,255,0.9)',
                        padding: '4px',
                      }}
                    />
                  ) : (
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2.3rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 16px 0 rgba(59,130,246,0.18)',
                    }}>
                      {task.name.charAt(0)}
                    </Box>
                  )}
                </Box>
                <CardContent sx={{ 
                  flexGrow: 1,
                  minHeight: 56,
                  maxHeight: 90,
                  textAlign: 'center',
                  p: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  alignItems: 'center',
                }}>
                  <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.2, width: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} color="text.primary">
                    {task.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.25, width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', whiteSpace: 'normal' }}>
                    {task.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 0, width: '100%', height: 44, minHeight: 44, maxHeight: 44 }}>
                  <Button
                    size="medium"
                    color="primary"
                    component="a"
                    href={task.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontWeight: 700,
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                      height: 44,
                      fontSize: '0.95rem',
                      letterSpacing: '0.04em',
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
                    CLAIM
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // For other task types, use the original layout
  return (
    <Grid container spacing={1.5}>
      {tasks.map(task => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
          <Card sx={{ 
            width: 220,
            height: 220,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 2,
            p: 2,
            background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease-in-out',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-8px) scale(1.02)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
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
              background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
              pointerEvents: 'none'
            }} />
            
            <Box sx={{ 
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 1,
              mb: 1,
              height: 110,
              background: '#1a1e2a',
              overflow: 'hidden',
            }}>
              {task.logo ? (
                <CardMedia
                  component="img"
                  image={task.logo}
                  alt={task.name}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'contain',
                    borderRadius: '50%',
                    border: '2.5px solid #3b82f6',
                    boxShadow: '0 4px 16px 0 rgba(59,130,246,0.18)',
                    background: 'rgba(255,255,255,0.9)',
                    padding: '4px',
                  }}
                />
              ) : (
                <Box sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2.3rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 16px 0 rgba(59,130,246,0.18)',
                }}>
                  {task.name.charAt(0)}
                </Box>
              )}
            </Box>
            <CardContent sx={{ 
              flexGrow: 1,
              minHeight: 56,
              maxHeight: 90,
              textAlign: 'center', 
              p: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflow: 'hidden',
              alignItems: 'center',
            }}>
              <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.2, width: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} color="text.primary">
                {task.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.25, width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', whiteSpace: 'normal' }}>
                {task.description}
              </Typography>
            </CardContent>
            <Box sx={{ p: 0, width: '100%', height: 44, minHeight: 44, maxHeight: 44 }}>
              <Button
                size="medium"
                color="primary"
                component="a"
                href={task.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontWeight: 700,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  height: 44,
                  fontSize: '0.95rem',
                  letterSpacing: '0.04em',
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
                VISIT
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default function DailyTask() {
  const [tab, setTab] = React.useState('checkin');
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/dailytasks?type=${tab}`);
      const data = await res.json();
      setTasks(data);
      setLoading(false);
    };
    fetchTasks();
  }, [tab]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            color: '#ffffff',
            mb: 2,
            letterSpacing: '-0.02em',
            fontSize: '2.5rem'
          }}
        >
          Daily Tasks
        </Typography>
        <Typography 
          variant="body1" 
          color="#cccccc" 
          sx={{ mb: 4, fontSize: '1.1rem' }}
        >
          Complete daily tasks to earn rewards and maximize your DeFi experience
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              textTransform: 'none',
              minHeight: 48,
              color: '#ffffff',
              '&.Mui-selected': {
                color: '#ffffff'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#ffffff'
            }
          }}
        >
          {taskTabs.map(t => (
            <Tab 
              key={t.value} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {t.icon}
                  {t.label}
                </Box>
              } 
              value={t.value} 
            />
          ))}
        </Tabs>
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
      ) : (
        <TaskSection tasks={tasks} type={tab} />
      )}
    </Container>
  );
} 