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

const artistsPost = async (req, res, next) => {
    try {
        console.log(req.body);

        const newArtists = req.body.map((artist)=>{console.log(artist);
            return new Artist(artist)});

        console.log(newArtists);
        
        await Artist.insertMany(newArtists);



        // const newArtistsArray = [{
        //     name : req.body.name,
        //     photoUrl: req.body.photoUrl,
        //     birthdate: req.body.birthdate,
        //     deathdate: req.body.deathdate,
        // }];

        // const newArtists = newArtistsArray.map((artist) => 
        // {console.log(artist);
        // return new Artist(artist)});

        // const createdArtists = await newArtists.save();
        return res.status(201).json(newArtists);
    } catch (err) {
        console.log('artist post error: ', err);
        res.status(400).json('The body of the request is not valid');
        // return next(err);
    }
}

module.exports = {
    artistsGet,
    artistGet,
    artistsPost,
}