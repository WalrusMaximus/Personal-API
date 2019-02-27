const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: String,
    band: String,
    rating: String,
})

const Albums = mongoose.model('Albums', AlbumSchema);

module.exports = Albums;