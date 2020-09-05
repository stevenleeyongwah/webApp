const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.get('/', async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.status(201).json({ message: "successfully logout"});
})

module.exports = router
