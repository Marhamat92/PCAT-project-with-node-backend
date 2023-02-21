const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')

// Set view engine
app.set('view engine', 'ejs')


//middlewares 
app.use(express.static('public')); //!static dosyaları kullanmak için
app.use(express.urlencoded({ extended: true })); //! parse application/x-www-form-urlencoded //url deki verileri okumak için
app.use(express.json()); //! parse application/json  //json verileri okumak için

//ROUTES
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/add', (req, res) => {
  res.render('add')
})


app.post('/photos', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})



const port = 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`)
})