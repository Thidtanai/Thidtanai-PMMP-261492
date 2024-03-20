const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    myFile: String
}, {
    collection: "images"
})

module.exports = mongoose.model('Image', imageSchema);