import "./Playlist.css"
import PlaylistCover from "../assets/freesongcover.jpg"

export function Playlist({ title, count, onContextMenu }) {
    return (
        <div className="playlist-container" onContextMenu={onContextMenu}>
            <img src={PlaylistCover} alt="playlist cover"/>
            <div className="playlist-info">
                <p className="playlist-title">{title}</p>
                <p className="playlist-song-count">{count} songs</p>
            </div>
        </div>
    );
}