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
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { TrendingUp } from '@mui/icons-material';

const API_URL = process.env.REACT_APP_API_URL || '';

function DappSection({ title, dapps, icon: Icon }) {
  if (!dapps || dapps.length === 0) return null;
  
  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
        borderRadius: 3,
        p: 3,
        border: '1px solid rgba(59, 130, 246, 0.2)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #3b82f6, #f59e0b)',
          opacity: 0.8
        }
      }}>
        {Icon && <Icon sx={{ mr: 2, color: '#3b82f6', fontSize: 28 }} />}
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #3b82f6, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.01em',
            fontSize: '1.75rem'
          }}
        >
          {title}
        </Typography>
        <Chip 
          label={`${dapps.length} dapp${dapps.length !== 1 ? 's' : ''}`}
          size="small"
          sx={{ 
            ml: 'auto',
            background: 'rgba(59, 130, 246, 0.2)',
            color: '#3b82f6',
            fontWeight: 600,
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}
        />
      </Box>
      <Grid container spacing={3}>
        {dapps.map(dapp => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dapp._id}>
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
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #3b82f6, #f59e0b)',
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out'
              },
              '&:hover::before': {
                opacity: 1
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
              }}>
                {dapp.logo ? (
                  <CardMedia
                    component="img"
                    image={dapp.logo}
                    alt={dapp.name}
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
                    fontWeight: 700
                  }}>
                    {dapp.name.charAt(0)}
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
                  {dapp.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.25, width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', whiteSpace: 'normal' }}>
                  {dapp.description}
                </Typography>
              </CardContent>
              
              <Box sx={{ p: 0, width: '100%', height: 44, minHeight: 44, maxHeight: 44 }}>
                <Button
                  size="medium"
                  color="primary"
                  component="a"
                  href={dapp.url}
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
    </Box>
  );
}

export default function Explorer() {
  const [chains, setChains] = React.useState([]);
  const [selectedChain, setSelectedChain] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('all');
  const [dapps, setDapps] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const dappTypes = [
    { value: 'all', label: 'All DApps' },
    { value: 'dex', label: 'DEXs' },
    { value: 'lending', label: 'Lending Protocols' },
    { value: 'nft', label: 'NFT Marketplaces' },
    { value: 'bridge', label: 'Bridges' },
    { value: 'derivatives', label: 'Derivatives' }
  ];

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

  const getCurrentDapps = () => {
    if (selectedType === 'all') {
      return dapps;
    }
    return dappsByType(selectedType);
  };

  const getCurrentTitle = () => {
    const typeObj = dappTypes.find(t => t.value === selectedType);
    return typeObj ? typeObj.label : selectedType;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        p: 4,
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
        borderRadius: 3,
        border: '1px solid rgba(59, 130, 246, 0.2)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #3b82f6, #f59e0b)',
          opacity: 0.8
        }
      }}>
        <Box>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #3b82f6, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              letterSpacing: '-0.02em',
              fontSize: '2.5rem'
            }}
          >
            DeFi Explorer
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ fontSize: '1.1rem' }}
          >
            Discover the best DeFi applications across multiple chains
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="chain-select-label">
              Select Chain
            </InputLabel>
            <Select
              labelId="chain-select-label"
              value={selectedChain}
              label="Select Chain"
              onChange={e => setSelectedChain(e.target.value)}
            >
              {chains.map(chain => (
                <MenuItem key={chain._id} value={chain._id}>
                  {chain.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="type-select-label">
              Select Type
            </InputLabel>
            <Select
              labelId="type-select-label"
              value={selectedType}
              label="Select Type"
              onChange={e => setSelectedType(e.target.value)}
            >
              {dappTypes.map(type => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 400 
        }}>
          <CircularProgress size={60} sx={{ color: 'primary.main' }} />
        </Box>
      ) : getCurrentDapps().length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 400,
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant="h5" color="text.secondary">
            No dapps found for the selected criteria
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try selecting a different chain or dapp type
          </Typography>
        </Box>
      ) : (
        <DappSection 
          title={getCurrentTitle()} 
          dapps={getCurrentDapps()} 
          icon={TrendingUp} 
        />
      )}
    </Container>
  );
} 