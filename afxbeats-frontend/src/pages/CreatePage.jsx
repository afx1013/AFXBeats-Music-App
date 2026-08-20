import "./CreatePage.css"
import { useState } from "react"
import { FiUploadCloud } from "react-icons/fi"
import { RiFileUploadFill } from "react-icons/ri"
import { RiImageUploadFill } from "react-icons/ri"
import { MdAudioFile } from "react-icons/md"
import { FaFileImage } from "react-icons/fa6"
import {secondsToMinutes} from "../utils/formatSecondsToMinutes.js"



export function CreatePage() {
    const [newSongTitle, setNewSongTitle] = useState("");
    const [newSongArtist, setNewSongArtist] = useState("");
    const [newSongDuration, setNewSongDuration] = useState("");
    const [newSongFile, setNewSongFile] = useState(null);
    const [newSongCoverImage, setNewSongCoverImage] = useState(null);
    const [isDraggingAudio, setIsDraggingAudio] = useState(false);
    const [isDraggingImage, setIsDraggingImage] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([])

    const genres = ["Pop", "Rock", "Hip-Hop", "Electronic Dance Music", "R&B", "Country", "Jazz", "Classical", "Blues"];

    function audioHandleDragOver(e){
        e.preventDefault()
        setIsDraggingAudio(true)
    }

    function audioHandleDragLeave(e) {
        setIsDraggingAudio(false)
    }

    function audioHandleDrop(e) {
        e.preventDefault()
        setIsDraggingAudio(false)
        const droppedFile = e.dataTransfer.files[e.dataTransfer.files.length - 1]
        if(!droppedFile) {
            return
        }
        if(droppedFile.type.slice(0,6) !== "audio/") {
            console.log("Not a Proper Audio File")
            console.log(droppedFile.type)
            return
        }
        console.log(droppedFile.type)
        setNewSongFile(droppedFile)
        const audio = new Audio()
        const tempMemoryURL = URL.createObjectURL(droppedFile)
        audio.src = tempMemoryURL
        audio.addEventListener("loadedmetadata", () => {
             setNewSongDuration(secondsToMinutes(audio.duration))
             URL.revokeObjectURL(tempMemoryURL)
        })
    }

    function imageHandleDragOver(e) {
        e.preventDefault()
        setIsDraggingImage(true)
    }

    function imageHandleDragLeave(e) {
        setIsDraggingImage(false)
    }

    function imageHandleDrop(e) {
        e.preventDefault()
        setIsDraggingImage(false)
        const droppedFile = e.dataTransfer.files[e.dataTransfer.files.length - 1]
        if(!droppedFile) {
            return
        }
        if(droppedFile.type.slice(0,6) !== "image/") {
            console.log("Not a Proper Image File")
            console.log(droppedFile.type)
            return
        }
        console.log(droppedFile.type)
        setNewSongCoverImage(droppedFile)
    }

    function handleToggleGenre(genre) {
        if(selectedGenres.includes(genre)) {
            const newSelectedGenres = selectedGenres.filter((g) => g !== genre)
            setSelectedGenres(newSelectedGenres)
            console.log(newSelectedGenres)           
        }
        else {
            const newSelectedGenres = [...selectedGenres,genre]
            console.log(newSelectedGenres)
            setSelectedGenres([...selectedGenres,genre])
        }
    }

    return (
        <div className="create-page-container">
            <div className="upload-drop-container">
                <div className={`upload-area ${isDraggingAudio?"dragging":""}`} onDragOver={audioHandleDragOver} onDragLeave={audioHandleDragLeave} onDrop={audioHandleDrop}>
                    {newSongFile ? 
                    <div className="file-selected">
                        <MdAudioFile className="audio-icon"/>
                        <p>{newSongFile.name}</p>
                        <p className="audio-duration">Duration: {newSongDuration}</p>
                    </div> :
                    <div className="upload-prompt">
                        <RiFileUploadFill className="upload-icon"/>
                        <p>Drag and drop your MP3 here</p>  
                        <p style={{color:"#b3b3b3", fontSize:"14px"}}>or click to browse</p>
                    </div>}
                </div>
                <div className={`upload-area ${isDraggingImage?"dragging":""}`} onDragOver={imageHandleDragOver} onDragLeave={imageHandleDragLeave} onDrop={imageHandleDrop}>
                    {newSongCoverImage ?
                    <div className="file-selected">
                        <FaFileImage className="audio-icon"/>
                        <p>{newSongCoverImage.name}</p>
                        </div> :
                    <div className="upload-prompt">
                        <RiImageUploadFill className="upload-icon"/>
                        <p>Drag and drop your Image here</p>
                        <p className="upload-subtext" style={{color:"#b3b3b3", fontSize:"14px"}}>or click to browse</p>
                    </div>}
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
                        {genres.map((genre) => (
                            <div key={genre} className={`genre-select-chip ${selectedGenres.includes(genre) ? "genre-chip-selected" : ""}`} onClick={() => {handleToggleGenre(genre)}}>
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