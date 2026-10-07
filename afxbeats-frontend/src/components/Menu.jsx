import "./Menu.css"
import { useState, useEffect } from "react";
import {Link, useLocation} from "react-router"
import {UserProfile} from "../components/UserProfile.jsx"
import { AiFillHome } from "react-icons/ai" 
import { AiOutlineHome } from "react-icons/ai"
import { MdOutlineCreateNewFolder } from "react-icons/md"
import { MdCreateNewFolder } from "react-icons/md"
import { MdLibraryMusic } from "react-icons/md"
import { MdOutlineLibraryMusic } from "react-icons/md"
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb"
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb"
import { Playlist } from "../components/Playlist.jsx"
import axios from "axios"
import { TempPlaylist } from "./TempPlaylist.jsx";

export function Menu({isCollapsed, setCollapse ,playlists, setPlaylists, isCreatingPlaylist, setIsCreatingPlaylist, currentUserName}){
    const location = useLocation();

    async function addPlaylist(title){
            try{
                const response = await axios.post("http://localhost:3000/api/playlists",{title:title, song:[]})
                setIsCreatingPlaylist(false)
                const { _id, ...rest } = response.data
                setPlaylists({ ...playlists, [_id] : rest})
            }catch(err){
                console.log(err)
            }
        }
        
    return(
        <div className={`menu-container ${isCollapsed ? "menu-collapsed" : ""}`}>
            <div className="menu-options-container">
                <UserProfile currentUserName={currentUserName} />
                <Link to="/" className={`menu-option ${location.pathname === "/" ? "selected" : ""}`}>
                    {location.pathname === "/" ? <AiFillHome className="menu-icon"/> : <AiOutlineHome className="menu-icon"/>}
                    <span>Home</span>
                </Link>

                <Link to="/create" className={`menu-option ${location.pathname === "/create" ? "selected" : ""}`}>
                    {location.pathname === "/create" ? <MdCreateNewFolder className="menu-icon"/> : <MdOutlineCreateNewFolder className="menu-icon"/>}
                    <span>Create</span>
                </Link>

                {/*<Link to="/library" className={`menu-option ${location.pathname === "/library" ? "selected" : ""}`} style={{marginBottom:"30px"}}>
                    {location.pathname === "/library" ? <MdLibraryMusic className="menu-icon"/> : <MdOutlineLibraryMusic className="menu-icon"/>}
                    <span>Library</span>
                </Link>*/}
            </div>
            <div className="collapse-icon-container">
                {isCollapsed 
                    ? <TbLayoutSidebarRightCollapseFilled className="menu-collapse-icon" onClick={() => setCollapse(false)}/>
                    : <TbLayoutSidebarLeftCollapseFilled className="menu-collapse-icon" onClick={() => setCollapse(true)}/>
                }
            </div> 
            <div className="add-playlist-container">
                <h4>Playlists</h4>
                <MdOutlinePlaylistAdd className="add-playlist-icon" onClick={() => setIsCreatingPlaylist(true)}/>
            </div> 
            <div className="playlists-container">
                {isCreatingPlaylist && (<TempPlaylist addPlaylist={addPlaylist}/>)}
                {Object.entries(playlists).map(([id,playlist]) => {
                    return (
                    <Link to={`/playlist/${id}`} key={id}>
                        <Playlist title={playlist.title} count={playlist.songIds.length}/>
                    </Link>)
                })}
            </div>
        </div>
    );
}