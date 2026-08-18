import "./PlaylistPage.css"
import { useParams, useOutletContext } from "react-router"
import PlaylistCover from "../assets/freegrassimg.jpg"
import { FaPlayCircle } from "react-icons/fa"
import {useEffect} from "react"
import {Song} from "../components/Song.jsx"

export function PlaylistPage() {
    const { playlists, currentPlaylistId, setCurrentPlaylistId, songs, setSongs } = useOutletContext();
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
                        return (<Song key={songId} title={songs[songId].title} artist={songs[songId].artist} duration={songs[songId].duration}/>);
                    })}
                </div>
        </div>
    )
}