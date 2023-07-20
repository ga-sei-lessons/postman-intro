const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dogSchema = new Schema({
    name: String,
    breed: String,
    color: String
}, {
    timestamps: true
})

module.exports = mongoose.model("Dog", dogSchema)