import axios from "axios"

export async function incrementSongScore(songId, points = 1) {
    try {
        await axios.post("http://localhost:3000/api/songs/score", { songId, incPoints: points })
    } catch (err) {
        console.error("Error incrementing song score:", err.message)
    }
}