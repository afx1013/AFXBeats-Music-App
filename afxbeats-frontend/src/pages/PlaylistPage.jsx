import "./PlaylistPage.css"
import {useLocation} from "react-router"
export function PlaylistPage() {
    const location = useLocation();
    return (
        <div className="playlist-page-container">
            <h1>{`Playlist Page${location.pathname}`}</h1>
        </div>
    )
}