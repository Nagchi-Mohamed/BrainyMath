import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import ForumsPage from './pages/Forum';
import ForumCategoryPage from './pages/ForumCategoryPage';
import ForumThreadPage from './pages/ForumThreadPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUserListPage from './pages/admin/AdminUserListPage';
import AdminLessonListPage from './pages/admin/AdminLessonListPage';
import AdminEditLessonPage from './pages/admin/AdminEditLessonPage';
import ProtectedRoute from './components/ProtectedRoute';

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
          <Routes>
            <AppRoutes />
            <Route path="/forums" element={<ForumsPage />} />
            <Route path="/forums/categories/:categoryId" element={<ForumCategoryPage />} />
            <Route path="/forums/threads/:threadId" element={<ForumThreadPage />} />
            <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboardPage /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUserListPage /></ProtectedRoute>} />
            <Route path="/admin/lessons" element={<ProtectedRoute adminOnly={true}><AdminLessonListPage /></ProtectedRoute>} />
            <Route path="/admin/lessons/edit/:id" element={<ProtectedRoute adminOnly={true}><AdminEditLessonPage /></ProtectedRoute>} />
          </Routes>
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