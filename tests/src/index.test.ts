import axios from "axios"

export const BACKEND_URL = "http://localhost:3001"

interface Player {
    player: string;
    score: number;
}

export const players: Record<number,Player> = {
    1 : {
        player: "Sam",
        score: 10
    },
    2: {
        player: 'Robert',
        score: 20
    },
    3: {
        player: "Sheninthjr",
        score: 45
    },
    4: {
        player: "IronMan",
        score: 30
    },
    5: {
        player: "Sheshanth",
        score: 15
    }
}

describe("Https testing", () => {
    test('Update the leaderboard',async() => {
        const randomIndex = Math.floor(Math.random() * 5) + 1
        const res = await axios.post(`${BACKEND_URL}/score`, {
            player: players[randomIndex].player,
            score: Math.floor(Math.random() * 10)
        })
        expect(res.status).toBe(200)
    })
})