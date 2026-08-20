 export function secondsToMinutes(t) {
        const min = Math.floor(t / 60)
        const sec = Math.floor(t % 60)
        if (sec < 10) return `${min}:0${sec}`
        return `${min}:${sec}`
    }
