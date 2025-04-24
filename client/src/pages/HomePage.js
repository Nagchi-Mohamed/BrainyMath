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
      </Container> {/* Close the main content container */}
    </Box> {/* Close the outermost Box */}
  );
};

export default HomePage;
