import { createClient } from "redis";
import express from "express";
import cors from "cors";

const client = createClient({
  url: "redis://localhost:6379",
});
async function main() {
  await client.connect();
  client.on('error', err => console.error('Redis Client Error', err));
}

main();

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/leaderboard", async (req, res) => {
  try {
    const topPlayers = await client.zRangeWithScores("leaderboard:score", 0, -1, {
      REV: true,
    });
    res.status(200).json(topPlayers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
});

app.post("/score", async (req, res) => {
  const { player, score } = req.body;
  try {
    const updatedScore = await client.zIncrBy("leaderboard:score", score, player);
    res.status(200).json({
      message: "Score updated successfully",
      player: player,
      newScore: updatedScore,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the user score" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
