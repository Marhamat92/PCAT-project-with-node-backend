const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');


//!import photo model
const Photo = require('./models/Photo')

// Connect to MongoDB
mongoose.connect('mongodb://localhost/pcat-test-db', { useNewUrlParser: true }, { useUnifiedTopology: true })



// Set view engine
app.set('view engine', 'ejs')


//middlewares 
app.use(express.static('public')); //!static dosyaları kullanmak için
app.use(express.urlencoded({ extended: true })); //! parse application/x-www-form-urlencoded //url deki verileri okumak için
app.use(express.json()); //! parse application/json  //json verileri okumak için
app.use(fileUpload()); //!file upload için

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index', { photos })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/add', (req, res) => {
  res.render('add')
})

//get photo page by id
app.get('/photos/:id', async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findById(id)
  res.render('photo', { photo })
});


//add photo 
app.post('/photos', async (req, res) => {
  // await Photo.create(req.body) 
  // res.redirect('/')

  let imageFile = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + imageFile.name;
  imageFile.mv(uploadPath, async (err) => {
    if (err) throw err;
    await Photo.create({
      ...req.body,
      image: '/uploads/' + imageFile.name
    })
  })
})



const port = 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`)
})