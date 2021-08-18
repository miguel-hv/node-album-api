const mongoose = require('mongoose');
const { DB_URL, DB_CONFIG } = require('../db');

const Artist = require('../models/Artist.model');

const artistsArray = [
    {
        name : 'test',
        photoUrl: '',
        birthdate: null,
        deathdate: null,
    },
    {
        name : 'test2',
        photoUrl: '',
        birthdate: null,
        deathdate: null,
    },
];

const artistDocuments = artistsArray.map(artist => new Artist(artist));

mongoose.connect(DB_URL, DB_CONFIG) 
.then(async () => {
    console.log('Executing seed Artist');
    
    const allArtists = await Artist.find();

    if(allArtists.length) {
        await Artist.collection.drop();
        console.log('Artist collection dropped');  
    }
})
.catch(error => {
    console.log('Error searching db: ', error);
})
.then(async () => {
    await Artist.insertMany(artistsArray);
    console.log('seed executed');
})
.catch(error => {
    console.log('Error inserting artists: ', error);
})
.finally(()=> mongoose.disconnect());