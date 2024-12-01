const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit if connection fails
  }
};

// Call the function to connect to the database
connectDB();


// Middleware
app.use(express.json());
app.use(cors({ origin: 'https://pawtime.netlify.app/' })); //Netlify url
//app.use(cors({ origin: 'http://localhost:3000' })); //for running locally

// Routes
app.use('/api/reservations', require('./routes/reservationRoutes'));

// Root route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));