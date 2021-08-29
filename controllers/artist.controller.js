// const { findByIdAndDelete } = require("../models/Artist.model");
const Artist = require("../models/Artist.model");

const artistGet = async (req, res, next) => {
    const id = req.params.id;
    console.log("id de url: ", id);
    try {
        const artist = await Artist.findById(id);
        console.log(artist);

        if (artist) {
            return res.status(200).json(artist);
        } else {
            return res.status(204).json({});
        }
    } catch (error) {
        console.log("artists get error: ", error);
        return res.status(400).send("The id is not a valid mongo ObjectId");
        // const error = new Error('The id is not a valid mongo OjectId');
        // error.status = 400;
        // return next(error);
    }
};

const artistPost = async (req, res, next) => {
    try {
        const newArtist = new Artist({
            name: req.body.name,
            photoUrl: req.body.photoUrl,
            birthdate: req.body.birthdate,
            deathdate: req.body.deathdate,
        });
        const createdArtist = await newArtist.save();
        return res.status(200).json(createdArtist);
    } catch (err) {
        console.log("artist post error: ", err);
        return res.status(400).json("The body of the request is not valid");
        // return next(err);
        // const error = new Error('The body of the request is not valid');
        // error.status = 400;
        // return next(error);
    }
};

const artistPut = async (req, res, next) => {
    try {
        const { _id: id, ...update } = req.body;
        // const { id, ...update } = req.body;

        const updatedArtist = await Artist.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        return res.status(200).json(updatedArtist);
    } catch (err) {
        console.log("artist update error: ", err);
        res.status(400).json("The update was not done");
        return next(err);
        // const error = new Error('The album could not be deleted');
        // error.status = 400;
        // return next(error);
    }
};

const artistDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedArtist = await Artist.findByIdAndDelete(id);
        return res.status(200).json(deletedArtist);
    } catch (err) {
        console.log('artist delete error');
        res.status(400).json('The album could not be deleted');
        // const error = new Error('The album could not be deleted');
        // error.status = 400;
        // return next(error);
    }
};

module.exports = {
    artistGet,
    artistPost,
    artistPut,
    artistDelete,
};
