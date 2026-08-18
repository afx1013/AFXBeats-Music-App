import "./Layout.css"  
import { Outlet } from "react-router"
import { Menu } from "../components/Menu.jsx"
import { useState } from "react";

export function Layout() {
      const [isCollapsed, setCollapse] = useState(false);
      const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
      const [playlists, setPlaylists] = useState({
    1: { title: "My Playlist", songIds: ["a1", "b2", "c3"] },
    2: { title: "Chill Mix", songIds: ["a1", "d4"] },
});

    return (
        <div className="page-container">
            <div className="page-content-container">
                <Menu isCollapsed={isCollapsed} setCollapse={setCollapse} playlists={playlists}/>
                <Outlet context={{ currentPlaylistId, setCurrentPlaylistId, playlists, setPlaylists }}/>
            </div>
        </div>
    );
}