const mongoose = require('mongoose');

const connectFoodDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      const conn = await mongoose.connect('mongodb://127.0.0.1:27017/posts');
      console.log(`FoodPost DB connected: ${conn.connection.name}`);
      return conn;
    } else {
      console.log('FoodPost DB already connected');
    }
  } catch (error) {
    console.error('Error connecting to food post DB:', error.message);
    process.exit(1);
  }
};

module.exports = connectFoodDB;
