const express = require('express');
const { createAppointment, getAppointments, updateAppointmentStatus, deleteAppointment } = require('../controllers/appointment.controller');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .post(createAppointment)
  .get(protect, authorize('admin', 'doctor'), getAppointments);

router.route('/:id/status')
  .put(protect, authorize('admin', 'doctor'), updateAppointmentStatus);

router.route('/:id')
  .delete(protect, authorize('admin', 'doctor'), deleteAppointment);

module.exports = router;
