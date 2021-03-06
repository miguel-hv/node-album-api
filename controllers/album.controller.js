const Album = require("../models/Album.model");

const albumGet = async (req, res, next) => {
    try {
        const id = req.params.id;
        const selectedAlbum = await Album.findById(id);

        if (selectedAlbum) {
            return res.status(200).json(selectedAlbum);
        } else {
            return res.status(204).json({});
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json("The id is not a valid mongo ObjectId");
        // const error = new Error('The id is not a valid mongo ObjectId');
        // error.status = 400;
        // return next(error);
    }
};

const albumPost = async (req, res, next) => {
    try {
        const newAlbum = new Album({
            title: req.body.title,
            artistId: req.body.artistId,
            coverUrl: req.body.coverUrl,
            year: req.body.year,
            genre: req.body.genre,
        });
        const createdAlbum = await newAlbum.save();
        return res.status(200).json(createdAlbum);
    } catch (err) {
        console.log(err);
        return res.status(400).json("The body of the request is not valid");
        // error.status = 400;
        // return next(error);
    }
};

const albumPut = async (req, res, next) => {
    try {
        const { _id: id, ...update } = req.body;
        console.log(req.body);
        console.log('id: ',id);

        const updatedAlbum = await Album.findByIdAndUpdate(
            id, 
            update,
            { new: true }
        );
        return res.status(200).json(updatedAlbum);
    } catch (err) {
        console.log(err)
        // return res.status(400).json("The update was not done");
        // const error = new Error('The update was not done');
        err.status = 400;
        return next(err);
    }
};

const albumDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        deletedArtist = await Album.findByIdAndDelete(id);
        return res.status(200).json(deletedArtist);
    } catch (err) {
        console.log(err);
        return res.status(400).json("The album could not be deleted");
        // const error = new Error('The album could not be deleted');
        // error.status = 400;
        // return next(error);
    }
};

module.exports = {
    albumGet,
    albumPost,
    albumPut,
    albumDelete,
};
