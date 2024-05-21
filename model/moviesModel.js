const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    director_id: mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        required:[true,"isim girmen gerekiyor."],

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

module.exports = mongoose.model('Movie',MovieSchema)