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
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
            {task.logo && (
              <CardMedia
                component="img"
                height="120"
                image={task.logo}
                alt={task.name}
                sx={{ objectFit: 'contain', p: 2, bgcolor: '#23283a' }}
              />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontWeight: 600 }}>
                {task.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" href={task.url} target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 600 }}>
                Visit
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