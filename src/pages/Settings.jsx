import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Switch,
  FormGroup,
  FormControlLabel,
  Divider,
  Button,
  Box,
  Alert,
  Snackbar,
  Slider,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Settings = () => {
  const { currentUser } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Settings states
  const [settings, setSettings] = useState({
    darkMode: false,
    soundEffects: true,
    notifications: true,
    gameDifficulty: 'adaptive', // adaptive, easy, medium, hard
    gameTime: 60, // seconds for each game
  });

  // Handle settings change
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };

  // Handle save settings
  const handleSaveSettings = async () => {
    try {
      // In a real app, this would save to the backend
      // await axios.put('/api/user/settings', settings);
      setSuccess(true);
    } catch (err) {
      setError('Failed to save settings. Please try again.');
      console.error('Error saving settings:', err);
    }
  };

  // Handle close success message
  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          App Preferences
        </Typography>
        
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                color="primary"
              />
            }
            label="Dark Mode"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.soundEffects}
                onChange={(e) => handleSettingChange('soundEffects', e.target.checked)}
                color="primary"
              />
            }
            label="Sound Effects"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                color="primary"
              />
            }
            label="Notifications"
          />
        </FormGroup>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Game Settings
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="difficulty-label">Game Difficulty</InputLabel>
              <Select
                labelId="difficulty-label"
                id="difficulty-select"
                value={settings.gameDifficulty}
                label="Game Difficulty"
                onChange={(e) => handleSettingChange('gameDifficulty', e.target.value)}
              >
                <MenuItem value="adaptive">Adaptive (Adjusts to your skill)</MenuItem>
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography id="game-time-slider" gutterBottom>
              Game Duration: {settings.gameTime} seconds
            </Typography>
            <Slider
              aria-labelledby="game-time-slider"
              value={settings.gameTime}
              min={30}
              max={120}
              step={10}
              marks={[
                { value: 30, label: '30s' },
                { value: 60, label: '60s' },
                { value: 90, label: '90s' },
                { value: 120, label: '120s' }
              ]}
              onChange={(e, value) => handleSettingChange('gameTime', value)}
              sx={{ mt: 2 }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings; 