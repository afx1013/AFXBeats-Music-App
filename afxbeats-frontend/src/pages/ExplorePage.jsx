import "./ExplorePage.css"
import { useState, useMemo } from "react"
import { useOutletContext } from "react-router"
import { FaSearch } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { Song } from "../components/Song.jsx"
import { SongCardCarousel } from "../components/SongCardCarousel.jsx"
import {Link} from "react-router"

export function ExplorePage() {
    const { songs, currentSongId, setCurrentSongId } = useOutletContext();
    const [searchQuery, setSearchQuery] = useState("");
    const songsArray = useMemo(() => Object.entries(songs), [songs])
    const filteredSongs = songsArray.filter(([id, song]) => {
        return song.title.toLowerCase().includes(searchQuery.toLowerCase()) || song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    }).slice(0, 10)
    const recentlyAdded = useMemo(() => {
    return [...songsArray].sort(([, a], [, b]) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10)
}, [songsArray])

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
            <div className="top-songs-container">
                <h1>Top Hits</h1>
                <SongCardCarousel songList={songsArray} />
            </div>
            <div className="middle-section-container">
                <div className="recently-added-container">
                    <h1>Recently Added</h1>
                    <div className="recently-added-songs-container">
                        <div className="recently-added-container-song-list">
                            {recentlyAdded.map(([id,song]) => (<Song key={id} coverImage={song.coverImage} title={song.title} artist={song.artist} isSelected={id === currentSongId}/>))}
                        </div>
                    </div>
                </div>
                <div className="by-genre-container">
                    <div className="genre-section-wrapper">
                        <h1>Genres</h1>
                        <div className="genre-chip-container">
                            <Link to="/genre/Pop" className="genre-chip chip-large">Pop</Link>
                            <Link to="/genre/Rock" className="genre-chip chip-medium">Rock</Link>
                            <Link to="/genre/Hip-Hop" className="genre-chip chip-small">Hip-Hop</Link>
                            <Link to="/genre/Electronic Dance Music" className="genre-chip chip-large">Electronic Dance Music</Link>
                            <Link to="/genre/R&B" className="genre-chip chip-small">R&B</Link>
                            <Link to="/genre/Country" className="genre-chip chip-medium">Country</Link>
                            <Link to="/genre/Jazz" className="genre-chip chip-small">Jazz</Link>
                            <Link to="/genre/Classical" className="genre-chip chip-large">Classical</Link>
                            <Link to="/genre/Blues" className="genre-chip chip-small">Blues</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="added-by-you-container">
                <h1>Added By You</h1>
                <SongCardCarousel songList={songsArray}/>
            </div>
        </div>
    )
}