const mongoose = require("mongoose");
const { DB_URL, DB_CONFIG } = require("../db");

const Artist = require("../models/Artist.model");

const artistsArray = [
    {
        // _id: "60ce292e6504f20ec2d50b69",
        name: "Motörhead",
        photoUrl:
            "https://imagenes.elpais.com/resizer/LzOqw2U-heU2xO6sSJSZv3HF7uw=/1960x0/ep01.epimg.net/elpais/imagenes/2019/11/19/icon/1574168233_923126_1574841384_noticia_fotograma.jpg",
        birthdate: "1975-01-01",
        deathdate: "2015-01-01",
    },
    {
        // _id: "60d3578bbaf621001c6a05ec",
        name: "Death from above 1979",
        photoUrl:
            "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/9/3/1409753379615/c2a6c217-d1ac-40c4-b5bd-199213ceaac2-2060x1236.jpeg?width=445&quality=45&auto=format&fit=max&dpr=2&s=df421488ae0ebf38e05b6c16f19910de",
        birthdate: "2001-02-05",
        deathdate: "2006-03-08",
    },
    {
        // _id: "60d359a0baf621001c6a05ef"
        name: "Jimi",
        photoUrl:
            "https://www.diariovivo.com/wp-content/uploads/2020/11/jimi-hendrix-live-in-maui.jpg",
        birthdate: "1945-09-27",
        deathdate: "1970-09-17",
    },
    {
        name: "Turbowolf",
        photoUrl:
            "https://i2.wp.com/www.scienceofnoise.net/wp-content/uploads/2019/03/turbowolf.jpg",
        birthdate: "2008-01-01",
        deathDate: "",
    },
];

const artistDocuments = artistsArray.map((artist) => new Artist(artist));

mongoose
    .connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log("Executing seed Artist");

        const allArtists = await Artist.find();

        if (allArtists.length) {
            await Artist.collection.drop();
            console.log("Artist collection dropped");
        }
    })
    .catch((error) => {
        console.log("Error searching db: ", error);
    })
    .then(async () => {
        await Artist.insertMany(artistDocuments);
        console.log("seed executed");
    })
    .catch((error) => {
        console.log("Error inserting artists: ", error);
    })
    .finally(() => mongoose.disconnect());
