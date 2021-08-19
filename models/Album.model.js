const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema (
    {
        title: { type: String, required: true },
        artistId: { type: mongoose.Types.ObjectId, ref: 'Artist' },
        coverUrl: String,
        year: Number,
        genre: String,
    }, 
    {
        timestamps: true,
    }
);

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;