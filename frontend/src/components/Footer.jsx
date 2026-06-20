import { Globe, Share2, MessageCircle, Video, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-darktext text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-primary">Dr. Helios</h3>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">
            Restoring Movement. Rebuilding Lives. Expert orthopedic and neurological rehabilitation at your doorstep.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><Share2 size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><Globe size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><MessageCircle size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><Video size={18} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
            <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
            <li><a href="/appointment" className="text-gray-400 hover:text-white transition-colors">Book Appointment</a></li>
            <li><a href="/home-visit" className="text-gray-400 hover:text-white transition-colors">Request Home Visit</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold mb-6">Services</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ortho Rehabilitation</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Neuro Rehabilitation</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sports Rehabilitation</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pain Management</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-primary shrink-0 mt-1" size={20} />
              <span className="text-gray-400">Chitrel-Pullampeta Rd, Pullampeta, Andhra Pradesh, 516107</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-primary shrink-0" size={20} />
              <span className="text-gray-400">+91 97055 06407</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-primary shrink-0" size={20} />
              <span className="text-gray-400">contact@drhelios.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Dr. Helios Ortho & Neuro Rehabilitation. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
