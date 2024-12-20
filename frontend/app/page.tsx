"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:3001";

interface LeaderBoard {
  value:string,
  score:number
}

export default function Home() {

  const [leaderBoard, setLeaderBoard] = useState<LeaderBoard[]>([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get<LeaderBoard[]>(`${BACKEND_URL}/leaderboard`);
        setLeaderBoard(response.data)
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-6xl pt-32 flex justify-center mx-auto">
      <div>
        <div className="font-extrabold text-3xl">Realtime Leaderboard</div>
        <div className="bg-slate-700 h-[60vh] rounded-xl mt-10 overflow-y-auto">
          {leaderBoard.map((value, index) => (
            <div key={index} className="border-b p-4 flex justify-between">
              <div>{value.value}</div>
              <div>Score: {value.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
