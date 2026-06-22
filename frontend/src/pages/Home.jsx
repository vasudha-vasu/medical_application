import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import QuickActions from '../components/QuickActions';
import WhatsAppQRCodeCard from '../components/WhatsAppQRCodeCard';

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-lightbg">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left z-10"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-6">
              ★★★★★ Trusted Rehabilitation Center
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-darktext mb-6 leading-tight">
              Expert Healthcare & <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Rehabilitation</span> <br className="hidden md:block"/>
              At Your Doorstep
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Book appointments, request home visits, and receive personalized orthopedic and neurological rehabilitation from experienced professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Link to="/appointment" className="btn-primary w-full sm:w-auto text-center">Book Appointment</Link>
              <Link to="/home-visit" className="btn-secondary w-full sm:w-auto text-center">Request Home Visit</Link>
            </div>

            {/* Doctor Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-card p-6 max-w-md mx-auto lg:mx-0 text-left flex gap-4 items-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-darktext">Dr. Siva Kumar P.T</h3>
                <p className="text-sm text-secondary font-medium">Consultant Physiotherapist</p>
                <p className="text-xs text-gray-500 mt-1">Fellow in Sports & Ortho Rehabilitation</p>
              </div>
            </motion.div>

            {/* Quick Actions Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6"
            >
              <QuickActions />
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative flex justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
            {/* Replace with actual image */}
            <div className="relative z-10 w-80 h-[500px] bg-gray-200 rounded-3xl shadow-2xl border-8 border-white overflow-hidden flex items-center justify-center text-gray-400">
              <img src="/doctor-siva.png" alt="Dr. Siva Kumar" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-darktext mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive rehabilitation and physiotherapy treatments tailored to your specific needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-lightbg p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-primary text-2xl">
                  ✨
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.shortDescription}</p>
                <Link to={`/services/${service.slug}`} className="text-primary font-medium hover:text-accent flex items-center gap-1">Learn More &rarr;</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp QR Code Section */}
      <section className="bg-white">
        <WhatsAppQRCodeCard />
      </section>
    </div>
  );
};

export default Home;
