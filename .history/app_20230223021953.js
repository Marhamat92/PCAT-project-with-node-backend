const express = require('express')  //!express
const app = express()  //!express
const fileUpload = require('express-fileupload'); //!file upload için
const path = require('path')  //!path
const fs = require('fs') //!file system
const ejs = require('ejs') //!ejs
const mongoose = require('mongoose'); //!mongoose
const methodOverride = require('method-override') //!method override and we use this to override the post method to put method since we can't use put method in html form




//!import photo model
const Photo = require('./models/Photo')

// Connect to MongoDB
mongoose.connect('mongodb://localhost/pcat-test-db', { useNewUrlParser: true }, { useUnifiedTopology: true }, { useFindAndModify: false }, { strctQuery: false })



// Set view engine
app.set('view engine', 'ejs')


//middlewares 
app.use(express.static('public')); //!static dosyaları kullanmak için
app.use(express.urlencoded({ extended: true })); //! parse application/x-www-form-urlencoded //url deki verileri okumak için
app.use(express.json()); //! parse application/json  //json verileri okumak için
app.use(fileUpload()); //!file upload için
app.use(methodOverride('_method'))

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated')
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

  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) { //!eğer uploads klasörü yoksa oluştur
    fs.mkdirSync(uploadDir);
  }
  let imageFile = req.files.image; //!dosya bilgilerini al
  let uploadPath = __dirname + '/public/uploads/' + imageFile.name;  //!dosyanın yükleneceği yolu belirle

  imageFile.mv(  //!dosyayı yükle
    uploadPath,
    async () => {
      await Photo.create({
        ...req.body,
        image: `/uploads/${imageFile.name}`
      })
      res.redirect('/');
    }
  )
})


//update photo by id 1) get edit page
app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id)
  res.render('edit', { photo })
})

//update photo by id 2) update photo
app.put('/photos/:id', async (req, res) => {
  let photo = await Photo.findById(req.params.id)
  photo.title = req.body.title
  photo.description = req.body.description
  photo.save()
  res.redirect(`/photos/${req.params.id}`)
})

//delete photo by id
app.delete('/photos/:id', async (req, res) => {
  await Photo.findByIdAndDelete(req.params.id)
  res.redirect('/')
})




const port = 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`)
})