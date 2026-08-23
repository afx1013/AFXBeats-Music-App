import "./MusicControlBar.css"
import { FaPlayCircle } from "react-icons/fa"
import { FaPauseCircle } from "react-icons/fa"
import { BsSkipBackwardCircleFill } from "react-icons/bs"
import { BsSkipForwardCircleFill } from "react-icons/bs"


export function MusicControlBar({currentPlaylistId, playStatus, setPlayStatus}){

    return(
        <div className="controlbar-container">
            <input type="range" className="song-slider" max="100" step="1"/>
            <div className="controls-container">
                <div className="left-controls">
                    Hi
                </div>
                <div className="center-controls">
                    <BsSkipBackwardCircleFill className="back-skip-button"/>
                    {playStatus
                    ?
                    <FaPauseCircle className="pause-button" onClick={() => {setPlayStatus(!playStatus)}}/>
                    :
                    <FaPlayCircle className="play-button" onClick={() => {setPlayStatus(!playStatus)}}/>}
                    <BsSkipForwardCircleFill className="next-skip-button"/>
                </div>
                <div className="right-controls">
                  Hi
                </div>
            </div>
        </div>

    );
}