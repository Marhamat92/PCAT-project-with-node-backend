const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')

// Set view engine
app.set('view engine', 'ejs')


//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

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



const port = 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`)
})