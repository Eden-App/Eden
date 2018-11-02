const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const { genSalt, hashingPassword} =require('../helpers/brcyrpt')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    email:{
        type: String,
        required: true,
        unique : true
    }, 
    password:{
       type: String
    } 
},{
    timestamps: true
})


userSchema.pre('validate', function(next) {
   this.password = hashingPassword(this.password, genSalt())
   next()
})

const User = mongoose.model('User', userSchema)

module.exports = User