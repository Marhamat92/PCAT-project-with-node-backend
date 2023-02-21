const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Connect to MongoDB
mongoose.connect('mongodb://localhost//pcat-test-db')

// Create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String
})