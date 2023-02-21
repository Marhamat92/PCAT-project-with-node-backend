const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Connect to MongoDB
mongoose.connect('mongodb://localhost/pcat-test-db', { useNewUrlParser: true }, { useUnifiedTopology: true })

// Create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String
})

// Create Model

const Photo = mongoose.model('Photo', PhotoSchema);

//!Create a new photo
// Photo.create({
//   title: 'My second photo',
//   description: 'This is my second photo'
// })

