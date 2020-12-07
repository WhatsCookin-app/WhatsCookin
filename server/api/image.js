const router = require('express').Router()
const multer = require('multer')
const path = require('path')

module.exports = router
//hanldes image uploading using multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img'))
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
    const err = new Error('Only JPEG or PNG format')
    err.status = 401
    return next(err)
  }
}
//filetypes to be accepted by the server
//check to see if the commented out code works

//Limiting the file size to prevent virus, video
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

router.post('/upload', upload.single('imageData'), (req, res, next) => {
  res.send('/img/' + req.file.filename)
})
