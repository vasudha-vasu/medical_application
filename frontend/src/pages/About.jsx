import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  Star, Activity, Award, CheckCircle, MapPin, Phone, Mail, 
  UserCheck, HeartPulse, ShieldCheck, ArrowRight, Clock, Navigation
} from 'lucide-react';

const AnimatedSection = ({ children, className = '' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Counter Animation Component
const Counter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const stepTime = Math.abs(Math.floor(duration * 1000 / end));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime > 0 ? stepTime : 10);
      
      // For large numbers like 5000, we skip rapidly
      if(end > 100) {
        clearInterval(timer);
        let current = 0;
        const fastTimer = setInterval(() => {
           current += Math.ceil(end/50);
           if(current >= end) {
             setCount(end);
             clearInterval(fastTimer);
           } else {
             setCount(current);
           }
        }, 30);
      }
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  return (
    <div className="w-full min-h-screen bg-lightbg overflow-hidden">
      
      {/* SECTION 1 – HERO ABOUT SECTION */}
      <section className="relative pt-24 pb-32 bg-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent rounded-l-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          {/* Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6 border border-secondary/20 shadow-sm">
              <div className="flex gap-1"><Star size={14} className="fill-secondary text-secondary" /><Star size={14} className="fill-secondary text-secondary" /><Star size={14} className="fill-secondary text-secondary" /><Star size={14} className="fill-secondary text-secondary" /><Star size={14} className="fill-secondary text-secondary" /></div>
              Trusted Rehabilitation Center
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-darktext mb-6 leading-tight">
              Transforming Lives Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Advanced Rehabilitation Care</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Dr. Helios Ortho & Neuro Rehabilitation, we are dedicated to restoring mobility, reducing pain, and improving quality of life through evidence-based physiotherapy and rehabilitation services.
            </p>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Our specialized approach combines orthopedic rehabilitation, neurological rehabilitation, sports injury recovery, and home-based physiotherapy to deliver exceptional patient outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/appointment" className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-primary/30">
                Book Appointment <ArrowRight size={18} />
              </Link>
              <Link to="/home-visit" className="btn-secondary flex items-center justify-center gap-2 bg-white border border-gray-200 text-darktext hover:bg-gray-50 shadow-md">
                Request Home Visit
              </Link>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-end relative"
          >
            <div className="relative">
              {/* Circular Gradient Background behind image */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-accent rounded-full opacity-20 blur-xl scale-110"
              />
              <div className="glass-card p-4 rounded-[2.5rem] relative z-10 border border-white/50 shadow-2xl backdrop-blur-xl bg-white/40">
                <div className="rounded-[2rem] overflow-hidden bg-gray-100 border border-white/60">
                   <img src="/doctor-siva.png" alt="Dr. Siva Kumar P.T" className="w-[350px] md:w-[450px] object-cover" />
                </div>
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Verified Expert</p>
                    <p className="text-sm font-extrabold text-darktext">10+ Years Exp.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 – MEET OUR CHIEF CONSULTANT */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-darktext mb-4">Meet Our Chief Consultant</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
               <div className="md:w-2/5 bg-gradient-to-br from-primary/5 to-accent/5 p-8 flex flex-col items-center justify-center border-r border-gray-100">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 bg-white">
                     <img src="/doctor-siva.png" alt="Dr. Siva Kumar P.T" className="w-full h-full object-cover object-top" />
                  </div>
                  <h3 className="text-2xl font-bold text-darktext text-center">Dr. Siva Kumar P.T</h3>
                  <p className="text-primary font-semibold mb-4 text-center">Consultant Physiotherapist</p>
                  
                  <div className="w-full space-y-3 mt-4">
                    <div className="flex items-center gap-3 text-gray-600 bg-white p-3 rounded-xl shadow-sm">
                      <Clock className="text-secondary" size={20} />
                      <div className="text-sm">
                        <span className="block font-bold text-darktext">Availability</span>
                        Mon - Sat: 9:00 AM – 7:00 PM
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 bg-white p-3 rounded-xl shadow-sm">
                      <UserCheck className="text-secondary" size={20} />
                      <div className="text-sm">
                        <span className="block font-bold text-darktext">Languages</span>
                        English, Tamil, Telugu, Kannada
                      </div>
                    </div>
                  </div>
               </div>
               <div className="md:w-3/5 p-8 md:p-12">
                  <h4 className="text-xl font-bold text-darktext mb-6 flex items-center gap-2">
                    <Award className="text-accent" /> Qualifications & Certifications
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                    {[
                      "Bachelor of Physiotherapy (BPT)",
                      "Fellow in Sports Rehabilitation",
                      "Fellow in Orthopedic & Manual Therapy",
                      "Specialist in Musculoskeletal Rehab",
                      "Specialist in Neuro Rehabilitation",
                      "Home Visit Physiotherapy Expert"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="text-primary shrink-0 mt-0.5" size={18} />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-xl font-bold text-darktext mb-6 flex items-center gap-2 mt-8">
                    <HeartPulse className="text-accent" /> Areas of Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {[
                      "Orthopedic Rehab", "Neuro Rehab", "Sports Injury", 
                      "Manual Therapy", "Post-Surgical", "Stroke Rehab", 
                      "Pain Management", "Geriatric Physio"
                    ].map((tag, i) => (
                      <span key={i} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                    <Link to="/appointment" className="btn-primary">Book Consultation</Link>
                    <Link to="/home-visit" className="btn-secondary bg-white text-darktext border border-gray-200">Request Home Visit</Link>
                  </div>
               </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SECTION 3 – OUR MISSION & VISION */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Photo with Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-fixed"></div>
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="glass-card bg-white/10 border-white/20 p-10 rounded-3xl h-full hover:bg-white/15 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                  <Activity size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-slate-200 text-lg leading-relaxed">
                  To provide compassionate, evidence-based rehabilitation services that empower patients to regain independence, restore movement, and achieve optimal health outcomes.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="glass-card bg-white/10 border-white/20 p-10 rounded-3xl h-full hover:bg-white/15 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                  <Star size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-slate-200 text-lg leading-relaxed">
                  To become the most trusted orthopedic and neuro rehabilitation center by delivering exceptional patient care through innovation, expertise, and personalized treatment plans.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SECTION 4 – WHY PATIENTS TRUST US */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-darktext mb-4">Why Patients Trust Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We combine clinical excellence with compassionate care to ensure your recovery journey is smooth and successful.</p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Award size={28}/>, title: "Certified Expert", desc: "Treated by highly qualified and fellowship-trained professionals." },
              { icon: <Activity size={28}/>, title: "Personalized Plans", desc: "Custom treatment protocols designed specifically for your body and condition." },
              { icon: <MapPin size={28}/>, title: "Home Visit Services", desc: "Convenient professional physiotherapy delivered right to your doorstep." },
              { icon: <HeartPulse size={28}/>, title: "Advanced Methods", desc: "Utilizing the latest evidence-based techniques and modalities." },
              { icon: <UserCheck size={28}/>, title: "Compassionate Care", desc: "A supportive environment focused entirely on your well-being." },
              { icon: <ShieldCheck size={28}/>, title: "Affordable Treatment", desc: "Premium healthcare services that are accessible and cost-effective." },
            ].map((feature, i) => (
              <AnimatedSection key={i}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all group"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-darktext mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 – TREATMENT FACILITIES */}
      <section className="py-24 bg-lightbg border-y border-gray-100">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-darktext mb-4">Treatment Facilities</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Orthopedic Rehabilitation", "Neuro Rehabilitation", 
              "Sports Rehabilitation", "Home Physiotherapy", 
              "Pain Management", "Stroke Rehabilitation", 
              "Post Surgical Rehab", "Geriatric Physiotherapy"
            ].map((facility, i) => (
              <AnimatedSection key={i}>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group"
                >
                  <div className="h-40 bg-slate-200 overflow-hidden relative">
                    {/* Placeholder image pattern for layout */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-primary/40"><Activity size={48} /></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-darktext mb-2 group-hover:text-primary transition-colors">{facility}</h3>
                    <p className="text-sm text-gray-500 mb-4">Specialized evidence-based protocol.</p>
                    <Link to="/appointment" className="text-sm font-bold text-primary flex items-center gap-1 hover:text-accent">
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 – CLINIC HIGHLIGHTS COUNTERS */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
            <AnimatedSection>
              <div className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-md">
                <Counter end={5000} suffix="+" />
              </div>
              <div className="text-sm md:text-base font-semibold text-white/80 uppercase tracking-wider">Patients Treated</div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-md">
                <Counter end={10} suffix="+" />
              </div>
              <div className="text-sm md:text-base font-semibold text-white/80 uppercase tracking-wider">Years Experience</div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-md">
                <Counter end={98} suffix="%" />
              </div>
              <div className="text-sm md:text-base font-semibold text-white/80 uppercase tracking-wider">Patient Satisfaction</div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-md">
                24/7
              </div>
              <div className="text-sm md:text-base font-semibold text-white/80 uppercase tracking-wider">Patient Support</div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SECTION 7 – PROFESSIONAL CERTIFICATIONS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-darktext mb-4">Professional Certifications</h2>
            <p className="text-gray-600">Continuously advancing medical knowledge to provide the best care.</p>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {[
              "Sports Rehabilitation Certification",
              "Orthopedic Manual Therapy Fellowship",
              "Advanced Neuro Rehabilitation Training",
              "Clinical Physiotherapy Certification",
              "Continuing Medical Education Programs"
            ].map((cert, i) => (
              <AnimatedSection key={i}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-slate-50 border border-slate-200 py-4 px-6 rounded-full flex items-center gap-3 shadow-sm hover:shadow-md hover:border-secondary/50 transition-all"
                >
                  <Award className="text-secondary" size={24} />
                  <span className="font-semibold text-sm md:text-base text-darktext">{cert}</span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 & 9 – LOCATION & GOOGLE MAPS */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-darktext mb-4">Visit Our Clinic</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* Contact Details */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <img src="/clinic-logo.png" alt="Clinic Logo" className="h-16 w-auto object-contain mb-8" />
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-darktext">Clinic Address</h4>
                    <p className="text-gray-600 leading-relaxed mt-1">
                      Chitvel - Pullampeta Rd,<br/>
                      Pullampeta, Andhra Pradesh<br/>
                      PIN: 516107
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-darktext">Contact Info</h4>
                    <p className="text-gray-600 leading-relaxed mt-1">+91 97055 06407</p>
                    <p className="text-gray-600 leading-relaxed">drheliosonr@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://maps.google.com/?q=Pullampeta+Andhra+Pradesh" target="_blank" rel="noreferrer" className="btn-primary flex justify-center items-center gap-2">
                  <Navigation size={18} /> Get Directions
                </a>
                <a href="tel:+919705506407" className="btn-secondary bg-white text-darktext border border-gray-200 flex justify-center items-center gap-2">
                  <Phone size={18} /> Call Now
                </a>
              </div>
            </div>

            {/* Google Map */}
            <div className="h-96 lg:h-auto w-full bg-slate-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15509.303986872208!2d79.2084615!3d14.1205374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d33ebffffffff%3A0x1234567890abcdef!2sPullampeta%2C%20Andhra%20Pradesh%20516107!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Map Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 – PATIENT TRUST SECTION (Reviews) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_,i) => <Star key={i} className="fill-amber-400 text-amber-400" size={28} />)}
            </div>
            <h2 className="text-4xl font-bold text-darktext mb-4">What Our Patients Say</h2>
            <p className="text-gray-600">Real stories of recovery and rehabilitation.</p>
          </AnimatedSection>

          {/* Simple CSS animated carousel */}
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {[
              { text: "Dr. Siva Kumar is exceptional. His accurate diagnosis and targeted physiotherapy helped me recover from my severe back pain completely.", author: "Rajesh K.", type: "Ortho Rehab" },
              { text: "We requested a home visit for my mother after her stroke. The compassionate care and professional neuro-rehab exercises were life-changing.", author: "Sneha M.", type: "Neuro Rehab" },
              { text: "As an athlete, my knee injury was devastating. The sports rehabilitation program here got me back on the field faster than I imagined.", author: "Karthik V.", type: "Sports Rehab" },
              { text: "Very modern facility and friendly staff. The manual therapy sessions are highly effective. I strongly recommend this clinic.", author: "Priya S.", type: "Pain Management" }
            ].map((review, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[400px] bg-slate-50 p-8 rounded-3xl border border-gray-100 snap-center">
                <div className="flex gap-1 mb-4"><Star size={16} className="fill-amber-400 text-amber-400"/><Star size={16} className="fill-amber-400 text-amber-400"/><Star size={16} className="fill-amber-400 text-amber-400"/><Star size={16} className="fill-amber-400 text-amber-400"/><Star size={16} className="fill-amber-400 text-amber-400"/></div>
                <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-darktext">{review.author}</span>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">{review.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11 – FINAL CALL TO ACTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-primary z-0"></div>
        {/* Floating decorative elements */}
        <motion.div animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-10 left-10 text-white/10"><Activity size={120} /></motion.div>
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-10 right-10 text-white/10"><HeartPulse size={150} /></motion.div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start Your Recovery Journey Today</h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Book an appointment with Dr. Siva Kumar P.T and experience expert orthopedic and neurological rehabilitation tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/appointment" className="btn-primary bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                Book Appointment
              </Link>
              <Link to="/home-visit" className="btn-secondary text-white border-white hover:bg-white/10 text-lg px-8 py-4">
                Request Home Visit
              </Link>
            </div>
            <p className="text-white/60 mt-8 text-sm">Need immediate assistance? Call us directly at <a href="tel:+919705506407" className="text-white underline">+91 97055 06407</a></p>
          </AnimatedSection>
        </div>
      </section>

      {/* Add custom CSS to global scope or index.css for hide-scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default About;
