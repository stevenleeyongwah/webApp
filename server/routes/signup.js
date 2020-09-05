const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Handle Errors
const handleErrors = (err) => {
  let errors = { fullName: '', email: '', password: '' };

  // Check if there is duplicate of fullName/email
  if (err.code === 11000) {
    errors[Object.keys(err.keyValue)[0]] = `${Object.values(err.keyValue)[0]} is already registered`
    return errors;
  }

  // validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

router.post('/', async (req, res) => {
  const { fullName, email, password } = req.body

  try {
    const user = await User.create({ fullName, email, password })
    const token = createToken(user._id)

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
})

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'SECRET_KEY', {
    expiresIn: maxAge
  });
}

module.exports = router
