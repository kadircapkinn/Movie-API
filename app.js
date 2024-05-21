const express = require('express')
const connect = require('./db/db');
const app = express()
require('dotenv').config()

// Routermiddle ware
//app.use() 




const start = async() => {
    try{
        await connect(process.env.DB_PASSWORD)
        console.log("DB baglantisi basarili.");
        app.listen(3000,()=>{
            console.log("Listening on port 3000");
        })
    }catch(error){
        console.log("Baglanti basarsiz.",error)
    }
}

start()


require('dotenv').config()