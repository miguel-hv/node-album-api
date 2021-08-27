const mongoose = require("mongoose");
const { DB_URL, DB_CONFIG } = require("../db");

const Album = require("../models/Album.model");
const Artist = require("../models/Artist.model");

const albumsArray = [
    {
        title: "Motörhead",
        artistId: "",
        coverUrl:
            "http://vanyaland.com/wp-content/uploads/2017/01/1977-Motorhead.jpg",
        year: 1977,
        genre: "rock and roll",
    },
    {
        title: "Two hands",
        artistId: "",
        coverUrl:
            "https://img.discogs.com/h5B2D8p3u0f4Yba65TCbV1z9ccE=/fit-in/300x300/filters:strip_icc():format(webp):mode_rgb():quality(40)/discogs-images/R-7055135-1432655214-7482.jpeg.jpg",
        year: 2015,
        genre: "alternative rock",
    },
    {
        title: "Turbowolf",
        artistId: "",
        coverUrl:
            "https://www.punkrocktheory.com/sites/default/files/turbowolf_0.jpg",
        year: 2011,
        genre: "",
    },
    {
        title: "You're a Woman I'm a Machine",
        artistId: "",
        coverUrl:
            "https://images-na.ssl-images-amazon.com/images/I/81TErBIfm7L._AC_SL1201_.jpg",
        year: 2006,
        genre: "dance punk",
    },
    {
        title: "Are you Experienced?",
        artistId: "",
        coverUrl:
            "https://images-na.ssl-images-amazon.com/images/I/813PRde%2B9tL._SX355_.jpg",
        year: 1967,
        genre: "rock",
    },
    {
        title: "Outrage! is Now",
        artistId: "",
        coverUrl:
            "https://images-na.ssl-images-amazon.com/images/I/81gPb4dG1HL._SL1425_.jpg",
        year: 2017,
        genre: "alternative rock",
    },
    {
        title: "Bomber",
        artistId: "",
        coverUrl:
            "https://img.discogs.com/762_qoypTZs0cs1U2HBNrPBUIt0=/fit-in/600x598/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-419554-1221479743.jpeg.jpg",
        year: 1979,
        genre: "rock",
    },
];

mongoose
    .connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log("Executing seed albums");

        const allAlbums = await Album.find();

        if (allAlbums.length) {
            await Album.collection.drop();
            console.log("Album collection dropped");
        }
    })
    .catch((err) => {
        console.log("Error searching db", err);
    })
    .then(async () => {
        const allArtists = await Artist.find();

        albumsArray[0].artistId = allArtists[0]._id;
        albumsArray[1].artistId = allArtists[3]._id;
        albumsArray[2].artistId = allArtists[3]._id;
        albumsArray[3].artistId = allArtists[1]._id;
        albumsArray[4].artistId = allArtists[2]._id;
        albumsArray[5].artistId = allArtists[1]._id;
        albumsArray[6].artistId = allArtists[0]._id;

        const albumDocuments = albumsArray.map((album)=> new Album(album));

        await Album.insertMany(albumDocuments);
        console.log("Seed executed");
    })
    .catch((err) => {
        console.log("Error inserting albums", err);
    })
    .finally(() => mongoose.disconnect());
