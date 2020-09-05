const jwt = require('jsonwebtoken')

const authRoute = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'SECRET_KEY', (err, decodedToken) => {
      if (err) throw Error('User is not authenticated')
      next()
    })
  }
  else {
    throw Error('User is not authenticated')
  }
}

module.exports = authRoute
