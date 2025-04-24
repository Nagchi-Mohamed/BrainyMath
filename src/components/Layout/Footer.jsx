import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/home' },
    { label: 'Privacy Policy', href: '/home' },
    { label: 'Terms of Service', href: '/home' },
    { label: 'Contact', href: '/home' }
  ];
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 5, 
        mt: 'auto',
        backgroundColor: 'primary.dark',
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              BrainyMathh
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 300 }}>
              Making math fun and engaging for students of all ages. Practice and improve your skills with our interactive games.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', pl: 0 }}>
              {links.map((link, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  <Link 
                    href={link.href} 
                    color="inherit" 
                    underline="hover"
                    sx={{ '&:hover': { color: 'secondary.light' } }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" paragraph>
              Have questions or suggestions? We'd love to hear from you!
            </Typography>
            <Link 
              href="mailto:contact@brainymathh.com" 
              color="inherit" 
              underline="hover"
              sx={{ '&:hover': { color: 'secondary.light' } }}
            >
              contact@brainymathh.com
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ mb: { xs: 2, md: 0 } }}>
            © {currentYear} BrainyMathh. All rights reserved.
          </Typography>
          <Box>
            <Link 
              href="#" 
              color="inherit" 
              underline="hover" 
              sx={{ mx: 1, '&:hover': { color: 'secondary.light' } }}
            >
              Facebook
            </Link>
            <Link 
              href="#" 
              color="inherit" 
              underline="hover" 
              sx={{ mx: 1, '&:hover': { color: 'secondary.light' } }}
            >
              Twitter
            </Link>
            <Link 
              href="#" 
              color="inherit" 
              underline="hover" 
              sx={{ mx: 1, '&:hover': { color: 'secondary.light' } }}
            >
              Instagram
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 