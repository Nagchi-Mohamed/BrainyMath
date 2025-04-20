import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider } from './context/AuthContext';
import { LessonsProvider } from './context/LessonsContext';
import { lightTheme, darkTheme } from './theme';
import GlobalStyle from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';
import ErrorBoundary from './components/ErrorBoundary';
import { useSettings } from './context/SettingsContext';

// Separate component for the themed app content
const ThemedAppContent = () => {
  const { darkMode } = useSettings();
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="app">
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? 'dark' : 'light'}
        />
      </div>
    </ThemeProvider>
  );
};

// Main App component with proper context hierarchy
const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <SettingsProvider>
          <AuthProvider>
            <LessonsProvider>
              <ThemedAppContent />
            </LessonsProvider>
          </AuthProvider>
        </SettingsProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App; 