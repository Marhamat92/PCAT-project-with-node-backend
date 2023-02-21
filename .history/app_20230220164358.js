const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')

// Set view engine
app.set('view engine', 'ejs')


//middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/index.ejs'))
})

app.get('/video-page.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/video-page.html'))
})


const port = 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`)
})