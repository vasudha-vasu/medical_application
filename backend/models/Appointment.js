const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String },
  gender: { type: String },
  age: { type: Number },
  department: { type: String },
  symptoms: { type: String },
  medicalHistory: { type: String },
  doctor: { type: String, default: 'Dr. Siva Kumar P.T' },
  preferredDate: { type: Date, required: true },
  preferredTime: { type: String, required: true },
  address: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Cancelled', 'Completed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
