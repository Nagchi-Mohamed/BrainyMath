import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { SettingsProvider } from './context/SettingsContext';
import { lightTheme, darkTheme } from './theme';
import GlobalStyle from './styles/GlobalStyle';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Lessons = React.lazy(() => import('./pages/Lessons'));
const Games = React.lazy(() => import('./pages/Games'));
const Groups = React.lazy(() => import('./pages/Groups'));
const Forum = React.lazy(() => import('./pages/Forum'));
const Classroom = React.lazy(() => import('./pages/Classroom'));
const Profile = React.lazy(() => import('./pages/Profile'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <Router>
            <Navbar />
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/games" element={<Games />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/classroom/:id" element={<Classroom />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </Router>
        </ThemeProvider>
      </SettingsProvider>
    </ErrorBoundary>
  );
};

export default App; 