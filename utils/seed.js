const mongoose = require('mongoose');
const connectDB = require('../utils/connectdb');
const User = require('../models/User');
const Thought = require('../models/Thought');

async function seedDatabase() {
  try {

    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Sample users
    const users = [
      { username: 'user1', email: 'user1@example.com' },
      { username: 'user2', email: 'user2@example.com' },
    ];

    // Sample thoughts
    const thoughts = [
      { thoughtText: 'This is a thought by user1', username: 'user1' },
      { thoughtText: 'Another thought by user1', username: 'user1' },
    ];

    // Create seed data
    const createdUsers = await User.create(users);
    const createdThoughts = await Thought.create(thoughts);

    console.log('Database seeded successfully:', {
      createdUsers: createdUsers.length,
      createdThoughts: createdThoughts.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    
    // Close the database connection
    await mongoose.connection.close();
  }
};

connectDB().then(seedDatabase);
