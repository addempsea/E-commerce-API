const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    contact: {type: String, required: true},
    image_url: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('items', postSchema);