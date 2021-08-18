const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema (
    {
        name : { type: String, required: true },
        photoUrl: String,
        birthdate: { type: Date, min:'1909-01-01', max:'2030-12-31',},
        deathdate: { type: Date, min:'1909-01-01', max:'2030-12-31',},
    },
    {
        timestamps: true,
    },
);

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;