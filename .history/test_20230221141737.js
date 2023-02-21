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


//read all photos
Photo.find({}, (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})

//update a photo by id
const id = '63f4a632539bbb96b74b5d63'

Photo.findByIdAndUpdate(id, {
  title: 'My updated photo',
  description: 'This is my updated photo'
}, (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})