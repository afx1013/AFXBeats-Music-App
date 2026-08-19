import "./TempPlaylist.css"
import PlaylistCover from "../assets/freesongcover.jpg"
import { useRef } from "react"

export function TempPlaylist({addPlaylist}) {
    const inputRef = useRef(null)

    function createPlaylist(event) {
        if (event.key === "Enter" && inputRef.current.value) {
            addPlaylist(inputRef.current.value)
        }
    }

    return(
        <div className="playlist-container">
            <img src={PlaylistCover}/>
            <div className="playlist-info">
                <input type="text" className="temp-playlist-input" placeholder="Playlist Name" ref={inputRef} onKeyDown={createPlaylist} autoFocus/>
                <p className="playlist-song-count">0 songs</p>
            </div>
        </div>
    );
}