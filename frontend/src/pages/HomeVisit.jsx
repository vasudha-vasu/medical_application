import { useState } from 'react';
import { motion } from 'framer-motion';

const HomeVisit = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    address: '',
    city: '',
    pincode: '',
    visitDate: '',
    visitTime: '',
    issueDescription: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/home-visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
      } else {
        alert(data.message || 'Failed to request home visit');
      }
    } catch (error) {
      alert('Error submitting form');
    }
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-lightbg py-16 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <h2 className="text-3xl font-bold text-primary mb-4">Request Sent!</h2>
          <p className="text-gray-600 mb-6">Your home visit request has been submitted successfully. We will call you soon to confirm.</p>
          <button onClick={() => window.location.reload()} className="btn-primary">Request Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightbg py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-darktext mb-4">Request a Home Visit</h1>
          <p className="text-gray-600">Get expert physiotherapy at the comfort of your home.</p>
        </div>

        {/* Scrolling Images Carousel */}
        <div className="w-full overflow-hidden mb-12 relative">
          {/* Fading edges for better look */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-lightbg to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-lightbg to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-marquee-lr hover:animate-pause w-max gap-6 px-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex gap-6">
                <img src="https://tse1.mm.bing.net/th/id/OIP.Hz31vcV0t0NbBkVDE0741AHaE0?pid=Api&P=0&h=180" alt="Home Visit 1" className="h-40 w-64 object-cover rounded-2xl shadow-sm border border-gray-100" />
                <img src="https://tse1.mm.bing.net/th/id/OIP.GkB19KiERZuotMOArpJ97AHaFD?pid=Api&P=0&h=180" alt="Home Visit 2" className="h-40 w-64 object-cover rounded-2xl shadow-sm border border-gray-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-primary text-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Why Home Visit?</h3>
              <ul className="space-y-4">
                <li className="flex gap-2">✓ <span>Comfort & Convenience</span></li>
                <li className="flex gap-2">✓ <span>Personalized Attention</span></li>
                <li className="flex gap-2">✓ <span>Faster Recovery</span></li>
                <li className="flex gap-2">✓ <span>No Travel Stress</span></li>
              </ul>
            </div>
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              className="bg-white p-6 rounded-2xl shadow border border-gray-100"
            >
              <h4 className="font-bold text-gray-800 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-500 mb-4">Call us directly to schedule a visit.</p>
              <a href="tel:+919705506407" className="text-primary font-bold text-2xl flex items-center gap-2">
                <span className="animate-pulse">📞</span> +91 97055 06407
              </a>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                  <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required className="input-field" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="input-field" placeholder="+91" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required className="input-field mb-4" placeholder="Street Address" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required className="input-field" placeholder="City" />
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required className="input-field" placeholder="Pincode" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                  <input type="date" name="visitDate" value={formData.visitDate} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                  <input type="time" name="visitTime" value={formData.visitTime} onChange={handleChange} required className="input-field" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Health Issue Description</label>
                  <textarea name="issueDescription" value={formData.issueDescription} onChange={handleChange} required className="input-field h-24" placeholder="Describe the problem, mobility issues, etc."></textarea>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full mt-4" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-lr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-lr {
          animation: marquee-lr 30s linear infinite;
        }
        .animate-pause {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
};

export default HomeVisit;
