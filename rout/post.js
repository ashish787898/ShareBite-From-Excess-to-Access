const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes'); // Your routes.js file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (change URI to your own)
const mongoURI = 'mongodb://localhost:27017/Posts'; // Replace with your MongoDB URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Use routes from routes.js
app.use(routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
