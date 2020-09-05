const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.get('/', async (req, res) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'SECRET_KEY', async (err, decodedToken) => {
      if (err) {
        res.status(404).json({ user: null })
      }
      let user = await User.findById(decodedToken.id);
      res.status(201).json({ user: user })
    })
  }
  else {
    res.status(404).json({ user: null })
  }
})

module.exports = router
