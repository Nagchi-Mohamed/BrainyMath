export const lightTheme = {
  colors: {
    primary: '#4A90E2',
    secondary: '#50E3C2',
    background: '#F5F7FA',
    white: '#FFFFFF',
    text: '#2C3E50',
    textLight: '#7F8C8D',
    border: '#E0E0E0',
    error: '#E74C3C',
    success: '#2ECC71',
    warning: '#F1C40F'
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px'
  },
  transitions: {
    default: '0.3s ease-in-out'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#1A1A1A',
    white: '#2C2C2C',
    text: '#FFFFFF',
    textLight: '#B0B0B0',
    border: '#404040'
  }
}; 