import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './components/Layout/MainLayout';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const AdditionGame = lazy(() => import('./components/Games/AdditionGame'));
const SubtractionGame = lazy(() => import('./components/Games/SubtractionGame'));
const MultiplicationGame = lazy(() => import('./components/Games/MultiplicationGame'));
const DivisionGame = lazy(() => import('./components/Games/DivisionGame'));
const GameHistory = lazy(() => import('./pages/GameHistory'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

// Private route component
const PrivateRoute = ({ children }) => {
  const { currentUser, authChecked, loading } = useAuth();
  
  if (!authChecked || loading) {
    return <Loading />;
  }
  
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Auth routes (no layout) */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Public routes with layout */}
              <Route 
                path="/home" 
                element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                } 
              />
              
              {/* Routes with MainLayout */}
              <Route 
                path="/" 
                element={
                  <MainLayout>
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/games/addition" 
                element={
                  <MainLayout>
                    <PrivateRoute>
                      <AdditionGame />
                    </PrivateRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/games/subtraction" 
                element={
                  <MainLayout>
                    <PrivateRoute>
                      <SubtractionGame />
                    </PrivateRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/games/multiplication" 
                element={
                  <MainLayout>
                    <PrivateRoute>
                      <MultiplicationGame />
                    </PrivateRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/games/division" 
                element={
                  <MainLayout>
                    <PrivateRoute>
                      <DivisionGame />
                    </PrivateRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <MainLayout>
                    <PrivateRoute>
                      <GameHistory />
                    </PrivateRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <MainLayout>
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <MainLayout>
                    <PrivateRoute>
                      <Settings />
                    </PrivateRoute>
                  </MainLayout>
                } 
              />
              
              {/* Root route - Redirect to home or dashboard based on auth */}
              <Route 
                index
                element={
                  <AuthRedirect />
                } 
              />
              
              {/* 404 route */}
              <Route 
                path="*" 
                element={
                  <MainLayout>
                    <NotFound />
                  </MainLayout>
                } 
              />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Component to redirect based on authentication status
const AuthRedirect = () => {
  const { currentUser, authChecked, loading } = useAuth();
  
  if (!authChecked || loading) {
    return <Loading />;
  }
  
  return currentUser ? <Navigate to="/" /> : <Navigate to="/home" />;
};

export default App; 