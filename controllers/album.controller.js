const Album = require("../models/Album.model");

const albumGet = async (req, res, next) => {
    try {
        const id = req.body.id;
        const selectedAlbum = await Album.findById(id);

        if (selectedAlbum) {
            return res.status(200).json(selectedAlbum);
        } else {
            return res.status(204).json({});
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json("The id is not a valid mongo ObjectId");
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
    }
};

const albumPut = async (req, res, next) => {
    try {
        const { id, ...update } = req.body;

        const updatedAlbum = await Album.findByIdAndUpdate(
            id, 
            update,
            { new: true }
        );
        return res.status(200).json(updatedAlbum);
    } catch (err) {
        return res.status(400).json("The update was not done");
    }
};

const albumDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("req.params en delete: ", req.params);
        deletedArtist = await Album.findByIdAndDelete(id);
        return res.status(200).json(deletedArtist);
    } catch (err) {
        console.log(err);
        return res.status(400).json("The album could not be deleted");
    }
};

module.exports = {
    albumGet,
    albumPost,
};
