import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load components with error handling
const lazyLoad = (importFn) => {
  return lazy(() => 
    importFn().catch(err => {
      console.error('Error loading component:', err);
      return { default: () => <div>Error loading component. Please refresh the page.</div> };
    })
  );
};

// Lazy load components
const Home = lazyLoad(() => import('./pages/Home'));
const Login = lazyLoad(() => import('./pages/Login'));
const Register = lazyLoad(() => import('./pages/Register'));
const Dashboard = lazyLoad(() => import('./pages/Dashboard'));
const Lessons = lazyLoad(() => import('./pages/Lessons'));
const LessonDetail = lazyLoad(() => import('./pages/LessonDetail'));
const Games = lazyLoad(() => import('./pages/Games'));
const Groups = lazyLoad(() => import('./pages/Groups'));
const CreateGroup = lazyLoad(() => import('./pages/CreateGroup'));
const Forum = lazyLoad(() => import('./pages/Forum'));
const Classroom = lazyLoad(() => import('./pages/Classroom'));
const Profile = lazyLoad(() => import('./pages/Profile'));
const NotFound = lazyLoad(() => import('./pages/NotFound'));
const CreateTopic = lazyLoad(() => import('./pages/CreateTopic'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons"
          element={
            <ProtectedRoute>
              <Lessons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons/:lessonId"
          element={
            <ProtectedRoute>
              <LessonDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/games"
          element={
            <ProtectedRoute>
              <Games />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups/create"
          element={
            <ProtectedRoute>
              <CreateGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum/create"
          element={
            <ProtectedRoute>
              <CreateTopic />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classroom"
          element={
            <ProtectedRoute>
              <Classroom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 