const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    duration: { type: String },
    audioUrl: {type:String, required:true},
    coverImage:{type: String},
    genres:[{type: String,index:true}],
    score: {type: Number, default: 0}
}, { timestamps: true })

const Song = mongoose.model("Song", songSchema)
module.exports = Song