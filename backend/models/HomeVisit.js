const mongoose = require('mongoose');

const HomeVisitSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  visitDate: { type: Date, required: true },
  visitTime: { type: String, required: true },
  issueDescription: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Assigned', 'In Progress', 'Completed', 'Cancelled'], default: 'Pending' },
  assignedDoctor: { type: String, default: 'Dr. Siva Kumar P.T' }
}, { timestamps: true });

module.exports = mongoose.model('HomeVisit', HomeVisitSchema);
