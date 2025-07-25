import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const API_URL = process.env.REACT_APP_API_URL || '';

function DappSection({ title, dapps }) {
  if (!dapps || dapps.length === 0) return null;
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }} color="text.primary">
        {title}
      </Typography>
      <Grid container spacing={2}>
        {dapps.map(dapp => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dapp._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
              {dapp.logo && (
                <CardMedia
                  component="img"
                  height="120"
                  image={dapp.logo}
                  alt={dapp.name}
                  sx={{ objectFit: 'contain', p: 2, bgcolor: '#23283a' }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontWeight: 600 }} color="text.primary">
                  {dapp.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dapp.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component="a"
                  href={dapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ fontWeight: 600 }}
                  onClick={e => e.stopPropagation()}
                >
                  Visit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function Explorer() {
  const [chains, setChains] = React.useState([]);
  const [selectedChain, setSelectedChain] = React.useState('');
  const [dapps, setDapps] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchChains = async () => {
      const res = await fetch(`${API_URL}/api/chains`);
      const data = await res.json();
      setChains(data);
      if (data.length > 0) setSelectedChain(data[0]._id);
    };
    fetchChains();
  }, []);

  React.useEffect(() => {
    if (!selectedChain) return;
    setLoading(true);
    const fetchDapps = async () => {
      const res = await fetch(`${API_URL}/api/dapps?chain=${selectedChain}`);
      const data = await res.json();
      setDapps(data);
      setLoading(false);
    };
    fetchDapps();
  }, [selectedChain]);

  const dappsByType = type => dapps.filter(d => d.type.toLowerCase() === type);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="chain-select-label">Select Chain</InputLabel>
          <Select
            labelId="chain-select-label"
            value={selectedChain}
            label="Select Chain"
            onChange={e => setSelectedChain(e.target.value)}
          >
            {chains.map(chain => (
              <MenuItem key={chain._id} value={chain._id}>{chain.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {loading ? <CircularProgress /> : (
        <>
          <DappSection title="DEXs" dapps={dappsByType('dex')} />
          <DappSection title="Lending Protocols" dapps={dappsByType('lending')} />
          <DappSection title="NFT Marketplaces" dapps={dappsByType('nft')} />
          <DappSection title="Bridges" dapps={dappsByType('bridge')} />
        </>
      )}
    </Box>
  );
} 