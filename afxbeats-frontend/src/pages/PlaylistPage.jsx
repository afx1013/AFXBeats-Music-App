import "./PlaylistPage.css"
import { useParams, useOutletContext } from "react-router"
import PlaylistCover from "../assets/freegrassimg.jpg"
import { FaPlayCircle } from "react-icons/fa"
import {useEffect} from "react"

export function PlaylistPage() {
    const { playlists, currentPlaylistId, setCurrentPlaylistId } = useOutletContext();
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
                    Hi
                </div>
        </div>
    )
}