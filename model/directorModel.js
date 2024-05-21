const mongoose = require('mongoose');

const DirectorSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"isim girmen gerekiyor."],
        trim:true,
        maxlength:[30,"Film ismi 30 karekterden buyuk olamaza"]
    }
})

module.exports = mongoose.model('Movie',DirectorSchema)