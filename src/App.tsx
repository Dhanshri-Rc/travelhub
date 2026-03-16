import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector} from './hooks/useRedux';
// import { toggleDarkMode } from './store';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/user/DashboardPage';
import DestinationsPage from './pages/DestinationsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Protected route component — redirects to /login if not authenticated
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppContent() {
  const darkMode = useAppSelector((s) => s.ui.darkMode);

  // Apply/remove Tailwind dark class on <html> whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/"            element={<HomePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/hotels"       element={<DestinationsPage defaultCategory="hotel" />} />
            <Route path="/restaurants"  element={<DestinationsPage defaultCategory="restaurant" />} />
            <Route path="/attractions"  element={<DestinationsPage defaultCategory="attraction" />} />
            <Route path="/rides"        element={<DestinationsPage defaultCategory="ride" />} />
            <Route path="/guides"       element={<DestinationsPage defaultCategory="guide" />} />
            <Route path="/about"        element={<AboutPage />} />
            <Route path="/contact"      element={<ContactPage />} />
            <Route path="/login"        element={<LoginPage />} />
            <Route path="/register"     element={<RegisterPage />} />

            {/* Protected route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return <AppContent />;
}
