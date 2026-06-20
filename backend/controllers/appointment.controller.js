const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const { preferredDate, preferredTime } = req.body;
    
    // Check for existing appointment at the same date and time
    const existingAppointment = await Appointment.findOne({ 
      preferredDate, 
      preferredTime,
      status: { $ne: 'Cancelled' } // Allow booking if previous one was cancelled
    });
    
    if (existingAppointment) {
      return res.status(400).json({ success: false, message: 'This time slot is already booked. Please choose another time.' });
    }

    const appointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort('-createdAt');
    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
