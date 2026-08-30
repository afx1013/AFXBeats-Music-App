import "./ExplorePage.css"
import { useState, useMemo } from "react"
import { useOutletContext } from "react-router"
import { FaSearch } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { Song } from "../components/Song.jsx"

export function ExplorePage() {
    const { songs, currentSongId, setCurrentSongId } = useOutletContext();
    const [searchQuery, setSearchQuery] = useState("");
    const songsArray = useMemo(() => Object.entries(songs), [songs])
    const filteredSongs = songsArray.filter(([id, song]) => {
        return song.title.toLowerCase().includes(searchQuery.toLowerCase()) || song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    }).slice(0, 10)

    return (
        <div className="explore-page-container">
            <div className="search-container">
                <div className={`search-bar ${(searchQuery && filteredSongs.length > 0) ? "open" : ""}`}>
                    <FaSearch className="search-icon"/>
                    <input type="text" placeholder="Search" className="search-input" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} autoFocus/>
                    {searchQuery && <IoClose className="delete-search" onClick={() => setSearchQuery("")}/>}
                </div>
                {searchQuery && filteredSongs.length > 0 && (
                    <div className="dropdown-search-list-container">
                        {filteredSongs.map(([id, song]) => (<Song key={id} coverImage={song.coverImage} title={song.title} artist={song.artist} isSelected={id === currentSongId}/>))}
                    </div>
                )}
            </div>

        </div>
    )
}