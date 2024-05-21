const express = require('express')
const connect = require('./db/db');
const movieRouter = require('./router/movie');
const directorRouter = require('./router/director');
const app = express()
require('dotenv').config()

// json tipi için middleware
app.use(express.json());

// Routermiddle ware
app.use('/api',movieRouter) ;
app.use('/api',directorRouter);




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