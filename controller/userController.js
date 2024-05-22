const userModel = require('../model/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userReg = async (req,res) => {
    const {username,password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password,10) 
        const user = await userModel.create({
            username,
            password:hashedPassword
        })
        res.status(201).json({msg:"Kayıt islemi basarili",user})
    }catch(error){
        res.status(500).json({error})
    }

}

const userAuth = async (req,res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ msg: "Authentication basarisiz. Kullanici bulunamadi." });
        } else {
            const checkedPw = await bcrypt.compare(password, user.password);
            if (!checkedPw) {
                return res.status(401).json({ msg: "Authentication basarisiz. Yanlış parola." });
            } else {
                const payload = {
                    username
                };
                const token = jwt.sign(payload, process.env.API_SECRET_KEY, { expiresIn: 720 });
                return res.status(200).json({
                    token
                }); // Eğer başarılı giriş yaparsa kullanıcı için bir token oluşturulacak.
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
    }

}



module.exports = {userReg,userAuth};