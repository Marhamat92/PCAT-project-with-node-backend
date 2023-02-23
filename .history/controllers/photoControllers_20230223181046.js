const Photo = require('../models/Photo')  //!import photo model
const fs = require('fs')


exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1 //!eğer query stringte page yoksa 1 olarak ayarla 
  const photosPerPage = 3 //!sayfada gösterilecek foto sayısı
  const totalPhotos = await Photo.countDocuments() //!toplam foto sayısı

  console.log(totalPhotos)

  const photos = await Photo.find({}).sort('-dateCreated')
  res.render('index', { photos })
}

exports.getPhoto = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findById(id)
  res.render('photo', { photo })
}

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) { //!eğer uploads klasörü yoksa oluştur
    fs.mkdirSync(uploadDir);
  }
  let imageFile = req.files.image; //!dosya bilgilerini al
  let uploadPath = __dirname + '/../public/uploads/' + imageFile.name;  //!dosyanın yükleneceği yolu belirle

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
}

exports.updatePhoto = async (req, res) => {
  let photo = await Photo.findById(req.params.id)
  photo.title = req.body.title
  photo.description = req.body.description
  photo.save()
  res.redirect(`/photos/${req.params.id}`)
}

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id })
  let photoPath = __dirname + '/../public' + photo.image
  fs.unlinkSync(photoPath)
  await Photo.findByIdAndRemove(req.params.id)
  res.redirect('/')
}

//we created a new file called photoControllers.js and we moved all the functions from app.js to this file and we exported them and imported them to app.js and we used them in app.js
//controllers are the functions that we use in our routes and we can name them according to their functionality depending on what we are doing,userController,photoController etc.