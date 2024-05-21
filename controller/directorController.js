const mongoose = require('mongoose');
const directorModel = require('../model/directorModel');

const getDirectors = async (req,res)=>{
    try{
        const director = await directorModel.aggregate([
            {
                $lookup: {
                    from: 'movies',
                    localField: '_id',
                    foreignField: 'director_id',
                    as: 'movies'
                }
            },
            {
                $unwind: {
                    path: '$movies',
                    preserveNullAndEmptyArrays: true //Eşleşme bulmasa da getirir.
                }
            },
            {
                $group: {
                    _id: {
                        _id: '$_id',
                        name: '$name',
                        surname: '$surname',
                        bio: '$bio'
                    },
                    movies: {
                        $push: '$movies'
                    }
                }
            },
            {
                $project: {
                    _id: '$_id._id',
                    name: '$_id.name',
                    surname: '$_id.surname',
                    movies: '$movies'
                }
            }
        ]);
        res.status(200).json({director});
    }catch(error){
        res.status(500).json({error})
    }
}


const addDirectors = async (req,res) =>{
    try{
        const director = await directorModel.create(req.body)
        res.status(201).json({director})
    }catch(error){
        res.status(500).json ({error})
    }
}

const getDirector = async (req,res) => {

    try{
        const director = await directorModel.aggregate([
            {
                $match: {
                    '_id': new mongoose.Types.ObjectId(req.params.director_id)
                }
            },
            {
                $lookup: {
                    from: 'movies',
                    localField: '_id',
                    foreignField: 'director_id',
                    as: 'movies'
                }
            },
            {
                $unwind: {
                    path: '$movies',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        _id: '$_id',
                        name: '$name',
                        surname: '$surname',
                        bio: '$bio'
                    },
                    movies: {
                        $push: '$movies'
                    }
                }
            },
            {
                $project: {
                    _id: '$_id._id',
                    name: '$_id.name',
                    surname: '$_id.surname',
                    movies: '$movies'
                }
            }
        ]);
        res.status(200).json({director})
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
}

const updateDirector = async (req,res) =>{
    const directorID = req.params.director_id
    try{
        const updatedDirector = await directorModel.findByIdAndUpdate({_id:directorID},req.body,{
            new:true,
            runValidators:true
        })
        res.status(201).json({updatedDirector})
    }catch(error){
        res.status(500).json({error})
    }
}

const deleteDirector = async (req,res) => {
    const directorID = req.params.director_id
    try {
        const deletedDirector = await directorModel.findOneAndDelete({_id:directorID})
        if(!deletedDirector){
            return res.status(404).json({msg:"Belirtilen id'de director bulunamadi"});
        }

        res.status(201).json({msg:"Director basariyla silindi"})
    }catch(error){
        res.status(500).json(error)
    }
}

const directorsBestMovies = async (req,res) => {
    const directorID = req.params.director_id
    try {
        const bestMovies = await directorModel.findOneAndDelete({_id:directorID}).limit(10).sort({_imdb_score:-1})
        if(!bestMovies){
            return res.status(404).json({msg:"Belirtilen director filmi bulunmamaktadir."})
        }

        res.status(200).json({bestMovies})
    } catch(error){
        res.status(500).json({error})
    }
}

module.exports = {getDirectors,addDirectors,getDirector,updateDirector,deleteDirector,directorsBestMovies}