const express = require('express')  //!express
const app = express()  //!express
const fileUpload = require('express-fileupload'); //!file upload için
const path = require('path')  //!path
const ejs = require('ejs') //!ejs
const mongoose = require('mongoose'); //!mongoose
const methodOverride = require('method-override') //!method override and we use this to override the post method to put method since we can't use put method in html form

mongoose.set('strictQuery', false);

//!import photo controller
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');

//! Connect to MongoDB
mongoose.connect('MONGO_URL', { useNewUrlParser: true }, { useUnifiedTopology: true }, { useFindAndModify: false }, { strctQuery: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


//! Set view engine
app.set('view engine', 'ejs')


//!middlewares 
app.use(express.static('public')); //static dosyaları kullanmak için
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded //url deki verileri okumak için
app.use(express.json()); // parse application/json  //json verileri okumak için
app.use(fileUpload()); //file upload için
app.use(methodOverride('_method', { methods: ['POST', 'GET'] })) //method override and we use this to override the post method to put method since we can't use put method in html form

//!ROUTES 
//!controllers for functions
//getPhotos
app.get('/', photoController.getAllPhotos)
//getPhoto
app.get('/photos/:id', photoController.getPhoto);
//create photo with file upload
app.post('/photos', photoController.createPhoto);
//update photo by id 2) update photo
app.put('/photos/:id', photoController.updatePhoto)
//delete photo  
app.delete('/photos/:id', photoController.deletePhoto)

//!controllers for pages
app.get('/photos/edit/:id', pageController.getEditPage)   //update photo by id 1) get edit page
app.get('/about', pageController.getAboutPage)
app.get('/add', pageController.getAddPage)



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`)
})