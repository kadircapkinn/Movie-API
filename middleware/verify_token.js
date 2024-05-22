const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const token = req.headers['x-access-token'] || req.body.token ||req.query.token

    if(token){  
        jwt.verify(token,process.env.API_SECRET_KEY,(err,decoded)=>{
            if(err){
                console.log(err);
                res.status(401).json({msg:"Authenticate token basarisiz"})
            }else{
                req.decode = decoded
                next(); // bu işlem başarılıysa mainde çağırıldığı kendinden sonra çağırılan routerlara geçiş yapabileceğini gösterir.
            }
        })
    }else{
        res.status(500).json({msg:"Token girilmedi."})
    }
}
