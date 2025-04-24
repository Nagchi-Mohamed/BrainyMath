import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  CircularProgress,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MultiplyIcon from '@mui/icons-material/Close';
import DivideIcon from '@mui/icons-material/Calculate';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalGames: 0,
    highScores: {
      addition: 0,
      subtraction: 0,
      multiplication: 0,
      division: 0
    },
    recentActivity: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        const response = await axios.get('/api/user/stats');
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching user stats:', err);
        setError('Failed to load your stats. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Mock data for development
    setTimeout(() => {
      setStats({
        totalGames: 24,
        highScores: {
          addition: 15,
          subtraction: 12,
          multiplication: 9,
          division: 7
        },
        recentActivity: [
          { gameType: 'addition', score: 12, date: new Date().toISOString() },
          { gameType: 'multiplication', score: 9, date: new Date(Date.now() - 86400000).toISOString() },
          { gameType: 'division', score: 7, date: new Date(Date.now() - 172800000).toISOString() }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [currentUser]);

  const getGameIcon = (gameType) => {
    switch (gameType) {
      case 'addition':
        return <AddIcon fontSize="large" />;
      case 'subtraction':
        return <RemoveIcon fontSize="large" />;
      case 'multiplication':
        return <MultiplyIcon fontSize="large" />;
      case 'division':
        return <DivideIcon fontSize="large" />;
      default:
        return null;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {currentUser?.displayName || 'Student'}!
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={4}>
        {/* Math Games Section */}
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Math Games
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ my: 2, color: 'primary.main' }}>
                    <AddIcon sx={{ fontSize: 60 }} />
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Addition
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Practice adding numbers with an interactive challenge.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/games/addition"
                    size="small"
                  >
                    Play Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ my: 2, color: 'primary.main' }}>
                    <RemoveIcon sx={{ fontSize: 60 }} />
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Subtraction
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Test your subtraction skills with timed challenges.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/games/subtraction"
                    size="small"
                  >
                    Play Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ my: 2, color: 'primary.main' }}>
                    <MultiplyIcon sx={{ fontSize: 60 }} />
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Multiplication
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Multiply numbers faster with this fun multiplication game.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/games/multiplication"
                    size="small"
                  >
                    Play Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ my: 2, color: 'primary.main' }}>
                    <DivideIcon sx={{ fontSize: 60 }} />
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Division
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Master division with progressively challenging problems.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/games/division"
                    size="small"
                  >
                    Play Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Your Progress
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Total Games Played: {stats.totalGames}
              </Typography>
            </Box>
            
            <Typography variant="h6" gutterBottom>
              High Scores
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(stats.highScores).map(([game, score]) => (
                <Grid item xs={6} key={game}>
                  <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {capitalizeFirstLetter(game)}
                    </Typography>
                    <Typography variant="h5">
                      {score}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button 
                variant="outlined" 
                component={Link} 
                to="/history" 
                startIcon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" fill="currentColor" />
                </svg>}
              >
                View Detailed Analytics
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activity Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Recent Activity
            </Typography>
            
            {stats.recentActivity.length === 0 ? (
              <Typography variant="body1" sx={{ mt: 2 }}>
                You haven't played any games yet. Try one of our math games to get started!
              </Typography>
            ) : (
              <Box>
                {stats.recentActivity.map((activity, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      py: 1,
                      borderBottom: index < stats.recentActivity.length - 1 ? '1px solid #eee' : 'none'
                    }}
                  >
                    <Box sx={{ mr: 2, color: 'primary.main' }}>
                      {getGameIcon(activity.gameType)}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1">
                        {capitalizeFirstLetter(activity.gameType)} Game
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Score: {activity.score} • {formatDate(activity.date)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    to="/history" 
                    size="small"
                  >
                    View All History
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 