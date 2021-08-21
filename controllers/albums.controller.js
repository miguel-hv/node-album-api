const Album = require("../models/Album.model");

const albumsGet = async (req, res, next) => {
    try {
        const albums = await Album.find();

        if (albums.length) {
            return res.status(200).json(albums);
        } else {
            return res.status(200).json({});
        }
    } catch (err) {
        return res.status(200).json({});
    }
};

const albumsPost = async (req, res, next) => {
    try{
        const newAlbums = req.body.map(album => new Album(album));
        const createdAlbums = await Album.insertMany(newAlbums);
        return res.status(200).json(createdAlbums);
    } catch(err) {
        console.log(err);
        return res.status(400).json("The body of the request is not valid");
    }
};


module.exports = {
    albumsGet,
    albumsPost,
};
