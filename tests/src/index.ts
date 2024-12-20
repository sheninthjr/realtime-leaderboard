import axios from "axios"

export const BACKEND_URL = "http://localhost:3001"

interface Player {
    player: string;
    score: number;
}

export const players: Record<number,Player> = {
    1 : {
        player: "Sam",
        score: 0
    },
    2: {
        player: 'Robert',
        score: 0
    },
    3: {
        player: "Sheninthjr",
        score: 0
    },
    4: {
        player: "IronMan",
        score: 0
    },
    5: {
        player: "Sheshanth",
        score: 0
    },
    6: {
        player: "Dravid",
        score: 0
    }
}

async function main() {
    setInterval(async() => {
        const randomIndex = Math.floor(Math.random() * 6) + 1
        const res = await axios.post(`${BACKEND_URL}/score`, {
            player: players[randomIndex].player,
            score: Math.floor(Math.random() * 10)
        })
    },500)
}

main()