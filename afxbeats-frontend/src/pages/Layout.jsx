import "./Layout.css"  
import { Outlet } from "react-router"
import { Menu } from "../components/Menu.jsx"
import { useState,useEffect,useRef } from "react";
import axios from "axios"
import {MusicControlBar} from "../components/MusicControlBar.jsx"
import {Queue} from "../components/Queue.jsx"
import { incrementSongScore } from "../utils/incrementSongScore.js"

export function Layout({ currentUserName }) {
    const [isCollapsed, setCollapse] = useState(false);
    const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
    const [playlists, setPlaylists] = useState({});
    const [songs, setSongs] = useState({});
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
    const [playStatus, setPlayStatus] = useState(false);
    const [currentSongId,setCurrentSongId] = useState(null);
    const audioRef = useRef(null);
    const [songMaxDuration, setSongMaxDuration] = useState(0);
    const [displayQueue, setDisplayQueue] = useState(false);
    const [songQueue, setSongQueue] = useState([]);
    const [queueIndex, setQueueIndex] = useState(0);

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

    

    function playSong(songId, songIdsList){
        if(currentSongId === songId){
                setQueueIndex(songIdsList.indexOf(songId))
                setSongQueue(songIdsList)
                audioRef.current.currentTime = 0
                setPlayStatus(true)
                audioRef.current.play()
        }
        else {
            setCurrentSongId(songId)
            setQueueIndex(songIdsList.indexOf(songId))
            setSongQueue(songIdsList)
            incrementSongScore(songId)
        }
    }

    
    return (
        <div className="page-container">
            <audio ref={audioRef}></audio>
            <div className="page-content-container">
                <Menu isCollapsed={isCollapsed} setCollapse={setCollapse} playlists={playlists} setPlaylists={setPlaylists} isCreatingPlaylist={isCreatingPlaylist} setIsCreatingPlaylist={setIsCreatingPlaylist} currentUserName={currentUserName}/>
                <Outlet context={{ currentPlaylistId, setCurrentPlaylistId, playlists, setPlaylists, songs, currentSongId, setCurrentSongId, playSong}}/>
                {displayQueue && <Queue currentSongId={currentSongId} songs={songs} songQueue={songQueue} queueIndex={queueIndex}/>}
            </div>
            <MusicControlBar currentPlaylistId={currentPlaylistId} playStatus={playStatus} setPlayStatus={setPlayStatus} audioRef={audioRef} songMaxDuration={songMaxDuration} setCurrentSongId={setCurrentSongId} currentSongId={currentSongId} songs={songs} displayQueue={displayQueue} setDisplayQueue={setDisplayQueue} songQueue={songQueue} setSongQueue={setSongQueue} queueIndex={queueIndex} setQueueIndex={setQueueIndex}/>
        </div>
    );
}