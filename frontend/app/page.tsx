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
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-6xl pt-32 flex justify-center w-full mx-auto">
      <div>
        <div className="font-extrabold text-3xl flex justify-center self-center">Realtime Leaderboard</div>
        <div className="bg-neutral-700 h-fit border flex flex-col w-[800px] rounded-xl mt-10 overflow-y-auto">
          {leaderBoard.map((value, index) => (
            <div key={index} className="border-b border-slate-300 p-4 flex justify-between">
              <div>{value.value}</div>
              <div>Score: {value.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
