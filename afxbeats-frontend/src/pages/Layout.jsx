import "./Layout.css"  
import { Outlet } from "react-router"
import { Menu } from "../components/Menu.jsx"
import { useState,useEffect } from "react";
import axios from "axios"

export function Layout() {
    const [isCollapsed, setCollapse] = useState(false);
    const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
    const [playlists, setPlaylists] = useState({});
    const [songs, setSongs] = useState({});
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/api/playlists")
            .then((response) => {
                const playlistsObj = response.data.reduce((acc, playlist) => {
                const { _id, ...rest } = playlist
                acc[_id] = rest
                return acc
            }, {})
            setPlaylists(playlistsObj)
            console.log(playlistsObj)
            })
            .catch((err) => console.log(err))
        },[])

    useEffect(() => {
        axios.get("http://localhost:3000/api/songs")
        .then((response) => {
            const songsObj = response.data.reduce((acc,song) => {
            const {_id, ...rest} = song
            acc[_id] = rest
            return acc  
            },{})
            setSongs(songsObj)
            console.log(songsObj)
        })
        .catch((err) => {console.log(err)})
    },[])
    
    return (
        <div className="page-container">
            <div className="page-content-container">
                <Menu isCollapsed={isCollapsed} setCollapse={setCollapse} playlists={playlists} setPlaylists={setPlaylists} isCreatingPlaylist={isCreatingPlaylist} setIsCreatingPlaylist={setIsCreatingPlaylist}/>
                <Outlet context={{ currentPlaylistId, setCurrentPlaylistId, playlists, setPlaylists, songs }}/>
            </div>
        </div>
    );
}