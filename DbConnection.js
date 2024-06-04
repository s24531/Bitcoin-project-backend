// Description: This file contains the code to connect to the database.
const mongoose = require('mongoose');
const uri = "mongodb+srv://s24531:XFAu6vxPGN3TgywV@tools.c11v7h6.mongodb.net/tools?retryWrites=true&w=majority&appName=Tools";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connection successful");
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

module.exports = connectToDatabase;