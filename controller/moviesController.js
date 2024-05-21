const movieModel = require('../model/moviesModel');

const getMoives = async (req,res)=>{
    try{
        const movies = await movieModel.find({})
        res.status(200).json({movies})
    }catch(error){
        res.status(500).json({msg:"Filmler listelenmesi sirasinda hata olustu.",error})
    }

}
const addMovie = async (req,res) => {
    try{
        const addedMovie = await movieModel.create(req.body)
        res.status(201).json({addedMovie,msg:"Ekleme basarili"})
    } catch(error){
        res.status(500).json({msg:"Ekleme sirasinda hata olustu.",error})
    }

}

const getMovie = async (req,res) =>{
    const movieID = req.params.movie_id
    try{
        const movie = await movieModel.findOne({_id:movieID})
        if(!movie){
            return res.status(404).json({msg:"Id'ye sahip film bulunamadi."})
        }

        res.status(200).json({movie})
    } catch(error){
        res.status(500).json({error})
    }
}

const editMovie = async (req,res) =>{
    const movieID = req.params.movie_id
    try{
        const editedMovie = await movieModel.findByIdAndUpdate({_id:movieID},req.body,{
            new:true,
            runValidators:true
        })
        res.status(201).json({msg:"Basariyla guncellendi",editedMovie})
    }catch(error){
        res.status(500).json({msg:`${editedMovie} Guncellenirken hata olustu`,error})
    }
}

const deleteMovie = async (req,res) => {
    const movieID = req.params.movie_id
    try{
        const deletedMovie = await movieModel.findOneAndDelete({_id:movieID})
        
        if(!deletedMovie){
            return res.status(404).json({msg:"Id'ye sahip film bulunamadi."})
        }
        
        res.status(201).json({msg:`${movieID} adli id basari ile silindi`,deletedMovie})
    }catch(error){
        res.status(500).json({msg:"Movie silinirken hata olustu.",error:error})
    }
}

const top10 = async (req,res) => {
    try{
        const top10Movies = await movieModel.find({}).limit(10).sort({_imdb_score:-1});
        res.status(200).json({top10Movies})
    } catch(error){
        res.status(500).json({error})
    }
}

const betweenDate = async (req,res) =>{
    const {start_year,end_year} = req.params
    try {
        const moviesBetween = await movieModel.find({
            year : {"$gte": parseInt(start_year),"$lte": parseInt(end_year)}
        })
        if(!moviesBetween){
            res.status(404).json({msg:"Belirtilen tarihler arasi film bulunmamaktadir"})
        }
        res.status(200).json({moviesBetween})
    } catch(error) {
        res.status(500).json({error})
    }
}

module.exports = {getMoives,addMovie,getMovie,editMovie,deleteMovie,top10,betweenDate}