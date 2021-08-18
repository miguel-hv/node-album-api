const Artist = require('../models/Artist.model');

const artistGet = async (req, res, next) => {
    const id = req.params.id;
    console.log('id de url: ', id);
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
        // return res.status(400).send("The id is not a valid mongo OjectId");
        return next(error);
    }
};

const artistPost = async (req, res, next) => {
    try {
        const newArtist = new Artist({
            name : req.body.name,
            photoUrl: req.body.photoUrl,
            birthdate: req.body.birthdate,
            deathdate: req.body.deathdate,
        });
        const createdArtist = await newArtist.save();
        return res.status(200).json(createdArtist);
    } catch (err) {
        console.log('artist post error: ', err);
        res.status(400).json('The body of the request is not valid');
        // return next(err);
    }
}

module.exports = {
    artistGet,
    artistPost,
}