const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://aniruddhachitte:Aniruddha%405@backenddb.lwt1e.mongodb.net/yourDatabaseName?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
