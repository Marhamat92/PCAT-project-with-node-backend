const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'))
})

// app.get('/about', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'temp/about.html'))
// })

const port = 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`)
})