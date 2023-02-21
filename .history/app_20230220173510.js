const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')

// Set view engine
app.set('view engine', 'ejs')


//middleware
app.use(express.static('public'));

//ROUTES
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about')
})



const port = 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`)
})