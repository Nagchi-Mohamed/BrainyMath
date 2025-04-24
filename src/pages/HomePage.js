import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api'; // Import the api service
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Paper from '@mui/material/Paper'; // Use Paper for Hero background
import Loader from '../components/Loader'; // Import Loader
import Message from '../components/Message'; // Import Message

// Import Icons
import SchoolIcon from '@mui/icons-material/School'; // Lessons
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'; // Games
import ForumIcon from '@mui/icons-material/Forum'; // Forums
import GroupsIcon from '@mui/icons-material/Groups'; // Groups
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'; // Classrooms (alternative icon)
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook'; // For Featured Lessons

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [featuredLessons, setFeaturedLessons] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [errorLessons, setErrorLessons] = useState(null);

  // --- Fetch featured lessons (optional) ---
  useEffect(() => {
    const fetchFeaturedLessons = async () => {
      setLoadingLessons(true);
      setErrorLessons(null);
      try {
        // Fetching all and slicing; backend limit support would be better
        const { data } = await api.get('/lessons');
        setFeaturedLessons(data.slice(0, 3)); // Get first 3 lessons
      } catch (err) {
        console.error("Error fetching featured lessons:", err);
        setErrorLessons('Could not load featured lessons.');
      } finally {
        setLoadingLessons(false);
      }
    };

    fetchFeaturedLessons();
  }, []); // Run only on component mount

  const features = [
    { title: "Interactive Lessons", description: "Explore step-by-step guides covering various math topics.", icon: <SchoolIcon fontSize="large" color="primary"/>, link: "/lessons", buttonText: "Explore Lessons" },
    { title: "Educational Games", description: "Make learning fun with engaging math challenges and puzzles.", icon: <SportsEsportsIcon fontSize="large" color="primary"/>, link: "/games", buttonText: "Play Now" },
    { title: "Discussion Forums", description: "Ask questions, share insights, and discuss concepts with peers.", icon: <ForumIcon fontSize="large" color="primary"/>, link: "/forums", buttonText: "Join Discussion" },
    { title: "Study Groups", description: "Collaborate with fellow learners and tackle problems together.", icon: <GroupsIcon fontSize="large" color="primary"/>, link: "/groups", buttonText: "Find Groups" },
    { title: "Virtual Classrooms", description: "Participate in guided learning sessions and interact in real-time.", icon: <OndemandVideoIcon fontSize="large" color="primary"/>, link: "/classrooms", buttonText: "View Classrooms" },
  ];

  return (
    <Box> {/* Use Box as the main container instead of Container to allow full-width hero */}

      {/* --- Hero Section --- */}
      <Paper
        elevation={0} // No shadow for a flat look
        sx={{
          py: { xs: 6, md: 10 }, // Responsive padding
          textAlign: 'center',
          backgroundColor: 'primary.main', // Use theme primary color
          color: 'primary.contrastText', // Ensure text is readable
          mb: 6, // Margin bottom
        }}
      >
        <Container maxWidth="md"> {/* Container inside for content width */}
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Master Mathematics with BrainyMath
          </Typography>
          <Typography variant="h5" component="p" paragraph sx={{ mb: 4 }}>
            Your all-in-one platform for interactive lessons, engaging games, and collaborative learning.
          </Typography>
          <Button
            variant="contained"
            color="secondary" // Use secondary color for contrast
            size="large"
            component={RouterLink}
            to="/lessons"
            endIcon={<ArrowForwardIcon />}
          >
            Get Started Now
          </Button>
        </Container>
      </Paper>

      <Container maxWidth="lg"> {/* Main content container - Will add content inside this in next chunks */}

        {/* --- Personalized Welcome (If Logged In) --- */}
        {isAuthenticated && user && (
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" component="p">
              Welcome back, {user.name}! Ready to learn something new?
            </Typography>
          </Box>
        )}

        {/* --- Features Section --- */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Explore Our Features
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Everything you need to succeed in your math journey.
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={4}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', textAlign: 'center', p: 2 }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1, px:1, py:0 }}> {/* Reduced padding */}
                  <Typography gutterBottom variant="h6" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pt: 2 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    component={RouterLink}
                    to={feature.link}
                  >
                    {feature.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* --- Featured Lessons Section (Optional) --- */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 4 }}>
            Featured Lessons
          </Typography>
          {loadingLessons ? (
            <Loader />
          ) : errorLessons ? (
            <Message severity="warning">{errorLessons}</Message>
          ) : featuredLessons.length === 0 ? (
            <Typography sx={{ textAlign: 'center' }} color="text.secondary">
              No featured lessons available right now.
            </Typography>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {featuredLessons.map((lesson) => (
                <Grid item key={lesson._id} xs={12} sm={6} md={4}>
                   <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <MenuBookIcon fontSize="small" color="action" sx={{ mb: 1 }}/> {/* Small icon */}
                        <Typography gutterBottom variant="h6" component="div">
                            {lesson.title}
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3, // Limit description lines
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            mb: 1
                          }}>
                            {lesson.description}
                         </Typography>
                    </CardContent>
                     <CardActions sx={{ justifyContent: 'flex-start' }}>
                        <Button
                            size="small"
                            component={RouterLink}
                            to={`/lessons/${lesson._id}`}
                        >
                            View Lesson
                        </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

      </Container> {/* Close the main content Container */}
    </Box> // Close the outermost Box
  );
};

export default HomePage;