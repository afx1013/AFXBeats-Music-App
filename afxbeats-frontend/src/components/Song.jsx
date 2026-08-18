import SongCover from "../assets/freesongcover.jpg"
import "./Song.css"

export function Song({title, artist, duration}) {
    return(
        <div className="song-container" >
            <img src={SongCover}/>
            <div className="song-info">
                <p className="song-title">{title}</p>
                <p className="artist-name">{artist}</p>
            </div>
            <p className="song-duration">{duration}</p>
        </div>
    );
}