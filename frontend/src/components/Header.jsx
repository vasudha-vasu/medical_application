import { Link } from 'react-router-dom';
import { Phone, Calendar, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/clinic-logo.png" alt="Dr. Helios Ortho & Neuro Rehabilitation" className="h-24 md:h-28 w-auto object-contain" />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-darktext hover:text-primary font-medium transition-colors">Home</Link>
          <a href="#services" className="text-darktext hover:text-primary font-medium transition-colors">Services</a>
          <Link to="/about" className="text-darktext hover:text-primary font-medium transition-colors">About</Link>
          <Link to="/home-visit" className="text-darktext hover:text-primary font-medium transition-colors">Home Visit</Link>
          <Link to="/appointment" className="text-darktext hover:text-primary font-medium transition-colors">Appointment</Link>
        </nav>

        {/* Call to Actions */}
        <div className="flex items-center gap-3">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:+919705506407" 
            className="hidden lg:flex items-center gap-2 text-primary hover:text-accent font-semibold transition-colors"
          >
            <Phone size={18} className="animate-bounce" />
            <span>+91 97055 06407</span>
          </motion.a>
          
          <Link to={user ? "/admin" : "/login"} className="hidden sm:block text-gray-600 hover:text-primary font-medium transition-colors ml-2 mr-2">
            {user ? "Dashboard" : "Doctor Login"}
          </Link>

          <Link to="/appointment" className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
            <Calendar size={18} />
            <span className="hidden sm:inline">Book Now</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
