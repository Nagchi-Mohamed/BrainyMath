import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // Check if user has a theme preference stored or prefers dark mode
  const getInitialThemeMode = () => {
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [themeMode, setThemeMode] = useState(getInitialThemeMode);

  // Update theme when it changes
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setThemeMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  // Create Material UI theme
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#4caf50', // Green shade
        light: '#80e27e',
        dark: '#087f23',
        contrastText: '#fff',
      },
      secondary: {
        main: '#ff9800', // Orange shade
        light: '#ffc947',
        dark: '#c66900',
        contrastText: '#000',
      },
      background: {
        default: themeMode === 'light' ? '#f5f5f5' : '#121212',
        paper: themeMode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: themeMode === 'light' 
              ? '0px 2px 4px -1px rgba(0,0,0,0.1)'
              : '0px 2px 4px -1px rgba(0,0,0,0.5)',
          },
        },
      },
    },
  });

  const value = {
    themeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
} 