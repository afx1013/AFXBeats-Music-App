import SongCover from "../assets/freesongcover.jpg"
import "./Song.css"

export function Song({title, artist, coverImage, duration, onClick, isSelected, onContextMenu}) {
    return(
        <div className={`song-container ${isSelected ? "selected" : ""}`} onClick={onClick} onContextMenu={onContextMenu}>
            <img src={coverImage}/>
            <div className="song-info">
                <p className={`song-title ${isSelected? "selected":""}`}>{title}</p>
                <p className="artist-name">{artist}</p>
            </div>
            <p className="song-duration">{duration}</p>
        </div>
    );
}