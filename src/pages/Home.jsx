import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  Card,
  CardContent,
  CardMedia,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MultiplyIcon from '@mui/icons-material/Close';
import DivideIcon from '@mui/icons-material/Calculate';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useAuth } from '../contexts/AuthContext';
import { trackFeatureUsage } from '../lib/analytics';

const Home = () => {
  const { currentUser } = useAuth();
  const theme = useTheme();
  
  const features = [
    {
      title: 'Interactive Math Games',
      description: 'Practice math with fun, adaptive games that increase in difficulty as you improve.',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main
    },
    {
      title: 'Track Your Progress',
      description: 'See your improvement over time with detailed stats and history tracking.',
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main
    }
  ];
  
  const games = [
    {
      title: 'Addition',
      description: 'Master the fundamentals of adding numbers.',
      icon: <AddIcon sx={{ fontSize: 40 }} />,
      path: '/games/addition',
      color: theme.palette.primary.main
    },
    {
      title: 'Subtraction',
      description: 'Practice your subtraction skills with increasingly challenging problems.',
      icon: <RemoveIcon sx={{ fontSize: 40 }} />,
      path: '/games/subtraction',
      color: theme.palette.secondary.main
    },
    {
      title: 'Multiplication',
      description: 'Learn to multiply numbers quickly and accurately.',
      icon: <MultiplyIcon sx={{ fontSize: 40 }} />,
      path: '/games/multiplication',
      color: theme.palette.success.main
    },
    {
      title: 'Division',
      description: 'Develop your division skills with adaptive challenges.',
      icon: <DivideIcon sx={{ fontSize: 40 }} />,
      path: '/games/division',
      color: theme.palette.warning.main
    }
  ];
  
  const handleFeatureClick = (feature) => {
    trackFeatureUsage('home', 'feature_click', { feature });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 10,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                BrainyMathh
              </Typography>
              <Typography variant="h5" paragraph sx={{ mb: 4 }}>
                Make learning math fun and interactive. Improve your skills with games and challenges!
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {currentUser ? (
                  <Button 
                    component={Link} 
                    to="/" 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button 
                      component={Link} 
                      to="/register" 
                      variant="contained" 
                      color="secondary" 
                      size="large"
                      sx={{ px: 4, py: 1.5 }}
                    >
                      Sign Up Free
                    </Button>
                    <Button 
                      component={Link} 
                      to="/login" 
                      variant="outlined" 
                      color="inherit" 
                      size="large"
                      sx={{ px: 4, py: 1.5 }}
                    >
                      Log In
                    </Button>
                  </>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img" 
                src="/images/hero-image.svg" 
                alt="Math learning"
                sx={{ 
                  width: '100%', 
                  maxWidth: 500,
                  display: 'block',
                  mx: 'auto'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Why Choose BrainyMathh?
        </Typography>
        <Typography variant="body1" textAlign="center" paragraph sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
          Our interactive platform makes learning math enjoyable and effective with games designed to reinforce key concepts.
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Box 
                  sx={{ 
                    mb: 2,
                    p: 1.5,
                    borderRadius: '50%',
                    bgcolor: feature.color + '22',
                    color: feature.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Games Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Our Math Games
          </Typography>
          <Typography variant="body1" textAlign="center" paragraph sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
            Practice different math operations with our engaging games. Each game adapts to your skill level!
          </Typography>
          
          <Grid container spacing={3}>
            {games.map((game, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      transition: 'transform 0.3s ease-in-out'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: game.color + '22', 
                      py: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: game.color
                    }}
                  >
                    {game.icon}
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {game.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {game.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button 
                      component={Link} 
                      to={currentUser ? game.path : '/login'} 
                      variant="outlined" 
                      fullWidth
                    >
                      {currentUser ? 'Play Now' : 'Sign In to Play'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Container maxWidth="md" sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Improve Your Math Skills?
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
          Join thousands of students who have improved their math skills with BrainyMathh. Start your journey today!
        </Typography>
        {currentUser ? (
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Go to Dashboard
          </Button>
        ) : (
          <Button 
            component={Link} 
            to="/register" 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Get Started Free
          </Button>
        )}
      </Container>
    </Box>
  );
};

export default Home; 