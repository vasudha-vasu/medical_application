import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { 
  ArrowLeft, CheckCircle2, Activity, ShieldCheck, 
  Clock, MapPin, HeartPulse, Brain, Bone, Home, Stethoscope 
} from 'lucide-react';

// Icon mapper
const IconMap = {
  Activity, HeartPulse, Brain, Bone, Home, Stethoscope
};

const ServiceDetail = () => {
  const { slug } = useParams();
  
  // Find the requested service
  const service = servicesData.find(s => s.slug === slug);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const ServiceIcon = IconMap[service.iconName] || Activity;

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-24">
      
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Services
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-primary shrink-0">
              <ServiceIcon size={48} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-darktext mb-4">{service.title}</h1>
              <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <h2 className="text-2xl font-bold text-darktext mb-4 border-b pb-4">Treatment Overview</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {service.overview}
              </p>
            </motion.section>

            {/* Symptoms & Conditions */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <h2 className="text-2xl font-bold text-darktext mb-6 border-b pb-4">Conditions & Symptoms Treated</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.symptomsTreated.map((symptom, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                    <span className="text-slate-700 font-medium">{symptom}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Treatment Process */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <h2 className="text-2xl font-bold text-darktext mb-8 border-b pb-4">Our Treatment Process</h2>
              <div className="space-y-6">
                {service.treatmentProcess.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 border border-primary/20">
                      {i + 1}
                    </div>
                    <div className="pt-2">
                      <p className="text-slate-700 text-lg font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Outcomes */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl shadow-sm border border-emerald-100"
            >
              <div className="flex items-center gap-3 mb-4 border-b border-emerald-200/50 pb-4">
                <ShieldCheck className="text-emerald-600" size={28} />
                <h2 className="text-2xl font-bold text-emerald-900">Expected Outcomes</h2>
              </div>
              <p className="text-emerald-800 leading-relaxed text-lg font-medium">
                {service.expectedOutcomes}
              </p>
            </motion.section>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Booking Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-28"
            >
              <h3 className="text-xl font-bold text-darktext mb-2">Ready to start recovery?</h3>
              <p className="text-slate-500 mb-6 text-sm">Schedule your {service.title.toLowerCase()} session today.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <Clock className="text-primary" size={20} />
                  <span className="text-sm font-medium">45-60 Min Sessions</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <MapPin className="text-primary" size={20} />
                  <span className="text-sm font-medium">Clinic & Home Visits Available</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <CheckCircle2 className="text-primary" size={20} />
                  <span className="text-sm font-medium">Expert Supervision</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/appointment" className="w-full btn-primary block text-center shadow-md">
                  Book Clinic Visit
                </Link>
                {service.id !== 'home-visit-physiotherapy' && (
                  <Link to="/home-visit" className="w-full btn-secondary block text-center bg-white text-darktext border border-slate-200">
                    Request Home Visit
                  </Link>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
