const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String
})