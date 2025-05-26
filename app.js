const dotenv = require('dotenv');
dotenv.config(); // Load environment variables first

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const connectDB = require('./config/db');
const connectFoodDB = require('./config/foodpost');
const User = require('./models/User');
const Post = require('./models/foodpost');


// Connect to MongoDB databases
connectDB();
connectFoodDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Replace '*' with frontend URL in production
  methods: ['GET', 'POST'],
  credentials: false
}));

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Views
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/feedpost', (req, res) => {
  res.render('feedpost'); // Ensure feedpost.ejs exists in the views folder
});

// Routes


// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed });
    await newUser.save();

    res.status(200).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});



// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Food post
app.post('/api/posts', async (req, res) => {
  const { foodName, quantity, contact, notes } = req.body;

  if (!foodName || !quantity || !contact) {
    return res.status(400).json({ message: 'Food name, quantity, and contact are required' });
  }

  try {
    const newPost = new Post({ foodName, quantity, contact, notes });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    console.error('Post Error:', err);
    res.status(500).json({ message: 'Server error while creating post' });
  }
});
app.get('/posts', async (req, res) => {
  try {
    const foods = await Post.find().sort({ createdAt: -1 });
    res.render('post', { foods });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).send('Error loading food posts');
  }
});
// Fetch all posts

// Health check
app.get('/health', (req, res) => {
  res.send('API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
