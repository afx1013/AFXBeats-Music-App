const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("node:dns")
dns.setServers(["1.1.1.1", "8.8.8.8"])
require("dotenv").config()
const cloudinary = require("cloudinary").v2
const multer = require("multer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const Song = require('./models/Song')
const Playlist = require('./models/Playlist')
const User = require("./models/User")


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = multer.memoryStorage()
const upload = multer({ storage })

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/playlists",async(req,res) => {
    try{
        const newPlaylist = await Playlist.find()
        res.json(newPlaylist)
    }catch(err){
        res.status(500).json({ error: err.message })
    }
})

app.get("/api/songs",async(req,res) =>{
    try{
        const newSong = await Song.find()
        res.json(newSong)
    }catch(err){
        res.status(500).json({ error:err.message })
    }
})

app.post("/api/playlists", async(req,res) =>{
    try{
        const newPlaylist = await Playlist.create(req.body)
        res.json(newPlaylist)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

app.post("/api/songs", upload.fields([{name:"audioFile",maxCount:1},{name:"coverImage",maxCount:1}]), async (req, res) => {
    try {
        if (!req.files?.audioFile) {
            return res.status(400).json({ error: "Audio file is required" })
        }

        const audioUpload = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "video", folder:"music-app/songs"},
                (error,result) => {
                    if(error){
                        reject(error)
                    }
                    else {
                        resolve(result)
                    }
                }
            )
            uploadStream.write(req.files.audioFile[0].buffer)
            uploadStream.end()
        })
        
        let imageUpload = null
        if (req.files.coverImage) {
            imageUpload = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image', folder: 'music-app/covers' },
                    (error, result) => {
                        if(error) {
                            reject(error)
                        }
                        else {
                            resolve(result)
                        }
                    }
                )
                uploadStream.write(req.files.coverImage[0].buffer)
                uploadStream.end()
            })
        }

        const newSong = await Song.create({
            title: req.body.title,
            artist: req.body.artist,
            duration: req.body.duration,
            audioUrl: audioUpload.secure_url,
            coverImage: imageUpload ? imageUpload.secure_url : null,
            genres: JSON.parse(req.body.genres || "[]")
        })

        res.json(newSong)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post("/api/users/signup", async(req,res) =>{
    try{
        const { username, password } = req.body
        const newUser = await User.create({ username, password })
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        )
        res.json({ token })
    }catch(err){
        console.error(err)
        res.status(500).json({error: err.message})
    }
})

app.post("/api/users/login", async(req,res) => {
    try{
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Incorrect username or password" })
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        )
        res.json({ token, user: { username: user.username } })
    }catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
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