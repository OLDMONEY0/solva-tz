// src/App.tsx
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/homepage/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import DetailsPage from './pages/details/DetailsPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Navbar />}
      <div className="container my-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
