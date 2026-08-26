import "./MusicControlBar.css"
import { FaPlayCircle } from "react-icons/fa"
import { FaPauseCircle } from "react-icons/fa"
import { BsSkipBackwardCircleFill } from "react-icons/bs"
import { BsSkipForwardCircleFill } from "react-icons/bs"
import {useState,useEffect} from "react"
import SongCover from "../assets/freesongcover.jpg"
import { WiTime2 } from "react-icons/wi"
import {secondsToMinutes} from "../utils/formatSecondsToMinutes.js"
import { FiVolume1 } from "react-icons/fi"
import { FiVolume2 } from "react-icons/fi"
import { FiVolumeX } from "react-icons/fi"

export function MusicControlBar({currentPlaylistId, playStatus, setPlayStatus, audioRef, songMaxDuration, currentSongId, songs}){
    const [songProgress, setSongProgress] = useState(0);
    const [volume, setVolume] = useState(0.5);

     useEffect(() => {
        if (!audioRef.current) return
        
        function updateSongProgress() {
            setSongProgress(Math.floor(audioRef.current.currentTime))
        }

        audioRef.current.addEventListener('timeupdate', updateSongProgress)

        return () => {
            audioRef.current?.removeEventListener('timeupdate', updateSongProgress)
        }
    }, [currentSongId, songMaxDuration])


    return(
        <div className="controlbar-container">
            <input type="range" className="song-slider" min="0" max={songMaxDuration} step="1" value={songProgress} onChange={(e) => {
                if(!audioRef.current){
                    return
                }
                audioRef.current.currentTime = Number(e.target.value)
                setSongProgress(Number(e.target.value))
            }}/>
            <div className="controls-container">
                <div className="left-controls">
                    {currentSongId && (<div className="current-song-container">
                        {songs[currentSongId].coverImage ? <img src={songs[currentSongId].coverImage}/> : <img src={SongCover}/>}
                            <div className="song-info">
                                <p className="song-title">{songs[currentSongId].title}</p>
                                <p className="artist-name">{songs[currentSongId].artist}</p>
                            </div>
                        </div>
)}
                </div>
                <div className="center-controls">
                    <BsSkipBackwardCircleFill className="back-skip-button"/>
                    {playStatus
                    ?
                    <FaPauseCircle className="pause-button" onClick={() => {
                        if(currentSongId) {
                            setPlayStatus(!playStatus)
                        }
                    }}/>
                    :
                    <FaPlayCircle className="play-button" onClick={() => {
                        if(currentSongId) {
                            setPlayStatus(!playStatus)
                        }
                    }}/>}
                    <BsSkipForwardCircleFill className="next-skip-button"/>
                </div>
                <div className="right-controls">
                    <div className="song-timestamp-container">
                        <WiTime2/>
                        <p>{secondsToMinutes(songProgress)} • {secondsToMinutes(songMaxDuration)}</p>
                    </div>
                     <div className="volume-controls">
                        {volume === 0 && <FiVolumeX className="volume-icon"/>}
                        {volume > 0 && volume <= 0.50 && <FiVolume1 className="volume-icon"/>}
                        {volume > 0.5 && volume <= 1 && <FiVolume2 className="volume-icon"/>}
                        <input type="range" className="volume-slider" min="0" max="1" step="0.01" value={volume} onChange={(e) => {
                                const newVolume = Number(e.target.value)
                                audioRef.current.volume = newVolume
                                setVolume(newVolume)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}