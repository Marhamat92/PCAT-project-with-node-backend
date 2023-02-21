const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PhotoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})