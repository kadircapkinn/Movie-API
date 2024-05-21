const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    director_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Directors' // Director modeline referans veriyor
    },
    title:{
        type:String,
        required:[true,"isim girmen gerekiyor."],
        maxLength: 15,
        minLength: 1
    },
    category:String,
    country:String,
    year:Number,
    imdb_score:Number, 
    createdDate:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('movies',MovieSchema)