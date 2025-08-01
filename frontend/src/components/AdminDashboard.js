import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import AdminLogin from './AdminLogin';

const API_URL = process.env.REACT_APP_API_URL || '';

const sections = [
  { label: 'Chains', value: 'chains' },
  { label: 'Dapps', value: 'dapps' },
  { label: 'Daily Tasks', value: 'dailytasks' },
  { label: 'Airdrop Events', value: 'airdrops' },
  { label: 'Sections', value: 'sections' },
];

function ChainsAdmin() {
  const [chains, setChains] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [editChain, setEditChain] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', type: '', description: '' });
  const [saving, setSaving] = React.useState(false);

  const fetchChains = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/chains`);
      const data = await res.json();
      setChains(data);
    } catch (err) {
      setError('Failed to fetch chains');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { fetchChains(); }, []);

  const handleOpen = (chain = null) => {
    setEditChain(chain);
    setForm(chain ? { ...chain } : { name: '', type: '', description: '' });
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditChain(null); };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/api/chains${editChain ? `/${editChain._id}` : ''}`, {
        method: editChain ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Save failed');
      handleClose();
      fetchChains();
    } catch (err) {
      setError('Failed to save chain');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this chain?')) return;
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/api/chains/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchChains();
    } catch (err) {
      setError('Failed to delete chain');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="text.primary">Chains</Typography>
        <Button variant="contained" onClick={() => handleOpen()} sx={{ borderRadius: 2 }}>
          Add Chain
        </Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <Box>
          {chains.length === 0 ? <Typography color="text.secondary">No chains found.</Typography> : (
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              {chains.map(chain => (
                <Box key={chain._id} component="li" sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }} color="text.primary">{chain.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{chain.type}</Typography>
                    <Typography variant="body2" color="text.secondary">{chain.description}</Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleOpen(chain)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(chain._id)} color="error"><DeleteIcon /></IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{editChain ? 'Edit Chain' : 'Add Chain'}</DialogTitle>
        <DialogContent>
          <TextField margin="normal" label="Name" name="name" fullWidth value={form.name} onChange={handleChange} autoFocus required />
          <TextField margin="normal" label="Type" name="type" fullWidth value={form.type} onChange={handleChange} />
          <TextField margin="normal" label="Description" name="description" fullWidth value={form.description} onChange={handleChange} />
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>{saving ? <CircularProgress size={20} /> : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function DappsAdmin() {
  const [dapps, setDapps] = React.useState([]);
  const [chains, setChains] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [editDapp, setEditDapp] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', url: '', type: '', chain: '', description: '', logo: '' });
  const [saving, setSaving] = React.useState(false);
  const [filterChain, setFilterChain] = React.useState('');
  const [filterType, setFilterType] = React.useState('');

  // Predefined dapp types for dropdown
  const dappTypes = [
    { value: 'dex', label: 'DEX' },
    { value: 'lending', label: 'Lending Protocol' },
    { value: 'nft', label: 'NFT Marketplace' },
    { value: 'bridge', label: 'Bridge' },
    { value: 'faucet', label: 'Faucet' },
    { value: 'derivatives', label: 'Derivatives' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'social', label: 'Social' },
    { value: 'yield', label: 'Yield Farming' },
    { value: 'other', label: 'Other' }
  ];

  const fetchDapps = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/dapps`);
      const data = await res.json();
      setDapps(data);
    } catch (err) {
      setError('Failed to fetch dapps');
    } finally {
      setLoading(false);
    }
  };
  const fetchChains = async () => {
    try {
      const res = await fetch(`${API_URL}/api/chains`);
      const data = await res.json();
      setChains(data);
    } catch {}
  };
  React.useEffect(() => { fetchDapps(); fetchChains(); }, []);

  const handleOpen = (dapp = null) => {
    setEditDapp(dapp);
    setForm(dapp ? { ...dapp, chain: dapp.chain?._id || dapp.chain } : { name: '', url: '', type: '', chain: '', description: '', logo: '' });
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditDapp(null); };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/api/dapps${editDapp ? `/${editDapp._id}` : ''}`, {
        method: editDapp ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Save failed');
      handleClose();
      fetchDapps();
    } catch (err) {
      setError('Failed to save dapp');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this dapp?')) return;
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/api/dapps/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchDapps();
    } catch (err) {
      setError('Failed to delete dapp');
    } finally {
      setSaving(false);
    }
  };

  // Filter dapps based on selected chain and type
  const filteredDapps = dapps.filter(dapp => {
    const chainMatch = !filterChain || dapp.chain?._id === filterChain || dapp.chain === filterChain;
    const typeMatch = !filterType || dapp.type.toLowerCase() === filterType.toLowerCase();
    return chainMatch && typeMatch;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="text.primary">Dapps</Typography>
        <Button variant="contained" onClick={() => handleOpen()} sx={{ borderRadius: 2 }}>
          Add Dapp
        </Button>
      </Box>
      
      {/* Filter Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          select
          label="Filter by Chain"
          value={filterChain}
          onChange={(e) => setFilterChain(e.target.value)}
          sx={{ 
            minWidth: 200,
            '& .MuiSelect-select': {
              padding: '12px 14px',
              fontSize: '14px',
              lineHeight: '1.5'
            }
          }}
          SelectProps={{ 
            native: true,
            style: { fontSize: '14px', padding: '8px' }
          }}
        >
          <option value="" style={{ padding: '8px', fontSize: '14px' }}>All Chains</option>
          {chains.map(chain => (
            <option key={chain._id} value={chain._id} style={{ padding: '8px', fontSize: '14px' }}>{chain.name}</option>
          ))}
        </TextField>
        
        <TextField
          select
          label="Filter by Type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{ 
            minWidth: 200,
            '& .MuiSelect-select': {
              padding: '12px 14px',
              fontSize: '14px',
              lineHeight: '1.5'
            }
          }}
          SelectProps={{ 
            native: true,
            style: { fontSize: '14px', padding: '8px' }
          }}
        >
          <option value="" style={{ padding: '8px', fontSize: '14px' }}>All Types</option>
          {dappTypes.map(type => (
            <option key={type.value} value={type.value} style={{ padding: '8px', fontSize: '14px' }}>{type.label}</option>
          ))}
        </TextField>
        
        <Button 
          variant="outlined" 
          onClick={() => { setFilterChain(''); setFilterType(''); }}
          sx={{ borderRadius: 2 }}
        >
          Clear Filters
        </Button>
        
        <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
          Showing {filteredDapps.length} of {dapps.length} dapps
        </Typography>
      </Box>
      {loading ? <CircularProgress /> : (
        <Box>
          {filteredDapps.length === 0 ? (
            <Typography color="text.secondary">
              {dapps.length === 0 ? 'No dapps found.' : 'No dapps match the selected filters.'}
            </Typography>
          ) : (
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              {filteredDapps.map(dapp => (
                <Box key={dapp._id} component="li" sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }} color="text.primary">{dapp.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{dapp.type} | {dapp.chain?.name || ''}</Typography>
                    <Typography variant="body2" color="text.secondary">{dapp.description}</Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleOpen(dapp)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(dapp._id)} color="error"><DeleteIcon /></IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{editDapp ? 'Edit Dapp' : 'Add Dapp'}</DialogTitle>
        <DialogContent>
          <TextField margin="normal" label="Name" name="name" fullWidth value={form.name} onChange={handleChange} autoFocus required />
          <TextField margin="normal" label="URL" name="url" fullWidth value={form.url} onChange={handleChange} required />
          <TextField
            margin="normal"
            label="Type"
            name="type"
            fullWidth
            select
            sx={{
              '& .MuiSelect-select': {
                padding: '12px 14px',
                fontSize: '14px',
                lineHeight: '1.5'
              }
            }}
            SelectProps={{ 
              native: true,
              style: { fontSize: '14px', padding: '8px' }
            }}
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="" style={{ padding: '8px', fontSize: '14px' }}>Select Type</option>
            {dappTypes.map(type => (
              <option key={type.value} value={type.value} style={{ padding: '8px', fontSize: '14px' }}>{type.label}</option>
            ))}
          </TextField>
          <TextField
            margin="normal"
            label="Chain"
            name="chain"
            fullWidth
            select
            sx={{
              '& .MuiSelect-select': {
                padding: '12px 14px',
                fontSize: '14px',
                lineHeight: '1.5'
              }
            }}
            SelectProps={{ 
              native: true,
              style: { fontSize: '14px', padding: '8px' }
            }}
            value={form.chain}
            onChange={handleChange}
            required
          >
            <option value="" style={{ padding: '8px', fontSize: '14px' }}>Select Chain</option>
            {chains.map(chain => (
              <option key={chain._id} value={chain._id} style={{ padding: '8px', fontSize: '14px' }}>{chain.name}</option>
            ))}
          </TextField>
          <TextField margin="normal" label="Description" name="description" fullWidth value={form.description} onChange={handleChange} />
          <TextField margin="normal" label="Logo URL" name="logo" fullWidth value={form.logo} onChange={handleChange} />
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>{saving ? <CircularProgress size={20} /> : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function SectionsAdmin() {
  const [sections, setSections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [editSection, setEditSection] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', type: 'faucet', description: '', order: 0 });
  const [saving, setSaving] = React.useState(false);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/sections`);
      const data = await res.json();
      setSections(data);
    } catch (err) {
      setError('Failed to fetch sections');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { fetchSections(); }, []);

  const handleOpen = (section = null) => {
    setEditSection(section);
    setForm(section ? { ...section } : { name: '', type: 'faucet', description: '', order: 0 });
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditSection(null); };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/api/sections${editSection ? `/${editSection._id}` : ''}`, {
        method: editSection ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Save failed');
      handleClose();
      fetchSections();
    } catch (err) {
      setError('Failed to save section');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this section?')) return;
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/api/sections/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchSections();
    } catch (err) {
      setError('Failed to delete section');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="text.primary">Sections</Typography>
        <Button variant="contained" onClick={() => handleOpen()} sx={{ borderRadius: 2 }}>
          Add Section
        </Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <Box>
          {sections.length === 0 ? <Typography color="text.secondary">No sections found.</Typography> : (
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              {sections.map(section => (
                <Box key={section._id} component="li" sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }} color="text.primary">{section.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{section.type} | Order: {section.order}</Typography>
                    <Typography variant="body2" color="text.secondary">{section.description}</Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleOpen(section)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(section._id)} color="error"><DeleteIcon /></IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{editSection ? 'Edit Section' : 'Add Section'}</DialogTitle>
        <DialogContent>
          <TextField margin="normal" label="Name" name="name" fullWidth value={form.name} onChange={handleChange} autoFocus required />
          <TextField 
            margin="normal" 
            label="Type" 
            name="type" 
            fullWidth 
            select 
            sx={{
              '& .MuiSelect-select': {
                padding: '12px 14px',
                fontSize: '14px',
                lineHeight: '1.5'
              }
            }}
            SelectProps={{ 
              native: true,
              style: { fontSize: '14px', padding: '8px' }
            }} 
            value={form.type} 
            onChange={handleChange} 
            required
          >
            <option value="faucet" style={{ padding: '8px', fontSize: '14px' }}>Faucet</option>
          </TextField>
          <TextField margin="normal" label="Description" name="description" fullWidth value={form.description} onChange={handleChange} />
          <TextField margin="normal" label="Order" name="order" type="number" fullWidth value={form.order} onChange={handleChange} />
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>{saving ? <CircularProgress size={20} /> : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function DailyTasksAdmin() {
  const [tasks, setTasks] = React.useState([]);
  const [sections, setSections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [editTask, setEditTask] = React.useState(null);
  const [form, setForm] = React.useState({ type: '', name: '', url: '', description: '', logo: '', sectionId: '' });
  const [saving, setSaving] = React.useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/dailytasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch daily tasks');
    } finally {
      setLoading(false);
    }
  };
  const fetchSections = async () => {
    try {
      const res = await fetch(`${API_URL}/api/sections`);
      const data = await res.json();
      setSections(data);
    } catch {}
  };
  React.useEffect(() => { fetchTasks(); fetchSections(); }, []);

  const handleOpen = (task = null) => {
    setEditTask(task);
    setForm(task ? { ...task, sectionId: task.sectionId?._id || task.sectionId } : { type: '', name: '', url: '', description: '', logo: '', sectionId: '' });
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditTask(null); };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/api/dailytasks${editTask ? `/${editTask._id}` : ''}`, {
        method: editTask ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Save failed');
      handleClose();
      fetchTasks();
    } catch (err) {
      setError('Failed to save daily task');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this daily task?')) return;
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/api/dailytasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchTasks();
    } catch (err) {
      setError('Failed to delete daily task');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="text.primary">Daily Tasks</Typography>
        <Button variant="contained" onClick={() => handleOpen()} sx={{ borderRadius: 2 }}>
          Add Daily Task
        </Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <Box>
          {tasks.length === 0 ? <Typography color="text.secondary">No daily tasks found.</Typography> : (
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              {tasks.map(task => (
                <Box key={task._id} component="li" sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }} color="text.primary">{task.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{task.type} {task.sectionId?.name ? `| ${task.sectionId.name}` : ''}</Typography>
                    <Typography variant="body2" color="text.secondary">{task.description}</Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleOpen(task)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(task._id)} color="error"><DeleteIcon /></IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{editTask ? 'Edit Daily Task' : 'Add Daily Task'}</DialogTitle>
        <DialogContent>
          <TextField margin="normal" label="Name" name="name" fullWidth value={form.name} onChange={handleChange} autoFocus required />
          <TextField 
            margin="normal" 
            label="Type" 
            name="type" 
            fullWidth 
            select 
            sx={{
              '& .MuiSelect-select': {
                padding: '12px 14px',
                fontSize: '14px',
                lineHeight: '1.5'
              }
            }}
            SelectProps={{ 
              native: true,
              style: { fontSize: '14px', padding: '8px' }
            }} 
            value={form.type} 
            onChange={handleChange} 
            required
          >
            <option value="" style={{ padding: '8px', fontSize: '14px' }}>Select Type</option>
            <option value="checkin" style={{ padding: '8px', fontSize: '14px' }}>Check-in</option>
            <option value="swap" style={{ padding: '8px', fontSize: '14px' }}>Daily Swap</option>
            <option value="quest" style={{ padding: '8px', fontSize: '14px' }}>Quest</option>
            <option value="faucet" style={{ padding: '8px', fontSize: '14px' }}>Faucet</option>
          </TextField>
          <TextField margin="normal" label="URL" name="url" fullWidth value={form.url} onChange={handleChange} required />
          <TextField margin="normal" label="Description" name="description" fullWidth value={form.description} onChange={handleChange} />
          <TextField margin="normal" label="Logo URL" name="logo" fullWidth value={form.logo} onChange={handleChange} />
          <TextField
            margin="normal"
            label="Section"
            name="sectionId"
            fullWidth
            select
            sx={{
              '& .MuiSelect-select': {
                padding: '12px 14px',
                fontSize: '14px',
                lineHeight: '1.5'
              }
            }}
            SelectProps={{ 
              native: true,
              style: { fontSize: '14px', padding: '8px' }
            }}
            value={form.sectionId}
            onChange={handleChange}
          >
            <option value="" style={{ padding: '8px', fontSize: '14px' }}>Select Section (Optional)</option>
            {sections.map(section => (
              <option key={section._id} value={section._id} style={{ padding: '8px', fontSize: '14px' }}>{section.name}</option>
            ))}
          </TextField>
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>{saving ? <CircularProgress size={20} /> : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function AirdropEventsAdmin() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [editEvent, setEditEvent] = React.useState(null);
  const [form, setForm] = React.useState({ title: '', description: '', banner: '', url: '', startDate: '', endDate: '' });
  const [saving, setSaving] = React.useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/airdropevents`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch airdrop events');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { fetchEvents(); }, []);

  const handleOpen = (event = null) => {
    setEditEvent(event);
    setForm(event ? { ...event, startDate: event.startDate ? event.startDate.slice(0, 10) : '', endDate: event.endDate ? event.endDate.slice(0, 10) : '' } : { title: '', description: '', banner: '', url: '', startDate: '', endDate: '' });
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditEvent(null); };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/api/airdropevents${editEvent ? `/${editEvent._id}` : ''}`, {
        method: editEvent ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Save failed');
      handleClose();
      fetchEvents();
    } catch (err) {
      setError('Failed to save airdrop event');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this airdrop event?')) return;
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/api/airdropevents/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchEvents();
    } catch (err) {
      setError('Failed to delete airdrop event');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="text.primary">Airdrop Events</Typography>
        <Button variant="contained" onClick={() => handleOpen()} sx={{ borderRadius: 2 }}>
          Add Airdrop Event
        </Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <Box>
          {events.length === 0 ? <Typography color="text.secondary">No airdrop events found.</Typography> : (
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              {events.map(event => (
                <Box key={event._id} component="li" sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }} color="text.primary">{event.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{event.description}</Typography>
                    <Typography variant="body2" color="text.secondary">{event.startDate ? `Start: ${event.startDate.slice(0, 10)}` : ''} {event.endDate ? `End: ${event.endDate.slice(0, 10)}` : ''}</Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleOpen(event)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(event._id)} color="error"><DeleteIcon /></IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{editEvent ? 'Edit Airdrop Event' : 'Add Airdrop Event'}</DialogTitle>
        <DialogContent>
          <TextField margin="normal" label="Title" name="title" fullWidth value={form.title} onChange={handleChange} autoFocus required />
          <TextField margin="normal" label="Description" name="description" fullWidth value={form.description} onChange={handleChange} />
          <TextField margin="normal" label="Banner URL" name="banner" fullWidth value={form.banner} onChange={handleChange} />
          <TextField margin="normal" label="Event URL" name="url" fullWidth value={form.url} onChange={handleChange} />
          <TextField margin="normal" label="Start Date" name="startDate" type="date" fullWidth value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField margin="normal" label="End Date" name="endDate" type="date" fullWidth value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>{saving ? <CircularProgress size={20} /> : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = React.useState('chains');
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('adminToken'));

  React.useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #3b82f6, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Admin Dashboard
        </Typography>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={handleLogout}
          sx={{ borderRadius: 2 }}
        >
          Logout
        </Button>
      </Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        {sections.map((section) => (
          <Tab key={section.value} label={section.label} value={section.value} />
        ))}
      </Tabs>
      <Box sx={{ p: 2, minHeight: 200, bgcolor: 'background.paper', borderRadius: 2 }}>
        {tab === 'chains' ? <ChainsAdmin /> : tab === 'dapps' ? <DappsAdmin /> : tab === 'dailytasks' ? <DailyTasksAdmin /> : tab === 'airdrops' ? <AirdropEventsAdmin /> : tab === 'sections' ? <SectionsAdmin /> : (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {sections.find(s => s.value === tab).label}
            </Typography>
            <Typography color="text.secondary">
              {`(CRUD interface for ${tab} will appear here.)`}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
} 