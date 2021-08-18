const Artist = require('../models/Artist.model');

const artistsGet = async (req, res, next) => {
    try {
        const artists = await Artist.find();
        return res.status(200).json(artists);
    } catch (error) {
        res.status(200).json([]);
        console.log("artists get error: ", err);
        // return next(error);
    }
};

const artistGet = async (req, res, next) => {
    const id = req.params.id;

    try {
        const artist = await Artist.findById(id);
        if (artist) {
            return res.status(200).json(artist);
        } else {
            return res.status(204).json(null);
        }
    } catch (error) {
        console.log("artists get error: ", error);
        // return res.status(400).send("The id is not a valid mongo OjectId");
        return next(error);
    }
}

module.exports = {
    artistsGet,
    artistGet,
}