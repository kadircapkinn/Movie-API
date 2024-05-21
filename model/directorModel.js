const mongoose = require('mongoose');

const DirectorSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"isim girmen gerekiyor."],
        trim:true
    },
    surname:String,
    bio:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('directors',DirectorSchema)