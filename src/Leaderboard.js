import React, { useEffect, useState } from "react";
import "./index.css";

const LeaderboardAPI = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch(
        "http://208.94.246.53:8080/api/getEmpleados"
      );
      const data = await response.json();
      setLeaderboardData(data.recordset);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="leaderboard">
      <h2>Ranking</h2>
      {leaderboardData
        .sort((a, b) => b.puntos - a.puntos)
        .map((entry, index) => (
          <div key={entry.id} className="leaderboard-entry">
            <span className="leaderboard-rank">{index + 1}</span>
            <span className="leaderboard-name">{entry.nombre}</span>
            <span className="leaderboard-score">{entry.puntos}</span>
            {index === 0 && <span className="leaderboard-trophy">🏆</span>}
          </div>
        ))}
    </div>
  );
};

export default LeaderboardAPI;
