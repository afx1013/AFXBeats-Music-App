import "./SongCard.css"
import DefaultCover from "../assets/freesongcover.jpg"

export function SongCard({ title, artist, coverImage, onClick, isSelected, onContextMenu }) {
    return (
        <div className="song-card-container" onClick={onClick} onContextMenu={onContextMenu}>
            <img src={coverImage || DefaultCover}/>
            <div className="song-card-info">
                <p className={`song-card-title ${isSelected ? "selected" : ""}`}>{title}</p>
                <p className="song-card-artist">{artist}</p>
            </div>
        </div>
    )
}