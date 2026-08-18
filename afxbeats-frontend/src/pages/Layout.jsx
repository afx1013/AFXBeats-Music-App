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
    const [songs, setSongs] = useState({
    a1: { title: "Midnight Drive", artist: "Nova Sound", duration: "3:24" },
    b2: { title: "Golden Hour", artist: "Lena Marsh", duration: "2:57" },
    c3: { title: "Static Bloom", artist: "The Quiet Ones", duration: "4:12" },
    d4: { title: "Echoes in Blue", artist: "Nova Sound", duration: "3:03" },
    e5: { title: "Paper Planes", artist: "Kilo Drift", duration: "3:41" },
    f6: { title: "Slow Burn", artist: "Reverie", duration: "2:38" },
});
    return (
        <div className="page-container">
            <div className="page-content-container">
                <Menu isCollapsed={isCollapsed} setCollapse={setCollapse} playlists={playlists}/>
                <Outlet context={{ currentPlaylistId, setCurrentPlaylistId, playlists, setPlaylists, songs }}/>
            </div>
        </div>
    );
}