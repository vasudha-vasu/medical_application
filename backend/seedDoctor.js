const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/physio').then(async () => {
  console.log('Connected to MongoDB');
  
  const existingDoctor = await User.findOne({ email: 'drheliosonr@gmail.com' });
  if (!existingDoctor) {
    const doctor = await User.create({
      name: 'Dr Helios',
      email: 'drheliosonr@gmail.com',
      password: 'Siva@123',
      role: 'doctor',
      phone: '9705506407'
    });
    console.log('Doctor created:', doctor.email);
  } else {
    existingDoctor.password = 'Siva@123';
    await existingDoctor.save();
    console.log('Doctor already exists, password updated:', existingDoctor.email);
  }
  process.exit();
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
