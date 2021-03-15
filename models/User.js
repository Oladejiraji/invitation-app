const mongoose = require('mongoose')




const UserSchema = new mongoose.Schema({
    familyName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    fullName:{
        type: String
    },
    googleId:{
        type: String,
        required: true
    },
    photo: {
        type: String,
    }
}, { timestamps: true })


module.exports = mongoose.model("User", UserSchema)