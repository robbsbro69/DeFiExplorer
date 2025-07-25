import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

export default function AboutUs() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }} color="text.primary">
        About DeFi Explorer
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }} color="text.primary">
        <b>DeFi Explorer</b> is your one-stop portal for discovering, exploring, and participating in the best decentralized finance (DeFi) dapps, daily tasks, airdrop events, and quests across multiple blockchains. Our mission is to make DeFi accessible, easy, and rewarding for everyone.
      </Typography>
      <Divider sx={{ my: 3, borderColor: 'text.secondary' }} />
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }} color="text.primary">
        What We Offer
      </Typography>
      <ul style={{ margin: 0, paddingLeft: 24, color: 'inherit' }}>
        <li><Typography variant="body1" color="text.primary">Explore top DEXs, lending protocols, NFT marketplaces, and bridges for every supported chain.</Typography></li>
        <li><Typography variant="body1" color="text.primary">Complete daily check-ins, swaps, quests, and claim faucets to maximize your DeFi experience.</Typography></li>
        <li><Typography variant="body1" color="text.primary">Stay up-to-date with the latest airdrop events and campaigns.</Typography></li>
      </ul>
      <Divider sx={{ my: 3, borderColor: 'text.secondary' }} />
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }} color="text.primary">
        Contact & Socials
      </Typography>
      <Typography variant="body1" color="text.primary">
        For feedback, suggestions, or partnership inquiries, reach out:
      </Typography>
      <ul style={{ margin: 0, paddingLeft: 24, color: 'inherit' }}>
        <li><Link href="mailto:defiexplorer@proton.me" color="primary">defiexplorer@proton.me</Link></li>
        <li><Link href="https://twitter.com/defiexplorer" color="primary" target="_blank" rel="noopener">Twitter</Link></li>
        <li><Link href="https://t.me/defiexplorer" color="primary" target="_blank" rel="noopener">Telegram</Link></li>
      </ul>
      <Divider sx={{ my: 3, borderColor: 'text.secondary' }} />
    </Box>
  );
} 