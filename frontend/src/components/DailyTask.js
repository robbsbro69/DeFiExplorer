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

function TaskSection({ tasks }) {
  if (!tasks || tasks.length === 0) return <Typography color="text.secondary">No tasks found.</Typography>;
  return (
    <Grid container spacing={2}>
      {tasks.map(task => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              background: '#23283a',
              boxShadow: '0 4px 24px 0 rgba(30,136,229,0.10)',
              alignItems: 'center',
              mx: 'auto',
              my: 2,
              overflow: 'hidden',
              maxWidth: 200,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 1.5,
                mb: 0.5,
              }}
            >
              {task.logo && (
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#181c24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px 0 rgba(30,136,229,0.10)',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={task.logo}
                    alt={task.name}
                    sx={{
                      width: 32,
                      height: 32,
                      objectFit: 'contain',
                      borderRadius: '50%',
                    }}
                  />
                </Box>
              )}
            </Box>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center', pb: 0, px: 1 }}>
              <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.98rem' }} color="text.primary">
                {task.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.92rem' }}>
                {task.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 0, width: '100%', mt: 0.5 }}>
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
                  minHeight: 36,
                  fontSize: '0.98rem',
                  letterSpacing: '0.04em',
                  width: '100%',
                  boxShadow: '0 2px 8px 0 rgba(30,136,229,0.10)',
                }}
                fullWidth
                onClick={e => e.stopPropagation()}
              >
                VISIT
              </Button>
            </CardActions>
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
      {loading ? <CircularProgress /> : <TaskSection tasks={tasks} />}
    </Box>
  );
} 