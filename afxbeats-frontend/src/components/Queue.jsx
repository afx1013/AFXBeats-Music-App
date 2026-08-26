import "./Queue.css"
import {Song} from "./Song.jsx"

export function Queue({currentSongId, songs}) {
    return(
        <div className="queue-container">
            <p>Currently Playing</p>
            <div className="queue-current-song-container">
                {currentSongId && (<Song key={currentSongId} title={songs[currentSongId].title} coverImage={songs[currentSongId].coverImage} artist={songs[currentSongId].artist} isSelected={true}/>)}
            </div>
            <p>Up Next</p>
        </div>
    );
}