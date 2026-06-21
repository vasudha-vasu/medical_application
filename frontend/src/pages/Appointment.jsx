import { useState } from 'react';
import { motion } from 'framer-motion';

const Appointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    mobileNumber: '',
    email: '',
    gender: '',
    age: '',
    department: '',
    symptoms: '',
    preferredDate: '',
    preferredTime: ''
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
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/appointments`, {
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
        alert(data.message || 'Failed to book appointment');
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
          <h2 className="text-3xl font-bold text-primary mb-4">Success!</h2>
          <p className="text-gray-600 mb-6">Your appointment request has been submitted successfully. We will contact you soon to confirm.</p>
          <button onClick={() => window.location.reload()} className="btn-primary">Book Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightbg py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Top Hero Image */}
        <div className="w-full flex justify-center mb-10">
          <img 
            src="https://tse2.mm.bing.net/th/id/OIP.K6qJRTU1nF7ur-fOvMHolAHaFc?pid=Api&P=0&h=180" 
            alt="Appointment Booking" 
            className="w-full max-w-2xl h-auto rounded-3xl shadow-lg object-cover border border-gray-100"
          />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-darktext mb-4">Book an Appointment</h1>
          <p className="text-gray-600">Schedule your visit with Dr. Siva Kumar P.T</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Progress Bar */}
          <div className="flex mb-8 justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 transition-all" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                {i}
              </div>
            ))}
          </div>

          <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()} className="space-y-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold mb-6">Patient Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required className="input-field" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required className="input-field" placeholder="+91" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="john@example.com" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="input-field">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-field" placeholder="Years" />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button type="button" onClick={() => setStep(2)} className="btn-primary">Next Step</button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold mb-6">Medical Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department / Specialty</label>
                    <select name="department" value={formData.department} onChange={handleChange} className="input-field">
                      <option value="">Select Department</option>
                      <option value="Ortho Rehabilitation">Ortho Rehabilitation</option>
                      <option value="Neuro Rehabilitation">Neuro Rehabilitation</option>
                      <option value="Sports Rehabilitation">Sports Rehabilitation</option>
                      <option value="Pain Management">Pain Management</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
                    <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} className="input-field h-24" placeholder="Briefly describe your symptoms..."></textarea>
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary">Back</button>
                  <button type="button" onClick={() => setStep(3)} className="btn-primary">Next Step</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold mb-6">Appointment Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                    <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                    <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} required className="input-field">
                      <option value="">Select Time</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button type="button" onClick={() => setStep(2)} className="btn-secondary">Back</button>
                  <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Appointment;
