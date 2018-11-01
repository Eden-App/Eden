const mongoose = require('mongoose'),
      Schema = mongoose.Schema


const userSchema = new Schema({
    name: String,
    email: String,
    password: String
})


const User = mongoose.model('User', userSchema)
module.exports = User