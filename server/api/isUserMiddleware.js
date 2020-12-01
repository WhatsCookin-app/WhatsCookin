const isUserMiddleware = (req, res, next) => {
  if (!req.user) {
    const err = new Error('Please sign up or log in')
    err.status = 401
    next(err)
  } else {
    next()
  }
}

module.exports = isUserMiddleware
