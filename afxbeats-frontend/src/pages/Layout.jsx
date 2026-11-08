import "./Layout.css"  
import { Outlet } from "react-router"
import { Menu } from "../components/Menu.jsx"
import { useState,useEffect,useRef,useCallback } from "react";
import axios from "axios"
import {MusicControlBar} from "../components/MusicControlBar.jsx"
import {Queue} from "../components/Queue.jsx"
import { incrementSongScore } from "../utils/incrementSongScore.js"
import { SongContextMenu } from "../components/SongContextMenu.jsx"

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
    const [contextMenu, setContextMenu] = useState(null)
    const menuOptions = contextMenu ? [
            (contextMenu.target.type === "song") && { label: "Play", onClick: () => playSong(contextMenu.target.songId, currentPlaylistId ? playlists[currentPlaylistId].songIds : [contextMenu.target.songId]) },
            (contextMenu.target.type === "song") && { label: "Add to queue", onClick: () => setSongQueue((prev) => [...prev, contextMenu.target.songId]) },
            (contextMenu.target.type === "song" && currentPlaylistId) && { label: "Delete from playlist", onClick: () => removeSongFromPlaylist(currentPlaylistId, contextMenu.target.songId) },
            (contextMenu.target.type === "song") && { label: "Add to playlist", submenu: Object.entries(playlists).length > 0
            ? Object.entries(playlists).map(([id, playlist]) => ({
                key: id,
                label: playlist.title,
                disabled: playlist.songIds.includes(contextMenu.target.songId),
                onClick: () => addSongToPlaylist(id, contextMenu.target.songId),
            }))
            : [{ key: "none", label: "No playlists yet", disabled: true }],
        },
        (contextMenu.target.type === "playlist") && { label: "Delete Playlist", onClick: () => deletePlaylist(contextMenu.target.playlistId) },
        (contextMenu.target.type === "playlist") && { label: "Add to another playlist", onClick: () => {return} }

        ].filter(Boolean) : [] 

    useEffect(() => {
    async function fetchAll() {
        try {
            const token = localStorage.getItem("token")

            const [songsResponse, playlistsResponse] = await Promise.all([
                axios.get("http://localhost:3000/api/songs",{ headers: { Authorization: `Bearer ${token}` } }),
                axios.get("http://localhost:3000/api/playlists",{ headers: { Authorization: `Bearer ${token}` } })
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

    function openContextMenu(e, target) {
    e.preventDefault() 
    setContextMenu({ x: e.clientX, y: e.clientY, target:target })
    }

    const closeContextMenu = useCallback(() => setContextMenu(null), [])

    async function removeSongFromPlaylist(playlistId, songId) {
        if (!playlistId || !songId) {
            console.error("Playlist ID or Song ID is missing.")
            return
        }
        try {
            const token = localStorage.getItem("token")
            await axios.delete(
                `http://localhost:3000/api/playlists/${playlistId}/songs/${songId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setPlaylists((prev) => ({
                ...prev,
                [playlistId]: {
                    ...prev[playlistId],
                    songIds: prev[playlistId].songIds.filter(id => id !== songId)
                }
            }))
        } catch (err) {
            console.log(err)
        }
    }

    async function addSongToPlaylist(playlistId, songId) {
        if (!playlistId || !songId) {
            console.error("Playlist ID or Song ID is missing.")
            return
        }
        try {
            const token = localStorage.getItem("token")
            await axios.post(
                `http://localhost:3000/api/playlists/${playlistId}/songs`,
                { songId },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setPlaylists((prev) => ({
                ...prev,
                [playlistId]: {
                    ...prev[playlistId],
                    songIds: [...prev[playlistId].songIds, songId]
                }
            }))
        } catch (err) {
            console.log(err)
        }
    }

    async function deletePlaylist(playlistId) {
        try {
            const token = localStorage.getItem("token")
            await axios.delete(
                `http://localhost:3000/api/playlists/${playlistId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            const newPlaylist = { ...playlists }
            delete newPlaylist[playlistId]
            setPlaylists(newPlaylist)
            if (currentPlaylistId === playlistId) {
                setCurrentPlaylistId(null)
                navigate("/")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="page-container">
            <audio ref={audioRef}></audio>
            <div className="page-content-container">
                <Menu isCollapsed={isCollapsed} setCollapse={setCollapse} playlists={playlists} setPlaylists={setPlaylists} isCreatingPlaylist={isCreatingPlaylist} setIsCreatingPlaylist={setIsCreatingPlaylist} currentUserName={currentUserName} openContextMenu={openContextMenu}/>
                <Outlet context={{ currentPlaylistId, setCurrentPlaylistId, playlists, setPlaylists, songs, currentSongId, setCurrentSongId, playSong, openContextMenu }}/>
                {displayQueue && <Queue currentSongId={currentSongId} songs={songs} songQueue={songQueue} queueIndex={queueIndex}/>}
            </div>
            <MusicControlBar currentPlaylistId={currentPlaylistId} playStatus={playStatus} setPlayStatus={setPlayStatus} audioRef={audioRef} songMaxDuration={songMaxDuration} setCurrentSongId={setCurrentSongId} currentSongId={currentSongId} songs={songs} displayQueue={displayQueue} setDisplayQueue={setDisplayQueue} songQueue={songQueue} setSongQueue={setSongQueue} queueIndex={queueIndex} setQueueIndex={setQueueIndex}/>
            {contextMenu && (
    <SongContextMenu x={contextMenu.x} y={contextMenu.y} onClose={closeContextMenu} options={menuOptions}
    />
)}
        </div>
    );
}