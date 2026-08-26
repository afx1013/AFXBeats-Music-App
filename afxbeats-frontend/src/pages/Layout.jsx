import "./Layout.css"  
import { Outlet } from "react-router"
import { Menu } from "../components/Menu.jsx"
import { useState,useEffect,useRef } from "react";
import axios from "axios"
import {MusicControlBar} from "../components/MusicControlBar.jsx"

export function Layout() {
    const [isCollapsed, setCollapse] = useState(false);
    const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
    const [playlists, setPlaylists] = useState({});
    const [songs, setSongs] = useState({});
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
    const [playStatus, setPlayStatus] = useState(false);
    const [currentSongId,setCurrentSongId] = useState(null);
    const audioRef = useRef(null);
    const [songMaxDuration, setSongMaxDuration] = useState(0);

    useEffect(() => {
    async function fetchAll() {
        try {
            const [songsResponse, playlistsResponse] = await Promise.all([
                axios.get("http://localhost:3000/api/songs"),
                axios.get("http://localhost:3000/api/playlists")
            ])

            const songsObj = songsResponse.data.reduce((acc, song) => {
                const { _id, ...rest } = song
                acc[_id] = rest
                return acc
            }, {})

            const playlistsObj = playlistsResponse.data.reduce((acc, playlist) => {
                const { _id, ...rest } = playlist
                acc[_id] = rest
                return acc
            }, {})

            setSongs(songsObj)
            setPlaylists(playlistsObj)
        } catch (err) {
            console.log(err)
        }
    }

    fetchAll()
}, [])

    useEffect(() => {
        if (!currentSongId || !audioRef.current) {
            return
        }
        audioRef.current.src = songs[currentSongId]?.audioUrl
        setPlayStatus(true)
        setSongMaxDuration(Number(songs[currentSongId]?.duration))
        audioRef.current.play()
    }, [currentSongId])

    useEffect(() => {
        if (!audioRef.current?.src) {
            return
        }
        if (playStatus === false) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
    }, [playStatus])
    
    function playSong(songId){
        if(currentSongId === songId){
            audioRef.current.currentTime = 0
            setPlayStatus(true)
            audioRef.current.play()
        }
        else {
            setCurrentSongId(songId)
        }
    }
    return (
        <div className="page-container">
            <audio ref={audioRef}></audio>
            <div className="page-content-container">
                <Menu isCollapsed={isCollapsed} setCollapse={setCollapse} playlists={playlists} setPlaylists={setPlaylists} isCreatingPlaylist={isCreatingPlaylist} setIsCreatingPlaylist={setIsCreatingPlaylist}/>
                <Outlet context={{ currentPlaylistId, setCurrentPlaylistId, playlists, setPlaylists, songs, currentSongId, setCurrentSongId, playSong}}/>
            </div>
            <MusicControlBar currentPlaylistId={currentPlaylistId} playStatus={playStatus} setPlayStatus={setPlayStatus} audioRef={audioRef} songMaxDuration={songMaxDuration} currentSongId={currentSongId} songs={songs}/>
        </div>
    );
}