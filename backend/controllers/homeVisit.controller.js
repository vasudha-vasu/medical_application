const HomeVisit = require('../models/HomeVisit');

exports.createHomeVisit = async (req, res) => {
  try {
    const { visitDate, visitTime } = req.body;
    
    // Check for existing home visit at the same date and time
    const existingVisit = await HomeVisit.findOne({ 
      visitDate, 
      visitTime,
      status: { $ne: 'Cancelled' }
    });
    
    if (existingVisit) {
      return res.status(400).json({ success: false, message: 'This time slot is already booked for a home visit. Please choose another time.' });
    }

    const homeVisit = await HomeVisit.create(req.body);
    res.status(201).json({ success: true, data: homeVisit });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getHomeVisits = async (req, res) => {
  try {
    const homeVisits = await HomeVisit.find().sort('-createdAt');
    res.status(200).json({ success: true, count: homeVisits.length, data: homeVisits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateHomeVisitStatus = async (req, res) => {
  try {
    const homeVisit = await HomeVisit.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!homeVisit) return res.status(404).json({ success: false, message: 'Home Visit not found' });
    res.status(200).json({ success: true, data: homeVisit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteHomeVisit = async (req, res) => {
  try {
    const homeVisit = await HomeVisit.findByIdAndDelete(req.params.id);
    if (!homeVisit) return res.status(404).json({ success: false, message: 'Home Visit not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
