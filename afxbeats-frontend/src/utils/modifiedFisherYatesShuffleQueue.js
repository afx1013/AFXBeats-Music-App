export function shuffleQueueArray(arr, currentSongIndex) {
    const shuffledArray = [...arr]
    if (currentSongIndex !== 0) {
        let tempCurrentSong = shuffledArray[currentSongIndex]
        shuffledArray[currentSongIndex] = shuffledArray[0]
        shuffledArray[0] = tempCurrentSong
    }

    for (let i = shuffledArray.length - 1; i > 1; i--) {
        const randomUnshuffledIndex = Math.floor((Math.random() * i) + 1)
        let temp = shuffledArray[i]
        shuffledArray[i] = shuffledArray[randomUnshuffledIndex]
        shuffledArray[randomUnshuffledIndex] = temp
    }
    return shuffledArray
}