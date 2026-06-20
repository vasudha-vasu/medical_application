const express = require('express');
const { createHomeVisit, getHomeVisits, updateHomeVisitStatus, deleteHomeVisit } = require('../controllers/homeVisit.controller');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .post(createHomeVisit)
  .get(protect, authorize('admin', 'doctor'), getHomeVisits);

router.route('/:id/status')
  .put(protect, authorize('admin', 'doctor'), updateHomeVisitStatus);

router.route('/:id')
  .delete(protect, authorize('admin', 'doctor'), deleteHomeVisit);

module.exports = router;
