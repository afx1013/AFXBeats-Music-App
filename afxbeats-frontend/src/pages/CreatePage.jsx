import "./CreatePage.css"
import { useState } from "react"
import { FiUploadCloud } from "react-icons/fi"

export function CreatePage() {
    const [newSongTitle, setNewSongTitle] = useState("");
    const [newSongArtist, setNewSongArtist] = useState("");
    const [newSongDuration, setNewSongDuration] = useState("");
    const [newSongFile, setNewSongFile] = useState(null);
    const [newSongCoverImage, setNewSongCoverImage] = useState(null);

    const genres = ["Pop", "Rock", "Hip-Hop", "Electronic Dance Music", "R&B", "Country", "Jazz", "Classical", "Blues"];

    return (
        <div className="create-page-container">
            <h1>Upload a Song</h1>
            <div className="upload-drop-container">
                <div className="upload-area">
                    Song File Upload
                </div>
                <div className="upload-area">
                    Image File Upload
                </div>
            </div>
            <div className="song-info-form">
                <div className="input-container">
                    <label>Song Title</label>
                    <input type="text" placeholder="Enter song title..." value={newSongTitle} onChange={(e) => setNewSongTitle(e.target.value)}/>
                </div>
                <div className="input-container">
                    <label>Artist</label>
                    <input type="text" placeholder="Enter artist name..." value={newSongArtist} onChange={(e) => setNewSongArtist(e.target.value)}/>
                </div>
                <div className="input-container">
                    <label>Duration</label>
                    <input type="text" placeholder="Auto-detected from file" value={newSongDuration} readOnly style={{color:"#FF6B6B", cursor:"default"}}/>
                </div>
                <div className="input-container">
                    <label>Genres</label>
                    <div className="genre-select-container">
                        {genres.map(genre => (
                            <div key={genre} className="genre-select-chip">
                                {genre}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button className="upload-button">
                <FiUploadCloud/>
                Upload Song
            </button>
        </div>
    )
}