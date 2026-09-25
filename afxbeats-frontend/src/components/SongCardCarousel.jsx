import "./SongCardCarousel.css"
import { IoIosArrowForward } from "react-icons/io"
import { IoIosArrowBack } from "react-icons/io"
import { SongCard } from "./SongCard.jsx"
import { useRef } from "react"

export function SongCardCarousel({ songList , playSong, currentSongId}) {
    const carouselRef = useRef(null)

    if (!songList) return null

    function scrollLeft() {
        carouselRef.current.scrollBy({ left: -220, behavior: 'smooth' })
    }

    function scrollRight() {
        carouselRef.current.scrollBy({ left: 220, behavior: 'smooth' })
    }

    return (
        <div className="carousel-wrapper">
            <IoIosArrowBack className="carousel-arrow left" onClick={scrollLeft}/>
            <div className="card-list" ref={carouselRef}>
                {songList.map(([id,song]) => (
                    <SongCard key={id} coverImage={song.coverImage} title={song.title} artist={song.artist} onClick={() => playSong(id, [id])} isSelected={currentSongId === id}/>
                ))}
            </div>
            <IoIosArrowForward className="carousel-arrow right" onClick={scrollRight}/>
        </div>
    )
}