const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/', async (req, res) => {
  const { email, password } = req.body

  try {
    if (email == '' || password == '') {
      throw Error('email or password cannot be left empty')
    }
    const user = await User.login(email, password)
    const token = createToken(user._id)

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ user: user._id })
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'SECRET_KEY', {
    expiresIn: maxAge
  });
}

module.exports = router
