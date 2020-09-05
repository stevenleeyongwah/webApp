const mongoose = require('mongoose')
const { isEmail, isAlphanumeric } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please enter your name'],
    unique: true,
    validate: [ isAlphanumeric, 'Please enter a valid name']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    validate: [ isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: [6, 'Minimum password length is 6 characters']
  }
})

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next()
})

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email: email })

  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('Invalid email or password')
  }
  throw Error('Invalid email or password')
}

module.exports = mongoose.model('User', userSchema)