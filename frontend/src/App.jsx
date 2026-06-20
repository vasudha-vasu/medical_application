import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import HomeVisit from './pages/HomeVisit';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import ServiceDetail from './pages/ServiceDetail';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user || (user.role !== 'admin' && user.role !== 'doctor')) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/home-visit" element={<HomeVisit />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
