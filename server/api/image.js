const router = require('express').Router()
const {Image} = require('../db/models/image')
const multer = require('multer')

module.exports = router
//hanldes image uploading using multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
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
    // const err = new Error('Only JPEG or PNG format')
    //   err.status = 401
    //   return next(err)
  }
}
//check to see if the commented out code works

const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})
