const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: String,
    band: String,
    rating: String,
})

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;