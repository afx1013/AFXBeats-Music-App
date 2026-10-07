import "./GenrePage.css"
import { SongCard } from "../components/SongCard.jsx"
import { useOutletContext, useParams } from "react-router"
import { useMemo } from "react"

export function GenrePage() {
    const { genreType } = useParams()
    const { songs, playSong, currentSongId } = useOutletContext()

    const genreSongs = useMemo(() => Object.entries(songs).filter(([, song]) => song.genres?.includes(genreType)), [songs, genreType])
    const genreSongIds = useMemo(() => genreSongs.map(([id]) => id), [genreSongs])

    return (
        <div className="genre-page-container">
            <div className="genre-page-header">
                <h1>{genreType}</h1>
            </div>
            <div className="genre-song-list">
                {genreSongs.map(([id, song]) => (<SongCard key={id} coverImage={song.coverImage} title={song.title} artist={song.artist} isSelected={id === currentSongId} onClick={() => playSong(id, genreSongIds)}/>))}
            </div>
        </div>
    )
}