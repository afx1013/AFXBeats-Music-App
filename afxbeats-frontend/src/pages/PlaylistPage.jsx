import "./PlaylistPage.css"
import { useParams, useOutletContext } from "react-router"
import PlaylistCover from "../assets/freegrassimg.jpg"
import { FaPlayCircle } from "react-icons/fa"
import {useEffect} from "react"
import {Song} from "../components/Song.jsx"
import {secondsToMinutes} from "../utils/formatSecondsToMinutes.js"

export function PlaylistPage() {
    const { playlists, currentPlaylistId, setCurrentPlaylistId, songs, setSongs, currentSongId, setCurrentSongId, playSong } = useOutletContext();
    const { playlistId } = useParams();

    useEffect(()=> {
        setCurrentPlaylistId(playlistId);
    },[playlistId, setCurrentPlaylistId])

    return (
        <div className="playlist-page-container">
            <div className="blurred-background" style={{backgroundImage: `url(${PlaylistCover})`}}/>
                <div className="playlist-info-container">
                    <img src={PlaylistCover} className="playlist-cover-img"/>
                    <div className="playlistpage-info">
                        <h1>{playlists[currentPlaylistId]?.title}</h1>
                        <span>
                            <span style={{color:"white"}}>Andrew Xu </span> 
                            • {playlists[currentPlaylistId]?.songIds.length } songs • 1 hr 32 min • Created 2025
                        </span>
                    </div>
                </div>
                <div className="playlistpage-menu-container">
                    <FaPlayCircle className="playlistpage-menu-option-play"/>
                </div>
                <div className="song-list">
                    {playlists[currentPlaylistId]?.songIds.map((songId) => {
                        const song = songs[songId]
                        if(!song) {
                            return null
                        }
                        return (<Song key={songId} title={song.title} artist={song.artist} coverImage={song.coverImage} duration={secondsToMinutes(song.duration)} isSelected={currentSongId === songId} onClick={() => {
                            playSong(songId, playlists[currentPlaylistId].songIds)
                        }}/>);
                    })}
                </div>
        </div>
    )
}