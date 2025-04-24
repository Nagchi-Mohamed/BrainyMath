// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import ForumsPage from './pages/ForumsPage';
import ForumCategoryPage from './pages/ForumCategoryPage';
import ForumThreadPage from './pages/ForumThreadPage';
import CreateThreadPage from './pages/CreateThreadPage';
import ProtectedRoute from './components/ProtectedRoute';
import GroupsPage from './pages/GroupsPage';
import GroupDetailPage from './pages/GroupDetailPage';
import GamesPage from './pages/GamesPage';
import QuizPlayPage from './pages/QuizPlayPage';
import ClassroomsPage from './pages/ClassroomsPage';
import ClassroomDetailPage from './pages/ClassroomDetailPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUserListPage from './pages/admin/AdminUserListPage';
import AdminLessonListPage from './pages/admin/AdminLessonListPage';
import AdminCreateLessonPage from './pages/admin/AdminCreateLessonPage';
import AdminEditLessonPage from './pages/admin/AdminEditLessonPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="forums" element={<ForumsPage />} />
            <Route path="forums/categories/:categoryId" element={<ForumCategoryPage />} />
            <Route path="forums/threads/:threadId" element={<ForumThreadPage />} />
            <Route path="forums/categories/:categoryId/new-thread" element={<ProtectedRoute><CreateThreadPage /></ProtectedRoute>} />
            <Route path="groups" element={<GroupsPage />} />
            <Route path="groups/:groupId" element={<GroupDetailPage />} />
            <Route path="/classrooms" element={<ClassroomsPage />} />
            <Route path="/classrooms/:classroomId" element={<ClassroomDetailPage />} />
            <Route path="classrooms/:classroomId" element={<ProtectedRoute><ClassroomDetailPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboardPage /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUserListPage /></ProtectedRoute>} />
            <Route path="/admin/lessons" element={<ProtectedRoute adminOnly={true}><AdminLessonListPage /></ProtectedRoute>} />
            <Route path="admin/lessons/new" element={<ProtectedRoute adminOnly={true}><AdminCreateLessonPage /></ProtectedRoute>} />
            <Route path="admin/lessons/:lessonId/edit" element={<ProtectedRoute adminOnly={true}><AdminEditLessonPage /></ProtectedRoute>} />
            <Route path="games" element={<GamesPage />} />
            <Route path="games/quiz/:quizId" element={<ProtectedRoute><QuizPlayPage /></ProtectedRoute>} />
          </Routes>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
