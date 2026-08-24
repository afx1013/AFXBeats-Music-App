import "./MusicControlBar.css"
import { FaPlayCircle } from "react-icons/fa"
import { FaPauseCircle } from "react-icons/fa"
import { BsSkipBackwardCircleFill } from "react-icons/bs"
import { BsSkipForwardCircleFill } from "react-icons/bs"
import {useState,useEffect} from "react"


export function MusicControlBar({currentPlaylistId, playStatus, setPlayStatus, audioRef, songMaxDuration, currentSongId}){
    const [songProgress, setSongProgress] = useState(0);

     useEffect(() => {
        if (!audioRef.current) return
        
        function updateSongProgress() {
            setSongProgress(audioRef.current.currentTime)
            console.log(audioRef.current.currentTime)
        }
        audioRef.current.addEventListener('timeupdate', updateSongProgress)

        return () => {
            audioRef.current?.removeEventListener('timeupdate', updateSongProgress)
        }
    }, [currentSongId])


    return(
        <div className="controlbar-container">
            <input type="range" className="song-slider" max={songMaxDuration} step="1" value={songProgress} onChange={(e) => {
                if(!audioRef.current){
                    return
                }
                audioRef.current.currentTime = Number(e.target.value)
                setSongProgress(Number(e.target.value))
            }}/>
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