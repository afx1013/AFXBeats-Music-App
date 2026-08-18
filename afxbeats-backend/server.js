const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("node:dns")
dns.setServers(["1.1.1.1", "8.8.8.8"])
require("dotenv").config()

const Song = require('./models/Song')
const Playlist = require('./models/Playlist')

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/playlists",async(req,res) => {
    try{
        res.json(await Playlist.find())
    }catch(err){
        res.status(500).json({ error: err.message })
    }
})

async function connectDB() {
    try {
        await mongoose.connect(process.env.ATLAS_URI, {dbName: "music-project"})
        console.log("Connected to MongoDB successfully");
    }catch(err){
        console.error("Error connecting to MongoDB:", err.message);
    }
}

connectDB();

app.listen(3000, () => {
    console.log("Server is running");
})