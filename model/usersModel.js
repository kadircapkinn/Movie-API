const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    username:{
        type:String,
        required:[true,"İsim girilmek zorundadır."],
        minlength:4,
        maxlength:20,
        unique:true
    },
    password:{
        type:String,
        minlength: 4,
        required:[true,"Sifre girilmek zorundadır."]
    }
});


module.exports = mongoose.model('users',userModel)