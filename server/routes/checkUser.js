// const express = require('express')
// const router = express.Router()
// const jwt = require('jsonwebtoken')
//
// router.get('/', async (req, res, next) => {
//     const token = req.cookies.jwt;
//
//     if (token) {
//       jwt.verify(token, 'SECRET_KEY', (err, decodedToken) => {
//         if (err) {
//           res.locals.user = null;
//           res.status(404).json({ message: "User's JWT token is not valid" })
//         } else {
//           let user = await User.findById(decodedToken.id);
//           res.locals.user = user;
//           res.status(201).json({ message: "User's JWT token is valid" })
//         }
//       })
//     }
//     else {
//       res.locals.user = null;
//       res.status(404).json({ message: "User's JWT token is not valid" })
//     }
// })
//
// module.exports = router
