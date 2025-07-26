import React from 'react';
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

const API_URL = process.env.REACT_APP_API_URL || '';

const taskTabs = [
  { label: 'Check-ins', value: 'checkin' },
  { label: 'Daily Swaps', value: 'swap' },
  { label: 'Quests', value: 'quest' },
  { label: 'Faucets', value: 'faucet' },
];

function TaskSection({ tasks, type }) {
  if (!tasks || tasks.length === 0) return <Typography color="text.secondary">No tasks found.</Typography>;
  
  // For faucets, group by section
  if (type === 'faucet') {
    const sections = {};
    tasks.forEach(task => {
      const sectionName = task.sectionId?.name || 'Other Faucets';
      if (!sections[sectionName]) {
        sections[sectionName] = [];
      }
      sections[sectionName].push(task);
    });

    return (
      <Box>
        {Object.entries(sections).map(([sectionName, sectionTasks]) => {
          if (sectionTasks.length === 0) return null;
          return (
            <Box key={sectionName} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#1e88e5' }}>
                {sectionName}
              </Typography>
              <Grid container spacing={2}>
                {sectionTasks.map(task => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
                    <Card sx={{ 
                      width: '100%',
                      height: 200,
                      display: 'flex', 
                      flexDirection: 'column', 
                      borderRadius: 3, 
                      background: '#23283a',
                      boxShadow: '0 4px 24px 0 rgba(30,136,229,0.10)',
                      overflow: 'hidden',
                    }}>
                      <Box sx={{ 
                        width: '100%', 
                        height: 100,
                        background: '#1a1e2a',
                        overflow: 'hidden',
                      }}>
                        {task.logo && (
                          <CardMedia
                            component="img"
                            image={task.logo}
                            alt={task.name}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderTopLeftRadius: 12,
                              borderTopRightRadius: 12,
                            }}
                          />
                        )}
                      </Box>
                      <CardContent sx={{ 
                        height: 64,
                        minHeight: 64,
                        maxHeight: 64,
                        textAlign: 'center', 
                        pb: 1, 
                        px: 1, 
                        py: 1, 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}>
                        <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.5 }} color="text.primary">
                          {task.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', lineHeight: 1.2, overflow: 'hidden' }}>
                          {task.description}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 0, width: '100%', height: 36, minHeight: 36, maxHeight: 36 }}>
                        <Button
                          size="small"
                          color="primary"
                          component="a"
                          href={task.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            fontWeight: 700,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            height: 36,
                            fontSize: '0.85rem',
                            letterSpacing: '0.04em',
                            width: '100%',
                            boxShadow: '0 2px 8px 0 rgba(30,136,229,0.10)',
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
            </Box>
          );
        })}
      </Box>
    );
  }

  // For other task types, use the original layout
  return (
    <Grid container spacing={2}>
      {tasks.map(task => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
          <Card sx={{ 
            width: '100%',
            height: 200,
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: 3, 
            background: '#23283a',
            boxShadow: '0 4px 24px 0 rgba(30,136,229,0.10)',
            overflow: 'hidden',
          }}>
            <Box sx={{ 
              width: '100%', 
              height: 100,
              background: '#1a1e2a',
              overflow: 'hidden',
            }}>
              {task.logo && (
                <CardMedia
                  component="img"
                  image={task.logo}
                  alt={task.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
              )}
            </Box>
            <CardContent sx={{ 
              height: 64,
              minHeight: 64,
              maxHeight: 64,
              textAlign: 'center', 
              pb: 1, 
              px: 1, 
              py: 1, 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.5 }} color="text.primary">
                {task.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', lineHeight: 1.2, overflow: 'hidden' }}>
                {task.description}
              </Typography>
            </CardContent>
            <Box sx={{ p: 0, width: '100%', height: 36, minHeight: 36, maxHeight: 36 }}>
              <Button
                size="small"
                color="primary"
                component="a"
                href={task.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontWeight: 700,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  height: 36,
                  fontSize: '0.85rem',
                  letterSpacing: '0.04em',
                  width: '100%',
                  boxShadow: '0 2px 8px 0 rgba(30,136,229,0.10)',
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
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        {taskTabs.map(t => (
          <Tab key={t.value} label={t.label} value={t.value} />
        ))}
      </Tabs>
      {loading ? <CircularProgress /> : <TaskSection tasks={tasks} type={tab} />}
    </Box>
  );
} 